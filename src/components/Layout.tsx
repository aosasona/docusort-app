import React, {FC} from 'react';
import {StatusBar} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {LayoutProps} from "../types/Props";



const Layout: FC<LayoutProps> = ({ children, style = {} }) => {
  return (
    <SafeAreaView style={{ backgroundColor:"#000000", flex: 1, color: "#ffffff",  ...style }}>
      <StatusBar barStyle="light-content" />
        {children}
    </SafeAreaView>
  )
}

export default Layout;