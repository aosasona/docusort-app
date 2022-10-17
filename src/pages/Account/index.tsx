import {AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import Constants from "expo-constants"
import {Box, Button, HStack, Icon, ScrollView, Text, useToast, VStack} from "native-base";
import {FC, useContext, useState} from "react";
import {Dimensions, RefreshControl} from 'react-native';
import AccountCard from "../../components/account/AccountCard";
import AccountSectionFooter from "../../components/account/AccountSectionFooter";
import AppLayout from "../../components/shared/AppLayout";
import PageButton from "../../components/reusables/PageButton";
import {ToastStyles} from "../../constants";
import {reducerActions} from "../../constants/actions";
import {GlobalContext} from "../../contexts/GlobalContext";
import ImageInfoModal from "../../modals/ImageInfoModal";
import PersonalDetailsModal from "../../modals/PersonalDetailsModal";
import SecuritySettingsModal from "../../modals/SecuritySettingsModal";
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
  const [securityVisibility, setSecurityVisibility] = useState(false);


  const onRefresh = () => {
	setRefreshing(true);
	dispatch({type: reducerActions.RELOAD_PROFILE})
	setRefreshing(false);
  }

  const showErrorStatus = (msg: string) => {
	toast.show({
	  description: msg,
	  ...ToastStyles.ERROR,
	})
  }


  return (
	<AppLayout>
	  <ScrollView
		pt={12}
		showsVerticalScrollIndicator={false}
		refreshControl={<RefreshControl
		  refreshing={refreshing}
		  onRefresh={onRefresh}
		/>}
	  >

		<AccountCard onPress={() => setImageInfoVisibility(true)} session={session} profile={profile}/>

		<Box px={5} py={3} my={5}>
		  <Box>
			<VStack space={1}>

			  <PageButton
				title="Personal details"
				description="Edit your personal/profile details"
				onPress={() => setPersonalDetailVisibility(true)}
				icon={{
				  as: AntDesign,
				  name: "edit",
				  color: "rose",
				}}
			  />

			  <PageButton
				title="Usage & analytics"
				description="View your storage usage and analytics"
				onPress={() => setUsageVisibility(true)}
				icon={{
				  as: MaterialCommunityIcons,
				  name: "chart-line",
				  color: "blue",
				}}
			  />

			  <PageButton
				title="Security"
				description="Manage your account & in-app security settings"
				onPress={() => setSecurityVisibility(true)}
				icon={{
				  as: Ionicons,
				  name: "lock-closed",
				  color: "muted",
				}}
			  />

			  <PageButton
				title="Subscription & billing"
				description="Manage your subscription and billing"
				onPress={() => showErrorStatus("Coming soon")}
				icon={{
				  as: MaterialIcons,
				  name: "payment",
				  color: "emerald",
				}}
			  />

			  <PageButton
				title="Help & FAQs"
				description="Need help? View our FAQs or contact us"
				onPress={() => showErrorStatus("Coming soon")}
				icon={{
				  as: Ionicons,
				  name: "help",
				  color: "amber",
				}}
			  />

			</VStack>
		  </Box>


		  <AccountSectionFooter/>
		</Box>

		{/* MODALS */}
		<ImageInfoModal
		  visible={imageInfoVisibility}
		  onClose={() => setImageInfoVisibility(false)}
		/>
		<PersonalDetailsModal
		  visible={personalDetailVisibility}
		  onClose={() => setPersonalDetailVisibility(false)}
		/>
		<UsageModal
		  visible={usageVisibility}
		  onClose={() => setUsageVisibility(false)}
		/>
		<SecuritySettingsModal
		  visible={securityVisibility}
		  onClose={() => setSecurityVisibility(false)}
		/>
	  </ScrollView>
	</AppLayout>
  );
}

export default Account