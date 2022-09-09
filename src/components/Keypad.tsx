import {Ionicons} from "@expo/vector-icons";
import {Box, Flex, Icon, Pressable, Text, VStack} from "native-base";
import {FC, useEffect} from "react";
import * as Haptics from 'expo-haptics';
import {Dimensions} from "react-native";
import {KeypadInputProps, KeypadProps} from "../types/Props";


const Keypad: FC<KeypadProps> = ({max, value, setValue, onCompleted}) => {

  useEffect(() => {
	if (value.length === max) {
	  onCompleted();
	}
  }, [value])

  const isFilled = value.length === max;

  const handlePress = (val: string) => {
	if (isFilled) return;
	setValue(String(value) + String(val));
	Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).then();
  }

  const handleDelete = () => {
	if (value?.length === 0) return;
	setValue(value.slice(0, -1));
	Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).then();
  }

  return (
	<VStack space={6}>
	  <Flex direction="row" justifyContent="space-around" alignItems="center">
		<KeypadInput value={1} onPress={handlePress} isFilled={isFilled}/>
		<KeypadInput value={2} onPress={handlePress} isFilled={isFilled}/>
		<KeypadInput value={3} onPress={handlePress} isFilled={isFilled}/>
	  </Flex>
	  <Flex direction="row" justifyContent="space-around" alignItems="center">
		<KeypadInput value={4} onPress={handlePress} isFilled={isFilled}/>
		<KeypadInput value={5} onPress={handlePress} isFilled={isFilled}/>
		<KeypadInput value={6} onPress={handlePress} isFilled={isFilled}/>
	  </Flex>
	  <Flex direction="row" justifyContent="space-around" alignItems="center">
		<KeypadInput value={7} onPress={handlePress} isFilled={isFilled}/>
		<KeypadInput value={8} onPress={handlePress} isFilled={isFilled}/>
		<KeypadInput value={9} onPress={handlePress} isFilled={isFilled}/>
	  </Flex>
	  <Flex direction="row" justifyContent="space-around" alignItems="center">
		<Box width={12} height={12}/>
		<KeypadInput value={0} onPress={handlePress} isFilled={isFilled}/>
		<KeypadDelete onPress={handleDelete}/>
	  </Flex>
	</VStack>
  )
}

const KeypadInput: FC<KeypadInputProps> = ({value, onPress, isFilled}) => {

  const handlePress = () => {
	onPress(String(value));
  }

  return (
	<Pressable
	  p={4}
	  onPress={handlePress}
	  _pressed={{
		opacity: 0.4,
	  }}
	>
	  <Text color="muted.100" fontWeight={800} fontSize={26}>
		{value}
	  </Text>
	</Pressable>
  )
};

const KeypadDelete = ({onPress}) => {

  const handlePress = () => {
	onPress();
  }

  return (
	<Pressable
	  onPress={handlePress}
	  _pressed={{
		opacity: 0.4,
	  }}
	>
	  <Box
		width={12}
		height={12}
		alignItems="center"
		justifyContent="center"
		borderRadius={10}
		backgroundColor="transparent"
	  >
		<Icon as={Ionicons} name="ios-backspace-outline" size={8} color="muted.600"/>
	  </Box>
	</Pressable>
  )
}

export default Keypad;