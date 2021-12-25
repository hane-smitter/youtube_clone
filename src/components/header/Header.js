import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "./_header.scss";

const Header = ({ toggle }) => {
  const [searchTxt, setSearchTxt] = useState("");
  const navigate = useNavigate();
  const { photoURL, name } = useSelector((state) => state.auth?.user);

  const handleSearchTxtSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTxt}`);
  };

  return (
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
          onChange={(e) => setSearchTxt(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={photoURL} alt={name} />
      </div>
    </div>
  );
};

export default Header;
