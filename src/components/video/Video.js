import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import numeral from "numeral";

import request from "../../api";

import "./_video.scss";

const Video = ({ video }) => {
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
  } = video;

  const seconds = moment.duration(duration);
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const _videoId = id?.videoId ?? id;

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails, statistics",
          id: _videoId,
        },
      });
      setViews(items[0].statistics.viewCount);
      setDuration(items[0].contentDetails.duration);
    };
    get_video_details();
  }, [_videoId]);
  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  return (
    <div className="video">
      <div className="video__top">
        <img src={medium.url} alt={title} />
        <span>{_duration}</span>
      </div>
      <div className="video__title">
        <abbr title={title}>{title}</abbr>
      </div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} views
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      <div className="video__channel">
        <img src={channelIcon?.url} alt={channelTitle} width="36px" />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default Video;
