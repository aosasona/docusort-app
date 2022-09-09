import {Session} from "@supabase/supabase-js"
import React from "react";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  tier: number;
  created_at: string;
}

export interface ContextState {
  appLoading: boolean;
  session: Session | null;
  profile: Profile | null;
  profileKey: number;
  appUnlocked: boolean;
  isPinSet: boolean;
}

export interface ContextInterface {
  state: ContextState;
  dispatch: React.Dispatch<any>;
}