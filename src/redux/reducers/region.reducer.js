import { GET_REGION_CODE_SUCCESS, GET_REGION_CODE_FAIL } from "../constants";

export const regionReducer = (
  prevState = {
    countryCode: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REGION_CODE_SUCCESS:
      return {
        ...prevState,
        countryCode: payload,
      };
    case GET_REGION_CODE_FAIL:
      return {
        ...prevState,
        countryCode: "US",
      };
    default:
      return prevState;
  }
};
