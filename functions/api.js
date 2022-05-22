const axios = require("axios");
console.log(
  "ENV youtube_api_key",
  JSON.stringify(process.env.YOUTUBE_API_KEY, null, 2)
);
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    // key: functions.config().youtube_api_key.key,
    key: process.env.YOUTUBE_API_KEY,
  },
});

exports.request = request;
