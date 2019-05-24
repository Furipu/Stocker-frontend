<template>
  <b-jumbotron header="Shopping Cart">
    <template slot="lead">Aantal: {{totalQuantity}}</template>
    <b-container fluid>
      <b-table
        id="shopCartTalbe"
        :items="shopCarts"
        :fields="fields"
        selectable
        responsive
        flex
        :busy="isBusy"
        :filter="filter"
        @row-selected="rowSelected"
      >
        <!------------------------ busy ------------------------->
        <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"/>
          <strong>Loading...</strong>
        </div>
        <!----------------------------------------------------->
      </b-table>
    </b-container>
  </b-jumbotron>
</template>

<script>
import ShopCartService from "@/api-services/shopCart.service";
export default {
  data() {
    return {
      shopCarts: [],
      filter: null,
      isBusy: false,
      totalQuantity: 0,
      startQuantity: 0,
      fields: [
        { key: "quantity", label: "Quantity", sortable: true },
        { key: "product.productName", label: "Product Name", sortable: true },
        {
          key: "product.category.categoryName",
          label: "Category",
          sortable: true
        },
        { key: "additionalInfo", label: "additional info", sortable: true }
      ]
    };
  },
  mounted() {
    this.toggleBusy();
    this.getShopCarts();
  },
  methods: {
    getShopCarts() {
      ShopCartService.getAll()
        .then(response => {
          this.shopCarts = response.data;
          this.totalQuantity = this.shopCarts.length;
          this.startQuantity = this.shopCarts.length;
          this.toggleBusy();
        })
        .catch(function(error) {
          this.toggleBusy();
          console.log(error.response.data);
        });
    },
    CreateShopCart() {
      this.$router.push({ name: "postcity/create" });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    rowSelected(items) {
      this.totalQuantity = this.startQuantity - items.length;
    },
    toggleBusy() {
      this.isBusy = !this.isBusy;
    }
  }
};
</script>

<style>
.columnButton {
  max-width: 10px;
}
</style>
