<template>
  <b-modal id="modalRemoveFromStock" size="xl" title="Add To Cart" @ok="handleOk" ref="modal">
    <b-container>
      <div v-if="productVersionSelected">
        <b-row align-h="center">
          <b-col cols="2">
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                label="Quantity"
                label-for="quantityInput"
                invalid-feedback="Quantity is required"
              >
                <b-form-input
                  size="lg"
                  id="quantityInput"
                  v-model="quantity"
                  type="number"
                  required
                  min="0"
                ></b-form-input>
              </b-form-group>
            </form>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols="1" id="buttonCol">
            <b-button @click="Add">
              <font-awesome-icon class="fa-3x" icon="plus"/>
            </b-button>
          </b-col>
          <b-col cols="1" id="buttonCol">
            <b-button @click="Remove">
              <font-awesome-icon class="fa-3x" icon="minus"/>
            </b-button>
          </b-col>
        </b-row>
      </div>

      <b-row>
        <b-table
          id="productVersionTable"
          selectable
          selectedVariant="success"
          select-mode="single"
          :items="productVersions"
          :fields="fields"
          flex
          @row-selected="rowSelected"
        ></b-table>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import ProductVersionService from "@/api-services/productVersion.service";
export default {
  data() {
    return {
      quantity: 0,
      productVersion: {},
      productVersionSelected: false,
      fields: [
        { key: "product.productName", label: "Product", sortable: true },
        { key: "quantityInStock", label: "Stock", sortable: true },
        {
          key: "dayOfPurchase",
          label: "Date of purchase",
          sortable: true
        },
        {
          key: "expirationDate",
          label: "Date of expiration",
          sortable: true
        },
        {
          key: "supplier.supplierName",
          label: "Supplier",
          sortable: true
        }
      ]
    };
  },
  props: {
    productVersions: Array
  },
  methods: {
    Remove() {
      if (this.quantity > 0) {
        this.quantity -= 1;
      }
    },
    Add() {
      this.productVersionSelected = false;
      if (
        this.quantity >= 0 &&
        this.quantity < this.productVersion.quantityInStock
      ) {
        this.quantity += 1;
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
        this.productVersion.quantityInStock = this.quantity;
        ProductVersionService.update(
          this.productVersion.id,
          this.productVersion
        ).then(response => {
          this.$emit("updateProduct");
          this.$refs.modal.hide();
        });
      });
    },
    rowSelected(item) {
      if (item.length === 0) {
        this.productVersion = { quantityInStock: 0 };
        this.quantity = 0;
        this.productVersionSelected = false;
      } else {
        this.productVersionSelected = true;
        this.productVersion = item[0];
        this.quantity = item[0].quantityInStock;
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
