import AsyncStorage from "@react-native-async-storage/async-storage";
import {Trim} from "../../utils/Formatter";
import KeychainUtil from "../../utils/Keychain";
import supabase from "../../utils/Supabase";
import {validate} from "../../utils/Validate";
import {ToastStyles} from "../constants";
import ValidationError from "../errors/ValidationError";
import {signinSchema, signupSchema} from "../schemas/AuthSchema";
import {SetPinData, SignInData, SignUpData} from "../types/Auth";

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

export const setDevicePin = async ({userId, pin, confirmPin}: SetPinData) => {
  try {
	if (!pin || !confirmPin) throw new ValidationError("Pin is required")

	if (pin !== confirmPin) throw new ValidationError("Pins do not match")

	await KeychainUtil.setPin({
	  userId,
	  pin: String(pin),
	})
	return true;
  }
  catch (e: unknown) {
	throw e
  }
}