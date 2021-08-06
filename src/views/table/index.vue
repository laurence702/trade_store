<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 d-flex mt-5">
        <p>Hello {{ profileData.email || "" }}</p>
        <br /><br />
        <div class="mr-auto">
          <form class="form-inline">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              @click="getProducts"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        <div class="w-25">
          <button
            class="btn btn-primary w-100"
            type="button"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Add
          </button>
          <Modal />
        </div>
      </div>
    </div>
    <table class="table table-striped table-dark mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Location</th>
        </tr>
      </thead>
      <tbody>
        <div v-if="!products.length">No item in inventory</div>
        <tr v-for="(item, index) in products" v-bind:key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td>
            {{ item.location }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import { firestore, fb, firebaseauth } from "../../firebase";
export default {
  name: "Table",
  components: {
    Modal
  },
  mounted() {
    console.log("component mounted");
  },
  data() {
    return {
      products: [],
      profileData: null
    };
  },
  methods: {
    getProducts: async function(e) {
      e.preventDefault();
      firestore
        .collection("products")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // console.log(`${doc.id} => ${doc.data()}`);
            console.log(this.products.push(doc.data()));
          });
        });
    }
  },
  created() {
    console.log("component has been created");
    fb.auth().onAuthStateChanged(user => {
      this.profileData = user;
      //console.log(fb.auth().currentUser.displayName());
    });
  }
};
</script>

<style scoped></style>
