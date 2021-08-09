import React from 'react';
import {
    MdSubscriptions,
    MdThumbUp,
    MdExitToApp,
    MdHistory,
    MdLibraryBooks,
    MdHome,
    MdSentimentDissatisfied
} from 'react-icons/md';

import "./_sideBar.scss";

const SideBar = ({showSidebar}) => {

    return (
        <nav className={`sidebar${showSidebar ? ' open' : ''}`}>
            <ul>
                <li>
                    <MdHome size={23} />
                    <span>Home</span>
                </li>
                <li>
                    <MdSubscriptions size={23} />
                    <span>Subscriptions</span>
                </li>
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
                <li>
                    <MdExitToApp />
                    <span>Log out</span>
                </li>
                <hr />
            </ul>
        </nav>
    )
}

export default SideBar;
