import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps, MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "./_header.scss";

const Header_v2 = ({ toggle }) => {
  const [searchTxt, setSearchTxt] = useState("");
  const navigate = useNavigate();

  const handleSearchTxtSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTxt}`);
  };

  return (
    <>
      <div className="border border-dark header">
        <FaBars className="header__menu" onClick={() => toggle()} />
        <img
          src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
          className="header__logo"
          alt="logo"
          height={20}
        />
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
          <MdAccountCircle size={28} data-tip="User" />
        </div>
      </div>
    </>
  );
};

export default Header_v2;
