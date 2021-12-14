import {
  HOME_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
} from "../constants";
import request from "../../api";

export const getPopularVideos = (loadState = true) => async (dispatch, getState) => {
  try {
    loadState && dispatch({
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
export const getVideosByCategory = (keyword, loadState = true) => async (dispatch, getState) => {
  try {
    loadState && dispatch({
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
