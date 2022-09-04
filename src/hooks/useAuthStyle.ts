import {StyleSheet, useWindowDimensions} from "react-native";
import {colors} from "../constants";

const useAuthStyle = () => {
  const {height, width} = useWindowDimensions()
  return StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: "space-between",
	  paddingTop: 0.04 * height,
	  paddingBottom: 0,
	  paddingHorizontal: 0.04 * width,
	},
	headerText: {
	  color: colors.PRIMARY,
	  fontSize: 25,
	  fontWeight: "700",
	},
	smallText: {
	  fontSize: 15,
	  color: colors.FADED,
	  marginTop: 5,
	  paddingBottom: 15,
	},
	newAccountText: {
	  color: colors.PRIMARY,
	  textAlign: "center",
	  fontSize: 14,
	  fontWeight: "500",
	  paddingVertical: 20,
	},
	ScrollContainer: {
	  height: 0.7 * height,
	  maxHeight: 0.75 * height,
	},
	formContainer: {
	  marginTop: 0.04 * height,
	},
  })
}
export default useAuthStyle;