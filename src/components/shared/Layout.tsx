import React, {FC} from 'react';
import {StatusBar} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {LayoutProps} from "../../types/Props";


const Layout: FC<LayoutProps> = ({children, style = {}, showTabs = false}) => {
  return (
	<SafeAreaView style={{backgroundColor: "#0D0D0D", flex: 1, color: "#ffffff", ...style}}>
	  <StatusBar showHideTransition="slide" barStyle="light-content"/>
	  {children}
	</SafeAreaView>
  )
}

export default Layout;