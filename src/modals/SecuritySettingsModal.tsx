import {AntDesign, Ionicons} from "@expo/vector-icons";
import {Button, Divider, Heading, HStack, Icon, Text, VStack} from "native-base";
import {Dimensions} from "react-native";
import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";
import PageButton from "../components/PageButton";
import {SecuritySettingsProps} from "../types/Settings";

const {width} = Dimensions.get('window');

export default function SecuritySettingsModal({visible, onClose}: SecuritySettingsProps) {
  return (
	<Modal visible={visible} toggleVisibility={onClose}>
	  <VStack space={4} pt={3} pb={10}>
		<ModalHeader>
		  Security
		</ModalHeader>

		<PageButton
		  title="Change password"
		  description="Protect your account by changing your password"
		  icon={{
			as: AntDesign,
			name: "key",
		  }}
		/>

		<PageButton
		  title="Change pin"
		  description="Keep your files safe by setting a new pin"
		  icon={{
			as: Ionicons,
			name: "keypad",
		  }}
		/>

		<PageButton
		  title="Biometrics settings"
		  description="Manage biometrics sign-in settings on this device"
		  icon={{
			as: Ionicons,
			name: "ios-finger-print",
		  }}
		/>
	  </VStack>
	</Modal>
  )
}