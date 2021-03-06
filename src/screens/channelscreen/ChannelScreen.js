import React, { useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "./_channelScreen.scss";
import { getPlaylistByChannelId } from "../../redux/actions/videos.action";
import Video from "../../components/video/Video";
import {
  getChannelDetails,
  checkSubscriptionStatus,
} from "../../redux/actions/channel.action";
import { useAuthDetect } from "../../hooks/useAuthDetect";

const ChannelScreen = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const { isAuthenticated: unlockFeatures } = useAuthDetect();

  const { playlist: videos, loading } = useSelector(
    (state) => state.channelPlaylist
  );
  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );
  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channel
  );

  useEffect(() => {
    batch(() => {
      dispatch(getPlaylistByChannelId(channelId));
      dispatch(getChannelDetails(channelId));
    });

    // eslint-disable-next-line
  }, [dispatch, channelId]);

  useEffect(() => {
    unlockFeatures && dispatch(checkSubscriptionStatus(channelId));

    // eslint-disable-next-line
  }, [unlockFeatures]);

  return (
    <>
      <div className="px-5 py-5 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center channelHeader__left">
          <img src={snippet?.thumbnails?.default?.url} alt="" />

          <div className="ms-3 channelHeader__details">
            <h3>{snippet?.title}</h3>
            <span>{millify(statistics?.subscriberCount ?? 0)} subscribers</span>
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
      <Container>
        <Row>
          {!loading
            ? videos?.map((video, index) => (
                <Col md={4} lg={3} key={index}>
                  <Video
                    video={video}
                    channelScreen
                    activateMoreFeatures={unlockFeatures}
                  />
                </Col>
              ))
            : [...Array(15)].map((item, index) => (
                <Col md={4} lg={3} key={index}>
                  <SkeletonTheme baseColor="#343A40" highlightColor="#3C4147">
                    <Skeleton width="100%" height={140} />
                  </SkeletonTheme>
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
};

export default ChannelScreen;
