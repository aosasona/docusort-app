import {Divider, Heading, Text, VStack} from "native-base";
import Button from "../components/reusables/Button"
import Modal from "../components/reusables/Modal";
import routes from "../constants/routes";

const AuthModal = ({visible, navigation, toggleVisibility}) => {

  const navigate = (route: string) => {
	toggleVisibility()
	navigation.push(route)
  }

  return (
	<Modal visible={visible} toggleVisibility={toggleVisibility}>
	  <VStack space={4} py={5}>
		<Heading color="muted.50" fontSize={18} fontWeight={800} textAlign="center" py={2}>
		  Start using <Text color="primary.500">DocuSort</Text>
		</Heading>
		<Button onPress={() => navigate(routes.SIGN_UP)}>
		  <Text>Get Started</Text>
		</Button>
		<Button onPress={() => navigate(routes.SIGN_IN)}>
		  <Text>Sign In</Text>
		</Button>
		<Text color="muted.400" fontWeight={500} fontSize={12} textAlign="center" px={6} py={2}>
		  By clicking "Get Started" or "Sign In", you agree to our <Text color="primary.500" fontSize={12}>Terms of Service</Text> and <Text
		  color="primary.500" fontSize={12}>Privacy Policy</Text>
		</Text>
	  </VStack>
	</Modal>
  )
}

export default AuthModal