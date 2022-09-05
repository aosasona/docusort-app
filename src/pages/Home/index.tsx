import {Box, Heading, ScrollView} from "native-base";
import React, {FC, useEffect} from "react";
import {View, Text} from "react-native";
import Layout from "../../components/Layout";
import {BasePageProps} from "../../types/Props";

const Index: FC<BasePageProps> = ({session, profile}) => {

  return (
	<Layout showTabs={true}>
	  <ScrollView>
		<Heading
		  color={"primary.500"}
		  fontSize={30}
		  fontWeight={500}
		  px={8}
		  py={6}
		>
		  Hello, {profile.first_name}
		</Heading>
	  </ScrollView>
	</Layout>
  );
}

export default Index;