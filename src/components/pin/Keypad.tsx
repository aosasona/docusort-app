import {Ionicons} from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import {Box, Flex, Icon, Pressable, Text, useToast, VStack} from "native-base";
import {FC, Fragment, useEffect} from "react";
import {Dimensions} from "react-native";
import {SignOut} from "../../services/AuthService";
import {KeypadInputProps, KeypadProps} from "../../types/Props";

const cellSize = Dimensions.get("window").width * 0.2;

const Keypad: FC<KeypadProps> = ({max, value, setValue, showSignOut = false, onCompleted}) => {

  const toast = useToast();

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

  const handleSignOut = () => {
	Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).then();
	SignOut(toast).then();
  }

  const cells = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
  ]

  return (
	<VStack space={4}>
	  {cells.map((row, i) => (
		<Flex key={i} direction="row" justifyContent="space-around" alignItems="center">
		  <Fragment key={i}>
			{row.map((cell, j) => (
			  <KeypadInput value={cell} key={j} onPress={handlePress} isFilled={isFilled}/>
			))}
		  </Fragment>
		</Flex>
	  ))}
	  <Flex direction="row" justifyContent="space-around" alignItems="center">
		{showSignOut ?
		  <Pressable
			width={cellSize}
			height={cellSize}
			alignItems="center"
			justifyContent="center"
			onPress={handleSignOut}
			_pressed={{
			  opacity: 0.4,
			}}
		  >
			<Text color="red.600" fontSize={14} fontWeight={700}>Sign Out</Text>
		  </Pressable>
		  : <Box width={cellSize} height={cellSize}/>
		}
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
	  width={cellSize}
	  height={cellSize}
	  onPress={handlePress}
	  alignItems={"center"}
	  justifyContent={"center"}
	  disabled={isFilled}
	  _pressed={{
		opacity: 0.4,
		bg: "muted.800",
		rounded: "2xl",
	  }}
	>
	  <Text color="muted.100" fontWeight={700} fontSize={32}>
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
	  width={cellSize}
	  height={cellSize}
	  alignItems="center"
	  justifyContent="center"
	  onPress={handlePress}
	  _pressed={{
		opacity: 0.4,
	  }}
	>
	  <Box
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