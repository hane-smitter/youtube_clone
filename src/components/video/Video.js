import React from "react";
import { AiFillEye } from "react-icons/ai";

import "./_video.scss";

const Video = () => {
  return (
    <div className="video">
      <div className="video__top">
        <img src="https://i.ytimg.com/vi/PgQ3sW0BWfI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC7uc671PX3G5tp43ewzZ4qMJJrPg" alt="" />
        <span>03:42</span>
      </div>
      <div className="video__title">
          <abbr title="Learn Javascript in 5 mins">Learn Javascript in 5 mins</abbr>
      </div>
      <div className="video__details">
        <span>
            <AiFillEye /> 5m views
        </span>
        <span>3 days ago</span>
      </div>
      <div className="video__channel">
        <img src="https://yt3.ggpht.com/ytc/AKedOLQ3FtoYqwDf6LPVnwaqEz6qJrahXobKsuVrI-SADw=s68-c-k-c0x00ffffff-no-rj" alt="channel image" width="36px" />
        <p>Rainbow reinhard</p>
      </div>
    </div>
  );
};

export default Video;
