import {createContext, useReducer} from "react";
import {GlobalReducer} from "../reducers/GlobalReducer";
import {ContextState} from "../types/Context";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({children}) => {
  const initialState: ContextState = {
	appLoading: true,
	session: null,
	profile: null,
	profileKey: 0,
  }
  const [state, dispatch] = useReducer(GlobalReducer as any, initialState);
  return (
	<GlobalContext.Provider value={{state, dispatch}}>
	  {children}
	</GlobalContext.Provider>
  )
}