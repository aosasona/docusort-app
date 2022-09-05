import {ScrollView, Text} from "native-base";
import {FC} from "react";
import Layout from "../../components/Layout";
import {BasePageProps} from "../../types/Props";

const IDPage: FC<BasePageProps> = ({session}) => {
  return (
	<Layout>
	  <ScrollView>
		<Text>Test</Text>
	  </ScrollView>
	</Layout>
  )
}

export default IDPage