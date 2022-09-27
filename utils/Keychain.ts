import AsyncStorage from "@react-native-async-storage/async-storage";
import isaac from "isaac";
import {default as bcrypt} from "react-native-bcrypt";
import AppError from "../src/errors/AppError";
import {SetKeychainData} from "../src/types/Keychain";

export default class KeychainUtil {
  static async setPin({pin}: SetKeychainData) {
	try {
	  bcrypt.setRandomFallback((len) => {
		const buf = new Uint8Array(len);
		return buf.map(() => Math.floor(isaac.random() * 128)) as any;
	  });
	  const salt = bcrypt.genSaltSync(10, 8);
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

  static async comparePin(pin: string) {
	try {
	  if (!await this.checkPinIsSet()) {
		throw new AppError("Pin is not set!")
	  }
	  const savedPin = await AsyncStorage.getItem("pin");
	  return bcrypt.compareSync(pin, savedPin);
	}
	catch (e: unknown) {
	  throw e
	}
  }

}