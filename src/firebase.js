import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5ubeqHaxgEyJaYJi3gmeevIYSfJSxdc4",
  authDomain: "yt-mimic.firebaseapp.com",
  projectId: "yt-mimic",
  storageBucket: "yt-mimic.appspot.com",
  messagingSenderId: "520674076206",
  appId: "1:520674076206:web:a140cc923211945ad8a1bf",
};

firebase.initializeApp(firebaseConfig);
export default firebase.auth();
