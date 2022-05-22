const axios = require("axios");
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    // key: functions.config().youtube_api_key.key,
    key: process.env.YOUTUBE_API_KEY,
  },
});

exports.request = request;
