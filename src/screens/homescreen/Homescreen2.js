import React, { useEffect, useMemo, useState } from "react";
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
  const { countryCode } = useSelector((state) => state.region);
  const dispatch = useDispatch();
  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );
  const [categoryInView, setCategoryInView] = useState(null);
  const optimalActiveCategory = useMemo(() => {
    if (activeCategory) {
      setCategoryInView(activeCategory);
      localStorage.setItem("videoCategory", JSON.stringify(activeCategory));
    }
    return activeCategory;
  }, [activeCategory]);

  useEffect(() => {
    return () => {
      localStorage.setItem("videoCategory", JSON.stringify("All"));
      setCategoryInView("All");
    };
  }, []);
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

  const fetchMoreData = () => {
    const controller = new AbortController();
    let standardControl =
      optimalActiveCategory ||
      JSON.parse(localStorage.getItem("videoCategory"));

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
    <>
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
              <div className="spinner-style mx-auto">
                <div className="spinner-border text-danger mx-auto"></div>
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
    </>
  );
};

export default HomescreenTwo;
