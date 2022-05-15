import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";

import {
  getVideosByCategory,
  getPopularVideos,
  getRelatedVideos,
} from "../../redux/actions/videos.action";
import "./_categoriesBar.scss";

function CategoriesBar({
  categories,
  watchScreen,
  activeCat,
  videoId,
  ...rest
}) {
  const [activeElement, setActiveElement] = useState("All");

  let customCats = [""];
  if (categories?.length > 0) {
    customCats = ["All", ...categories];
  }
  function Capitalize(word) {
    let first = word.charAt(0).toUpperCase();
    let rest = word.substring(1);
    return first + rest;
  }
  customCats = customCats.map((cat) => Capitalize(cat));

  // const { activeCategory } = useSelector((state) => state.homeVideos);
  const dispatch = useDispatch();
  const keywords =
    customCats?.length > 2
      ? customCats
      : [
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
    console.log("categories active el", value);
    setActiveElement(value);
    if (watchScreen) {
      // console.log("watchScreen has run in cat bar");
      if (value === "All") {
        return dispatch(getRelatedVideos(videoId));
      }
      dispatch(
        getVideosByCategory(value, false, { relatedVideos: "related_videos" })
      );
      return;
    }

    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  return (
    <ScrollContainer className="categories-bar" {...rest}>
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

export default React.memo(CategoriesBar);
