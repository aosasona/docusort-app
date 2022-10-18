import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import {Trim} from "../../utils/Formatter";
import KeychainUtil from "../../utils/Keychain";
import supabase from "../../utils/Supabase";
import {validate} from "../../utils/Validate";
import {ToastStyles} from "../constants";
import {reducerActions} from "../constants/actions";
import AppError from "../errors/AppError";
import ValidationError from "../errors/ValidationError";
import {signinSchema, signupSchema} from "../schemas/AuthSchema";
import {SetPinData, SignInData, SignUpData, UnlockAppData} from "../types/Auth";

export const SignIn = async (data: SignInData, toast) => {
  data = Trim.all(data)

  let {email, password} = data

  const validationErrors = validate(data, signinSchema)

  if (validationErrors) {
	throw new ValidationError(validationErrors)
  }

  const {error, data: userData} = await supabase.auth.signInWithPassword({
	email,
	password,
  })

  if (error) {
	throw new ValidationError(error?.message)
  }

  toast.show({
	description: "Welcome Back!",
	...ToastStyles.SUCCESS,
  })
  return
}

export const SignUp = async (data: SignUpData, toast) => {
  data = Trim.all(data)

  let {firstName, lastName, email, password, confirmPassword} = data

  const validationErrors = validate(data, signupSchema)

  if (validationErrors) {
	throw new ValidationError(validationErrors)
  }

  const {error, data: userData} = await supabase.auth.signUp({
	email,
	password,
  })

  if (error) {
	throw new ValidationError(error?.message)
  }
  const id = userData?.user?.id

  const {data: saveData, error: saveError} = await supabase.from("profile").insert([{
	id,
	first_name: firstName,
	last_name: lastName,
  }])

  if (saveError) {
	throw new Error(saveError?.message)
  }

  toast.show({
	description: "Welcome Aboard!",
	...ToastStyles.SUCCESS,
  })
  return
}

export const SignOut = async (toast: any) => {
  await AsyncStorage.clear()

  const {error} = await supabase.auth.signOut()

  if (error) {
	toast.show({
	  description: "Something went wrong",
	  ...ToastStyles.ERROR,
	})
	return
  }

  toast.show({
	description: "Signed Out Successfully",
	...ToastStyles.SUCCESS,
  })
  return
}

export const setDevicePin = async ({pin, confirmPin}: SetPinData) => {
  try {
	if (pin === undefined || pin == 0) throw new AppError("Pin cannot be 0000")

	if (!pin || !confirmPin) throw new ValidationError("pin is required")

	if (pin !== confirmPin) throw new ValidationError("Pins do not match")

	await KeychainUtil.setPin({
	  pin: String(pin),
	})
	return true;
  }
  catch (e: unknown) {
	throw e
  }
}

export const unlockApp = async ({pin, dispatch}: UnlockAppData) => {
  try {
	if (pin === undefined || Number(pin) == 0) throw new AppError("Pin cannot be 0000")

	if (!pin) throw new ValidationError("pin is required")

	const isPinSet = await KeychainUtil.checkPinIsSet()

	if (!isPinSet) throw new AppError("Pin is not set!")

	const isPinCorrect = await KeychainUtil.comparePin(pin)

	if (!isPinCorrect) throw new ValidationError("Incorrect Pin")

	dispatch({
	  type: reducerActions.UNLOCK_APP,
	})

	return;
  }
  catch (e: unknown) {
	throw e
  }
}

export const checkBiometricsAvailability = async () => {
  try {
	return await LocalAuthentication.hasHardwareAsync()
  }
  catch (e) {
	throw e
  }
}