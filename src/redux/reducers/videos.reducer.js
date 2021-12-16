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
