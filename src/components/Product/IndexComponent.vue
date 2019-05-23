<template>
  <b-container fluid>
    <h1>Product</h1>
    <h2>{{productState}}</h2>
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
      id="productTable"
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
      <template slot="action" slot-scope="row">
        <b-button-group>
          <b-button
            v-if="productState === 'Default'"
            variant="outline-dark"
            v-b-tooltip.hover
            title="Delete"
            data-toggle="modal"
            data-target="#deleteModal"
            @click="Delete(row.item.id)"
          >
            <font-awesome-icon icon="trash-alt"/>
          </b-button>
          <router-link
            v-if="productState === 'Default'"
            :to="{name: 'product/edit', params: { id: row.item.id }}"
          >
            <b-button variant="outline-dark" v-b-tooltip.hover title="Edit">
              <font-awesome-icon icon="edit"/>
            </b-button>
          </router-link>
          <router-link
            v-if="productState === 'AddToChart'"
            :to="{name: 'product/edit', params: { id: row.item.id }}"
          >
            <b-button variant="outline-dark" v-b-tooltip.hover title="Add Chart">
              <font-awesome-icon icon="cart-plus"/>
            </b-button>
          </router-link>
          <router-link
            v-if="productState === 'AddToStock'"
            :to="{name: 'product/edit', params: { id: row.item.id }}"
          >
            <b-button variant="outline-dark" v-b-tooltip.hover title="Add Stock">
              <font-awesome-icon icon="plus"/>
            </b-button>
          </router-link>
          <router-link
            v-if="productState === 'RemoveFromStock'"
            :to="{name: 'product/edit', params: { id: row.item.id }}"
          >
            <b-button variant="outline-dark" v-b-tooltip.hover title="Delete Stock">
              <font-awesome-icon icon="minus"/>
            </b-button>
          </router-link>
        </b-button-group>
      </template>
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
import axios from "axios";
import { mapGetters } from "vuex";
// import ProductState from "@/common/constants";
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
        { key: "action", label: "", class: "columnButton" }
      ]
    };
  },
  computed: {
    ...mapGetters(["productState"])
  },
  async created() {
    this.getProducts();
  },
  mounted() {
    this.toggleBusy();
  },
  methods: {
    async getProducts() {
      // eslint-disable-next-line
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${await this.$auth.getAccessToken()}`;
      try {
        ProductService.getAll().then(response => {
          this.products = response.data;
          this.toggleBusy();
        });
      } catch (e) {
        this.$auth.loginRedirect();
      }
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
