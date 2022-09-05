import {Text, VStack} from "native-base";
import Modal from "../components/Modal";
import Button from "../components/Button"
import routes from "../constants/routes";

const AuthModal = ({visible, navigation, toggleVisibility}) => {

  const navigate = (route: string) => {
	toggleVisibility()
	navigation.push(route)
  }

  return (
	<Modal visible={visible} toggleVisibility={toggleVisibility}>
	  <VStack space={5} py={5}>
		<Text color="muted.50" fontFamily={"body"} textAlign={"center"}>Start using <Text
		  color="primary.500">DocuSort</Text></Text>
		<Button onPress={() => navigate(routes.SIGN_UP)}>
		  <Text>Get Started</Text>
		</Button>
		<Button onPress={() => navigate(routes.SIGN_IN)}>
		  <Text>Sign In</Text>
		</Button>
	  </VStack>
	</Modal>
  )
}

export default AuthModal