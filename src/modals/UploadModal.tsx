import {useState} from "react";
import {Platform} from "react-native";
import {KeyboardAvoidingView, Heading, VStack, Text, Select, CheckIcon, Box, Divider} from "native-base"
import Modal from "../components/Modal";
import Button from "../components/Button"
import PrimaryInput from "../components/PrimaryInput";
import routes from "../constants/routes";

const UploadModal = ({visible, toggleVisibility}) => {

  const [data, setData] = useState({
	name: "",
	category: "",
  })

  return (
	<Modal visible={visible} toggleVisibility={toggleVisibility}>
	  <VStack space={5} py={5}>
		<Heading color="muted.50" fontSize={18} textAlign={"center"}>
		  Upload <Text color="primary.500">document</Text>
		</Heading>
		<Divider orientation="horizontal" bg="muted.700"/>
		<VStack space={5} py={2}>
		  <PrimaryInput onChange={(e) => setData({...data, name: e})} placeholder="Document name"/>
		  {/* <Select */}
		  {/* selectedValue={data.category} */}
		  {/* width="100%" */}
		  {/* accessibilityLabel="Choose Category" */}
		  {/* placeholder="Choose Category" _selectedItem={{ */}
		  {/* bg: "primary.600", */}
		  {/* color: "muted.800", */}
		  {/* endIcon: <CheckIcon size="5"/>, */}
		  {/* }} */}
		  {/* placeholderTextColor="muted.600" */}
		  {/* backgroundColor="muted.900" */}
		  {/* color={"primary.500"} */}
		  {/* borderWidth={0} */}
		  {/* mt={1} */}
		  {/* py={6} */}
		  {/* rounded={15} */}
		  {/* onValueChange={val => setData({...data, category: val})} */}
		  {/* > */}
		  {/* <Select.Item label="ID (ex. passport, student ID etc)" value="identity"/> */}
		  {/* <Select.Item label="Official (ex. contracts, resume etc)" value="medical"/> */}
		  {/* <Select.Item label="Letters (ex. admission letter)" value="letter"/> */}
		  {/* <Select.Item label="Other types" value="mixed"/> */}
		  {/* </Select> */}
		</VStack>
		<Button onPress={() => console.log("hi")}>
		  <Text color="muted.800" fontSize={15} fontWeight={500}>Save</Text>
		</Button>
	  </VStack>
	</Modal>
  )
}

export default UploadModal