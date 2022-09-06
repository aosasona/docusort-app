import {Box} from "native-base";
import React from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import {default as RNModal} from "react-native-modal";

type ModalType = {
  children: React.ReactNode;
  visible: boolean;
  toggleVisibility?: () => any;
};

const {height} = Dimensions.get("window");

const Modal = ({
  visible,
  toggleVisibility,
  children,
}: ModalType) => {
  return (
	<>
	  <RNModal
		hideModalContentWhileAnimating={true}
		avoidKeyboard={true}
		coverScreen={true}
		statusBarTranslucent={true}
		onBackdropPress={toggleVisibility}
		onSwipeComplete={toggleVisibility}
		swipeDirection={["down"]}
		backdropOpacity={0.5}
		useNativeDriverForBackdrop
		isVisible={visible}
		style={{
		  justifyContent: "flex-end",
		  marginBottom: 0,
		  paddingBottom: 0,
		  marginHorizontal: 0,
		  marginVertical: 0,
		}}
	  >
		<Box backgroundColor="muted.900" roundedTop={30} px={5} py={4}>
		  <Box width={10} height={1} backgroundColor="muted.700" rounded="sm" alignSelf="center" mb={1}/>
		  {children}
		</Box>
	  </RNModal>
	</>
  );
};

export default Modal;