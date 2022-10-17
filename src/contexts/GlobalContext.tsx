import {useToast} from "native-base";
import {createContext, useEffect, useReducer} from "react";
import KeychainUtil from "../../utils/Keychain";
import {ToastStyles} from "../constants";
import {reducerActions} from "../constants/actions";
import {GlobalReducer} from "../reducers/GlobalReducer";
import {ContextState} from "../types/Context";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({children}) => {
  const initialState: ContextState = {
	appLoading: true,
	session: null,
	profile: null,
	profileKey: 0,
	isAppLocked: true,
	isPinSet: false,
	isLockStateLoading: true,
  }

  const [state, dispatch] = useReducer(GlobalReducer as any, initialState);

  return (
	<GlobalContext.Provider value={{state, dispatch}}>
	  {children}
	</GlobalContext.Provider>
  )
}