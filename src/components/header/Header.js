import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps, MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "./_header.scss";
import YTlogo from "../../images/youtube.png";
import { useAuthDetect } from "../../hooks/useAuthDetect";

const Header = ({ toggle }) => {
  const { countryCode } = useSelector((state) => state.region);
  const { isAuthenticated } = useAuthDetect();

  const [searchTxt, setSearchTxt] = useState("");
  const navigate = useNavigate();
  const { photoURL, name } = useSelector((state) => state?.auth?.user || {});

  const handleSearchTxtSubmit = (e) => {
    const padURL = isAuthenticated ? "/a" : "";
    e.preventDefault();
    navigate(`${padURL}/search/${searchTxt}`);
  };

  return (
    <>
      <div className="border border-dark header">
        <FaBars className="header__menu" onClick={() => toggle()} />
        <div className="header__logo-area">
          <img src={YTlogo} className="header__logo" alt="logo" height={20} />
          <sup>{countryCode}</sup>
        </div>
        <form onSubmit={handleSearchTxtSubmit}>
          <input
            type="text"
            placeholder="search"
            value={searchTxt}
            style={{ paddingInlineStart: 10 }}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
          <button type="submit">
            <AiOutlineSearch size={22} />
          </button>
        </form>

        <div className="header__icons">
          <MdNotifications size={28} data-tip="Notifications" />
          <MdApps size={28} data-tip="Apps" />
          {isAuthenticated ? (
            <img src={photoURL} alt={name} data-tip={name || "User"} />
          ) : (
            <MdAccountCircle size={28} data-tip="User" />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
