import AsyncStorage from "@react-native-async-storage/async-storage";
import hash from "native-base/lib/typescript/utils/useResponsiveQuery/hash";
import {SetKeychainData} from "../src/types/Keychain";
import {default as bcrypt} from "react-native-bcrypt";

export default class KeychainUtil {
  static async setPin({pin}: SetKeychainData) {
	try {
	  const salt = bcrypt.genSaltSync(12, 8);
	  const hashedPin = bcrypt.hashSync(pin, salt);
	  await AsyncStorage.setItem("pin", hashedPin);
	}
	catch (e: unknown) {
	  throw e
	}
  }

  static async checkPinIsSet() {
	try {
	  const credentials = await AsyncStorage.getItem("pin");
	  return !!credentials;
	}
	catch (e: unknown) {
	  throw e
	}
  }
}