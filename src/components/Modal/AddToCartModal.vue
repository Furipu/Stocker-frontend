<template>
  <b-modal id="modalAddToCart" title="Add To Cart" @ok="handleOk" ref="modal">
    <b-container>
      <b-row align-h="center">
        <b-col cols="4">
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              :state="quantityState"
              label="Quantity"
              label-for="quantityInput"
              invalid-feedback="Quantity is required"
            >
              <b-form-input
                size="lg"
                id="quantityInput"
                v-model="shopCartModal.quantity"
                :state="quantityState"
                type="number"
                required
                min="0"
              ></b-form-input>
            </b-form-group>
          </form>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="2" id="buttonCol">
          <b-button @click="Add">
            <font-awesome-icon class="fa-3x" icon="plus"/>
          </b-button>
        </b-col>
        <b-col cols="2" id="buttonCol">
          <b-button @click="Remove">
            <font-awesome-icon class="fa-3x" icon="minus"/>
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import ShopCartService from "@/api-services/shopCart.service";
export default {
  data() {
    return {
      quantityState: null
    };
  },
  props: {
    shopCartModal: {}
  },
  methods: {
    Add() {
      this.shopCartModal.quantity = parseInt(this.shopCartModal.quantity);
      if (
        this.shopCartModal.quantity >= 0 ||
        this.shopCartModal.quantity === ""
      ) {
        this.shopCartModal.quantity += 1;
      }
    },
    Remove() {
      this.shopCartModal.quantity = parseInt(this.shopCartModal.quantity);
      if (this.shopCartModal.quantity > 0) {
        this.shopCartModal.quantity -= 1;
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.AddToShopCart();
        this.$refs.modal.hide();
      });
    },
    AddToShopCart() {
      if (this.shopCartModal.quantity > 0) {
        ShopCartService.create(this.shopCartModal).then(response => {
          this.$router.push({ name: "Home" });
        });
      }
      if (this.shopCartModal.quantity === 0) {
        ShopCartService.delete(this.shopCartModal.id);
      }
    }
  }
};
</script>

<style scoped>
#buttonCol {
  margin: 5px;
}
</style>
