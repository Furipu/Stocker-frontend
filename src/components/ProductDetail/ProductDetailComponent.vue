<template>
  <div>
    <b-table
      id="productversionTable"
      :items="productversions"
      :fields="fieldsProductversion"
      responsive
      small
      striped
      primary-key="id"
      :tbody-transition-props="transProps"
    ></b-table>
  </div>
</template>

<script>
export default {
  props: ["productId"],
  data() {
    return {
      productversions: [],
      fieldsProductversion: [
        { key: "supplier.supplierName", label: "Product id", sortable: true },
        { key: "lowestPrice", label: "lowest price", sortable: true },
        { key: "latestPrice", label: "last price", sortable: true }
      ],
      transProps: {
        // Transition name
        name: "flip-list"
      }
    };
  },
  mounted() {
    this.toggleBusy();
    this.getProductsversion();
  },
  methods: {
    getProductsversion() {
      let uri = `/api/productversion/get/${this.productId}`;
      this.axios
        .get(uri)
        .then(response => {
          this.productversions = response.data;
          this.toggleBusy();
        })
        .catch(function(error) {
          console.log(error.response.data);
          this.toggleBusy();
        });
    },
    toggleBusy() {
      this.isBusy = !this.isBusy;
    }
  }
};
</script>

<style scoped>
table#productversionTable .flip-list-move {
  transition: transform 0.2s;
}
</style>
