import React, { useEffect } from "react";
import moment from "moment";
import numeral from "numeral";
import { batch, useDispatch, useSelector } from "react-redux";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoreText from "react-show-more-text";

import "./_videoMetaData.scss";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channel.action";
import HelmetCustom from "../HelmetCustom";

const VideoMetaData = ({ video, videoId }) => {
  const dispatch = useDispatch();
  const channelId = video?.snippet?.channelId;

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);
  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  useEffect(() => {
    batch(() => {
      dispatch(getChannelDetails(channelId));
      dispatch(checkSubscriptionStatus(channelId));
    });
  }, [dispatch, channelId]);
  return (
    <div className="videoMetaData py-2">
      <HelmetCustom description={video?.snippet?.description} title={video?.snippet?.title} />
      <div className="videoMetaData__top">
        <h5>{video?.snippet?.title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(video?.statistics?.viewCount).format("0.a")} views •
            {moment(video?.snippet?.publishedAt).fromNow()}
          </span>
          <div>
            <span>
              <MdThumbUp size={26} />
              {numeral(video?.statistics?.likeCount).format("0.a")}
            </span>
            <span style={{ marginInlineStart: 10 }}>
              <MdThumbDown size={26} />
              {/* dislike count was disabled(hidden) as of 2021 */}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex" style={{ columnGap: 4 }}>
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            className="rounded-circle"
            alt=""
          />
          <div className="d-flex flex-column">
            <span>{video?.snippet?.channelTitle}</span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>
        <button
          className={`btn border-0 p-2 ${subscriptionStatus && "btn-gray"}`}
        >
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {video?.snippet?.description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
