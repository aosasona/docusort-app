import supabase from "../../utils/Supabase";
import ValidationError from "../errors/ValidationError";

export const getUserProfile = async (userId: string) => {
  const {data, error} = await supabase
	.from('profile')
	.select('*')
	.eq('id', userId)
	.single()
  if (error) {
	throw error
  }
  return data
}

export const updateUserProfile = async (userId: string, profile: { first_name: string, last_name: string }) => {

  if (!userId) throw new ValidationError("Please log in and try again.")

  if (!profile.first_name) throw new ValidationError("Please enter your first name.")

  if (!profile.last_name) throw new ValidationError("Please enter your last name.")

  const {data, error} = await supabase
	.from('profile')
	.update(profile)
	.eq('id', userId)
  if (error) {
	throw error
  }
  return data
}