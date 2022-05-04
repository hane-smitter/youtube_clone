import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

import "./_Layout.scss";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SideBar from "../sidebar/SideBar";

const Layout = () => {
  const [showSidebar, toggleSideBar] = React.useState(false);

  const toggle = () => toggleSideBar((_) => !_);
  return (
    <>
      <ReactTooltip />
      <Header toggle={toggle} />
      <div className="app__container">
        <SideBar showSidebar={showSidebar} toggle={toggle} />
        <Container fluid className="app__main">
          <Outlet />
        </Container>
      </div>
      <Footer />
    </>
  );
};
export default Layout;
