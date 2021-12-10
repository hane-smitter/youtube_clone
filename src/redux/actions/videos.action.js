import { HOME_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL } from "../constants";
import request from "../../api";

export const getPopularVideos = () => async (dispatch) => {
  try {
    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "KE",
        maxResults: 20,
        pageToken: "",
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
export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: "video"
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
    console.group("YOUTUBE Categories FAILED");
    console.error(err);
    console.groupEnd();
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: err.message,
    });
  }
};
