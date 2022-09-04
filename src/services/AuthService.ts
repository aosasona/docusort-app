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

  if (validationErrors) {
	throw new ValidationError(validationErrors)
  }
}

export const SignUp = async (data: SignUpData, toast) => {
  data = Trim.all(data)

  let {firstName, lastName, email, password, confirmPassword} = data

  const validationErrors = validate(data, signupSchema)

  if (validationErrors) {
	throw new ValidationError(validationErrors[0])
  }

  const {error} = await supabase.auth.signUp({
	email,
	password,
  })
  if (error) {
	throw new ValidationError(error?.message)
  }

  const {data: saveData, error: saveError} = await supabase.from("users").insert([{
	first_name: firstName,
	last_name: lastName,
	email,
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