import {Heading, Box, ScrollView, Text} from "native-base";
import AppLayout from "../../components/AppLayout";
import Back from "../../components/Back";

const SetPin = ({navigation}) => {

  return (
	<AppLayout>
	  <ScrollView showsVerticalScrollIndicator={false}>
		<Box px={6} py={2}>
		  <Back my={4}/>
		  <Heading color="light.200" fontFamily="heading" fontSize="4xl" fontWeight="500">
			Set Pin
		  </Heading>
		  <Text color="muted.600" fontFamily="body" fontSize={14} mt={1}>
			Enter a 4 digit pin to secure your account
		  </Text>
		</Box>
	  </ScrollView>
	</AppLayout>
  )
}

export default SetPin