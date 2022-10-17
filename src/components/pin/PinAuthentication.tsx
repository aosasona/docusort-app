import {Box, Heading, Spinner, Text, useToast, View} from "native-base";
import {useContext, useState} from "react";
import {handleError} from "../../../utils/ErrorHandler";
import {ToastStyles} from "../../constants";
import {GlobalContext} from "../../contexts/GlobalContext";
import {unlockApp} from "../../services/AuthService";
import AppLayout from "../shared/AppLayout";
import Keypad from "./Keypad";
import PinInput from "./PinInput";

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
	}).then(() => setPin(""))
	  .catch((err: any) => {
		const msg = handleError(err);
		toast.show({
		  description: msg,
		  ...ToastStyles.ERROR,
		})
	  })
	  .finally(() => setLoading(false))
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
			  Enter PIN
			</Heading>
			<Text color="muted.600" fontFamily="body" fontSize={14} mt={1}>
			  Enter your PIN or use biometrics to unlock app
			</Text>
		  </Box>
		  <PinInput length={4} value={pin}/>
		  <Box mb={12}>
			<Keypad max={4} value={pin} setValue={setPin} showSignOut={true} onCompleted={handleComplete}/>
		  </Box>
		</View>}
	</AppLayout>
  );
}