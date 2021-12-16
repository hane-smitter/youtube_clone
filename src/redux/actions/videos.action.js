import {
  HOME_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  RELATED_VIDEOS_REQUEST,
  RELATED_VIDEOS_SUCCESS,
  RELATED_VIDEOS_FAIL,
  SEARCH_VIDEO_REQUEST,
  SEARCH_VIDEO_FAIL,
  SEARCH_VIDEO_SUCCESS,
} from "../constants";
import request from "../../api";

export const getPopularVideos =
  (loadState = true) =>
  async (dispatch, getState) => {
    try {
      loadState &&
        dispatch({
          type: HOME_VIDEOS_REQUEST,
        });
      const { data } = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "KE",
          maxResults: 20,
          pageToken: getState().homeVideos.nextPageToken,
        },
      });

      dispatch({
        type: HOME_VIDEOS_SUCCESS,
        payload: {
          videos: data.items,
          nextPageToken: data.nextPageToken,
        },
        category: "All",
      });
    } catch (err) {
      console.group("YOUTUBE FAILED");
      console.error(err);
      console.groupEnd();
      dispatch({
        type: HOME_VIDEOS_FAIL,
        payload: err.message,
      });
    }
  };
export const getVideosByCategory =
  (keyword, loadState = true) =>
  async (dispatch, getState) => {
    try {
      loadState &&
        dispatch({
          type: HOME_VIDEOS_REQUEST,
        });
      const { data } = await request("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          pageToken: getState().homeVideos.nextPageToken,
          q: keyword,
          type: "video",
        },
      });

      dispatch({
        type: HOME_VIDEOS_SUCCESS,
        payload: {
          videos: data.items,
          nextPageToken: data.nextPageToken,
          category: keyword,
        },
      });
    } catch (err) {
      console.group("YOUTUBE Categories FAILED");
      console.error(err);
      console.groupEnd();
      dispatch({
        type: HOME_VIDEOS_FAIL,
        payload: err.message,
      });
    }
  };
export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });

    const { data } = await request("/videos", {
      params: { part: "snippet,statistics", id },
    });
    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (err) {
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: err.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEOS_REQUEST,
    });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });
    dispatch({
      type: RELATED_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    console.log(err.response.data.message);
    dispatch({
      type: RELATED_VIDEOS_FAIL,
      error: err.response.data.message,
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "channel,video",
      },
    });
    dispatch({
      type: SEARCH_VIDEO_SUCCESS,
      payload: data.items
    })
  } catch (err) {
    console.log(err.response.data.message);
    dispatch({
      type: SEARCH_VIDEO_FAIL,
      payload: err.response.data.message
    });
  }
};
