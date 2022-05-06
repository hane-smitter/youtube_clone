import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import millify from "millify";
import { batch, useDispatch, useSelector } from "react-redux";
import {
  MdThumbUp,
  MdThumbDown,
  MdOutlineThumbUp,
  MdOutlineThumbDown,
} from "react-icons/md";
import ShowMoreText from "react-show-more-text";

import "./_videoMetaData.scss";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channel.action";
import HelmetCustom from "../HelmetCustom";
import request from "../../api.js";
import { decode } from "html-entities";

const VideoReactionFeedback = {
  success: "Reacted to video:)",
  auth_warning: "You need to login to react to this video",
  info: "You need to have a youtube channel linked with your google account, to react to this video",
  error: "Could not react to the video. Try again later!",
};

const VideoMetaData = ({
  video,
  videoId,
  setAlertMessage,
  setShowAlert,
  activateMoreFeatures,
}) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const channelId = video?.snippet?.channelId;
  const [videoLiked, setVideoLiked] = useState(false);
  const [videoDisliked, setVideoDisliked] = useState(false);
  const initRating = useRef({});
  const [, setInitRating] = useState({});

  function createMarkup() {
    return { __html: video?.snippet?.description.trim() };
  }

  const handleLikeVideo = async (rating = "like") => {
    if (!activateMoreFeatures) {
      setShowAlert(true);
      setAlertMessage(VideoReactionFeedback.auth_warning);
      return;
    }
    rating = rating.toLowerCase();
    if (videoLiked) rating = "none";
    try {
      setVideoLiked(rating === "like");
      rating !== "none" && setVideoDisliked(!rating === "like");
      await request.post("/likeVideo", { accessToken, id: videoId, rating });
      setInitRating({ ...initRating, liked: rating === "like" });
    } catch (err) {
      setVideoLiked((prev) => !prev);
      setVideoDisliked(Boolean(initRating.current?.disliked));
      setShowAlert(true);
      setAlertMessage(
        err?.response.status === 401
          ? VideoReactionFeedback.info
          : VideoReactionFeedback.error
      );
      console.log(err);
    }
  };
  const handleDislikeVideo = async (rating = "dislike") => {
    if (!activateMoreFeatures) {
      setShowAlert(true);
      setAlertMessage(VideoReactionFeedback.auth_warning);
      return;
    }
    rating = rating.toLowerCase();
    if (videoDisliked) rating = "none";
    try {
      setVideoDisliked(rating === "dislike");
      rating !== "none" && setVideoLiked(!rating === "dislike");

      await request.post("/likeVideo", { accessToken, id: videoId, rating });
      setInitRating({ ...initRating, disliked: rating === "dislike" });
    } catch (err) {
      // console.log("initial rating", initRating.current);
      setVideoDisliked(Boolean(initRating.current?.disliked));
      setVideoLiked(Boolean(initRating.current?.liked));
      setShowAlert(true);
      setAlertMessage(
        err?.response.status === 401
          ? VideoReactionFeedback.info
          : VideoReactionFeedback.error
      );
      console.log(err);
    }
  };

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);
  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  useEffect(() => {
    batch(() => {
      dispatch(getChannelDetails(channelId));
      activateMoreFeatures && dispatch(checkSubscriptionStatus(channelId));
    });

    // eslint-disable-next-line
  }, [dispatch, channelId]);
  useEffect(() => {
    async function getVideoRating() {
      try {
        const { data } = await request("/getOneVideoRating", {
          params: {
            id: videoId,
            accessToken,
          },
        });
        const liked = data["items"][0].rating === "like";
        const disliked = data["items"][0].rating === "dislike";
        setVideoLiked(liked);
        setVideoDisliked(disliked);
        setInitRating({
          liked,
          disliked,
        });
      } catch (err) {
        setInitRating({
          liked: null,
          disliked: null,
        });
        console.log(err);
      }
    }
    activateMoreFeatures && getVideoRating();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, videoId, accessToken]);
  // console.group("vids like dislike status");
  // console.log("liked: ", videoLiked);
  // console.log("==============");
  // console.log("disliked: ", videoDisliked);
  // console.groupEnd();
  return (
    <div className="videoMetaData py-2">
      <HelmetCustom
        description={video?.snippet?.description}
        title={decode(video?.snippet?.title)}
      />
      <div className="videoMetaData__top">
        <h5>{decode(video?.snippet?.title)}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {parseInt(video?.statistics?.viewCount) > 100000
              ? millify(video?.statistics?.viewCount ?? 0)
              : video?.statistics?.viewCount}{" "}
            views • {moment(video?.snippet?.publishedAt).fromNow()}
          </span>
          <div className="d-flex align-items-center">
            <span className="d-flex align-items-center">
              {!videoLiked ? (
                <MdOutlineThumbUp
                  className="me-1"
                  size={26}
                  onClick={() => handleLikeVideo("like")}
                />
              ) : (
                <MdThumbUp
                  className="me-1"
                  size={26}
                  onClick={() => handleLikeVideo("like")}
                />
              )}

              {millify(video?.statistics?.likeCount ?? 0)}
            </span>
            <span
              className="d-flex ms-2 align-items-center"
              style={{ textTransform: "uppercase" }}
            >
              {!videoDisliked ? (
                <MdOutlineThumbDown
                  className="me-1"
                  size={26}
                  onClick={() => handleDislikeVideo("dislike")}
                />
              ) : (
                <MdThumbDown
                  className="me-1"
                  size={26}
                  onClick={() => handleDislikeVideo("dislike")}
                />
              )}
              {/* dislike count was disabled(hidden) as of 2021 */}
              dislike
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex" style={{ columnGap: 4 }}>
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            className="rounded-circle me-2"
            alt=""
          />
          <div className="d-flex flex-column">
            <span>{video?.snippet?.channelTitle}</span>
            <span>
              {millify(channelStatistics?.subscriberCount ?? 0)} Subscribers
            </span>
          </div>
        </div>
        <button
          className={`btn border-0 p-2 ${
            subscriptionStatus && "btn-subscribed"
          }`}
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
          dangerouslySetInnerHTML={createMarkup()}
        ></ShowMoreText>
      </div>
    </div>
  );
};

export default React.memo(VideoMetaData);
