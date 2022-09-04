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
}) => {
  return (
	<Input type={type}
		   variant="filled"
		   color="primary.500"
		   placeholder={placeholder}
		   placeholderTextColor="primary.800"
		   borderRadius={40}
		   fontSize={14}
		   width="100%"
		   py={Platform.OS === "ios" ? 7 : 6}
		   px={8}
		   bgColor="primary.900"
		   borderWidth={0}
		   maxLength={maxLength}
		   onChange={(e) => onChange(e.nativeEvent.text)}
		   isDisabled={disabled}
		   _focus={{
			 borderWidth: 1,
			 borderColor: "primary.600",
		   }}
	/>
  )
}

export default PrimaryInput;