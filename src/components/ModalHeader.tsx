import {Divider, Heading, View, VStack} from "native-base";
import {ModalHeaderProps} from "../types/Props";

export default function ModalHeader({children}: ModalHeaderProps) {
  return (
	<VStack space={5}>
	  <Heading color="muted.300" fontWeight={800} fontSize={18} textAlign="center">
		{children}
	  </Heading>
	  <Divider orientation="horizontal" bg="muted.700"/>
	</VStack>
  )
}