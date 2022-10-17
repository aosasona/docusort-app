import {Divider, Heading, Text, useToast, VStack} from "native-base";
import {Linking} from "react-native";
import Button from "../components/reusables/Button";
import Modal from "../components/reusables/Modal";
import ModalHeader from "../components/reusables/ModalHeader";
import {ToastStyles} from "../constants";

const ImageInfoModal = ({visible, onClose}) => {

  const toast = useToast();

  const openGravatarUrl = async () => {
	const canOpen = await Linking.canOpenURL('https://gravatar.com');
	if (canOpen) {
	  await Linking.openURL('https://gravatar.com');
	} else {
	  toast.show({
		description: 'Could not open Gravatar website',
		...ToastStyles.SUCCESS,
	  })
	}
  }

  return (
	<Modal visible={visible} toggleVisibility={onClose}>
	  <VStack space={5} pb={10}>
		<ModalHeader>
		  Image info
		</ModalHeader>
		<Text color="muted.200" fontWeight={500} px={3}>
		  Gravatar is used to retrieve profile pictures automatically. We have no say over the image you choose to
		  represent yourself online, so if you want to alter it, you'll have to do so on the Gravatar website.
		</Text>
		<Button onPress={openGravatarUrl}>
		  Visit Gravatar
		</Button>
	  </VStack>
	</Modal>
  )
}

export default ImageInfoModal