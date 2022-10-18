import {AntDesign} from "@expo/vector-icons";
import {Flex, Icon, ScrollView, Text, VStack} from "native-base";
import {FC, useState} from "react";
import {useWindowDimensions} from "react-native";
import AppLayout from "../../components/shared/AppLayout";
import PrimaryInput from "../../components/reusables/PrimaryInput";
import {BasePageProps} from "../../types/Props";


const Search: FC<BasePageProps> = ({session}) => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  return (
	<AppLayout style={{paddingHorizontal: 15}}>
	  <ScrollView
		pt={8}
		showsVerticalScrollIndicator={false}
	  >
		<PrimaryInput onChange={setQuery} placeholder="Search..."/>
		{!query && <NoQuery/>}
	  </ScrollView>
	</AppLayout>
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