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
  SUBSCRIBED_CHANNELS_REQUEST,
  SUBSCRIBED_CHANNELS_SUCCESS,
  SUBSCRIBED_CHANNELS_FAIL,
  CHANNEL_PLAYLIST_FAIL,
  CHANNEL_PLAYLIST_SUCCESS,
  CHANNEL_PLAYLIST_REQUEST,
  MY_LIKED_VIDEOS_FAIL,
  MY_LIKED_VIDEOS_REQUEST,
  MY_LIKED_VIDEOS_SUCCESS,
} from "../constants";
import request from "../../api";

export const getPopularVideos =
  (loadState = true, config = {}) =>
  async (dispatch, getState) => {
    console.group("loadState");
    console.log(loadState);
    console.groupEnd();
    try {
      loadState &&
        dispatch({
          type: HOME_VIDEOS_REQUEST,
        });
      const { data } = await request("/getPopularVideos", {
        ...config,
        params: {
          nextPageToken: getState().homeVideos.nextPageToken,
          region: getState().region.countryCode,
        },
      });
      /* const { data } = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "KE",
          maxResults: 20,
          pageToken: getState().homeVideos.nextPageToken,
        },
      }); */

      dispatch({
        type: HOME_VIDEOS_SUCCESS,
        payload: {
          videos: data.items,
          nextPageToken: data.nextPageToken,
        },
        category: "All",
      });
    } catch (err) {
      dispatch({
        type: HOME_VIDEOS_FAIL,
        payload: err?.response?.data,
      });
    }
  };
export const getVideosByCategory =
  (
    keyword,
    loadState = true,
    purpose = { relatedVideos: "", moreCat: "" },
    config = {}
  ) =>
  async (dispatch, getState) => {
    const shouldFetchRelatedVideos =
      purpose?.relatedVideos === "related_videos";
    // console.log("shouldFetchRelatedVideos ", shouldFetchRelatedVideos);
    // console.log("not load stATE ", !loadState);

    async function APICALL(apiToCall, config = {}) {
      if (apiToCall === "related_videos") {
        const resp = await request("/getVideosByCategory", {
          ...config,
          params: {
            keyword,
            totalResults: 15,
          },
        });
        return resp;
      }

      const resp = await request("/getVideosByCategory", {
        ...config,
        params: {
          nextPageToken: getState().homeVideos.nextPageToken,
          keyword,
        },
      });
      return resp;
    }

    function dispatcher() {
      const dispatchTypeStart =
        shouldFetchRelatedVideos && !loadState
          ? purpose?.moreCat
            ? ""
            : RELATED_VIDEOS_REQUEST
          : HOME_VIDEOS_REQUEST;
      // console.log("dispatchTypeStart ", dispatchTypeStart);
      const dispatchTypeEnd =
        shouldFetchRelatedVideos && !loadState
          ? RELATED_VIDEOS_SUCCESS
          : HOME_VIDEOS_SUCCESS;
      const dispatchTypeEndFail =
        shouldFetchRelatedVideos && !loadState
          ? RELATED_VIDEOS_FAIL
          : HOME_VIDEOS_FAIL;
      return {
        start: dispatchTypeStart,
        end: dispatchTypeEnd,
        fail: dispatchTypeEndFail,
      };
    }
    try {
      dispatcher().start && dispatch({ type: dispatcher().start });
      console.log("dispatcher().start  ", dispatcher().start);

      const { data } = await APICALL(purpose?.relatedVideos, {});

      if (dispatcher().end === RELATED_VIDEOS_SUCCESS) {
        dispatch({
          type: RELATED_VIDEOS_SUCCESS,
          payload: data.items,
        });
      } else {
        dispatch({
          type: HOME_VIDEOS_SUCCESS,
          payload: {
            videos: data.items,
            nextPageToken: data.nextPageToken,
            category: keyword,
          },
        });
      }
    } catch (err) {
      console.group("YOUTUBE Categories FAILED ...frm video.actions");
      console.error(err);
      console.groupEnd();
      dispatch({
        type: dispatcher().fail,
        payload: err?.response?.data?.message,
      });
    }
  };

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });

    const { data } = await request("/getVideoById", {
      params: { id },
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

    const { data } = await request("/getRelatedVideos", {
      params: {
        id,
      },
    });

    /* const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedVideoId: id,
        maxResults: 15,
        type: "video",
      },
    }); */
    dispatch({
      type: RELATED_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    console.log(err?.response?.data?.message);
    dispatch({
      type: RELATED_VIDEOS_FAIL,
      error: err?.response?.data?.message,
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_VIDEO_REQUEST,
    });
    const { data } = await request("/getVideosBySearch", {
      params: { keyword },
    });
    dispatch({
      type: SEARCH_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    console.log(err.response.data.message);
    dispatch({
      type: SEARCH_VIDEO_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getSubscribedChannels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIBED_CHANNELS_REQUEST,
    });
    const { data } = await request("/getSubscribedChannels", {
      params: {
        accessToken: getState().auth.accessToken,
      },
    });
    /* const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 20,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    }); */
    dispatch({
      type: SUBSCRIBED_CHANNELS_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: SUBSCRIBED_CHANNELS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getPlaylistByChannelId = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_PLAYLIST_REQUEST,
    });

    const { data } = await request("/getPlaylistByChannelId", {
      params: {
        id,
      },
    });

    dispatch({
      type: CHANNEL_PLAYLIST_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    console.group("Actions CHANNEL_PLAYLIST_FAIL");
    console.log(err?.response?.data);
    console.groupEnd();
    dispatch({
      type: CHANNEL_PLAYLIST_FAIL,
      payload: err?.response?.data,
    });
  }
};

export const getMyLikedVideos =
  (pageLoad = "primary") =>
  async (dispatch, getState) => {
    try {
      pageLoad.toLowerCase() === "primary" &&
        dispatch({
          type: MY_LIKED_VIDEOS_REQUEST,
        });

      const { data } = await request("/getMyLikedVideos", {
        params: {
          accessToken: getState().auth.accessToken,
          pageToken:
            pageLoad.toLowerCase() !== "primary"
              ? getState().myLikedVideos.nextPageToken || undefined
              : undefined,
        },
      });
      data.pageLoad = pageLoad;

      dispatch({
        type: MY_LIKED_VIDEOS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      console.log(
        (err.response?.data?.error && err.response.data.error.message) ||
          err.response.statusText ||
          "eRROR"
      );
      dispatch({
        type: MY_LIKED_VIDEOS_FAIL,
      });
    }
  };
