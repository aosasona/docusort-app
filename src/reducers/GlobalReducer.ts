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
	case reducerActions.CONFIRM_PIN_SET:
	  return {
		...state,
		isPinSet: action.payload,
	  }
	case reducerActions.UNLOCK_APP:
	  return {
		...state,
		isAppLocked: false,
	  }
	case reducerActions.LOCK_APP:
	  return {
		...state,
		isAppLocked: true,
	  }
	case reducerActions.STOP_APP_LOCK_STATE_LOADING:
	  return {
		...state,
		isAppLockStateLoading: false,
	  }
	default:
	  return state;
  }
}