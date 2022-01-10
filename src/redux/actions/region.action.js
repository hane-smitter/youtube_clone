import { GET_REGION_CODE_SUCCESS, GET_REGION_CODE_FAIL } from "../constants";

export const setRegionCode = (contryCode, error) => {
  if (error)
    return {
      type: GET_REGION_CODE_FAIL,
    };
  return {
    type: GET_REGION_CODE_SUCCESS,
    payload: contryCode,
  };
};
