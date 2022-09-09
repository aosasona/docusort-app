import {Platform} from "react-native";
import {colors} from "./index";

const isAndroid = Platform.OS === "android";

export const generalOptions = {
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

export const screenOptions = {
  tabBarStyle: {
	backgroundColor: colors.BLACK,
	height: isAndroid ? 70 : 100,
	borderTopWidth: 0,
  },
  tabBarItemStyle: {
	marginHorizontal: 10,
  },
};