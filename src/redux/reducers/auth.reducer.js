import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOG_OUT,
  LOAD_PROFILE,
} from "../constants";

const authReducer = (prevState = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...prevState,
        accessToken: payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...prevState,
        loading: false,
        error: payload,
        accessToken: null,
      };
      case LOAD_PROFILE:
            return {
                ...prevState,
                user: payload
            }
    default:
      return prevState;
  }
};
