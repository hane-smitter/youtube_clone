import axios from "axios";

const request = axios.create({
  // baseURL: "https://us-central1-yt-mimic.cloudfunctions.net/",
  baseURL: "/api/",
});

export default request;
