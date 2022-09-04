import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient, SupabaseClientOptions} from '@supabase/supabase-js'

const supabaseUrl = "https://gvbkuvvethdnfkctyepa.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2Ymt1dnZldGhkbmZrY3R5ZXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwMjk2MjAsImV4cCI6MTk3NzYwNTYyMH0.VldgMeEYuhQ-4UamFtYEIZ2khML4dyAYcUZWvPj6seQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
	storage: AsyncStorage as any,
	autoRefreshToken: true,
	persistSession: true,
	detectSessionInUrl: false,
  },
})

export default supabase;