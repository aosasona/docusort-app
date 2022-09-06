import {AntDesign} from "@expo/vector-icons";
import {StyleSheet} from 'react-native';
import {Box, Button, HStack, Icon, ScrollView, Text, useToast, VStack} from "native-base";
import {FC} from "react";
import Layout from "../../components/Layout";
import {SignOut} from "../../services/AuthService";
import {BasePageProps} from "../../types/Props";
import {Gravatar} from 'react-native-gravatar';

const Account: FC<BasePageProps> = ({session, profile}) => {
  const toast = useToast();
  return (
	<Layout>
	  <ScrollView pt={12}>
		<VStack space={12}>
		  <VStack space={5} alignItems={"center"}>
			<Gravatar
			  options={{
				email: session?.user?.email,
				parameters: {"size": "200", "d": "mm"},
				secure: true,
			  }}
			  style={styles.profileImage}
			/>
			<VStack space={3} alignItems="center">
			  <Text fontFamily="body" color="muted.200" fontSize={26} fontWeight={600}>
				{profile.first_name} {profile.last_name}
			  </Text>
			  <Box backgroundColor="muted.900" rounded={20} px={6} py={2} opacity={0.75}>
				<Text color="muted.500" fontSize={12} fontWeight={500}>
				  {session?.user?.email}
				</Text>
			  </Box>
			</VStack>
		  </VStack>

		  <VStack space={5} mx={6}>
			<Button backgroundColor="muted.900" rounded={15} py={6} _pressed={{opacity: 0.75}}>
			  <HStack space={5} alignItems="center">
				<Icon as={AntDesign} name="edit" size={4} color="muted.500"/>
				<Text fontFamily="body" color="muted.500" fontWeight={500} fontSize={15}>Edit Profile</Text>
			  </HStack>
			</Button>

			<Button backgroundColor="red.500" rounded={15} py={6} _pressed={{opacity: 0.75}}
					onPress={() => SignOut(toast)}>
			  <Text fontFamily="body" color="red.50" fontWeight={500} fontSize={15}>Sign Out</Text>
			</Button>

			<Button backgroundColor="transparent" rounded={15} py={6} _pressed={{opacity: 0.75}}>
			  <Text fontFamily="body" color="red.500" fontWeight={500} fontSize={15}>Delete Account</Text>
			</Button>
		  </VStack>
		</VStack>
	  </ScrollView>

	</Layout>
  );
}

const styles = StyleSheet.create({
  profileImage: {
	width: 160,
	height: 160,
	borderWidth: 6,
	borderColor: "#DDDDDD",
	borderRadius: 100,
  },
})

export default Account