import supabase from "../../utils/supabase";
import {SignInData, SignUpData} from "../types/Auth";
import {ToastStyles} from "../constants";

export const SignIn = async (data: SignInData, toast) => {
  console.log(data);
}

export const SignUp = async (data: SignUpData, toast) => {
  for (const [key, value] of Object.entries(data)) {
	data[key] = value.trim()
  }
  let {firstName, lastName, email, password, confirmPassword} = data

  if (!(firstName && lastName && email && password && confirmPassword)) {
	throw new Error("Please fill all the fields")
  }

  if (firstName?.length < 3) {
	throw new Error("First name should be at least 3 characters long")
  }

  if (lastName?.length < 3) {
	throw new Error("Last name should be at least 3 characters long")
  }

  if (password !== confirmPassword) {
	throw new Error("Passwords do not match")
  }

  if (password?.length < 6) {
	throw new Error("Password must be at least 6 characters long")
  }

  const {error} = await supabase.auth.signUp({
	email,
	password,
  })
  if (error) {
	throw new Error(error?.message)
  }
  toast.show({
	description: "Check your email for the verification link.",
	...ToastStyles.SUCCESS,
  })
  return
}