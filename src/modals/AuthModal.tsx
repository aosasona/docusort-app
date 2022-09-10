import {Divider, Heading, Text, VStack} from "native-base";
import Button from "../components/Button"
import Modal from "../components/Modal";
import routes from "../constants/routes";

const AuthModal = ({visible, navigation, toggleVisibility}) => {

  const navigate = (route: string) => {
	toggleVisibility()
	navigation.push(route)
  }

  return (
	<Modal visible={visible} toggleVisibility={toggleVisibility}>
	  <VStack space={5} pt={5} pb={10}>
		<Heading color="muted.50" fontSize={18} textAlign={"center"}>
		  Start using <Text color="primary.500">DocuSort</Text>
		</Heading>
		<Divider orientation="horizontal" bg="muted.700"/>
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