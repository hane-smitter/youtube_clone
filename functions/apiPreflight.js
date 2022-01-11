const functions = require("firebase-functions");
const axios = require("axios");

const requestApi = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
});

exports.requestApi = requestApi;
