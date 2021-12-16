import {
  CHANNEL_DETAILS_SUCCESS,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_FAIL,
  SET_SUBSCRIPTION_STATUS,
} from "../constants";

export const channelDetailsReducer = (
  state = { loading: true, channel: {} },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_DETAILS_SUCCESS:
      return {
        ...state,
        channel: payload,
        loading: false,
      };
    case CHANNEL_DETAILS_FAIL:
      return {
        ...state,
        channel: {},
        error: payload,
        loading: false,
      };
      case SET_SUBSCRIPTION_STATUS:
      return {
        ...state,
        subscriptionStatus: payload
      };
    default:
      return state;
  }
};
