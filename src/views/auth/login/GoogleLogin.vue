<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email" /><br />
    <input type="password" v-model="password" placeholder="Password" /><br />
    <button @click="login">Connection</button>
    <p>
      or sign in with Google <br />
        <i class="fab fa-google btn btn primary" style="color:#4c6ef5"
        @click="socialLogin"
        ></i>
    </p>
    <p>
      You don't have an account ? You can
      <router-link to="/sign-up">create one</router-link>
    </p>
  </div>
</template>

<script>
import { firebase } from "../../../firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$router.replace("home");
          },
          (err) => {
            alert("Oops. " + err.message);
          }
        );
    },
    socialLogin: function(){
        console.log("clicked");
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then((result) =>{
            this.$router.replace("/create-product");
        }).catch((err) =>{
            alert("Oops " + err.message);
        })
    }
  },
};
</script>
