import axios from "axios";

const request = axios.create({
  // baseURL: "https://us-central1-yt-mimic.cloudfunctions.net/",
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000/api/" : "/api/",
});

export default request;
