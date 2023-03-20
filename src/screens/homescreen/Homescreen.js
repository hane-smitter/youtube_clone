import React, { useEffect, useState } from "react";
import { Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GlidingBlink } from "react-loading-indicators";
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
  const { countryCode } = useSelector((state) => state.region);
  const dispatch = useDispatch();
  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );
  const [categoryInView, setCategoryInView] = useState("All");

  useEffect(() => {
    if (activeCategory) {
      // console.log("cat in view set to: ", activeCategory);
      setCategoryInView(activeCategory);
      localStorage.setItem("videoCategory", JSON.stringify(activeCategory));
    }
  }, [activeCategory]);
  useEffect(() => {
    return () => {
      localStorage.setItem("videoCategory", JSON.stringify("All"));
      // setCategoryInView("All");
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    // isMounted && dispatch(getPopularVideos());
    isMounted && dispatch(getPopularVideos(undefined, { firstPg: true }));

    return () => (isMounted = false);
  }, [dispatch]);

  const fetchMoreData = () => {
    // if (activeCategory === "All") {
    //   dispatch(getPopularVideos(false));
    // } else {
    //   dispatch(getVideosByCategory(activeCategory, false));
    // }

    const controller = new AbortController();
    let standardControl =
      activeCategory || JSON.parse(localStorage.getItem("videoCategory"));

    if (standardControl === "All") {
      dispatch(getPopularVideos(false, { signal: controller?.signal }));
    } else {
      dispatch(
        getVideosByCategory(
          activeCategory,
          false,
          { moreCat: "more_categories" },
          {
            signal: controller?.signal,
          }
        )
      );
    }
  };

  return (
    <Container
      id={"infinite-scroll-trigger-target"}
      style={{ height: "100%", overflowY: "auto" }}
    >
      <HelmetCustom
        description={"Most popular Videos in the region"}
        title={`Most popular Charts${countryCode && " | " + countryCode}`}
      />
      <CategoriesBar activeCat={categoryInView} />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMoreData}
        loader={
          <div className="w-100">
            <div className="spinner-style mx-auto text-center">
              {/* <div className="spinner-border text-danger mx-auto"></div> */}
              <GlidingBlink
                color={["#DC3545"]}
                size="small"
                style={{ fontSize: 11 }}
              />
            </div>
          </div>
        }
        hasMore={true}
        className="row"
        scrollableTarget="infinite-scroll-trigger-target"
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
