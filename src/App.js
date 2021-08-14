import React, { useState } from "react";

import "./_app.scss";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import Homescreen from "./screens/homescreen/Homescreen";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import LoginScreen from "./screens/loginScreen/LoginScreen";

const Layout = ({ children }) => {
  const [showSidebar, toggleSideBar] = useState(false);

  const toggle = () => toggleSideBar((_) => !_);

  return (
    <>
      <Header toggle={toggle} />
      <div className="app__container">
        <SideBar showSidebar={showSidebar} toggle={toggle} />
        {children}
      </div>
    </>
  );
};
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout>
            <Homescreen />
          </Layout>
        </Route>

        <Route path="/auth">
          <LoginScreen />
        </Route>

        <Route path="/search">
          <Layout>
            <h1>Search results</h1>
          </Layout>
        </Route>

        <Route>
          <Redirect to="/"/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
