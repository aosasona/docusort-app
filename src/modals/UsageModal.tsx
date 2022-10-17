import {Box, Divider, Heading, Text, VStack} from "native-base";
import {useContext} from "react";
import Modal from "../components/reusables/Modal";
import {GlobalContext} from "../contexts/GlobalContext";

const UsageModal = ({visible, onClose}) => {

  const {state} = useContext(GlobalContext);

  const {profile} = state;

  const tierColor = {
	0: "gray.400",
	1: "#67C499",
	2: "#AB95FF",
  }

  const tierHex = tierColor[profile?.tier || 0]

  return (
	<Modal visible={visible} toggleVisibility={onClose}>
	  <VStack space={5} pb={5}>
		<Heading color="muted.200" fontWeight={600} fontSize={18} textAlign="center">
		  Usage
		</Heading>
		<Divider orientation="horizontal" bg="muted.700"/>
		<Box backgroundColor={tierHex} rounded={20} px={3} py={2} opacity={1}>
		  <Text color="muted.900" fontSize={13} fontWeight={500} textAlign="center">
			{profile.tier === 0 ? "Freemium" : profile.tier === 1 ? "Premium" : "Pro"}
		  </Text>
		</Box>
		{/* <Box bg="muted.800" rounded={15} px={5} py={3}> */}
		{/*   <Heading fontSize={15} color="muted.300"> */}
		{/* 	Total Storage */}
		{/*   </Heading> */}
		{/* </Box> */}
	  </VStack>
	</Modal>
  )
}
export default UsageModal