import {AntDesign} from "@expo/vector-icons";
import Constants from "expo-constants"
import {RefreshControl, StyleSheet} from 'react-native';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Switch,
  Text,
  useToast,
  VStack,
} from "native-base";
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

  const tierColor = {
	0: "gray.400",
	1: "#67C499",
	2: "#AB95FF",
  }

  const tierHex = tierColor[profile?.tier || 0]

  const gravatarStyle = {
	width: 130,
	height: 130,
	borderWidth: 5,
	borderColor: "#DDDDDD",
	borderRadius: 100,
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
	  <Layout key={key}>
		<VStack space={12}>
		  <VStack space={5} alignItems={"center"}>
			<Pressable onPress={() => setImageInfoVisibility(true)}>
			  <Gravatar
				options={{
				  email: session?.user?.email,
				  parameters: {"size": "200", "d": "retro"},
				  secure: true,
				}}

				style={{
				  ...gravatarStyle,
				}}
			  />
			</Pressable>
			<VStack space={2} alignItems="center">
			  <Text fontFamily="body" color="muted.200" fontSize={28} fontWeight={600}>
				{profile.first_name} {profile.last_name}
			  </Text>
			  <Box backgroundColor={tierHex} rounded={20} px={3} py={2} opacity={1}>
				<Text color="muted.900" fontSize={12} fontWeight={500}>
				  {profile.tier === 0 ? "Freemium Plan" : profile.tier === 1 ? "Premium Plan" : "Pro Plan"}
				</Text>
			  </Box>
			</VStack>
		  </VStack>

		  <Box mx={4}>
			<Heading color="muted.700" fontSize={18} px={2}>Settings</Heading>
			<Box px={1}>
			  <Divider bg="muted.800" mt={2}/>
			</Box>

			<VStack space={4} mt={4}>
			  <PageButton>
				<Icon as={AntDesign} name="edit" size={4} color="muted.500"/>
				<Text fontFamily="body" color="muted.500" fontWeight={500} fontSize={15}>Edit profile</Text>
			  </PageButton>

			  <PageButton>
				<Icon as={AntDesign} name="key" size={4} color="muted.500"/>
				<Text fontFamily="body" color="muted.500" fontWeight={500} fontSize={15}>Change password</Text>
			  </PageButton>

			</VStack>
		  </Box>
		</VStack>


		<VStack space={4} mx={4} mt={20}>
		  <Button backgroundColor="red.500" rounded={15} py={6} _pressed={{opacity: 0.75}}
				  onPress={signOut}>
			<Text fontFamily="body" color="red.50" fontWeight={500} fontSize={15}>Sign Out</Text>
		  </Button>

		  <Button backgroundColor="transparent" rounded={15} py={6} _pressed={{opacity: 0.75}}>
			<Text fontFamily="body" color="red.500" fontWeight={500} fontSize={15}>Delete Account</Text>
		  </Button>
		</VStack>
		<Text color="muted.600" fontSize={13} textAlign="center" py={10}>
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

export default Account