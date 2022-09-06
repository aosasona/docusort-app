import {AntDesign} from "@expo/vector-icons";
import {Box, Flex, Icon, ScrollView, Text, VStack} from "native-base";
import {FC, useState} from "react";
import {RefreshControl, useWindowDimensions} from "react-native";
import Layout from "../../components/Layout";
import PrimaryInput from "../../components/PrimaryInput";
import {BasePageProps} from "../../types/Props";


const Search: FC<BasePageProps> = ({session}) => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  return (
	<ScrollView
	  pt={8}
	  backgroundColor="#000000"
	  showsVerticalScrollIndicator={false}
	>
	  <Layout style={{paddingHorizontal: 15}}>
		<PrimaryInput onChange={setQuery} placeholder="Search..."/>
		{!query && <NoQuery/>}
	  </Layout>
	</ScrollView>
  )
}

const NoQuery = () => {
  const {width, height} = useWindowDimensions();

  return (
	<Flex h={height * 0.6} alignItems="center" justifyContent="center">
	  <VStack space={2} alignItems="center">
		<Icon as={AntDesign} name="search1" color="muted.900" size={width * 0.5}/>
		<Text color="muted.800" fontSize={18} fontWeight={500}>Search for something</Text>
	  </VStack>
	</Flex>
  )
};

export default Search