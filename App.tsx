import {NativeBaseProvider, extendTheme} from "native-base";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, SignIn, SignUp} from './src/pages';

const Stack = createNativeStackNavigator();

const newColorTheme = {
  dark: "#121212",
  primary: {
    900: "#D5B25822",
    800: "#D5B25866",
    700: "#D5B25899",
    600: "#D5B258BB",
    500: "#D5B258",
    400: "#ECC661",
    300: "#E6C05E",
    200: "#EFC862",
    100: "#FFD569",
  },
};
const theme = extendTheme({colors: newColorTheme});

export default function App() {
  return (

    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="Home" component={Home}/>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}