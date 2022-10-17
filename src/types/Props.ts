import {Session} from "@supabase/supabase-js";
import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  showTabs?: boolean;
  style?: any
}

export interface ButtonProps {
  children: React.ReactNode;
  onPress: () => any;
  disabled?: boolean;
}

export interface PrimaryInputProps {
  onChange?: (e?: any) => void;
  type?: "password" | "text";
  maxLength?: number;
  disabled?: boolean;
  placeholder?: string;
  extraProps?: any;

  [key: string]: any;
}

export interface BasePageProps {
  session?: Session
  profile?: any
  navigation?: any
}

export interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface PinInputProps {
  length: number;
  value: string;
}

export interface KeypadProps {
  max: number;
  value: string;
  showSignOut?: boolean;
  setValue: (value: string) => void;
  onCompleted?: () => void;
}

export interface KeypadInputProps {
  value: number,
  onPress: (e: string) => any,
  isFilled: boolean
}

export interface ModalHeaderProps {
  children: React.ReactNode;
}

export interface PageIconProps {
  as: any;
  name: string;
  color?: string;
}

export interface PageButtonProps {
  title: string;
  description: string;
  icon: PageIconProps;

  [key: string]: any;
}