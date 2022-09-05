import {StyleSheet} from 'react-native';
import {Box, ScrollView} from "native-base";
import {FC} from "react";
import Layout from "../../components/Layout";
import {colors} from "../../constants";
import {BasePageProps} from "../../types/Props";
import {Gravatar} from 'react-native-gravatar';

const Account: FC<BasePageProps> = ({session}) => {

  return (
	<Layout>
	  <ScrollView mt={20}>
		<Box alignItems={"center"}>
		  <Gravatar
			options={{
			  email: session?.user?.email,
			  parameters: {"size": "200", "d": "mm"},
			  secure: true,
			}}
			style={styles.profileImage}
		  />
		</Box>
	  </ScrollView>

	</Layout>
  )
}

const styles = StyleSheet.create({
  profileImage: {
	width: 150,
	height: 150,
	borderWidth: 6,
	borderColor: "#DDDDDD",
	borderRadius: 40,
  },
})

export default Account