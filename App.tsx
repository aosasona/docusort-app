import {
  Urbanist_100Thin as Thin,
  Urbanist_100Thin_Italic as Thin_Italic,
  Urbanist_200ExtraLight as ExtraLight,
  Urbanist_200ExtraLight_Italic as ExtraLight_Italic,
  Urbanist_300Light as Light,
  Urbanist_300Light_Italic as Light_Italic,
  Urbanist_400Regular as Regular,
  Urbanist_400Regular_Italic as Regular_Italic,
  Urbanist_500Medium as Medium,
  Urbanist_500Medium_Italic as Medium_Italic,
  Urbanist_600SemiBold as SemiBold,
  Urbanist_600SemiBold_Italic as SemiBold_Italic,
  Urbanist_700Bold as Bold,
  Urbanist_700Bold_Italic as Bold_Italic,
  Urbanist_800ExtraBold as ExtraBold,
  Urbanist_800ExtraBold_Italic as ExtraBold_Italic,
  Urbanist_900Black as Black,
  Urbanist_900Black_Italic as Black_Italic,
  useFonts,
} from '@expo-google-fonts/urbanist';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import {Box, extendTheme, NativeBaseProvider, Spinner} from "native-base";
import {useEffect, useState} from "react";
import {View} from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto'
import supabase from "./utils/Supabase";
import AppTabs from "./src/components/AppTabs";
import routes from "./src/constants/routes";
import {newColorTheme, newFontConfig, newFonts} from "./src/constants/theme";
import {GlobalProvider} from "./src/contexts/GlobalContext";


import {SignIn, SignUp} from "./src/pages/Auth";
import Initial from "./src/pages/Initial";
import SetPin from "./src/pages/Pin/SetPin";
import {AuthStatus} from "./src/types/Auth";


const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync().then();

export default function App() {
  const [authStatus, setAuthStatus] = useState(AuthStatus.UNCHECKED)
  const [routerIsReady, setRouterIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
	Thin,
	ExtraLight,
	Light,
	Regular,
	Medium,
	SemiBold,
	Bold,
	ExtraBold,
	Black,
	Thin_Italic,
	ExtraLight_Italic,
	Light_Italic,
	Regular_Italic,
	Medium_Italic,
	SemiBold_Italic,
	Bold_Italic,
	ExtraBold_Italic,
	Black_Italic,
  })

  useEffect(() => {
	const {data: authListener} = supabase.auth.onAuthStateChange(async (event, session) => {
	  if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
		return setAuthStatus(AuthStatus.SIGNED_IN);
	  }
	  if (event === "SIGNED_OUT" || event === "USER_DELETED") {
		return setAuthStatus(AuthStatus.SIGNED_OUT);
	  }
	})
	return () => {
	  if (authListener) authListener.subscription.unsubscribe;
	}
  }, [supabase.auth])

  useEffect(() => {
	(async () => {
	  const {data, error} = await supabase.auth.getSession();
	  if (error) {
		return setAuthStatus(AuthStatus.SIGNED_OUT)
	  } else if (!error && !data.session) {
		return setAuthStatus(AuthStatus.SIGNED_OUT)
	  } else {
		return setAuthStatus(AuthStatus.SIGNED_IN);
	  }
	})()
  }, [])

  useEffect(() => {
	(async () => {
	  if (fontsLoaded && authStatus !== AuthStatus.UNCHECKED && routerIsReady) {
		await SplashScreen.hideAsync();
	  }
	})()
  }, [fontsLoaded, authStatus, routerIsReady])


  if (!fontsLoaded) {
	return null;
  }


  const theme = extendTheme(
	{
	  colors: newColorTheme,
	  fontConfig: newFontConfig,
	  fonts: newFonts,
	},
  );

  return (
	<GlobalProvider>
	  <NativeBaseProvider theme={theme}>
		<SafeAreaProvider>
		  <NavigationContainer
			onReady={() => setRouterIsReady(true)}
			theme={{colors: {background: "#000000"} as any} as any}
		  >
			<Stack.Navigator
			  initialRouteName={authStatus === AuthStatus.SIGNED_IN ? routes.APP : routes.INITIAL}
			  screenOptions={{headerShown: false}}
			>
			  {
				authStatus === AuthStatus.SIGNED_IN
				  ?
				  <>
					<Stack.Screen
					  name={routes.APP}
					  component={AppTabs}
					/>
					<Stack.Screen
					  name={routes.SET_PIN}
					  component={SetPin}
					/>
				  </>
				  : (
					<>
					  <Stack.Screen
						name={routes.SIGN_IN}
						component={SignIn}
					  />
					  <Stack.Screen
						name={routes.SIGN_UP}
						component={SignUp}
					  />
					  <Stack.Screen
						name={routes.INITIAL}
						component={Initial}
					  />
					</>
				  )
			  }

			</Stack.Navigator>
		  </NavigationContainer>
		</SafeAreaProvider>
	  </NativeBaseProvider>
	</GlobalProvider>
  );
}