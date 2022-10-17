import {Box, Button, HStack, Icon, Text, VStack} from "native-base";
import {ReactNode} from "react";
import {Dimensions} from "react-native";
import {PageButtonProps, PageIconProps} from "../../types/Props";

const {width} = Dimensions.get('window');

export default function PageButton({title, description, icon, ...props}: PageButtonProps) {
  return (
	<Button
	  backgroundColor="transparent"
	  justifyContent="flex-start"
	  py={3}
	  px={1}
	  _pressed={{opacity: 0.7}}
	  {...props}
	>
	  <HStack space={4} alignItems="center" justifyContent="space-between">
		<PageIcon icon={icon}/>
		<VStack>
		  <PageButtonHeader>{title}</PageButtonHeader>
		  <PageButtonDescription>
			{description}
		  </PageButtonDescription>
		</VStack>
	  </HStack>
	</Button>
  )
}

export function PageIcon({icon}: { icon: PageIconProps }) {
  return (
	<Box bg={`${icon.color || "muted"}.800`} p={4} rounded={10}>
	  <Icon as={icon.as} name={icon.name} size={5} color="white" opacity={0.7}/>
	</Box>
  )
}

export function PageButtonHeader({children}: { children: ReactNode }) {
  return (
	<Text color="muted.200" fontWeight={500} fontSize={16}>
	  {children}
	</Text>
  )
}

export function PageButtonDescription({children}: { children: ReactNode }) {
  return (
	<Text w={width * 0.78} color="muted.600" fontWeight={400} fontSize={13}>
	  {children}
	</Text>
  )
}