import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import request from "axios";

import Homescreen from "./screens/homescreen/Homescreen";
import SearchScreen from "./screens/searchscreen/SearchScreen";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import SubscriptionsScreen from "./screens/subscriptionsscreen/SubscriptionsScreen";
import LikedVideosScreen from "./screens/likedvideosscreen/LikedVideosScreen";
import WatchScreen from "./screens/watchscreen/WatchScreen";
import ChannelScreen from "./screens/channelscreen/ChannelScreen";
import { setRegionCode } from "./redux/actions/region.action";
import HomescreenTwo from "./screens/homescreen/Homescreen2";
import NotFound from "./screens/NotFound/NotFound";
import Layout from "./components/layout/Layout";
import PrivateGuard from "./components/Guard/AuthGuardPrivate";
import PublicGuard from "./components/Guard/AuthGuardPublic";
import LayoutV2 from "./components/layout/Layout2";

const App = () => {
  // const abortControllerRef = React.useRef(new AbortController());
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    async function getCountryCode() {
      try {
        const { data } = await request("https://ipwhois.app/json/");
        dispatch(setRegionCode(data.country_code));
      } catch (err) {
        dispatch(setRegionCode(undefined, "error"));
      }
    }
    getCountryCode();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LayoutV2 />}>
        <Route
          index
          exact
          element={
            <PublicGuard>
              <HomescreenTwo />
            </PublicGuard>
          }
        />
        <Route path="search/:query" element={<SearchScreen />} />
        <Route path="watch/:id" element={<WatchScreen />} />
        <Route
          path="/auth"
          element={
            <PublicGuard>
              <LoginScreen />
            </PublicGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/a"
        element={
          <PrivateGuard>
            <Layout />
          </PrivateGuard>
        }
      >
        <Route index exact element={<Homescreen />} />
        <Route path="search/:query" element={<SearchScreen />} />
        <Route path="watch/:id" element={<WatchScreen />} />
        <Route path="feed/subscriptions" element={<SubscriptionsScreen />} />
        <Route path="channel/:channelId" element={<ChannelScreen />} />
        <Route path="feed/liked" element={<LikedVideosScreen />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
