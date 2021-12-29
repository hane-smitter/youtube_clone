import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import millify from "millify";
import { LazyLoadImage } from "react-lazy-load-image-component";

import request from "../../api";
import "./_video.scss";

const Video = ({ video, channelScreen }) => {
  const navigate = useNavigate();
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const ms = moment.duration(duration).asMilliseconds();
  const _duration = moment(ms).format("mm:ss");
  const _videoId = id?.videoId || contentDetails?.videoId || id;

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`);
  };

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/getOneVideoDetails", {
        params: {
          // parts: "contentDetails, statistics",
          id: _videoId,
        },
      });
      setViews(items[0]?.statistics?.viewCount);
      setDuration(items[0]?.contentDetails?.duration);
    };
    get_video_details();
  }, [_videoId]);
  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/getOneChannelDetails", {
        params: {
          id: channelId,
        },
      });
      setChannelIcon(items[0]?.snippet?.thumbnails?.default);
    };
    get_channel_icon();
  }, [channelId]);

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        <LazyLoadImage src={medium.url} alt={title} effect="blur" />
        <span className="video__top__duration">{_duration}</span>
      </div>
      <div className="video__title">
        <abbr title={title}>{title}</abbr>
      </div>
      <div className="video__details">
        <span>
          <AiFillEye /> {millify(views ?? 0)} views
        </span>{" "}
        •<span>{moment(publishedAt).fromNow()}</span>
      </div>
      {!channelScreen && (
        <div className="video__channel">
          <LazyLoadImage
            src={channelIcon?.url}
            alt={channelTitle}
            width="36px"
            effect="blur"
          />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
