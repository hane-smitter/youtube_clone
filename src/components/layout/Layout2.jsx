import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

import "./_Layout.scss";
import FooterV2 from "../footer/Footer2";
import HeaderV2 from "../header/Header2";
import SideBarV2 from "../sidebar/SideBar2";

const Layout_v2 = () => {
  const [showSidebar, toggleSideBar] = React.useState(false);

  const toggle = () => toggleSideBar((_) => !_);
  return (
    <>
      <ReactTooltip />
      <HeaderV2 toggle={toggle} />
      <div className="app__container">
        <SideBarV2 showSidebar={showSidebar} toggle={toggle} />
        <Container fluid className="app__main">
          <Outlet />
        </Container>
      </div>
      <FooterV2 />
    </>
  );
};
export default Layout_v2;
