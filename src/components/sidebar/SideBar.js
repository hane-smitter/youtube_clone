import React from "react";
import {
  MdSubscriptions,
  MdThumbUp,
  MdLogout,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/auth.action";

import "./_sideBar.scss";

const SideBar = ({ showSidebar, toggle }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav
      className={`sidebar${showSidebar ? " open" : ""}`}
      onClick={() => toggle(false)}
    >
      <ul>
        <Link to="/a">
          <li>
            <MdHome size={23} data-tip="Home" />
            <span>Home</span>
          </li>
        </Link>
        <Link to="feed/subscriptions">
          <li>
            <MdSubscriptions size={23} data-tip="Subscriptions" />
            <span>Subscriptions</span>
          </li>
        </Link>
        <Link to="feed/liked">
          <li>
            <MdThumbUp size={23} data-tip="Liked Videos" />
            <span>Liked Videos</span>
          </li>
        </Link>
        <li>
          <MdHistory size={23} data-tip="History" />
          <span>History</span>
        </li>
        <li>
          <MdLibraryBooks size={23} data-tip="Library" />
          <span>Library</span>
        </li>
        <li>
          <MdSentimentDissatisfied data-tip="***" />
          <span>I don't know</span>
        </li>
        <hr />
        <li onClick={logoutHandler}>
          <MdLogout size={23} data-tip="Log out" />
          <span>Log out</span>
        </li>
        <hr />
      </ul>
    </nav>
  );
};

export default SideBar;
