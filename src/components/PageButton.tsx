import {Button, HStack, Icon, Text, VStack} from "native-base";
import {Dimensions} from "react-native";

const {width} = Dimensions.get('window');

const PageButton = ({title, description, icon, ...props}) => (
  <Button
	backgroundColor="transparent"
	justifyContent="flex-start"
	rounded={15}
	py={5}
	_pressed={{opacity: 0.7}}
	{...props}
  >
	<HStack space={4} alignItems="center" justifyContent="space-between">
	  <Icon as={icon.as} name={icon.name} size={5} color="muted.400"/>
	  <VStack>
		<PageButtonHeader>{title}</PageButtonHeader>
		<PageButtonDescription>
		  {description}
		</PageButtonDescription>
	  </VStack>
	</HStack>
  </Button>
)

const PageButtonHeader = ({children}) => (
  <Text color="muted.400" fontWeight={500} fontSize={16}>
	{children}
  </Text>
)

const PageButtonDescription = ({children}) => (
  <Text w={width * 0.78} color="muted.600" fontWeight={400} fontSize={13}>
	{children}
  </Text>
)

export default PageButton;