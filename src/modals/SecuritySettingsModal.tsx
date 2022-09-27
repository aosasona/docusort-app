import {AntDesign, Ionicons} from "@expo/vector-icons";
import {Button, Divider, Heading, HStack, Icon, Switch, Text, VStack} from "native-base";
import {Dimensions} from "react-native";
import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";
import PageButton from "../components/PageButton";
import {SecuritySettingsProps} from "../types/Settings";

const {width} = Dimensions.get('window');

export default function SecuritySettingsModal({visible, onClose}: SecuritySettingsProps) {

  return (
	<Modal visible={visible} toggleVisibility={onClose}>
	  <VStack space={4} pb={6}>
		<ModalHeader>
		  Security
		</ModalHeader>
		<VStack space={1}>
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

		  <HStack justifyContent="space-between" alignItems="center" px={3}>
			<HStack alignItems="center">
			  <Icon as={Ionicons} name="ios-finger-print" size={6} color="muted.400"/>
			  <VStack space={0} ml={5}>
				<Text color="muted.400" fontSize={17}>Biometrics</Text>
				<Text width={width * 0.5} color="muted.600" fontSize={13}>Enable/disable biometrics unlock on this device</Text>
			  </VStack>
			</HStack>
			<Switch size="sm" onTrackColor="primary.500" onThumbColor="muted.50" offTrackColor="muted.600" offThumbColor="muted.100"/>
		  </HStack>
		</VStack>
	  </VStack>
	</Modal>
  )
}