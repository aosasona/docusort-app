import {useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {Button, Layout} from "../../components"
import PrimaryInput from "../../components/PrimaryInput";
import useAuthStyle from "../../hooks/useAuthStyle";
import {SignIn as SignInService} from "../../services"
import {SignInData} from "../../types/Auth";

const SignIn = ({navigation}) => {
  const styles = useAuthStyle();
  const [data, setData] = useState<SignInData>({
    email: "",
    password: "",
  })
  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.ScrollContainer}>
        <Text style={styles.headerText}>
          Welcome back
        </Text>
        <Text style={styles.smallText}>
          Fill in your credentials to continue⚡
        </Text>

        <View style={styles.formContainer}>
          <PrimaryInput onChange={(e) => setData({...data, email: e})} placeholder="E-Mail Address" maxLength={35}/>
          <View style={{marginTop: 20}}>
            <PrimaryInput onChange={(e) => setData({...data, password: e})} placeholder="Password" maxLength={20}/>
          </View>
        </View>
      </ScrollView>
      <View>
        <Button onPress={() => SignInService(data)} disabled={(!(data.email && data.password))}>
          Continue
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.newAccountText}>
            I don't have an account
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default SignIn;