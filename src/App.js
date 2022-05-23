import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import request from "axios";

import Homescreen from "./screens/homescreen/Homescreen";
import SearchScreen from "./screens/searchscreen/SearchScreen";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import SubscriptionsScreen from "./screens/subscriptionsscreen/SubscriptionsScreen";
import LikedVideosScreen from "./screens/likedvideosscreen/LikedVideosScreen";
import WatchScreen from "./screens/watchscreen/WatchScreen";
import ChannelScreen from "./screens/channelscreen/ChannelScreen";
import { initRegionCode, setRegionCode } from "./redux/actions/region.action";
import NotFound from "./screens/NotFound/NotFound";
import Layout from "./components/layout/Layout";
import PrivateGuard from "./components/Guard/AuthGuardPrivate";
import PublicGuard from "./components/Guard/AuthGuardPublic";

const App = () => {
  // const abortControllerRef = React.useRef(new AbortController());
  const dispatch = useDispatch();
  const { loading: countryCodeLoading } = useSelector((state) => state.region);
  useLayoutEffect(() => {
    // console.log("fetching country code");
    async function getCountryCode() {
      try {
        dispatch(initRegionCode());
        const { data } = await request("https://ipwhois.app/json/");
        dispatch(setRegionCode(data.country_code));
      } catch (err) {
        dispatch(setRegionCode(undefined, "error"));
      }
    }
    getCountryCode();
  }, [dispatch]);

  return (
    <>
      {countryCodeLoading ? (
        <div style={{ width: "100vw" }}>
          <div className="d-flex my-2">
            <div className="spinner-border text-danger mx-auto"></div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public rotes */}
            <Route
              index
              exact
              element={
                <PublicGuard>
                  <Homescreen />
                </PublicGuard>
              }
            />
            <Route path="search/:query" element={<SearchScreen />} />
            <Route path="watch/:id" element={<WatchScreen />} />
            <Route path="channel/:channelId" element={<ChannelScreen />} />
            <Route path="/auth" element={<LoginScreen />} />

            {/* private routes */}
            <Route path="a" element={<PrivateGuard />}>
              <Route index exact element={<Homescreen />} />
              <Route path="search/:query" element={<SearchScreen />} />
              <Route path="watch/:id" element={<WatchScreen />} />
              <Route path="feed">
                <Route path="subscriptions" element={<SubscriptionsScreen />} />
                <Route path="liked" element={<LikedVideosScreen />} />
              </Route>
              <Route path="channel/:channelId" element={<ChannelScreen />} />

              {/* lost route */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* lost route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
