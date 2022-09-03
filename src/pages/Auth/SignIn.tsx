import {Button, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from "react-native";
import Layout from "../../components/Layout";
import {colors, defaultStyles} from "../../constants";

const SignIn = () => {
  const styles = useStyle();
  return (
    <Layout style={styles.container}>
      <View>
        <Text style={styles.headerText}>
          Welcome back⚡️
        </Text>
        <Text style={styles.smallText}>
          Fill in your credentials to continue using DocuSort
        </Text>
      </View>
      <View>
        <View style={defaultStyles.button.PRIMARY}>
          <Button title="Continue" color="#000000"/>
        </View>
        <TouchableOpacity>
          <Text style={styles.newAccountText}>
            I don't have an account
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const useStyle = () => {
  const {height, width} = useWindowDimensions()
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      paddingHorizontal: 0.08 * width,
      paddingVertical: 0.05 * height,
    },
    headerText: {
      color: colors.PRIMARY,
      fontSize: 25,
      fontWeight: "600",
    },
    smallText: {
      fontSize: 15,
      color: colors.FADED,
      marginTop: 8,
    },
    newAccountText: {
      color: colors.PRIMARY,
      textAlign: "center",
    },
  })
}

export default SignIn;