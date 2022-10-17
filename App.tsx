import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import {extendTheme, NativeBaseProvider} from "native-base";
import {useEffect, useState} from "react";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto'
import supabase from "./utils/Supabase";
import AppTabs from "./src/components/shared/AppTabs";
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
	Inter_100Thin,
	Inter_200ExtraLight,
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
	Inter_900Black,
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
			theme={{colors: {background: "#111111"} as any} as any}
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