import {Box, Heading, ScrollView, Spinner, Stack, Text, useToast} from "native-base";
import {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import {handleError} from "../../../utils/ErrorHandler";
import Button from "../../components/Button";
import Layout from "../../components/Layout"
import PrimaryInput from "../../components/PrimaryInput";
import {ToastStyles} from "../../constants";
import routes from "../../constants/routes";
import useAuthStyle from "../../hooks/useAuthStyle";
import {SignIn as SignInService} from "../../services"
import {SignInData} from "../../types/Auth";

const SignIn = ({navigation}) => {
  const styles = useAuthStyle();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
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
		<Heading color="light.200" fontFamily="heading" fontSize="4xl" fontWeight="500">
		  Log In
		</Heading>
		<Text color="muted.600" fontFamily="body" fontSize={14} mt={1}>
		  Enter your login credentials to sign in to your account
		</Text>

		<Stack space={6} mt={8}>
		  <PrimaryInput
			onChange={(e) => setData({...data, email: e})}
			placeholder="E-Mail Address"
			maxLength={35}/>
		  <PrimaryInput
			onChange={(e) => setData({...data, password: e})}
			type="password"
			placeholder="Password"
			maxLength={20}
		  />
		  <TouchableOpacity>
			<Text color="primary.600" fontFamily="body" fontSize={13} textAlign="right" px={3}>
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