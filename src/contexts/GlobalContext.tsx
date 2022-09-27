import {createContext, useEffect, useReducer} from "react";
import KeychainUtil from "../../utils/Keychain";
import {GlobalReducer} from "../reducers/GlobalReducer";
import {ContextState} from "../types/Context";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({children}) => {
  const initialState: ContextState = {
	appLoading: true,
	session: null,
	profile: null,
	profileKey: 0,
	appUnlocked: false,
	isPinSet: false,
  }

  useEffect(() => {
	(async () => {
	  try {
		initialState.isPinSet = await KeychainUtil.checkPinIsSet()
	  }
	  catch (e) {
	  }
	})()
  }, [])

  const [state, dispatch] = useReducer(GlobalReducer as any, initialState);
  return (
	<GlobalContext.Provider value={{state, dispatch}}>
	  {children}
	</GlobalContext.Provider>
  )
}