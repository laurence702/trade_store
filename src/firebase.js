import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions"; // for cloud functions
// Required for side-effects
require("firebase/firestore");
require("firebase/auth");


// Initialize Cloud Firestore through Firebase
// const config = {
//   apiKey: process.env.VUE_APP_FIRESTORE_API_KEY,
//   authDomain: process.env.VUE_APP_AUTHDOMAIN,
//   projectId: process.env.VUE_APP_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_APP_ID,
//   measurementId: process.env.VUE_APP_MEASUREMENT_ID,
// };

const config = {
  apiKey: "AIzaSyBXLIm01SBjQuoyIf8xsqXpshhdMUuaK64",
  authDomain: "trade-depot-1819b.firebaseapp.com",
  projectId: "trade-depot-1819b",
  storageBucket: "trade-depot-1819b.appspot.com",
  messagingSenderId: "37739589002",
  appId: "1:37739589002:web:9bf428c43650763ef7ec73",
  measurementId: "G-V8TKLQ8YL9"
};
const fb = firebase.initializeApp(config);
const firestore = firebase.firestore();
const firebaseauth = firebase.auth();

export { firestore, fb, firebase,firebaseauth };
