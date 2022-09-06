import {AntDesign} from "@expo/vector-icons";
import Constants from "expo-constants"
import {RefreshControl, StyleSheet} from 'react-native';
import {Box, Button, HStack, Icon, Pressable, ScrollView, Text, useToast, VStack} from "native-base";
import {FC, useState} from "react";
import Layout from "../../components/Layout";
import ImageInfoModal from "../../modals/ImageInfoModal";
import {SignOut} from "../../services/AuthService";
import {BasePageProps} from "../../types/Props";
import {Gravatar} from 'react-native-gravatar';

const Account: FC<BasePageProps> = ({session, profile}) => {
  const toast = useToast();
  const [imageInfoVisibility, setImageInfoVisibility] = useState(false);
  const [key, setKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
	setRefreshing(true);
	setKey(key + 1);
	setRefreshing(false);
  }

  const signOut = async () => {
	await SignOut(toast);
  }

  return (
	<ScrollView
	  pt={12}
	  backgroundColor="#000000"
	  showsVerticalScrollIndicator={false}
	  refreshControl={<RefreshControl
		refreshing={refreshing}
		onRefresh={onRefresh}
	  />}
	>
	  <Layout>
		<VStack space={12}>
		  <VStack space={5} alignItems={"center"}>
			<Pressable onPress={() => setImageInfoVisibility(true)}>
			  <Gravatar
				options={{
				  email: session?.user?.email,
				  parameters: {"size": "200", "d": "mm"},
				  secure: true,
				}}
				key={key}
				style={styles.profileImage}
			  />
			</Pressable>
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

		  <VStack space={4} mx={4}>
			<PageButton>
			  <Icon as={AntDesign} name="edit" size={4} color="muted.500"/>
			  <Text fontFamily="body" color="muted.500" fontWeight={500} fontSize={15}>Edit profile</Text>
			</PageButton>

			<PageButton>
			  <Icon as={AntDesign} name="key" size={4} color="muted.500"/>
			  <Text fontFamily="body" color="muted.500" fontWeight={500} fontSize={15}>Change password</Text>
			</PageButton>

			<Button backgroundColor="red.500" rounded={15} py={6} _pressed={{opacity: 0.75}}
					onPress={signOut}>
			  <Text fontFamily="body" color="red.50" fontWeight={500} fontSize={15}>Sign Out</Text>
			</Button>

			<Button backgroundColor="transparent" rounded={15} py={6} _pressed={{opacity: 0.75}}>
			  <Text fontFamily="body" color="red.500" fontWeight={500} fontSize={15}>Delete Account</Text>
			</Button>
		  </VStack>
		</VStack>
		<Text color="muted.600" fontSize={13} textAlign="center" py={16}>
		  Version {Constants.manifest.version}
		</Text>
	  </Layout>
	  <ImageInfoModal visible={imageInfoVisibility} onClose={() => setImageInfoVisibility(false)}/>
	</ScrollView>
  );
}

const PageButton = ({children, ...props}) => (
  <Button
	backgroundColor="muted.900"
	justifyContent="flex-start" rounded={15} py={6}
	_pressed={{opacity: 0.75}}
	{...props}
  >
	<HStack space={4} alignItems="center" justifyContent="space-between" px={4}>
	  {children}
	</HStack>
  </Button>
)

const styles = StyleSheet.create({
  profileImage: {
	width: 130,
	height: 130,
	borderWidth: 4,
	borderColor: "#DDDDDD",
	borderRadius: 100,
  },
})

export default Account