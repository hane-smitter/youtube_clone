import React, {useState} from "react";

import "./_app.scss";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import Homescreen from "./screens/homescreen/Homescreen";
const App = () => {
  const [showSidebar, toggleSideBar] = useState(false);

  const toggle = () => toggleSideBar(_ => !_)

  return (
    <>
      <Header toggle={toggle} />
      <div className="app__container">
        <SideBar showSidebar={showSidebar} />
        <Homescreen />
      </div>
    </>
  );
};

export default App;
