import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import { getPopularVideos } from "../../redux/actions/videos.action";

const Homescreen = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector(state => state.homeVideos);

  useEffect(() => {
    let isMounted = true;
    isMounted && dispatch(getPopularVideos());

    return () => isMounted = false;
  }, [dispatch]);

  return (
    <Container>
      <CategoriesBar />
      <Row>
        {videos.map((video) => (
          <Col lg={3} md={4} key={video.id}>
            <Video video={video} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Homescreen;
