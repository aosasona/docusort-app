import {FC} from "react";
import {Pressable, StyleSheet, Text, TouchableOpacity} from "react-native";
import {ButtonProps} from "../types/Props";
import {colors} from "../constants";

const Button: FC<ButtonProps> = ({onPress, children, disabled = false}) => {
  return (
	<TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
	  <Text style={styles.text}>{children}</Text>
	</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
	backgroundColor: colors.PRIMARY,
	fontColor: colors.DARK,
	paddingVertical: 15,
	borderRadius: 50,
  },
  text: {
	backgroundColor: 'transparent',
	fontSize: 14,
	fontWeight: '400',
	color: colors.DARK,
	paddingVertical: 10,
	textAlign: 'center',
  },
})

export default Button;