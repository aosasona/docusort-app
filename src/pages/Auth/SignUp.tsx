import {useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {Button, Layout} from "../../components"
import PrimaryInput from "../../components/PrimaryInput";
import useAuthStyle from "../../hooks/useAuthStyle";
import {SignUp as SignUpService} from "../../services"
import {SignUpData} from "../../types/Auth";

const SignUp = ({navigation}) => {
  const styles = useAuthStyle();
  const [data, setData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.ScrollContainer}>
        <Text style={styles.headerText}>
          Hello there!
        </Text>
        <Text style={styles.smallText}>
          Let's get you signed up and ready to save, share and sort your documents
        </Text>

        <View style={styles.formContainer}>
          <View style={{flexDirection: "row", width: "100%"}}>
            <View style={{width: "50%", paddingRight: 5}}>
              <PrimaryInput onChange={(e) => setData({...data, firstName: e})} placeholder="First Name" maxLength={25}/>
            </View>
            <View style={{width: "50%", paddingLeft: 5}}>
              <PrimaryInput onChange={(e) => setData({...data, lastName: e})} placeholder="Last Name" maxLength={25}/>
            </View>
          </View>
          <View style={{marginVertical: 20}}>
            <PrimaryInput onChange={(e) => setData({...data, email: e})} placeholder="E-Mail Address" maxLength={35}/>
          </View>
          <View style={{flexDirection: "row", width: "100%"}}>
            <View style={{width: "50%", paddingRight: 5}}>
              <PrimaryInput onChange={(e) => setData({...data, password: e})} placeholder="Password" maxLength={20}/>
            </View>
            <View style={{width: "50%", paddingRight: 5}}>
              <PrimaryInput onChange={(e) => setData({...data, confirmPassword: e})} placeholder="Confirm Password"
                            maxLength={20}/>
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <Button onPress={() => SignUpService(data)}
                disabled={(!(data.email && data.password && data.firstName && data.lastName && data.confirmPassword))}>
          Continue
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.newAccountText}>
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default SignUp;