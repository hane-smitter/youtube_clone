import {
  GET_REGION_CODE_SUCCESS,
  GET_REGION_CODE_FAIL,
  GET_REGION_CODE_REQUEST,
} from "../constants";

export const setRegionCode = (countryCode, error) => {
  if (error)
    return {
      type: GET_REGION_CODE_FAIL,
    };
  return {
    type: GET_REGION_CODE_SUCCESS,
    payload: countryCode,
  };
};

export const initRegionCode = () => ({
  type: GET_REGION_CODE_REQUEST,
});
