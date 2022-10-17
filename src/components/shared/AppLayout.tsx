import React, {FC} from 'react';
import {StatusBar} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {LayoutProps} from "../../types/Props";


const AppLayout: FC<LayoutProps> = ({children, style = {}, showTabs = false}) => {
  return (
	<SafeAreaView edges={['right', 'left', 'top']}
				  style={{backgroundColor: "#0D0D0D", flex: 1, color: "#ffffff", ...style}}>
	  <StatusBar showHideTransition="slide" barStyle="light-content"/>
	  {children}
	</SafeAreaView>
  )
}

export default AppLayout;