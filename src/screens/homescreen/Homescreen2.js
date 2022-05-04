import React, { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import "./_homeScreen.scss";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
import SkeletonVideo from "../../components/skeletons/Skeleton";
import HelmetCustom from "../../components/HelmetCustom";

const HomescreenTwo = () => {
  const dispatch = useDispatch();
  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    isMounted &&
      dispatch(getPopularVideos(undefined, { signal: controller?.signal }));

    return () => {
      isMounted = false;
      controller?.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    let timeoutID;
    timeoutID = setTimeout(() => setshowSignInModal(true), 10000);
    // if (showSignInModal) {
    //   if (typeof timeoutID === "number") {
    //     clearTimeout(timeoutID);
    //   }
    //   timeoutID = setTimeout(() => setshowSignInModal(true), 5000);
    // }
    return () => clearTimeout(timeoutID);
  }, []);

  const fetchMoreData = () => {
    const controller = new AbortController();
    if (activeCategory === "All") {
      dispatch(getPopularVideos(false, { signal: controller?.signal }));
    } else {
      dispatch(
        getVideosByCategory(activeCategory, false, {
          signal: controller?.signal,
        })
      );
    }
  };

  return (
    <>
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
    </>
  );
};

export default HomescreenTwo;