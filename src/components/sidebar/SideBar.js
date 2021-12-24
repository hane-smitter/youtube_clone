import React from "react";
import {
  MdSubscriptions,
  MdThumbUp,
  MdExitToApp,
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
        <Link to="/">
          <li>
            <MdHome size={23} />
            <span>Home</span>
          </li>
        </Link>
        <Link to="/feed/subscriptions">
          <li>
            <MdSubscriptions size={23} />
            <span>Subscriptions</span>
          </li>
        </Link>
        <li>
          <MdThumbUp size={23} />
          <span>Liked Videos</span>
        </li>
        <li>
          <MdHistory size={23} />
          <span>History</span>
        </li>
        <li>
          <MdLibraryBooks size={23} />
          <span>Library</span>
        </li>
        <li>
          <MdSentimentDissatisfied />
          <span>I don't know</span>
        </li>
        <hr />
        <li onClick={logoutHandler}>
          <MdExitToApp />
          <span>Log out</span>
        </li>
        <hr />
      </ul>
    </nav>
  );
};

export default SideBar;
