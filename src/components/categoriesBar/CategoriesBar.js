import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";

import {
  getVideosByCategory,
  getPopularVideos,
} from "../../redux/actions/videos.action";
import "./_categoriesBar.scss";

function CategoriesBar() {
  const [activeElement, setActiveElement] = useState("All");
  // const { activeCategory } = useSelector((state) => state.homeVideos);
  const dispatch = useDispatch();
  const keywords = [
    "All",
    "React Js",
    "Angular Js",
    "React Native",
    "Vue js",
    "Redux",
    "Music",
    "DSA",
    "Motivation",
    "Guitar",
    "Songs",
    "Coding",
    "Football",
    "Real Madrid",
    "Chelsea",
    "Poor Coder",
  ];

  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  return (
    <ScrollContainer className="categories-bar">
      {keywords.map((value, i) => (
        <span
          key={i}
          onClick={() => handleClick(value)}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </ScrollContainer>
  );
}

export default CategoriesBar;
