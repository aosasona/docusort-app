import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  style?: any
}

export interface ButtonProps {
  children: React.ReactNode;
  onPress: () => any;
  disabled?: boolean;
}

export interface PrimaryButtonProps {
  onChange: (e?: any) => void;
  type?: "password" | "text";
  maxLength?: number;
  disabled?: boolean;
  placeholder: string;
}