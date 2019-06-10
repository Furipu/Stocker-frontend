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
                <b-row no-gutters>
                  <b-col>
                    <treeselect
                      v-model="product.categoryId"
                      :options="categories"
                      :normalizer="normalizer"
                      :disable-branch-nodes="true"
                    />
                  </b-col>
                  <b-col cols="1">
                    <b-button
                      variant="outline-secondary"
                      v-b-tooltip.hover
                      title="Add"
                      v-b-modal.modalAdd
                      @click="showModalCategory"
                    >
                      <font-awesome-icon icon="plus"/>
                    </b-button>
                  </b-col>
                </b-row>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="locationName" label="Location: " label-for="product.location">
              <b-row no-gutters>
                <b-col>
                  <treeselect
                    v-model="product.locationId"
                    :options="locations"
                    :normalizer="normalizerLocation"
                    :disable-branch-nodes="true"
                  />
                </b-col>
                <b-col cols="1">
                  <b-button
                    variant="outline-secondary"
                    v-b-tooltip.hover
                    title="Add"
                    v-b-modal.modalAdd
                    @click="showModalLocation"
                  >
                    <font-awesome-icon icon="plus"/>
                  </b-button>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="quantity" label="Quantity: " label-for="quantityBought">
              <b-form-input
                id="quantityBought"
                type="number"
                v-model="productVersion.quantityInStock"
                required
                placeholder="Enter quantity"
                min="0"
              />
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group id="BrandName" label="Brand: " label-for="product.brand">
              <b-input-group>
                <b-form-select v-model="product.brandId" :options="brands"></b-form-select>
                <b-button
                  @click="createBrand"
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
            <b-form-group id="SupplierName" label="Supplier: " label-for="supplierName">
              <b-input-group>
                <b-form-select v-model="productVersion.supplierId" :options="suppliers"></b-form-select>
                <b-button
                  variant="outline-secondary"
                  v-b-tooltip.hover
                  title="Add"
                  @click="createSupplier"
                >
                  <font-awesome-icon icon="plus"/>
                </b-button>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="isAddBrand">
          <b-col>
            <b-jumbotron header="Add Brand">
              <AddBrand v-on:updateBrandModal="updateBrandModal"/>
            </b-jumbotron>
          </b-col>
        </b-row>
        <b-row v-if="isAddSupplier">
          <b-col>
            <b-jumbotron header="Add Supplier">
              <AddSupplier v-on:updateSupplierModal="updateSupplierModal"/>
            </b-jumbotron>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="StatusName" label="Status: " label-for="statusName">
              <b-input-group>
                <b-form-select v-model="product.statusId" :options="statuses"></b-form-select>
                <b-button
                  @click="createStatus"
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
                <b-button
                  @click="createQuality"
                  variant="outline-secondary"
                  v-b-tooltip.hover
                  title="Add"
                >
                  <font-awesome-icon icon="plus"/>
                </b-button>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="isAddStatus">
          <b-col>
            <b-jumbotron header="Add Status">
              <AddStatus v-on:updateStatusModal="updateStatusModal"/>
            </b-jumbotron>
          </b-col>
        </b-row>
        <b-row v-if="isAddQuality">
          <b-col>
            <b-jumbotron header="Add Quality">
              <AddQuality v-on:updateQualityModal="updateQualityModal"/>
            </b-jumbotron>
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
                <b-button
                  variant="outline-secondary"
                  v-b-tooltip.hover
                  title="Add"
                  @click="createMetric"
                >
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
        <b-row v-if="isAddMetric">
          <b-col>
            <b-jumbotron header="Add Metric">
              <AddMetric v-on:updateMetricModal="updateMetricModal"/>
            </b-jumbotron>
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
    <b-modal size="xl" id="modalAdd" title="Add" ref="modal">
      <AddCategory v-if="isAddCategory" v-on:getAllCategories="getAllCategories"/>
      <AddLocation v-if="isAddLocation" v-on:getAllLocations="getAllLocations"/>
    </b-modal>
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
import AddSupplier from "@/components/Supplier/AddEditComponent";
import AddMetric from "@/components/Metric/AddEditComponent";
import AddBrand from "@/components/Brand/AddEditComponent";
import AddStatus from "@/components/Status/AddEditComponent";
import AddQuality from "@/components/Quality/AddEditComponent";
import AddCategory from "@/components/Category/IndexComponent";
import AddLocation from "@/components/Location/IndexComponent";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    Treeselect,
    AddSupplier,
    AddMetric,
    AddBrand,
    AddStatus,
    AddQuality,
    AddCategory,
    AddLocation
  },
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
      locations: [],
      isAddSupplier: false,
      isAddMetric: false,
      isAddBrand: false,
      isAddStatus: false,
      isAddQuality: false,
      isAddCategory: false,
      isAddLocation: false
    };
  },
  created() {
    if (this.$route.params.id !== undefined) {
      ProductService.get(this.$route.params.id).then(response => {
        this.product = response.data;
      });
    }
    this.getAllCategories();
    this.getAllLocations();
    this.getAllStatuses();
    this.getAllBrands();
    this.getAllSuppliers();
    this.getAllQualities();
    this.getAllMetrics();

    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      if (bvEvent.type === "hide") {
        this.isAddCategory = false;
        this.isAddLocation = false;
      }
    });
  },
  methods: {
    updateProduct() {
      if (this.product.id === undefined || this.product.id === null) {
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
    getAllCategories() {
      this.$bvModal.hide(this.modalAdd);
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
      this.statuses = [];
      StatusService.getAll().then(response => {
        response.data.forEach(element => {
          this.statuses.push({ value: element.id, text: element.statusName });
        });
      });
    },
    getAllBrands() {
      this.brands = [];
      BrandService.getAll().then(response => {
        response.data.forEach(element => {
          this.brands.push({ value: element.id, text: element.brandName });
        });
      });
    },
    getAllSuppliers() {
      this.suppliers = [];
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
      this.qualities = [];
      QualityService.getAll().then(response => {
        response.data.forEach(element => {
          this.qualities.push({ value: element.id, text: element.qualityName });
        });
      });
    },
    getAllMetrics() {
      this.metrics = [];
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
      this.$bvModal.hide(this.modalAdd);
      LocationService.getAll().then(response => {
        this.CleanChildrenFromList(response.data);
        this.locations = response.data;
      });
    },
    createSupplier() {
      this.$store.commit("setAdress", {});
      this.isAddSupplier = true;
      this.$store.commit("setSupplierFromModal", true);
    },
    updateSupplierModal() {
      this.isAddSupplier = false;
      this.getAllSuppliers();
    },
    createMetric() {
      this.isAddMetric = true;
      this.$store.commit("setMetricFromModal", true);
    },
    updateMetricModal() {
      this.isAddMetric = false;
      this.getAllMetrics();
    },
    createBrand() {
      this.isAddBrand = true;
      this.$store.commit("SetBrandFromModal", true);
    },
    updateBrandModal() {
      this.isAddBrand = false;
      this.getAllBrands();
    },
    createStatus() {
      this.isAddStatus = true;
      this.$store.commit("SetStatusFromModal", true);
    },
    updateStatusModal() {
      this.isAddStatus = false;
      this.getAllStatuses();
    },
    createQuality() {
      this.isAddQuality = true;
      this.$store.commit("SetQualityFromModal", true);
    },
    updateQualityModal() {
      this.isAddQuality = false;
      this.getAllQualities();
    },
    showModalCategory() {
      this.isAddCategory = true;
    },
    showModalLocation() {
      this.isAddLocation = true;
    }
  }
};
</script>
