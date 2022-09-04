import {InterfaceToastProps} from "native-base/lib/typescript/components/composites/Toast";

export const colors = {
  PRIMARY: '#FFC580',
  SECONDARY: '#F5F5F5',
  FADED: '#FFC58099',
  DARK: '#090909',
  INPUT_BG: "#D5B25822",
}
export const defaultStyles = {
  button: {
	PRIMARY: {
	  backgroundColor: colors.PRIMARY,
	  fontColor: colors.DARK,
	  paddingTop: 10,
	  paddingBottom: 10,
	  borderRadius: 50,
	},
	TEXT: {
	  backgroundColor: 'transparent',
	  color: colors.DARK,
	  paddingVertical: 10,
	  textAlign: 'center',
	},
  },
}

export const ToastStyles = {
  ERROR: {
	placement: "top",
	color: "error.500",
	backgroundColor: "error.700",
	rounded: 40,
	paddingX: 5,
	paddingY: 3,
  } as InterfaceToastProps,
  SUCCESS: {
	placement: "top",
	color: "success.500",
	backgroundColor: "success.700",
	rounded: 40,
	paddingX: 5,
	paddingY: 3,
  } as InterfaceToastProps,
  DEFAULT: {
	placement: "top",
	color: "success.500",
	backgroundColor: "primary.700",
	rounded: 40,
	paddingX: 5,
	paddingY: 3,
  } as InterfaceToastProps,
}