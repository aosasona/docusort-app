import {Box, ScrollView} from "native-base";
import React from "react";
import {Dimensions} from "react-native";
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
		backdropOpacity={0.9}
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
		<Box backgroundColor="muted.900" roundedTop={40} px={5} py={3} maxHeight={height * 0.85}>
		  <Box width={12} height={1.5} backgroundColor="muted.700" rounded="md" alignSelf="center" mb={1}/>
		  <ScrollView showsVerticalScrollIndicator={false} maxHeight={height * 0.9}>
			{children}
		  </ScrollView>
		</Box>
	  </RNModal>
	</>
  );
};

export default Modal;