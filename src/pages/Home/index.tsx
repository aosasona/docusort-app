import {AntDesign, Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, Fab, Heading, HStack, Icon, ScrollView, Text, VStack} from "native-base";
import {FC, useEffect, useState} from "react";
import Layout from "../../components/Layout";
import UploadModal from "../../modals/UploadModal";
import {BasePageProps} from "../../types/Props";

const Index: FC<BasePageProps> = ({session, profile}) => {

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [pinExists, setPinExists] = useState(true);

  useEffect(() => {
	(async () => {
	  const pin = await AsyncStorage.getItem("pin");
	  if (pin) {
		setPinExists(true);
	  } else {
		setPinExists(false);
	  }
	})()
  }, [])


  return (
	<Layout>
	  <ScrollView>
		<Heading
		  color={"primary.500"}
		  fontSize={28}
		  fontWeight={600}
		  px={6}
		  pt={6}
		  pb={4}
		>
		  Hello, {profile.first_name}
		</Heading>
		{!pinExists && <PinNotSetup/>}
	  </ScrollView>

	  <Fab
		renderInPortal={false}
		shadow={3}
		size={16}
		position="absolute"
		bottom={6}
		right={4}
		backgroundColor="primary.500"
		icon={<Icon color="muted.800" as={AntDesign} name="plus" size={6}/>}
		onPress={() => setIsUploadModalOpen(true)}
	  />
	  <UploadModal visible={isUploadModalOpen} toggleVisibility={() => setIsUploadModalOpen(false)}/>
	</Layout>
  );
}

const PinNotSetup = () => (
  <Button w="90%" rounded={15} backgroundColor="red.500" justifyContent="space-between" px={4} py={4} mx="auto"
		  _pressed={{opacity: 0.7}}>
	<HStack space={3} alignItems="center">
	  <Icon color="white" as={Ionicons} name="keypad" size={6}/>
	  <VStack space={0.5}>
		<Heading color="white" fontSize={18} fontWeight={700}>
		  PIN not setup
		</Heading>
		<Text color="muted.100" fontWeight={500} fontSize={12}>
		  Click here to setup a PIN to protect your files on this device.
		</Text>
	  </VStack>
	</HStack>
  </Button>
)

export default Index;