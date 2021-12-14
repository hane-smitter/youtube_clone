import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./_app.scss";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import Homescreen from "./screens/homescreen/Homescreen";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import WatchScreen from "./screens/watchscreen/WatchScreen";
import { Container } from "react-bootstrap";

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

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/auth", { replace: true });
    }
  }, [accessToken, loading, navigate]);

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
        path="/search"
        element={
          <Layout>
            <h1>Search results</h1>
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

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
