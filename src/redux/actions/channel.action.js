import {
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  CHANNEL_DETAILS_FAIL,
  SET_SUBSCRIPTION_STATUS,
} from "../constants";
import request from "../../api";

export const getChannelDetails =
  (id, config = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CHANNEL_DETAILS_REQUEST,
      });

      const { data } = await request("/getChannelDetails", {
        ...config,
        params: {
          id,
        },
      });
      /* const { data } = await request("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id,
      },
    }); */
      dispatch({
        type: CHANNEL_DETAILS_SUCCESS,
        payload: data.items[0],
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CHANNEL_DETAILS_FAIL,
        payload: err.response.data,
      });
    }
  };
export const checkSubscriptionStatus = (id, config = {}) => async (dispatch, getState) => {
  try {
    const { data } = await request("/checkSubscriptionStatus", {
      params: {
        accessToken: getState().auth.accessToken,
        id,
      },
    });
    /* const { data } = await request("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
        Accept: "application/json",
      },
    }); */
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data.items.length !== 0,
    });
  } catch (err) {
    console.group("SUBSCRIPTION STATUS");
    console.log(err);
    console.groupEnd();
  }
};
