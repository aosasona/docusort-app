import {FC} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Text} from "native-base"
import {ButtonProps} from "../types/Props";
import {colors} from "../constants";

const Button: FC<ButtonProps> = ({onPress, children, disabled = false}) => {
  const styles = StyleSheet.create({
	container: {
	  backgroundColor: colors.PRIMARY,
	  fontColor: colors.DARK,
	  paddingVertical: 15,
	  borderRadius: 15,
	  opacity: disabled ? 0.5 : 1,
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

  return (
	<TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
	  <Text fontFamily="body" textAlign="center" fontWeight={600} py={3}>{children}</Text>
	</TouchableOpacity>
  )
}


export default Button;