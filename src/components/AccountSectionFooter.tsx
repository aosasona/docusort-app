import Constants from "expo-constants";
import {Button, Text, useToast, View, VStack} from "native-base";
import {SignOut} from "../services/AuthService";

export default function AccountSectionFooter() {

  const toast = useToast();

  const signOut = async () => {
	await SignOut(toast);
  }

  return (
	<View>
	  <VStack space={4} mx={2} mt={6}>
		<Button backgroundColor="red.500" rounded={15} py={6} _pressed={{opacity: 0.75}}
				onPress={signOut}>
		  <Text fontFamily="body" color="red.50" fontWeight={500} fontSize={15}>Sign Out</Text>
		</Button>

		<Button backgroundColor="transparent" rounded={15} py={6} _pressed={{opacity: 0.75}}>
		  <Text fontFamily="body" color="red.500" fontWeight={500} fontSize={15}>Delete Account</Text>
		</Button>
	  </VStack>
	  <Text color="muted.600" fontSize={13} textAlign="center" pt={10} pb={20}>
		Version {Constants.manifest.version}
	  </Text>
	</View>
  )
}