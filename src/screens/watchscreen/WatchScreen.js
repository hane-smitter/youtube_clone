import React from "react";
import { Row, Col } from "react-bootstrap";
import Comments from "../../components/comments/Comments";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";

import "./_watchScreen.scss";

const WatchScreen = () => {
  return (
    <Row>
      <Col lg={8}>
        <div className="watchscreen__player">
          <iframe
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            frameBorder={0}
            title="my wid"
            allowFullScreen
            height="100%"
            width="100%"
          ></iframe>
        </div>
        <VideoMetaData />
        {Array.from({ length: 5 }).map(() => (
          <Comments />
        ))}
      </Col>
      <Col lg={4}>
        {Array.from({ length: 10 }).map(() => (
          <VideoHorizontal />
        ))}
      </Col>
    </Row>
  );
};

export default WatchScreen;
