<template>
  <div class="auth-page loading">
    <main>
      <div class="content content--side">
        <header class="codrops-header uk-flex uk-flex-center">
          <h1 class="uk-margin-remove uk-text-center">
            Welcome to {{ $store.getters.appName }}
          </h1>
          <p class="">Fill in the form and get started today!</p>
        </header>
        <div class="form">
          <div class="form__item">
            <label class="form__label" for="email">Email Address</label>
            <input
              class="form__input"
              type="email"
              v-model="email"
              id="email"
            />
          </div>
          <div class="form__item">
            <label class="form__label" for="password">Password</label>
            <div class="form__input-wrap">
              <input
                class="form__input"
                type="password"
                v-model="password"
                id="password"
              />
              <p class="form__password-strength" id="strength-output"></p>
            </div>
          </div>
          <div class="form__item form__item--actions">
            <span
              >Don't have an account?
              <router-link class="form__link" to="/register"
                >Register here</router-link
              >
            </span>
            <button-spinner ref="loadingButton" @click="login()"
              >Log in</button-spinner
            >
          </div>
          <div>
            <p>
              or sign in with Google
              <i
                class="fab fa-google btn btn primary"
                style="color: #4c6ef5"
                @click="socialLogin"
              ></i>
            </p>
          </div>
        </div>
      </div>
      <div class="content content--side">
        <div class="poster" :style="'background-image:url(' + img + ')'"></div>
        <div class="canvas-wrap">
          <canvas></canvas>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
}
</style>

<script>
import img from "./img/login.jpg";
import { AUTH_REQUEST } from "@/store/actions/auth";
import { firebase } from "../../../firebase";
import * as TokenGenerator from "uuid-token-generator";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      img: img,
      authUser: null,
    };
  },
  methods: {
     login: async function (){
      this.$refs.loadingButton.startLoading();
      const { email, password } = this;
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({user}) => {
          //const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
          this.$snack.success({
            text: "Successfully signin in to " + this.$store.getters.appName,
          });
          this.$refs.loadingButton.stopLoading();
          this.$router.push("/create-product");
        })
        .catch((error) => {
          console.log("result is ", error);
          this.$refs.loadingButton.stopLoading();
          this.$snack.danger({
            text: error.message,
          });
        });
    },
    socialLogin: function () {
      console.log("clicked");
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
         this.$router.push("/create-product");
        })
        .catch((err) => {
          this.$snack.danger({
            text: err.message,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../styles/auth-styles";
</style>
