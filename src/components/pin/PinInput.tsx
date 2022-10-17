import {Entypo, FontAwesome5} from "@expo/vector-icons";
import {Box, HStack, Icon} from "native-base";
import {FC} from "react";
import {Dimensions} from "react-native";
import {PinInputProps} from "../../types/Props";

const {width} = Dimensions.get("window");

const PinInput: FC<PinInputProps> = ({length, value}) => {

  const values = value.split("");

  return (
	<HStack space={4} justifyContent="space-between" maxW={width * 0.9} mx="auto">
	  {Array.from({length}, (_, i) => (
		<PinInputField key={i} value={values[i]}/>
	  ))}
	</HStack>
  )
}

const PinInputField = ({value}) => {
  return (
	<Box
	  width={10}
	  height={10}
	  alignItems="center"
	  justifyContent="center"
	  borderRadius={10}
	  backgroundColor="transparent"
	  borderColor="primary.500"
	>
	  {value
		? <Icon as={Entypo} name="dot-single" size={20} color="muted.100"/>
		: <Icon as={Entypo} name="dot-single" size={16} color="muted.900"/>}
	</Box>
  )
}

export default PinInput