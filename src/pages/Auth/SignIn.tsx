import {Ionicons} from "@expo/vector-icons";
import {Box, Heading, HStack, Icon, Pressable, ScrollView, Spinner, Stack, Text, useToast} from "native-base";
import {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import {handleError} from "../../../utils/ErrorHandler";
import Button from "../../components/reusables/Button";
import Layout from "../../components/shared/Layout"
import PrimaryInput from "../../components/reusables/PrimaryInput";
import {ToastStyles} from "../../constants";
import routes from "../../constants/routes";
import useAuthStyle from "../../hooks/useAuthStyle";
import {SignIn as SignInService} from "../../services"
import {SignInData} from "../../types/Auth";

const SignIn = ({navigation}) => {
  const styles = useAuthStyle();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<SignInData>({
	email: "",
	password: "",
  })

  const handleSignIn = async () => {
	setLoading(true);
	try {
	  await SignInService(data, toast);
	}
	catch (e) {
	  const msg = handleError(e);
	  toast.show({
		description: msg,
		...ToastStyles.ERROR,
	  })
	}
	finally {
	  setLoading(false);
	}
  }

  return (
	<Layout style={styles.container}>
	  <ScrollView showsVerticalScrollIndicator={false}>
		<Heading color="light.200" fontFamily="heading" fontSize="4xl" fontWeight="600">
		  Log In
		</Heading>
		<Text color="muted.700" fontFamily="body" fontWeight="500" fontSize={14} mt={1}>
		  Enter your login credentials to sign in to your account
		</Text>

		<Stack space={6} mt={5}>
		  <PrimaryInput
			onChange={(e) => setData({...data, email: e})}
			placeholder="E-Mail Address"
			maxLength={35}
		  />
		  <HStack w="85%" space={2} alignItems="center" justifyContent="space-between">
			<Box width="full">
			  <PrimaryInput
				onChange={(e) => setData({...data, password: e})}
				type={showPassword ? "text" : "password"}
				placeholder="Password"
				maxLength={20}
			  />
			</Box>
			<Pressable p={4} onPress={() => setShowPassword(!showPassword)}>
			  <Icon size={5} as={Ionicons} name={!showPassword ? "eye-off-outline" : "eye-outline"} color={!showPassword ? "muted.400" : "primary.500"}/>
			</Pressable>
		  </HStack>
		  <TouchableOpacity>
			<Text color="primary.600" fontFamily="body" fontSize={13} textAlign="left" px={3}>
			  Forgot password?
			</Text>
		  </TouchableOpacity>
		</Stack>
		{loading && <Box py={8}>
          <Spinner size="sm"/>
        </Box>}
	  </ScrollView>
	  <View>
		<Button onPress={handleSignIn} disabled={(!(data.email && data.password) || loading)}>
		  Continue
		</Button>
		<TouchableOpacity onPress={() => navigation.navigate(routes.SIGN_UP)}>
		  <Text color="muted.100" fontFamily="body" fontWeight={600} fontSize={13} textAlign="center" my={8}>
			Create an account
		  </Text>
		</TouchableOpacity>
	  </View>
	</Layout>
  );
};


export default SignIn;