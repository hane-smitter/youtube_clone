import React, { useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
import SkeletonVideo from "../../components/skeletons/Skeleton";
import HelmetCustom from "../../components/HelmetCustom";

const Homescreen = () => {
  const dispatch = useDispatch();
  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  useEffect(() => {
    let isMounted = true;
    isMounted && dispatch(getPopularVideos());

    return () => (isMounted = false);
  }, [dispatch]);

  const fetchMoreData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos(false));
    } else {
      dispatch(getVideosByCategory(activeCategory, false));
    }
  };

  return (
    <Container> 
      <HelmetCustom
        description={"Most popular Videos in the region"}
        title={"Most popular Charts"}
      />
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMoreData}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        hasMore={true}
        className="row"
      >
        {loading
          ? Array.from({ length: 20 }).map((item, index) => (
              <Col lg={3} md={4} key={index}>
                <SkeletonVideo />
              </Col>
            ))
          : videos.map((video, index) => (
              <Col lg={3} md={4} key={`${video.id}${index}`}>
                <Video video={video} />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Homescreen;
