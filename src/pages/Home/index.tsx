import {AntDesign} from "@expo/vector-icons";
import {Box, Fab, Heading, Icon, ScrollView} from "native-base";
import React, {FC, useEffect} from "react";
import {View, Text} from "react-native";
import Layout from "../../components/Layout";
import UploadModal from "../../modals/UploadModal";
import {BasePageProps} from "../../types/Props";

const Index: FC<BasePageProps> = ({session, profile}) => {

  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);

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

	  <Fab
		renderInPortal={false}
		shadow={2}
		width={20}
		position="absolute"
		bottom={6}
		right={4}
		backgroundColor="primary.500"
		icon={<Icon color="muted.800" as={AntDesign} name="plus" size={5}/>}
		onPress={() => setIsUploadModalOpen(true)}
	  />
	  <UploadModal visible={isUploadModalOpen} toggleVisibility={() => setIsUploadModalOpen(false)}/>
	</Layout>
  );
}

export default Index;