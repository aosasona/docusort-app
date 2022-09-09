import {Divider, Heading, Text, useToast, VStack} from "native-base";
import {useContext} from "react";
import Modal from "../components/Modal";
import {GlobalContext} from "../contexts/GlobalContext";

const PersonalDetailsModal = ({visible, onClose}) => {
  const toast = useToast();
  const {state, dispatch} = useContext(GlobalContext);
  return (
	<Modal visible={visible} toggleVisibility={onClose}>
	  <VStack space={5} pt={3} pb={10}>
		<Heading color="muted.200" fontWeight={600} fontSize={18} textAlign="center">
		  Personal <Text color="primary.500">details</Text>
		</Heading>
		<Divider orientation="horizontal" bg="muted.700"/>
		<Text color="muted.200" fontWeight={500} px={3}>
		  Update your profile information here.
		</Text>
	  </VStack>
	</Modal>
  )
}

export default PersonalDetailsModal