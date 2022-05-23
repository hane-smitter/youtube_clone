import {
  GET_REGION_CODE_SUCCESS,
  GET_REGION_CODE_FAIL,
  GET_REGION_CODE_REQUEST,
} from "../constants";

export const regionReducer = (
  prevState = {
    countryCode: null,
    loading: true,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REGION_CODE_SUCCESS:
      return {
        ...prevState,
        countryCode: payload,
        loading: false,
      };
    case GET_REGION_CODE_FAIL:
      return {
        ...prevState,
        countryCode: "US",
        loading: false,
      };
    case GET_REGION_CODE_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
    default:
      return prevState;
  }
};
