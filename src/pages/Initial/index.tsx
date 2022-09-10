import {AntDesign} from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import {Box, Flex, IconButton, Text, useDisclose, VStack} from "native-base";
import {useState} from "react";
import {ImageBackground, useWindowDimensions} from "react-native";
import AuthModal from "../../modals/AuthModal";

const fileAnimation = require("../../../assets/animations/file.json")
const bgImage = require("../../../assets/initial-bg.png")

const Initial = ({navigation}) => {
  const {width, height} = useWindowDimensions()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const {
	isOpen,
	onOpen,
	onClose,
  } = useDisclose();
  return (
	<>
	  <ImageBackground source={bgImage} resizeMode="cover">
		<VStack
		  h={height}
		  justifyContent="space-between"
		  px={8}
		  pt={height * 0.03}
		  pb={height * 0.06}
		>
		  <Box width="100%" height={(height * 0.6)}>
			<LottieView source={fileAnimation} autoPlay loop/>
		  </Box>
		  <VStack width="100%" space={2}>
			<Text color="muted.500" fontSize={16} fontWeight={600}>Let's get started</Text>
			<Box>
			  <Text color="muted.100" fontFamily="heading" fontSize="4xl" fontWeight={700}>Save, Sort & Share</Text>
			  <Text color="muted.100" fontFamily="heading" fontSize="4xl" fontWeight={700} py={0}>Documents</Text>
			</Box>

			<Flex direction="row" width="100%" justifyContent="flex-end">
			  <IconButton
				icon={<AntDesign name="arrowright" size={24} color="black"/>}
				borderRadius="full"
				backgroundColor="primary.500"
				p={5}
				_icon={{
				  color: "muted.900",
				}}
				_pressed={{
				  backgroundColor: "primary.700",
				}}
				onPress={() => setIsModalVisible(!isModalVisible)}
			  />
			</Flex>
		  </VStack>
		</VStack>
	  </ImageBackground>

	  <AuthModal navigation={navigation} visible={isModalVisible} toggleVisibility={() => setIsModalVisible(false)}/>
	</>
  )
}

export default Initial;