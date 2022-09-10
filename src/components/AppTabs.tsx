import {AntDesign, Ionicons} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from "native-base";
import {useContext, useEffect} from "react";
import supabase from "../../utils/Supabase";
import {reducerActions} from "../constants/actions";
import routes from "../constants/routes";
import {generalOptions, screenOptions} from "../constants/tabs";
import {GlobalContext} from "../contexts/GlobalContext";
import Account from "../pages/Account";
import Folders from "../pages/Folders";
import Home from "../pages/Home";
import Search from "../pages/Search";
import {getUserProfile} from "../services/ProfileService";

const Tab = createBottomTabNavigator();

const AppTabs = ({navigation}) => {


  const {state, dispatch} = useContext(GlobalContext);
  const {appLoading: loading, session, profile} = state;

  useEffect(() => {
	getSession().then(data => dispatch({type: reducerActions.SET_SESSION, payload: data}));
	(async () => {
	  const isPinSet = await AsyncStorage.getItem("pin") !== null
	  dispatch({type: reducerActions.CONFIRM_PIN_SET, payload: isPinSet})
	})();
	return
  }, [])

  useEffect(() => {
	if (session !== null && "user" in session) {
	  getUserProfile(session.user.id)
		.then(data => {
		  dispatch({type: reducerActions.SET_PROFILE, payload: data});
		})
		.catch(err => navigation.navigate(routes.SIGN_IN))
		.finally(() => dispatch({type: reducerActions.STOP_APP_LOADING}))
	}
	return
  }, [session, state.profileKey])

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
		component={Home}
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
		component={Search}
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
		name={routes.FOLDERS}
		component={Folders}
		options={{
		  title: "Folders",
		  tabBarIcon: ({focused}) => <Icon
			as={Ionicons}
			name={"md-folder-open-outline"}
			size={6}
			color={getIconColor(focused)}
		  />,
		  ...generalOptions,
		}}
	  />

	  <Tab.Screen
		name={routes.ACCOUNT}
		component={Account}
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