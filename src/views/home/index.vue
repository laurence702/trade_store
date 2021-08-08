<template>
  <div
    uk-height-viewport="offset-bottom: 80px"
    class="uk-flex uk-flex-center uk-flex-middle uk-flex-column"
  >
    <h1>Welcome {{ authUser.name }}</h1>
    <p>signed in as {{ authUser.email }}</p>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/actions/auth.js";
import firebase from "firebase";

export default {
  name: "Home",
  data() {
    return {
      authUser: null
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
    },

    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user;
      });
    }
  }
};
</script>
