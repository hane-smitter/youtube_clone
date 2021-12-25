import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGOUT,
  LOAD_PROFILE,
} from "../constants";

export const authReducer = (prevState = {
  accessToken: sessionStorage.getItem("ytmimic-access-token"),
  user: JSON.parse(sessionStorage.getItem("ytmimic-user")) || {}
}, action) => {
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
        user: payload,
      };
    case LOGOUT:
      return {
        ...prevState,
        accessToken: null,
        user: null,
      };
    default:
      return prevState;
  }
};
