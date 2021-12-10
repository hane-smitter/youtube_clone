import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import { homeVideosReducer } from "./reducers/videos.reducer";

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
});

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
