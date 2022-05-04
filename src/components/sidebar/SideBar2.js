import React from "react";
import { MdLibraryBooks, MdHome, MdLogin } from "react-icons/md";
import { Link } from "react-router-dom";

import "./_sideBar.scss";

const SideBar_v2 = ({ showSidebar, toggle }) => {

  return (
    <>
      <nav
        className={`sidebar${showSidebar ? " open" : ""}`}
        onClick={() => toggle(false)}
      >
        <ul>
          <Link to="/">
            <li>
              <MdHome size={23} data-tip="Home" />
              <span>Home</span>
            </li>
          </Link>

          <li>
            <MdLibraryBooks size={23} data-tip="Library" />
            <span>Library</span>
          </li>
          <Link to="/auth">
            <li>
              <MdLogin size={23} data-tip="Log In" />
              <span>Sign In</span>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default SideBar_v2;
