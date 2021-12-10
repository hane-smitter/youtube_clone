import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideosByCategory } from "../../redux/actions/videos.action";

import "./_categoriesBar.scss";

function CategoriesBar() {
  const [activeElement, setActiveElement] = useState("All");
  const dispatch = useDispatch();
  const keywords = [
    "All",
    "React Js",
    "Angular Js",
    "React Native",
    "Use of API",
    "Redux",
    "Music",
    "Algorithm Art",
    "Guitar",
    "Songz",
    "Coding",
    "Football",
    "Real Madrid",
    "Poor Coder",
  ];

  const handleClick = (value) => {
    setActiveElement(value);
    dispatch(getVideosByCategory(value));
  };

  return (
    <div className="categories-bar">
      {keywords.map((value, i) => (
        <span
          key={i}
          onClick={() => handleClick(value)}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
}

export default CategoriesBar;
