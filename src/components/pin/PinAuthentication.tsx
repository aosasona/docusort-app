import {Ionicons} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import {Box, Heading, Icon, Pressable, Spinner, Text, useToast, View, VStack} from "native-base";
import {useContext, useState} from "react";
import {Alert} from "react-native";
import {handleError} from "../../../utils/ErrorHandler";
import {ToastStyles} from "../../constants";
import {GlobalContext} from "../../contexts/GlobalContext";
import {unlockApp} from "../../services/AuthService";
import AppLayout from "../shared/AppLayout";
import Keypad from "./Keypad";
import PinInput from "./PinInput";
import * as LocalAuthentication from 'expo-local-authentication';

export default function PinAuthentication() {

  const toast = useToast();
  const {state, dispatch} = useContext(GlobalContext);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComplete = () => {
	setLoading(true);
	unlockApp({
	  pin,
	  dispatch,
	}).then(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).then();
		setPin("")
	  })
	  .catch((err: any) => {
		setPin("");
		const msg = handleError(err);
		toast.show({
		  description: msg,
		  ...ToastStyles.ERROR,
		})
	  })
	  .finally(() => setLoading(false))
  }

  const handleBiometrics = () => {
	try {
	  setLoading(true);
	  LocalAuthentication.hasHardwareAsync().then().catch(err => Alert.alert("Error", "Your device does not support biometrics"));
	  LocalAuthentication.isEnrolledAsync().then((res) => {
		if (!res) {
		  Alert.alert("Error", "You have not enabled biometrics on this device");
		}
		LocalAuthentication.authenticateAsync({
		  promptMessage: "Authenticate to unlock",
		}).then((res) => {
		  if (res.success) {
			dispatch({type: "UNLOCK_APP"});
		  }
		})

	  })
	}
	catch (e: unknown) {
	  Alert.alert("Error", "Something went wrong");
	}
	finally {
	  setLoading(false);
	}
  }

  return (
	<AppLayout>
	  {state?.isAppLockStateLoading
		? <View flex={1} justifyContent="center" alignItems="center">
		  <Spinner/>
		</View>
		: <View justifyContent="space-between" flex={1} pt={2}>
		  <Box px={6} py={2}>
			<Heading color="light.200" fontFamily="heading" fontSize="5xl" fontWeight="700">
			  Unlock 🔐
			</Heading>
			<Text color="muted.600" fontFamily="body" fontSize={14} mt={1}>
			  Enter your PIN or use biometrics to continue
			</Text>
		  </Box>
		  <VStack alignItems="center" space={10}>
			<PinInput length={4} value={pin}/>
			<Box>
			  {loading
				?
				<Spinner/>
				:
				<Pressable bg="muted.900" p={5} rounded={10} opacity={0.6} _pressed={{opacity: 0.3}} onPress={handleBiometrics}>
				  <Icon as={Ionicons} name="ios-finger-print" color="muted.700" size={8}/>
				</Pressable>
			  }
			</Box>
		  </VStack>
		  <Box mb={12}>
			<Keypad max={4} value={pin} setValue={setPin} showSignOut={true} onCompleted={handleComplete}/>
		  </Box>
		</View>}
	</AppLayout>
  );
}