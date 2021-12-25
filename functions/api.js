const functions = require("firebase-functions");
const axios = require("axios");

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: functions.config().youtube_api_key.key,
  },
});

exports.request = request;
