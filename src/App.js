import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./_app.scss";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import Homescreen from "./screens/homescreen/Homescreen";
import SearchScreen from "./screens/searchscreen/SearchScreen";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import SubscriptionsScreen from "./screens/subscriptionsscreen/SubscriptionsScreen";
import LikedVideosScreen from "./screens/likedvideosscreen/LikedVideosScreen";
import WatchScreen from "./screens/watchscreen/WatchScreen";
import ChannelScreen from "./screens/channelscreen/ChannelScreen";

const Layout = ({ children }) => {
  const [showSidebar, toggleSideBar] = useState(false);

  const toggle = () => toggleSideBar((_) => !_);

  return (
    <>
      <Header toggle={toggle} />
      <div className="app__container">
        <SideBar showSidebar={showSidebar} toggle={toggle} />
        <Container fluid className="app__main">
          {children}
        </Container>
      </div>
    </>
  );
};
const App = () => {
  const navigate = useNavigate();
  const { accessToken, loading } = useSelector((state) => state.auth);
  const [ hideView, setHideView ] = useState(true);

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/auth", { replace: true });
    }
    setHideView(false);
  }, [accessToken, loading, navigate]);

  if (hideView) {
    return null
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Homescreen />
          </Layout>
        }
      />

      <Route path="/auth" element={<LoginScreen />} />

      <Route
        path="/search/:query"
        element={
          <Layout>
            <SearchScreen />
          </Layout>
        }
      />
      <Route
        path="/watch/:id"
        element={
          <Layout>
            <WatchScreen />
          </Layout>
        }
      />
      <Route
        path="/feed/subscriptions"
        element={
          <Layout>
            <SubscriptionsScreen />
          </Layout>
        }
      />
      <Route
        path="/channel/:channelId"
        element={
          <Layout>
            <ChannelScreen />
          </Layout>
        }
      />
      <Route
        path="/feed/liked"
        element={
          <Layout>
            <LikedVideosScreen />
          </Layout>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
