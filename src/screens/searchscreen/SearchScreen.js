import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import { getVideosBySearch } from "../../redux/actions/videos.action";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useAuthDetect } from "../../hooks/useAuthDetect";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const { isAuthenticated: unlockFeatures } = useAuthDetect();

  const { videos, loading } = useSelector((state) => state.searchVideos);

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  return (
    <Container>
      {!loading ? (
        videos.map((video, index) => {
          return (
            <VideoHorizontal
              video={video}
              key={`${video.id.videoId}${index}`}
              searchScreen={true.toString()}
              activateMoreFeatures={unlockFeatures}
            />
          );
        })
      ) : (
        <SkeletonTheme baseColor="#343A40" highlightColor="#3C4147">
          <Skeleton width="100%" height={160} count={15} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
