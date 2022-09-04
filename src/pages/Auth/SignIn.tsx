import {Urbanist_500Medium} from "@expo-google-fonts/urbanist";
import {useState} from "react";
import {Text, Stack, ScrollView, useToast, Heading} from "native-base";
import {TouchableOpacity, View} from "react-native";
import {Button, Layout} from "../../components"
import PrimaryInput from "../../components/PrimaryInput";
import routes from "../../constants/routes";
import useAuthStyle from "../../hooks/useAuthStyle";
import {SignIn as SignInService} from "../../services"
import {SignInData} from "../../types/Auth";

const SignIn = ({navigation}) => {
  const styles = useAuthStyle();
  const toast = useToast();
  const [data, setData] = useState<SignInData>({
	email: "",
	password: "",
  })
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
	  </ScrollView>
	  <View>
		<Button onPress={() => SignInService(data, toast)} disabled={(!(data.email && data.password))}>
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