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
        <b-button
          v-if="productState === 'Default' || productState === 'AddToStock'"
          class="btn btn-primary"
          @click="CreateProduct()"
        >Create Product</b-button>
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
      <!------------------------ buttons ------------------------->
      <template slot="action" slot-scope="row">
        <b-button-group>
          <b-button
            v-if="productState === 'Default'"
            variant="outline-dark"
            v-b-tooltip.hover
            title="Delete"
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
          <b-button
            v-if="productState === 'AddToChart'"
            variant="outline-dark"
            v-b-modal.modalAddToChart
            v-b-tooltip.hover
            @click="AddToChart(row.item.id)"
            title="Add Chart"
          >
            <font-awesome-icon icon="cart-plus"/>
          </b-button>
          <b-button
            v-if="productState === 'AddToStock'"
            variant="outline-dark"
            v-b-tooltip.hover
            v-b-modal.modalAddToStock
            title="Add Stock"
            @click="AddToStock(row.item.id)"
          >
            <font-awesome-icon icon="plus"/>
          </b-button>
          <b-button
            v-if="productState === 'RemoveFromStock'"
            variant="outline-dark"
            v-b-modal.modalRemoveFromStock
            v-b-tooltip.hover
            title="Delete Stock"
            @click="RemoveFromStock(row.item.id)"
          >
            <font-awesome-icon icon="minus"/>
          </b-button>
        </b-button-group>
      </template>
      <!--------------------------------------------------->
    </b-table>
    <AddToCartModal :shopCartModal="shopCart"/>
    <AddToStockModal :productVersion="productVersion" v-on:updateProduct="getProducts"/>
    <RemoveFromStockModal :productVersions="productVersions" v-on:updateProduct="getProducts"/>
  </b-container>
</template>

<script>
import ProductService from "@/api-services/product.service";
import ProductVersionService from "@/api-services/productVersion.service";
import AddToCartModal from "@/components/Modal/AddToCartModal";
import AddToStockModal from "@/components/Modal/AddToStockModal";
import RemoveFromStockModal from "@/components/Modal/RemoveFromStockModal";
import ShopCartService from "@/api-services/shopCart.service";
import axios from "axios";
import { mapGetters } from "vuex";
// import ProductState from "@/common/constants";
export default {
  components: {
    AddToCartModal,
    AddToStockModal,
    RemoveFromStockModal
  },
  data() {
    return {
      products: [],
      filter: null,
      isBusy: false,
      shopCart: {},
      productVersions: [],
      productVersion: {
        quantityInStock: 0,
        product: {
          productName: "",
          category: {
            categoryName: ""
          },
          location: {
            locationName: ""
          },
          brand: {
            brandName: ""
          },
          status: {
            statusName: ""
          },
          quality: {
            qualityName: ""
          }
        }
      },
      productId: 0,
      fields: [
        { key: "productName", label: "Product", sortable: true },
        { key: "category.categoryName", label: "Category", sortable: true },
        { key: "quantityInStock", label: "Stock", sortable: false },
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
          if (this.isBusy) {
            this.toggleBusy();
          }
        });
      } catch (e) {
        this.$auth.loginRedirect();
      }
    },
    AddToChart(id) {
      ShopCartService.getByProductId(id)
        .then(response => {
          this.shopCart = response.data;
        })
        .catch(error => {
          this.makeToastError(error);
        });
    },
    AddToStock(id) {
      ProductVersionService.getDefault(id)
        .then(response => {
          this.productVersion = response.data;
        })
        .catch(error => {
          this.makeToastError(error);
        });
    },
    RemoveFromStock(id) {
      ProductVersionService.getByProductId(id)
        .then(response => {
          this.productVersions = response.data;
        })
        .catch(error => {
          this.makeToastError(error);
        });
    },
    makeToastError(error) {
      this.$bvToast.toast(`Er is een fout opgetreden :  ${error}`, {
        title: "Error",
        autoHideDelay: 3000,
        appendToast: true
      });
    },
    CreateProduct() {
      this.$store.commit("setSupplierFromModal", true);
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
