import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {Icon, Pressable} from "native-base";

const Back = ({usePrimaryColor = false, ...more}) => {
  const navigation = useNavigation();
  return (
	<Pressable
	  {...more}
	  width={30}
	  height={30}
	  borderRadius={10}
	  justifyContent="center"
	  alignItems="center"
	  borderWidth={2}
	  borderColor={usePrimaryColor ? "primary.100" : "muted.200"}
	  onPress={() => navigation.goBack()}
	  _pressed={{
		opacity: 0.5,
	  }}
	>
	  <Icon as={AntDesign} name="arrowleft" size="sm" color={usePrimaryColor ? "primary.100" : "muted.200"}/>
	</Pressable>
  )
}

export default Back;