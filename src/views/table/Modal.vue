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

            <!-- <div class="form-group text-left">
              <label for="">Location</label>
              <input
                type="text"
                class="form-control"
                placeholder="Location"
                v-model="product.location"
              />
            </div> -->
            <div v-if="product.location" class="alert alert-info">
              Current Value: {{ product.location }}
            </div>

            <place-autocomplete-field
              v-model="product.location"
              placeholder="Enter an an address, zipcode, or location"
              label="search address"
              name="location"
              api-key=""
            ></place-autocomplete-field>
            <div>
              <button
                @click="openUploadWidget"
                id="upload_widget"
                type="button"
                class="cloudinary-button btn-primary"
              >
                Upload files
              </button>

              <button-spinner
                ref="loadingButton"
                @click="saveData"
                type="submit"
                class="btn btn-primary"
              >
                Submit
              </button-spinner>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>  
<script>
import { firestore, firebase } from "../../firebase";
import Vue from "vue";
import VuePlaceAutocomplete from "vue-place-autocomplete";
import { settings } from "../../settings";

Vue.use(VuePlaceAutocomplete); //places SDK init

export default {
  name: "Modal",
  components: {},
  data() {
    return {
      product: {
        name: "",
        price: "",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        location: "32 oddo street, obalende",
        Url: "",
        ImageId: "",
      },
    };
  },
  methods: {
    saveData: async function (e) {
      e.preventDefault();
      console.log(this.product.location);
      try {
        e.preventDefault();
        this.$refs.loadingButton.startLoading();
        const docRef = await firestore.collection("products").add(this.product);
        console.log("Document written with ID=>", docRef.id);
        this.$refs.loadingButton.stopLoading();
        this.$snack.success({
          text: "Success",
        });
        typeof docRef.id == "string" ? refresh() : throwError;
        function refresh() {
          setInterval(() => {
            location.reload();
          }, 1500);
        }
        refresh();
        function throwError() {
          throw "failed to save";
        }
      } catch (error) {
        this.$snack.danger({
          text: error.message,
        });
      }
    },

    getProducts: async function () {
      firestore
        .collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(this.products.push(doc.data()));
          });
        });
    },
    createWidgetEventListener: function () {
       function another() {
        const myWidget = cloudinary.createUploadWidget(
          {
            cloudName: settings.CLOUDNAMETEST,
            uploadPreset: settings.PRESETTEST,
          },
          function another (error, result) {
            
            if (!error && result && result.event === "success") {
              console.log("Done! Here is the image info: ", result.info);
              if (result.info !== undefined) {
                const productUrl = result.info.secure_url;
                const productImageId = result.info.public_id;
                 this.product.Url = productUrl;
              }
            }
          }
        );
        console.log("I hit the success block");
        myWidget.open();
      }
      another(), console.log("I hit cloudinary error block");
      false;
    },
    openUploadWidget: function (e) {
      e.preventDefault();
      document
        .getElementById("upload_widget")
        .addEventListener("click", this.createWidgetEventListener());
    },
  },
  created() {},
};
</script>

<style scoped>
label {
  font-weight: bold;
}
.uk-button-secondary {
  background-color: #007bff !important;
  border-color: #007bff !important;
  color: #fff;
  border: 1px solid transparent;
}
</style>
