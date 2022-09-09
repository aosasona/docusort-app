import {Entypo, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {Box, HStack, Icon, Text} from "native-base";
import {FC} from "react";
import {Dimensions} from "react-native";
import {PinInputProps} from "../types/Props";

const {width} = Dimensions.get("window");

const PinInput: FC<PinInputProps> = ({length, value}) => {

  const values = value.split("");

  return (
	<HStack space={3} justifyContent="space-between" maxW={width * 0.9} mx="auto">
	  {Array.from({length}, (_, i) => (
		<PinInputField key={i} value={values[i]}/>
	  ))}
	</HStack>
  )
}

const PinInputField = ({value}) => {
  return (
	<Box
	  width={12}
	  height={12}
	  alignItems="center"
	  justifyContent="center"
	  borderRadius={10}
	  backgroundColor="transparent"
	  borderWidth={value ? 2 : 0}
	  borderColor="primary.500"
	>
	  {value
		? <Icon as={FontAwesome5} name="asterisk" size={5} color="primary.500"/>
		: <Icon as={Entypo} name="dot-single" size={16} color="muted.800"/>}
	</Box>
  )
}

export default PinInput