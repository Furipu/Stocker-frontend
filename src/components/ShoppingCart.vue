test
<template>
  <b-container fluid>
    <b-table
      id="shopCartTalbe"
      :items="shopCarts"
      :fields="fields"
      responsive
      flex
      :busy="isBusy"
      :filter="filter"
    >
      <!------------------------ busy ------------------------->
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"/>
        <strong>Loading...</strong>
      </div>
      <!------------------------ delete ------------------------->
      <template slot="delete" slot-scope="row">
        <b-button
          variant="outline-dark"
          v-b-tooltip.hover
          title="Delete"
          data-toggle="modal"
          data-target="#deleteModal"
          @click="Delete(row.item.id)"
        >
          <font-awesome-icon icon="trash-alt"/>
        </b-button>
      </template>
      <!------------------------ edit ------------------------->
      <template slot="edit" slot-scope="row">
        <router-link :to="{name: 'postcity/edit', params: { id: row.item.id }}">
          <b-button variant="outline-dark" v-b-tooltip.hover title="Edit">
            <font-awesome-icon icon="edit"/>
          </b-button>
        </router-link>
      </template>
      <!----------------------------------------------------->
    </b-table>
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="col-12 modal-title text-center" id="exampleModalLongTitle">Are you sure?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <font-awesome-icon class="fa-10x fa-spin" style="color: Tomato" icon="times-circle"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="Delete()"
              data-dismiss="modal"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import ShopCartService from "@/api-services/shopCart.service";
export default {
  data() {
    return {
      shopCarts: [],
      filter: null,
      isBusy: false,
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
          console.log(this.shopCarts);
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
    Delete(id) {
      this.toggleBusy();
      ShopCartService.delete(id).then(response => {
        this.getShopCarts();
      });
    },
    SetIdForDelete(id) {
      this.id = id;
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
