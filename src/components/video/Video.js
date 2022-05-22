import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import millify from "millify";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { decode } from "html-entities";
import ReactTooltip from "react-tooltip";

import request from "../../api";
import "./_video.scss";
import videoDuration from "../../util/videoDuration";

const Video = ({ video, channelScreen, activateMoreFeatures }) => {
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
  const titleDecoded = decode(title);

  const _duration = useMemo(() => {
    if (duration) {
      return videoDuration(duration);
    }
    return "";
  }, [duration]);
  // const _duration = videoDuration(duration);
  const _videoId = id?.videoId || contentDetails?.videoId || id;

  const handleVideoClick = () => {
    const padUrl = activateMoreFeatures ? "/a" : "";
    navigate(`${padUrl}/watch/${_videoId}`);
  };

  useEffect(() => {
    let isMounted = true;
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/getOneVideoDetails", {
        params: {
          // parts: "contentDetails, statistics",
          id: _videoId,
        },
      });
      isMounted && setViews(items[0]?.statistics?.viewCount);
      isMounted && setDuration(items[0]?.contentDetails?.duration);
    };
    get_video_details();

    return () => (isMounted = false);
  }, [_videoId]);
  useEffect(() => {
    let isMounted = true;
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/getOneChannelDetails", {
        params: {
          id: channelId,
        },
      });
      isMounted && setChannelIcon(items[0]?.snippet?.thumbnails?.default);
    };
    get_channel_icon();

    return () => (isMounted = false);
  }, [channelId]);

  return (
    <div className="video" onClick={handleVideoClick}>
      <ReactTooltip />
      <div className="video__top">
        <LazyLoadImage src={medium.url} alt={titleDecoded} effect="blur" />
        <span className="video__top__duration">{_duration}</span>
      </div>
      <div className="video__title">
        <p className="text" data-tip={titleDecoded}>
          {titleDecoded}
        </p>
      </div>
      <div className="video__details">
        <span>
          <AiFillEye /> {millify(views ?? 0)} views
        </span>{" "}
        <span>• {moment(publishedAt).fromNow()}</span>
      </div>
      {!channelScreen && (
        <div className="video__channel">
          <LazyLoadImage
            src={channelIcon?.url}
            alt={channelTitle}
            width="36px"
            effect="blur"
          />
          <p className="ms-2">{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
