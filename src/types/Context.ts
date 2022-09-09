import {Session} from "@supabase/supabase-js"

export interface ContextState {
  appLoading: boolean;
  session: Session | null;
  profile: any;
  profileKey: number;
}