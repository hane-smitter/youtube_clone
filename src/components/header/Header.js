import React from 'react';
import {FaBars} from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';

import './_header.scss';

const Header = ({toggle}) => {
    return (
        <div className="border border-dark header">
            <FaBars className="header__menu" onClick={() => toggle()} />
            <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" className="header__logo" height={20} />
            <form>
                <input type="text" placeholder="search" />
                <button type="submit">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="header__icons">
                <MdNotifications size={28} />
                <MdApps size={28} />
                <img src="/assets/images/avatar1.jpg" alt="avatar" />
            </div>
        </div>
    )
}

export default Header
