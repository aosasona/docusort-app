import AsyncStorage from "@react-native-async-storage/async-storage";
import {Trim} from "../../utils/Formatter";
import supabase from "../../utils/Supabase";
import {validate} from "../../utils/Validate";
import ValidationError from "../errors/ValidationError";
import {signinSchema, signupSchema} from "../schemas/AuthSchema";
import {SignInData, SignUpData} from "../types/Auth";
import {ToastStyles} from "../constants";

export const SignIn = async (data: SignInData, toast) => {
  data = Trim.all(data)

  let {email, password} = data

  const validationErrors = validate(data, signinSchema)
  console.log(validationErrors)

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

export const SignOut = async (toast) => {
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