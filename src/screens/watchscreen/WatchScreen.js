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
import { decode } from "html-entities";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import { useAuthDetect } from "../../hooks/useAuthDetect";

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { accessToken, loading: authLoad } = useSelector((state) => state.auth);
  const [activateMoreFeatures, setActivateMoreFeatures] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos: relatedVideos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );
  const { isAuthenticated: unlockFeatures } = useAuthDetect();
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

  // useEffect(() => {
  //   if (accessToken) {
  //     setActivateMoreFeatures(true);
  //   }
  // }, [accessToken]);

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);
  return (
    <Row className="w-100 h-100 scrollable-parent">
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
      <Col lg={8} className="scrollable-child">
        <div className="watchscreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}?rel=0`}
            frameBorder={0}
            title={decode(video?.snippet?.title)}
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
              activateMoreFeatures={unlockFeatures}
            />
            <Comments
              video={video}
              videoId={id}
              activateMoreFeatures={unlockFeatures}
            />
          </>
        ) : (
          <h5>Loading...</h5>
        )}
      </Col>
      <Col lg={4} className="scrollable-child">
        {!loading && (
          <CategoriesBar
            categories={video?.snippet?.tags}
            watchScreen={true.toString()}
            videoId={video?.id?.videoId ?? video?.id}
            // updateRelatedVids={updateRelatedVids}
            style={{
              position: "sticky",
              top: 0,
              zIndex: 20,
              backgroundColor: "#333",
            }}
          />
        )}
        {!loading && !relatedVideosLoading ? (
          relatedVideos
            ?.filter((relatedVideo) => relatedVideo.snippet)
            ?.map((relatedVideo, index) => {
              return (
                <VideoHorizontal
                  video={relatedVideo}
                  activateMoreFeatures={unlockFeatures}
                  watchScreen={true.toString()}
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
