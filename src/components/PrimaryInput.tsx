import {Input} from "native-base";
import {FC} from "react";
import {Platform} from "react-native";
import {PrimaryButtonProps} from "../types/Props";

const PrimaryInput: FC<PrimaryButtonProps> = ({
  type = "text",
  maxLength = 100,
  placeholder,
  disabled = false,
  onChange,
  extraProps,
}) => {
  return (
	<Input
	  type={type}
	  variant="filled"
	  fontFamily="body"
	  color="primary.500"
	  placeholder={placeholder}
	  placeholderTextColor="muted.700"
	  borderRadius={15}
	  fontSize={16}
	  width="100%"
	  py={Platform.OS === "ios" ? 7 : 6}
	  px={5}
	  bgColor="muted.900"
	  borderWidth={0}
	  maxLength={maxLength}
	  onChange={(e) => onChange(e.nativeEvent.text)}
	  isDisabled={disabled}
	  _focus={{
		borderWidth: 1,
		borderColor: "primary.600",
	  }}
	  {...extraProps}
	/>
  )
}

export default PrimaryInput;