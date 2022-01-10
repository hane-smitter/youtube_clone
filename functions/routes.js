const router = require("express").Router();

const {
  getPopularVideos,
  getVideosByCategory,
  getVideoById,
  getRelatedVideos,
  getVideosBySearch,
  getSubscribedChannels,
  getPlaylistByChannelId,
  getOneVideoDetails,
  getChannelDetails,
  checkSubscriptionStatus,
  getOneChannelDetails,
  getCommentOfVideoById,
  addComment,
  getMyLikedVideos,
} = require("./fns/index.fns.js");

//  channels
router.get("/getChannelDetails", getChannelDetails);
router.get("/checkSubscriptionStatus", checkSubscriptionStatus);
router.get("/getOneChannelDetails", getOneChannelDetails);
//  videos
router.get("/getPopularVideos", getPopularVideos);
router.get("/getVideosByCategory", getVideosByCategory);
router.get("/getVideoById", getVideoById);
router.get("/getRelatedVideos", getRelatedVideos);
router.get("/getVideosBySearch", getVideosBySearch);
router.get("/getSubscribedChannels", getSubscribedChannels);
router.get("/getPlaylistByChannelId", getPlaylistByChannelId);
router.get("/getOneVideoDetails", getOneVideoDetails);
router.get("/getMyLikedVideos", getMyLikedVideos);
//  comments
router.get("/getCommentOfVideoById", getCommentOfVideoById);
router.get("/addComment", addComment);

module.exports = router;
