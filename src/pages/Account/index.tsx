import {AntDesign, Ionicons} from "@expo/vector-icons";
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
import {FC, useContext, useState} from "react";
import AppLayout from "../../components/AppLayout";
import Layout from "../../components/Layout";
import {reducerActions} from "../../constants/actions";
import routes from "../../constants/routes";
import {GlobalContext} from "../../contexts/GlobalContext";
import ImageInfoModal from "../../modals/ImageInfoModal";
import PersonalDetailsModal from "../../modals/PersonalDetailsModal";
import {SignOut} from "../../services/AuthService";
import {getUserProfile} from "../../services/ProfileService";
import {BasePageProps} from "../../types/Props";
import {Gravatar} from 'react-native-gravatar';

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
		<Box bg="muted.900" rounded={40} px={5} pt={8} pb={5} mt={16}>
		  <Box>
			<Heading color="muted.600" fontSize={16} fontWeight={600} px={2} py={1}>SETTINGS</Heading>

			<VStack space={1} mt={2}>
			  <PageButton onPress={() => setPersonalDetailVisibility(true)}>
				<Icon as={AntDesign} name="edit" size={5} color="muted.400"/>
				<Text color="muted.500" fontWeight={500} fontSize={16}>Personal details</Text>
			  </PageButton>

			  <PageButton>
				<Icon as={AntDesign} name="key" size={5} color="muted.400"/>
				<Text color="muted.500" fontWeight={500} fontSize={15}>Change password</Text>
			  </PageButton>

			  <PageButton>
				<Icon as={Ionicons} name="keypad" size={5} color="muted.400"/>
				<Text color="muted.500" fontWeight={500} fontSize={15}>Change pin</Text>
			  </PageButton>

			  <PageButton>
				<Icon as={Ionicons} name="ios-finger-print" size={5} color="muted.400"/>
				<Text color="muted.500" fontWeight={500} fontSize={15}>Biometrics settings</Text>
			  </PageButton>

			  <PageButton>
				<Icon as={Ionicons} name="help" size={5} color="muted.400"/>
				<Text color="muted.500" fontWeight={500} fontSize={15}>Help & FAQs</Text>
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
	py={6}
	_pressed={{opacity: 0.7}}
	{...props}
  >
	<HStack space={4} alignItems="center" justifyContent="space-between">
	  {children}
	</HStack>
  </Button>
)

export default Account