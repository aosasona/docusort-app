import {AntDesign, Ionicons} from "@expo/vector-icons";
import {Box, Button, Divider, Heading, HStack, Icon, Switch, Text, VStack} from "native-base";
import React from "react";
import {Dimensions, Platform} from "react-native";
import Modal from "../components/reusables/Modal";
import ModalHeader from "../components/reusables/ModalHeader";
import PageButton, {PageIcon} from "../components/reusables/PageButton";
import {SecuritySettingsProps} from "../types/Settings";

const {width} = Dimensions.get('window');

export default function SecuritySettingsModal({visible, onClose}: SecuritySettingsProps) {
  return (
	<Modal visible={visible} toggleVisibility={onClose}>
	  <VStack space={4} pb={4}>
		<ModalHeader>
		  Security
		</ModalHeader>
		<VStack space={0}>
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

		  <HStack justifyContent="space-between" alignItems="center" px={1} py={3}>
			<HStack space={4} alignItems="center">
			  <PageIcon icon={{as: Ionicons, name: "ios-finger-print"}}/>
			  <VStack space={0}>
				<Text color="muted.400" fontSize={17}>Biometrics</Text>
				<Text width={width * 0.5} color="muted.600" fontSize={13}>Enable/disable biometrics unlock on this device</Text>
			  </VStack>
			</HStack>
			<Switch size="md" onTrackColor="primary.500" onThumbColor="muted.50" offTrackColor="muted.600"
					offThumbColor="muted.100"/>
		  </HStack>
		</VStack>
	  </VStack>
	</Modal>
  )
}