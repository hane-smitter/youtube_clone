import React, { useEffect, useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Comments from "../../components/comments/Comments";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/videos.action";
import "./_watchScreen.scss";

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos: relatedVideos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );
  useEffect(() => {
    let timeoutID;
    if (showAlert) {
      if (typeof timeoutID === "number") {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => setShowAlert(false), 5000);
    }
    return () => clearTimeout(timeoutID);
  }, [showAlert]);

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);
  return (
    <Row>
      <div className="alert-box">
        {showAlert && (
          <Alert
            variant="warning"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
      </div>
      <Col lg={8}>
        <div className="watchscreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}?rel=0`}
            frameBorder={0}
            title={video?.snippet?.title}
            allowFullScreen
            height="100%"
            width="100%"
          ></iframe>
        </div>
        {!loading ? (
          <>
            <VideoMetaData
              video={video}
              videoId={id}
              setShowAlert={setShowAlert}
              setAlertMessage={setAlertMessage}
            />
            <Comments video={video} videoId={id} />
          </>
        ) : (
          <h5>Loading...</h5>
        )}
      </Col>
      <Col lg={4}>
        {!loading ? (
          relatedVideos
            ?.filter((relatedVideo) => relatedVideo.snippet)
            ?.map((relatedVideo, index) => {
              return (
                <VideoHorizontal
                  video={relatedVideo}
                  key={`${video?.id.videoId + "" + index}`}
                />
              );
            })
        ) : (
          <SkeletonTheme baseColor="#343A40" highlightColor="#3C4147">
            <Skeleton width="100%" height={130} count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
