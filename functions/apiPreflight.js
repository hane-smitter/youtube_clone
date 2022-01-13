const axios = require("axios");

const requestApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
});

exports.requestApi = requestApi;
