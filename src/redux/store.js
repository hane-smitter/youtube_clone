import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import { channelDetailsReducer } from "./reducers/channel.reducer";
import { videoCommentsListReducer } from "./reducers/comment.reducer";
import {
  homeVideosReducer,
  relatedVideosReducer,
  selectedVideoReducer,
  subscribedChannelsReducer,
  videosSearchReducer,
  channelPlaylistReducer,
} from "./reducers/videos.reducer";

const initState = {
  /* auth: {
    user: {
      name: "Zoom",
      age: 29,
    },
  }, */
};

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentsList: videoCommentsListReducer,
  relatedVideos: relatedVideosReducer,
  searchVideos: videosSearchReducer,
  subscribedChannels: subscribedChannelsReducer,
  channelPlaylist: channelPlaylistReducer,
});

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;