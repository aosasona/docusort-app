import {useEffect, useState} from "react";
import {Platform} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {Icon} from "native-base";
import supabase from "../../utils/Supabase";
import {colors} from "../constants";
import routes from "../constants/routes";
import Account from "../pages/Account";
import IDPage from "../pages/Directories/ID";
import Home from "../pages/Home";
import Search from "../pages/Search";
import {getUserProfile} from "../services/ProfileService";

const Tab = createBottomTabNavigator();

const AppTabs = ({navigation}) => {

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
	getSession().then(data => setSession(data));
  }, [])

  useEffect(() => {
	if (session !== null && "user" in session) {
	  getUserProfile(session.user.id)
		.then(data => {
		  setProfile(data)
		})
		.catch(err => navigation.navigate(routes.SIGN_IN))
		.finally(() => setLoading(false))
	}
	return
  }, [session])

  async function getSession() {
	try {
	  const {data, error} = await supabase.auth.getSession();
	  if (error) {
		navigation.navigate(routes.SIGN_IN);
	  }
	  return data?.session;
	}
	catch (error) {
	  navigation.navigate(routes.SIGN_IN);
	}
  }

  const isAndroid = Platform.OS === "android";

  const generalOptions = {
	headerShown: false,
	headerStyle: {
	  height: isAndroid ? 80 : 100,
	  backgroundColor: colors.BLACK,
	  shadowColor: "transparent",
	},
	tabBarLabelStyle: {
	  display: "none",
	},
	tabBarActiveTintColor: colors.PRIMARY,
	tabBarInactiveTintColor: colors.LIGHT,
  } as any

  const screenOptions = {
	tabBarStyle: {
	  backgroundColor: colors.BLACK,
	  height: isAndroid ? 70 : 100,
	  borderTopWidth: 0,
	},
	tabBarItemStyle: {
	  marginHorizontal: 10,
	},
  };

  const getIconColor = (focused: boolean) => {
	return focused ? "primary.500" : "muted.700"
  }

  if (loading) {
	return
  }

  return (
	<Tab.Navigator initialRouteName={routes.HOME} backBehavior="history" {...{screenOptions}}>
	  <Tab.Screen
		name={routes.HOME}
		children={() => <Home session={session} profile={profile}/>}
		options={{
		  title: "Home",
		  tabBarIcon: ({focused}) => <Icon
			as={AntDesign}
			name={"home"}
			size={6}
			color={getIconColor(focused)}/>,
		  ...generalOptions,
		}}
	  />

	  <Tab.Screen
		name={routes.SEARCH}
		children={() => <Search session={session}/>}
		options={{
		  title: "Search",
		  tabBarIcon: ({focused}) => <Icon
			as={AntDesign}
			name={"search1"}
			size={6}
			color={getIconColor(focused)}
		  />,
		  ...generalOptions,
		}}
	  />

	  <Tab.Screen
		name={routes.ACCOUNT}
		children={() => <Account session={session} profile={profile}/>}
		options={{
		  title: "Account",
		  tabBarIcon: ({focused}) => <Icon
			as={AntDesign}
			name={"user"}
			size={6}
			color={getIconColor(focused)}
		  />,
		  ...generalOptions,
		}}
	  />
	</Tab.Navigator>
  )
}

export default AppTabs