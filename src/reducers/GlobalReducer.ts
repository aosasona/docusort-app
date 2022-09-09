import {reducerActions} from "../constants/actions";

export const GlobalReducer = (state, action) => {
  switch (action.type) {
	case reducerActions.SET_SESSION:
	  return {
		...state,
		session: action.payload,
	  };
	case reducerActions.SET_PROFILE:
	  return {
		...state,
		profile: action.payload,
	  };
	case reducerActions.STOP_APP_LOADING:
	  return {
		...state,
		appLoading: false,
	  };
	case reducerActions.RELOAD_PROFILE:
	  return {
		...state,
		profileKey: state.profileKey + 1,
	  }
	default:
	  return state;
  }
}