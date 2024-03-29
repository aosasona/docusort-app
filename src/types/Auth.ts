import {Dispatch, SetStateAction} from "react";

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export enum AuthStatus {
  UNCHECKED,
  SIGNED_IN,
  SIGNED_OUT,
}

export interface SetPinData {
  pin: number;
  confirmPin: number;
}

export interface UnlockAppData {
  pin: string;
  dispatch: Dispatch<SetStateAction<any>>;
}