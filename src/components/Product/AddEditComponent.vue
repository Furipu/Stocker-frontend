<template>
  <div>
    <b-form @submit.prevent="updateProduct">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-form-group id="productName" label="Name: " label-for="productName">
              <b-form-input
                id="productName"
                type="text"
                v-model="product.productName"
                required
                placeholder="Enter product"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="category.categoryId" label="Category: " label-for="category">
              <b-input-group>
                <treeselect
                  v-model="product.categoryId"
                  :options="categories"
                  :normalizer="normalizer"
                  :disable-branch-nodes="true"
                />
                 <b-button variant="outline-dark" v-b-tooltip.hover title="Add">
                  <font-awesome-icon icon="plus"/>
                </b-button>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="quantity" label="Quantity: " label-for="quantityBought">
              <b-form-input
                id="quantityBought"
                type="number"
                v-model="product.quantityInStock"
                required
                placeholder="Enter quantity"
                min="0"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="locationName" label="Location: " label-for="product.location">
              <treeselect
                v-model="product.locationId"
                :options="locations"
                :normalizer="normalizerLocation"
                :disable-branch-nodes="true"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="BrandName" label="Brand: " label-for="product.brand">
              <b-input-group>
                <b-form-select v-model="product.brandId" :options="brands"></b-form-select>
                <b-button variant="outline-secondary" v-b-tooltip.hover title="Add">
                  <font-awesome-icon icon="plus"/>
                </b-button>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="SupplierName" label="Supplier: " label-for="supplierName">
              <b-input-group>
                <b-form-select v-model="productVersion.supplierId" :options="suppliers"></b-form-select>
                <b-button variant="outline-secondary" v-b-tooltip.hover title="Add">
                  <font-awesome-icon icon="plus"/>
                </b-button>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="StatusName" label="Status: " label-for="statusName">
              <b-input-group>
                <b-form-select v-model="product.statusId" :options="statuses"></b-form-select>
                <b-button
                  variant="outline-secondary"
                  v-b-tooltip.hover
                  title="Add"
                >
                  <font-awesome-icon icon="plus"/>
                </b-button>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="QualityName" label="Quality: " label-for="qualityName">
              <b-input-group>
                <b-form-select v-model="product.qualityId" :options="qualities"></b-form-select>
                <b-button variant="outline-secondary" v-b-tooltip.hover title="Add">
                  <font-awesome-icon icon="plus"/>
                </b-button>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="latestPrice" label="Price: " label-for="latestPrice">
              <b-form-input
                id="latestPrice"
                type="number"
                v-model="product.latestPrice"
                required
                placeholder="Enter price"
                min="0"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="MetricName" label="Metric: " label-for="metricName">
              <b-input-group>
                <b-form-select v-model="product.metricId" :options="metrics"></b-form-select>
                <b-button variant="outline-secondary" v-b-tooltip.hover title="Add">
                  <font-awesome-icon icon="plus"/>
                </b-button>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="DefaultMetricName" label="Default Metric: " label-for="metricName">
              <b-form-select v-model="product.defaultMetricId" :options="metrics"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="PricePerUnit" label="Price per unit: " label-for="pricePerUnit">
              <b-form-input
                id="pricePerUnit"
                type="number"
                v-model="product.latestPricePerUnit"
                disabled
                min="0"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="DayOfPurchase" label="Day of purchase: " label-for="dayOfPurchase">
              <b-form-input id="dayOfPurchase" type="date" v-model="productVersion.dayOfPurchase"/>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="ExpirationDate"
              label="Day of expiration: "
              label-for="expirationDate"
            >
              <b-form-input
                id="expirationDate"
                type="date"
                v-model="productVersion.expirationDate"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary">Save</b-button>
        <b-button type="button" @click="Cancel">Cancel</b-button>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import ProductService from "@/api-services/product.service";
import StatusService from "@/api-services/status.service";
import QualityService from "@/api-services/quality.service";
import MetricService from "@/api-services/metric.service";
import CategoryService from "@/api-services/category.service";
import LocationService from "@/api-services/location.service";
import BrandService from "@/api-services/brand.service";
import SupplierService from "@/api-services/supplier.service";
import ProductVersionService from "@/api-services/productVersion.service";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: { Treeselect },
  data() {
    return {
      product: {},
      productVersion: {},
      // set default value for treeselect
      category: null,
      location: null,
      categories: [],
      normalizer(treeData) {
        return {
          id: treeData.id,
          label: treeData.categoryName
        };
      },
      normalizerLocation(treeData) {
        return {
          id: treeData.id,
          label: treeData.locationName
        };
      },
      statuses: [],
      brands: [],
      suppliers: [],
      qualities: [],
      metrics: [],
      defaultMetrics: [],
      locations: []
    };
  },
  created() {
    if (this.$route.params.id !== undefined) {
      ProductService.get(this.$route.params.id).then(response => {
        this.product = response.data;
      });
    }
    this.getallCategories();
    this.getAllLocations();
    this.getAllStatuses();
    this.getAllBrands();
    this.getAllSuppliers();
    this.getAllQualities();
    this.getAllMetrics();
  },
  methods: {
    updateProduct() {
      if (this.product.id === undefined || this.product.id === null) {
        this.productVersion.quantityInStock = this.product.quantityInStock;
        this.productVersion.quantityPurchased = this.product.quantityInStock;
        this.productVersion.price = this.product.latestPrice;
        this.productVersion.pricePerUnit = this.product.latestPricePerUnit;
        ProductService.create(this.product).then(response => {
          this.productVersion.productId = response.data.id;
          this.productVersion.metricId = response.data.metricId;
          ProductVersionService.create(this.productVersion).then(response => {
            this.$router.push({ name: "products" });
          });
        });
      } else {
        ProductService.update(this.$route.params.id, this.product).then(
          response => {
            this.$router.push({ name: "products" });
          }
        );
      }
    },
    Cancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: "products" });
    },
    getallCategories() {
      CategoryService.getAll().then(response => {
        this.CleanChildrenFromList(response.data);
        this.categories = response.data;
      });
    },
    CleanChildrenFromList(data) {
      data.forEach(element => {
        if (element.children.length === 0) {
          delete element.children;
        } else {
          this.CleanChildrenFromList(element.children);
        }
      });
    },
    getAllStatuses() {
      StatusService.getAll().then(response => {
        response.data.forEach(element => {
          this.statuses.push({ value: element.id, text: element.statusName });
        });
      });
    },
    getAllBrands() {
      BrandService.getAll().then(response => {
        response.data.forEach(element => {
          this.brands.push({ value: element.id, text: element.brandName });
        });
      });
    },
    getAllSuppliers() {
      SupplierService.getAll().then(response => {
        response.data.forEach(element => {
          this.suppliers.push({
            value: element.id,
            text: element.supplierName
          });
        });
      });
    },
    getAllQualities() {
      QualityService.getAll().then(response => {
        response.data.forEach(element => {
          this.qualities.push({ value: element.id, text: element.qualityName });
        });
      });
    },
    getAllMetrics() {
      MetricService.getAll().then(response => {
        response.data.forEach(element => {
          this.metrics.push({ value: element.id, text: element.metricName });
          this.defaultMetrics.push({
            value: element.id,
            text: element.metricName
          });
        });
      });
    },
    getAllLocations() {
      LocationService.getAll().then(response => {
        this.CleanChildrenFromList(response.data);
        this.locations = response.data;
      });
    }
  }
};
</script>
