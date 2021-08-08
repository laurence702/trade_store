import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSnackbar from "vue-snack";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import ButtonSpinner from "@/components/globals/ButtonSpinner";
import * as firebase from "firebase";
import Cloudinary, { CldImage, CldTransformation } from "cloudinary-vue";

Vue.use(Cloudinary, {
  //cloudinary SDK init
  configuration: { cloudName: "CLOUDNAMETEST" },
  components: {
    CldImage,
    CldTransformation,
  },
});

UIkit.use(Icons);
window.UIkit = UIkit;

const firebaseConfig = {
  apiKey: "AIzaSyBXLIm01SBjQuoyIf8xsqXpshhdMUuaK64",
  authDomain: "trade-depot-1819b.firebaseapp.com",
  projectId: "trade-depot-1819b",
  storageBucket: "trade-depot-1819b.appspot.com",
  messagingSenderId: "37739589002",
  appId: "1:37739589002:web:9bf428c43650763ef7ec73",
  measurementId: "G-V8TKLQ8YL9"
};

// loads the Icon plugin
window._ = require("lodash");

require("./styles/index.scss");
require("vue-snack/dist/vue-snack.min.css");

Vue.config.productionTip = false;

window.Event = new Vue();

Vue.use(VueSnackbar, {});

Vue.component("button-spinner", ButtonSpinner);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
