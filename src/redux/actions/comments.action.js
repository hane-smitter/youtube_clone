import request from "../../api";
import {
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST
} from "../constants";

export const getCommentOfVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_LIST_REQUEST,
    });
    const { data } = await request("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });
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

export const addComment = (id, text) => async (dispatch, getState) => {
  const body = {
    snippet: {
      videoId: id,
      topLevelComment: {
        snippet: {
          textOriginal: text,
        },
      },
    },
  };
  try {
    dispatch({
      type: CREATE_COMMENT_REQUEST,
    });
    await request.post("/commentThreads", body, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });
    setTimeout(() => dispatch(getCommentOfVideoById(id)),6000);
  } catch (err) {
    console.group("Add comment error");
    console.log(err.response.data);
    console.groupEnd();
    dispatch({
      type: CREATE_COMMENT_FAIL,
    });
  }
};
