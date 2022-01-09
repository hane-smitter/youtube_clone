import {
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_SUCCESS,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  RELATED_VIDEOS_FAIL,
  RELATED_VIDEOS_SUCCESS,
  RELATED_VIDEOS_REQUEST,
  SEARCH_VIDEO_REQUEST,
  SEARCH_VIDEO_FAIL,
  SEARCH_VIDEO_SUCCESS,
  SUBSCRIBED_CHANNELS_REQUEST,
  SUBSCRIBED_CHANNELS_SUCCESS,
  SUBSCRIBED_CHANNELS_FAIL,
  CHANNEL_PLAYLIST_SUCCESS,
  CHANNEL_PLAYLIST_FAIL,
  CHANNEL_PLAYLIST_REQUEST,
  MY_LIKED_VIDEOS_SUCCESS,
  MY_LIKED_VIDEOS_FAIL,
  MY_LIKED_VIDEOS_REQUEST,
} from "../constants";

export const homeVideosReducer = (
  state = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: "All",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        videos:
          state.activeCategory === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        loading: false,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };
    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const selectedVideoReducer = (
  state = {
    loading: true,
    video: null,
    error: undefined,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: payload,
        error: undefined,
      };
    case SELECTED_VIDEO_FAIL:
      return {
        ...state,
        error: payload,
        video: null,
        loading: false,
      };
    default:
      return state;
  }
};

export const relatedVideosReducer = (
  state = {
    loading: false,
    videos: [],
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case RELATED_VIDEOS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case RELATED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RELATED_VIDEOS_SUCCESS:
      return {
        ...state,
        error: null,
        videos: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const videosSearchReducer = (
  state = {
    loading: false,
    videos: [],
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_VIDEO_REQUEST:
      return {
        loading: true,
      };
    case SEARCH_VIDEO_SUCCESS:
      return {
        loading: false,
        videos: payload,
      };
    case SEARCH_VIDEO_FAIL:
      return {
        loading: false,
        videos: [],
        error: payload,
      };

    default:
      return state;
  }
};

export const subscribedChannelsReducer = (
  state = {
    loading: false,
    channels: [],
    error: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SUBSCRIBED_CHANNELS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBSCRIBED_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: payload,
        loading: false,
        error: null,
      };
    case SUBSCRIBED_CHANNELS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const channelPlaylistReducer = (
  state = {
    loading: false,
    playlist: [],
    error: null,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_PLAYLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_PLAYLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        playlist: payload,
        error: null,
      };
    case CHANNEL_PLAYLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const myLikedVideosReducer = (
  state = {
    videos: [],
    loading: false,
    nextPageToken: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case MY_LIKED_VIDEOS_SUCCESS:
      // console.group("REDUCER LIKED VIDS");
      // console.log("REDUCERS FRM", payload.pageLoad);
      // console.assert(payload.pageLoad === "primary", "Payload is not primary");
      // console.groupEnd();
      return {
        ...state,
        videos:
          payload.pageLoad === "primary"
            ? payload.items
            : [...state.videos, ...payload.items],
        loading: false,
        nextPageToken: payload.nextPageToken,
      };
    case MY_LIKED_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case MY_LIKED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
