import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import { getSubscribedChannels } from "../../redux/actions/videos.action";
import { useAuthDetect } from "../../hooks/useAuthDetect";

const SubscriptionsScreen = () => {
  const dispatch = useDispatch();
  const { channels, loading } = useSelector(
    (state) => state.subscribedChannels
  );
  const { isAuthenticated: unlockFeatures } = useAuthDetect();
  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);

  return (
    <Container>
      {!loading ? (
        channels.map((channel, index) => (
          <VideoHorizontal
            video={channel}
            subscriptionsScreen={true.toString()}
            key={`${channel.id}${index}`}
            activateMoreFeatures={unlockFeatures}
          />
        ))
      ) : (
        <SkeletonTheme baseColor="#343A40" highlightColor="#3C4147">
          <Skeleton width="100%" height={130} count={15} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SubscriptionsScreen;
