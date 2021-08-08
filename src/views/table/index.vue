<template>
  <div class="container">
    <div class="row">
      <div class="mt-5 mb-0 col-lg-12">
        <p>Hello {{ profileData.email || "" }}</p>
      </div>
      <div class="col-lg-12 d-flex">
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
              @click.prevent="getProductsAsync('asc')"
            >
              refresh
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
          <th scope="col">
            Location
            <button class="btn btn-secondary mr-3 ml-3" @click="setSortUp">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-sort-up"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
                />
              </svg>
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button class="btn btn-secondary" @click="setSortDown">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-sort-down"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
                />
              </svg>
            </button>
          </th>
          <th scope="col">image</th>
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
          <td>
           
            <img
              class="list-complete-img"
              :src="`${item.Url || ''}`"
              alt="image"
              height="30px" width="30px"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import { firestore, fb } from "../../firebase";
export default {
  name: "Table",
  components: {
    Modal,
  },
  mounted() {
    this.getProducts();
    console.log("component mounted");
  },
  data() {
    return {
      products: [],
      profileData: "",
      sortParam: "asc",
    };
  },
  methods: {
    getProducts: async function () {
      firestore
        .collection("products")
        .orderBy("createdAt", "asc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push(doc.data());
            console.log("Im fetching products...");
          });
        });
    },
    getProductsAsync: function (sort) {
      console.log(this.reset());
      firestore
        .collection("products")
        .orderBy("createdAt", sort)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push(doc.data());
          });
        });
    },
    reset: function () {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    setSortUp: function () {
      this.getProductsAsync("asc");
      console.log("I was sorted asc");
    },
    setSortDown: function () {
      this.getProductsAsync("desc");
      console.log("I was sorted desc");
    },
  },

  created() {
    console.log("component has been created");
    fb.auth().onAuthStateChanged((user) => {
      this.profileData = user;
      //console.log(fb.auth().currentUser.displayName());
    });
  },
};
</script>

<style scoped></style>
