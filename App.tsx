import {NativeBaseProvider, extendTheme} from "native-base";
import {useCallback, useEffect} from "react";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-url-polyfill/auto'
import routes from "./src/constants/routes";
import {
  useFonts,
  Urbanist_100Thin as Thin,
  Urbanist_200ExtraLight as ExtraLight,
  Urbanist_300Light as Light,
  Urbanist_400Regular as Regular,
  Urbanist_500Medium as Medium,
  Urbanist_600SemiBold as SemiBold,
  Urbanist_700Bold as Bold,
  Urbanist_800ExtraBold as ExtraBold,
  Urbanist_900Black as Black,
  Urbanist_100Thin_Italic as Thin_Italic,
  Urbanist_200ExtraLight_Italic as ExtraLight_Italic,
  Urbanist_300Light_Italic as Light_Italic,
  Urbanist_400Regular_Italic as Regular_Italic,
  Urbanist_500Medium_Italic as Medium_Italic,
  Urbanist_600SemiBold_Italic as SemiBold_Italic,
  Urbanist_700Bold_Italic as Bold_Italic,
  Urbanist_800ExtraBold_Italic as ExtraBold_Italic,
  Urbanist_900Black_Italic as Black_Italic,
} from '@expo-google-fonts/urbanist';
import {newColorTheme, newFontConfig, newFonts} from "./src/constants/theme";

import {Home, SignIn, SignUp} from './src/pages';
import Initial from "./src/pages/Initial";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

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
	(async () => {
	  if (fontsLoaded) {
		await SplashScreen.hideAsync();
	  }
	})()
  }, [fontsLoaded])


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
	<NativeBaseProvider theme={theme}>
	  <SafeAreaProvider>
		<NavigationContainer>
		  <Stack.Navigator initialRouteName={routes.INITIAL} screenOptions={{headerShown: false}}>
			<Stack.Screen name={routes.HOME} component={Home}/>
			<Stack.Screen name={routes.SIGN_IN} component={SignIn}/>
			<Stack.Screen name={routes.SIGN_UP} component={SignUp}/>
			<Stack.Screen name={routes.INITIAL} component={Initial}/>
		  </Stack.Navigator>
		</NavigationContainer>
	  </SafeAreaProvider>
	</NativeBaseProvider>
  );
}