import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillEye } from "react-icons/ai";

import "./_videoHorizontal.scss";
import request from "../../api";
import { useNavigate } from "react-router-dom";

const VideoHorizontal = ({ video, searchScreeen, subscriptionsScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  const isVideo = !(id.kind === "youtube#channel" || subscriptionsScreen);
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const navigate = useNavigate();

  const seconds = moment.duration(duration);
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const _videoId = id?.videoId ?? id;
  const thumbnail = !isVideo && "videoHorizontal__thumbnail-channel";
  const _channelId = resourceId?.channelId || channelId;

  const handleRelatedVideoClick = () => {
    if (isVideo) {
      navigate(`/watch/${_videoId}`);
    } else {
      navigate(`/channel/${_channelId}`);
    }
  };

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
      setViews(items[0]?.statistics?.viewCount);
      setDuration(items[0]?.contentDetails?.duration);
    };

    isVideo && get_video_details();
  }, [_videoId, isVideo]);
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
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={handleRelatedVideoClick}
    >
      <Col xs={6} md={searchScreeen || subscriptionsScreen ? 4 : 6}>
        <div className="videoHorizontal__left">
          <LazyLoadImage
            src={medium.url}
            className={`videoHorizontal__thumbnail ${thumbnail}`}
            wrapperClassName="videoHorizontal__thumbnail-wrapper"
            effect="blur"
          />
          {isVideo && (
            <span className="videoHorizontal__duration">{_duration}</span>
          )}
        </div>
      </Col>
      <Col
        xs={6}
        md={searchScreeen || subscriptionsScreen ? 8 : 6}
        className="videoHorizontal__right"
      >
        <p className="videoHorizontal__title">
          <abbr title={title}>{title}</abbr>
        </p>
        {isVideo && (
          <div className="videoHorizontal__details d-flex align-items-center">
            <AiFillEye />
            {numeral(views).format("0.a")} views •
            {moment("2021-03-05").fromNow()}
          </div>
        )}
        {(searchScreeen || subscriptionsScreen) && (
          <p className="mt-1 videoHorizontal__desc">{description}</p>
        )}
        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          {/* we shall include a lazy load image here conditionally */}
          <p className="mb-0">{channelTitle}</p>
        </div>
        {subscriptionsScreen && (
          <p className="mt-2">{video.contentDetails.totalItemCount} Videos</p>
        )}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
