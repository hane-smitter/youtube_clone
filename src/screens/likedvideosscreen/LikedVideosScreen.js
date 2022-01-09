import React, { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import HelmetCustom from "../../components/HelmetCustom";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import { getMyLikedVideos } from "../../redux/actions/videos.action";

const LikedVideosScreen = () => {
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.myLikedVideos);

  useEffect(() => {
    dispatch(getMyLikedVideos());
  }, [dispatch]);

  const fetchMoreData = () => {
    dispatch(getMyLikedVideos("secondary"));
  };
  return (
    <>
      <HelmetCustom
        description={"List of videos liked"}
        title={"Liked Videos"}
      />
      {loading ? (
        <SkeletonTheme baseColor="#343A40" highlightColor="#3C4147">
          <Skeleton width="100%" height={130} count={15} />
        </SkeletonTheme>
      ) : (
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreData}
          loader={
            <div className="spinner-border text-danger d-block mx-auto"></div>
          }
          hasMore={true}
          className="row"
        >
          {videos.map((video, index) => (
          <VideoHorizontal key={index} video={video} likedVidsScreen />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

export default LikedVideosScreen;
