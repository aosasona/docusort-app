import supabase from "../../utils/Supabase";

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