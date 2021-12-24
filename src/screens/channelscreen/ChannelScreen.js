import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import numeral from "numeral";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "./_channelScreen.scss";
import { getPlaylistByChannelId } from "../../redux/actions/videos.action";
import Video from "../../components/video/Video";
import { getChannelDetails } from "../../redux/actions/channel.action";
import { Col, Container, Row } from "react-bootstrap";

const ChannelScreen = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();

  const { playlist: videos, loading } = useSelector(
    (state) => state.channelPlaylist
  );
  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channel
  );

  useEffect(() => {
    dispatch(getPlaylistByChannelId(channelId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);
  return (
    <>
      <div className="px-5 py-5 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center channelHeader__left">
          <img src={snippet?.thumbnails?.default?.url} alt="" />

          <div className="ml-3 channelHeader__details">
            <h3>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} subscribers
            </span>
          </div>
        </div>
        <button>subscribe</button>
      </div>
      <Container>
        <Row>
          {!loading
            ? videos?.map((video) => (
                <Col md={4} lg={3}>
                  <Video video={video} channelScreen />
                </Col>
              ))
            : [...Array(15)].map((item, index) => (
                <Col md={4} lg={3}>
                  <SkeletonTheme
                    baseColor="#343A40"
                    highlightColor="#3C4147"
                    key={index}
                  >
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
