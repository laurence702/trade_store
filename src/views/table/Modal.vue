<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    v-if="modalShow"
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
                @click="openUploadModal"
                id="upload_widget"
                type="button"
                class="cloudinary-button btn-primary"
              >
                Upload files
              </button>

              <button-spinner
                ref="loadingButton"
                @click.prevent="handleSubmit"
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
import Table from "./index.vue";

Vue.use(VuePlaceAutocomplete); //places SDK init

export default {
  name: "Modal",
  components: {
   Table
  },
  data() {
    return {
      modalShow:true,
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
    handleSubmit: async function () {
      try {
        this.$refs.loadingButton.startLoading();
        const docRef = await firestore.collection("products").add(this.product);
        console.log("Document written with ID=>", docRef.id);
        this.$refs.loadingButton.stopLoading();
        if(docRef.id != undefined || docRef.id != ""){
          this.$snack.success({
            text: "Success",
          });
        }
        typeof docRef.id == "string" ? refresh() : throwError;
         this.modalShow = false
        function refresh() {
          setInterval(() => {
            location.reload();
          }, 1500);
        }
        function throwError() {
          throw "failed to save";
        }
      } catch (error) {
        this.$snack.danger({
          text: error.message,
        });
      }
    },
    openUploadModal: function () {
      window.cloudinary
        .openUploadWidget(
          {
            cloud_name: settings.CLOUDNAMETEST,
            upload_preset: settings.PRESETTEST,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done uploading..: ", result.info);
              this.product.Url = result.info.secure_url;
              this.product.ImageId = result.info.public_id;
              console.log("URL: ",this.product.Url, "imageId: ", this.product.ImageId);
            }
          }
        )
        .open();
    },
  },
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
