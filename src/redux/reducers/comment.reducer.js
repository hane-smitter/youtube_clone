import {
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_FAIL
} from "../constants";

export const videoCommentsListReducer = (
  state = { loading: false, comments: [] },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case COMMENT_LIST_REQUEST:
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_LIST_SUCCESS:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case COMMENT_LIST_FAIL:
      case CREATE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
