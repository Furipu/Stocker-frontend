<template>
  <b-container fluid>
    <h1>Product</h1>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"/>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="text-right">
        <b-button class="btn btn-primary" @click="CreateProduct()">Create Product</b-button>
      </b-col>
    </b-row>

    <b-table
      id="productTalbe"
      :items="products"
      :fields="fields"
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
        <router-link :to="{name: 'product/edit', params: { id: row.item.id }}">
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
import ProductService from "@/api-services/product.service";
export default {
  data() {
    return {
      products: [],
      filter: null,
      isBusy: false,
      fields: [
        { key: "productName", label: "Product", sortable: true },
        { key: "numberInStock", label: "Stock", sortable: false },
        {
          key: "latestePricePerUnit",
          label: "Latest price per unit",
          sortable: false
        },
        {
          key: "lowestPricePerUnit",
          label: "Lowest price per unit",
          sortable: false
        },
        { key: "delete", label: "", class: "columnButton" },
        { key: "edit", label: "", class: "columnButton" }
      ]
    };
  },

  mounted() {
    this.toggleBusy();
    this.getProducts();
  },
  methods: {
    getProducts() {
      ProductService.getAll()
        .then(response => {
          this.products = response.data;
          this.toggleBusy();
        })
        .catch(function() {
          this.$router.push({ name: "NotFound" });
        });
    },
    CreateProduct() {
      this.$router.push({ name: "product/create" });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    Delete(id) {
      this.toggleBusy();
      ProductService.delete(id).then(response => {
        this.getProducts();
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
