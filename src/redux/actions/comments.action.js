import request from "../../api";
import {
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
} from "../constants";

export const getCommentOfVideoById =
  (id, config = {}) =>
  async (dispatch) => {
    try {
      dispatch({
        type: COMMENT_LIST_REQUEST,
      });
      const { data } = await request("/getCommentOfVideoById", {
        ...config,
        params: {
          id,
        },
      });
      /* const { data } = await request("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    }); */
      dispatch({
        type: COMMENT_LIST_SUCCESS,
        payload: data.items,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: COMMENT_LIST_FAIL,
        error: err?.response?.data?.message,
      });
    }
  };

export const addComment =
  (id, text, config = {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_COMMENT_REQUEST,
      });
      await request.get("/addComment", {
        ...config,
        params: {
          text,
          id,
          accessToken: getState().auth.accessToken,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      dispatch({
        type: CREATE_COMMENT_SUCCESS,
      });
      setTimeout(() => dispatch(getCommentOfVideoById(id)), 6000);
    } catch (err) {
      console.group("Add comment error from axions");
      console.log(err?.response?.data);
      console.groupEnd();
      dispatch({
        type: CREATE_COMMENT_FAIL,
        payload: "Could not add Comment",
      });
    }
  };
