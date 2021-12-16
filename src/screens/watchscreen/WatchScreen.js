import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
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
  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos: relatedVideos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );
  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);
  return (
    <Row>
      <Col lg={8}>
        <div className="watchscreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder={0}
            title={video?.snippet?.title}
            allowFullScreen
            height="100%"
            width="100%"
          ></iframe>
        </div>
        {!loading ? (
          <>
            <VideoMetaData video={video} videoId={id} />
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
                  key={`${video.id.videoId + "" + index}`}
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
