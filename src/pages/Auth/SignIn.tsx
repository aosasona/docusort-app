import {useState} from "react";
import {Text, Stack, ScrollView, useToast} from "native-base";
import {TouchableOpacity, View} from "react-native";
import {Button, Layout} from "../../components"
import PrimaryInput from "../../components/PrimaryInput";
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
		<Text color="primary.500" fontSize="5xl" fontWeight={700}>
		  Hello again
		</Text>
		<Text color="primary.700" fontSize="sm" px={1}>
		  Fill in your credentials to continue⚡
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
			<Text color="primary.500" textAlign="left" px={3}>
			  Forgot password?
			</Text>
		  </TouchableOpacity>
		</Stack>
	  </ScrollView>
	  <View>
		<Button onPress={() => SignInService(data, toast)} disabled={(!(data.email && data.password))}>
		  Continue
		</Button>
		<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
		  <Text style={styles.newAccountText}>
			I don't have an account
		  </Text>
		</TouchableOpacity>
	  </View>
	</Layout>
  );
};


export default SignIn;