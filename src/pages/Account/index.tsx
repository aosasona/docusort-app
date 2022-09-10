import {AntDesign, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Constants from "expo-constants"
import {Box, Button, HStack, Icon, ScrollView, Text, useToast, VStack} from "native-base";
import {FC, useContext, useState} from "react";
import {Dimensions, RefreshControl} from 'react-native';
import AccountCard from "../../components/AccountCard";
import AppLayout from "../../components/AppLayout";
import {reducerActions} from "../../constants/actions";
import {GlobalContext} from "../../contexts/GlobalContext";
import ImageInfoModal from "../../modals/ImageInfoModal";
import PersonalDetailsModal from "../../modals/PersonalDetailsModal";
import UsageModal from "../../modals/UsageModal";
import {SignOut} from "../../services/AuthService";
import {BasePageProps} from "../../types/Props";

const {width} = Dimensions.get('window');

const Account: FC<BasePageProps> = ({navigation}) => {
  const toast = useToast();
  const {state, dispatch} = useContext(GlobalContext);
  const {profile, session} = state;
  const [refreshing, setRefreshing] = useState(false);
  const [imageInfoVisibility, setImageInfoVisibility] = useState(false);
  const [personalDetailVisibility, setPersonalDetailVisibility] = useState(false);
  const [usageVisibility, setUsageVisibility] = useState(false);


  const onRefresh = () => {
	setRefreshing(true);
	dispatch({type: reducerActions.RELOAD_PROFILE})
	setRefreshing(false);
  }

  const signOut = async () => {
	await SignOut(toast);
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

		<AccountCard onPress={() => setImageInfoVisibility(true)} session={session} profile={profile}/>

		<Box px={5} py={3} mt={6}>
		  <Box>
			<VStack space={1}>

			  <PageButton
				title="Personal details"
				description="Edit your personal/profile details"
				onPress={() => setPersonalDetailVisibility(true)}
				icon={{
				  as: AntDesign,
				  name: "edit",
				}}
			  />

			  <PageButton
				title="Usage & analytics"
				description="View your storage usage and analytics"
				onPress={() => setUsageVisibility(true)}
				icon={{
				  as: MaterialCommunityIcons,
				  name: "chart-line",
				}}
			  />

			  <PageButton
				title="Change password"
				description="Protect your account by changing your password"
				icon={{
				  as: AntDesign,
				  name: "key",
				}}
			  />

			  <PageButton
				title="Change pin"
				description="Keep your files safe by setting a new pin"
				icon={{
				  as: Ionicons,
				  name: "keypad",
				}}
			  />

			  <PageButton
				title="Biometrics settings"
				description="Manage your biometrics authentication settings on this device"
				icon={{
				  as: Ionicons,
				  name: "ios-finger-print",
				}}
			  />

			  <PageButton
				title="Help & FAQs"
				description="Get help or read our Frequently Asked Questions"
				icon={{
				  as: Ionicons,
				  name: "help",
				}}
			  />

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

		{/* MODALS */}
		<ImageInfoModal visible={imageInfoVisibility} onClose={() => setImageInfoVisibility(false)}/>
		<PersonalDetailsModal visible={personalDetailVisibility} onClose={() => setPersonalDetailVisibility(false)}/>
		<UsageModal visible={usageVisibility} onClose={() => setUsageVisibility(false)}/>
	  </ScrollView>
	</AppLayout>
  );
}

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

export default Account