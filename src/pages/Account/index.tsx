import {AntDesign, Ionicons} from "@expo/vector-icons";
import Constants from "expo-constants"
import {Box, Button, Heading, HStack, Icon, Pressable, ScrollView, Text, useToast, VStack} from "native-base";
import {FC, useContext, useState} from "react";
import {RefreshControl} from 'react-native';
import {Gravatar} from 'react-native-gravatar';
import AppLayout from "../../components/AppLayout";
import {reducerActions} from "../../constants/actions";
import {GlobalContext} from "../../contexts/GlobalContext";
import ImageInfoModal from "../../modals/ImageInfoModal";
import PersonalDetailsModal from "../../modals/PersonalDetailsModal";
import {SignOut} from "../../services/AuthService";
import {BasePageProps} from "../../types/Props";

const Account: FC<BasePageProps> = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useContext(GlobalContext);
  const {profile, session} = state;
  const [imageInfoVisibility, setImageInfoVisibility] = useState(false);
  const [personalDetailVisibility, setPersonalDetailVisibility] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
	setRefreshing(true);
	dispatch({type: reducerActions.RELOAD_PROFILE})
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
	borderRadius: "100%",
  }


  return (
	<AppLayout>
	  <ScrollView
		pt={12}
		backgroundColor="#000000"
		showsVerticalScrollIndicator={false}
		refreshControl={<RefreshControl
		  refreshing={refreshing}
		  onRefresh={onRefresh}
		/>}
	  >
		<VStack space={10}>
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
			<VStack space={3} alignItems="center">
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
		</VStack>
		<Box bg="muted.900" rounded={40} px={5} py={5} mt={16}>
		  <Box>
			<VStack space={1}>

			  <PageButton onPress={() => setPersonalDetailVisibility(true)}>
				<Icon as={AntDesign} name="edit" size={5} color="muted.400"/>
				<VStack>
				  <PageButtonHeader>Personal details</PageButtonHeader>
				  <PageButtonDescription>
					Edit your personal/profile details
				  </PageButtonDescription>
				</VStack>
			  </PageButton>

			  <PageButton>
				<Icon as={AntDesign} name="key" size={5} color="muted.400"/>
				<VStack>
				  <PageButtonHeader>Change password</PageButtonHeader>
				  <PageButtonDescription>
					Protect your account by changing your password
				  </PageButtonDescription>
				</VStack>
			  </PageButton>

			  <PageButton>
				<Icon as={Ionicons} name="keypad" size={5} color="muted.400"/>
				<VStack>
				  <PageButtonHeader>Change pin</PageButtonHeader>
				  <PageButtonDescription>
					Keep your files safe by setting a new pin
				  </PageButtonDescription>
				</VStack>
			  </PageButton>

			  <PageButton>
				<Icon as={Ionicons} name="ios-finger-print" size={5} color="muted.400"/>
				<VStack>
				  <PageButtonHeader>Biometrics settings</PageButtonHeader>
				  <PageButtonDescription>
					Manage your biometrics authentication settings on this device
				  </PageButtonDescription>
				</VStack>
			  </PageButton>

			  <PageButton>
				<Icon as={Ionicons} name="help" size={5} color="muted.400"/>
				<VStack>
				  <PageButtonHeader>Help & FAQs</PageButtonHeader>
				  <PageButtonDescription>
					Get help or read our Frequently Asked Questions
				  </PageButtonDescription>
				</VStack>
			  </PageButton>

			</VStack>
		  </Box>


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
		</Box>
		<ImageInfoModal visible={imageInfoVisibility} onClose={() => setImageInfoVisibility(false)}/>
		<PersonalDetailsModal visible={personalDetailVisibility} onClose={() => setPersonalDetailVisibility(false)}/>
	  </ScrollView>
	</AppLayout>
  );
}

const PageButton = ({children, ...props}) => (
  <Button
	backgroundColor="transparent"
	justifyContent="flex-start"
	rounded={15}
	py={5}
	_pressed={{opacity: 0.7}}
	{...props}
  >
	<HStack space={4} alignItems="center" justifyContent="space-between">
	  {children}
	</HStack>
  </Button>
)

const PageButtonHeader = ({children}) => (
  <Text color="muted.400" fontWeight={500} fontSize={16}>
	{children}
  </Text>
)

const PageButtonDescription = ({children}) => (
  <Text color="muted.600" fontWeight={400} fontSize={13}>
	{children}
  </Text>
)

export default Account