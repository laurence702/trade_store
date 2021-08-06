<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Kindly fill this</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="form-horizontal">
            <div class="form-group text-left">
              <label for="">Product Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
                v-model="product.name"
              />
            </div>

            <div class="form-group text-left">
              <label for="">Price</label>
              <input
                type="number"
                class="form-control"
                placeholder="Price"
                v-model="product.price"
              />
            </div>

            <div class="form-group text-left">
              <label for="">Location</label>
              <input
                type="text"
                class="form-control"
                placeholder="Location"
                v-model="product.location"
              />
            </div>

            <div>
              <button @click="saveData" type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { firestore, fb } from "../../firebase";
export default {
  name: "Modal",
  components: {},
  data() {
    return {
      product: {
        name: "",
        price: "",
        location: ""
      }
    };
  },
  methods: {
    saveData: async function(e) {
      try {
        e.preventDefault();
        console.log(this.product);
        const docRef = await firestore.collection("products").add(this.product);
        console.log("Document written with ID", docRef.id);

        this.getProducts();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

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
  }
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
