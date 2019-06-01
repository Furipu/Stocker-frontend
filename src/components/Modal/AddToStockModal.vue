<template>
  <b-modal id="modalAddToStock" size="xl" title="Add To Stock" @ok="handleOk" ref="modal" lazy>
    <b-container>
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <b-form-group id="productName" label="Name: " label-for="productName">
                <b-form-input
                  id="productName"
                  type="text"
                  v-model="productVersion.product.productName"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="StatusName" label="Status: " label-for="statusName">
                <b-form-input v-model="productVersion.product.status.statusName" disabled/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="productVersion.product.category"
                label="Category: "
                label-for="productVersion.product.category"
              >
                <b-form-input v-model="productVersion.product.category.categoryName" disabled/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="QualityName" label="Quality: " label-for="qualityName">
                <b-form-input v-model="productVersion.product.quality.qualityName" disabled/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="locationName"
                label="Location: "
                label-for="productVersion.location"
              >
                <b-form-input v-model="productVersion.product.location.locationName" disabled/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="BrandName" label="Brand: " label-for="productVersion.brand">
                <b-form-input v-model="productVersion.product.brand.brandName" disabled/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group id="SupplierName" label="Supplier: " label-for="supplierName">
                <b-input-group>
                  <b-form-select v-model="productVersion.supplierId" :options="suppliers"></b-form-select>
                  <b-button
                    variant="outline-secondary"
                    v-b-tooltip.hover
                    title="Add"
                    @click="CreateSupplier"
                  >
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
                  v-model="productVersion.quantityInStock"
                  required
                  placeholder="Enter quantity"
                  min="0"
                />
              </b-form-group>
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
              <b-form-group id="latestPrice" label="Price: " label-for="latestPrice">
                <b-form-input
                  id="latestPrice"
                  type="number"
                  v-model="productVersion.price"
                  required
                  placeholder="Enter price"
                  min="0"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="MetricName" label="Metric: " label-for="metricName">
                <b-input-group>
                  <b-form-select v-model="productVersion.metricId" :options="metrics"></b-form-select>
                  <b-button
                    variant="outline-secondary"
                    v-b-tooltip.hover
                    title="Add"
                    @click="CreateMetric"
                  >
                    <font-awesome-icon icon="plus"/>
                  </b-button>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="DefaultMetricName" label="Default Metric: " label-for="metricName">
                <b-form-select v-model="productVersion.product.metricId" :options="metrics"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="PricePerUnit" label="Price per unit: " label-for="pricePerUnit">
                <b-form-input
                  id="pricePerUnit"
                  type="number"
                  v-model="productVersion.latestPricePerUnit"
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
                <b-form-input
                  id="dayOfPurchase"
                  type="date"
                  v-model="productVersion.dayOfPurchase"
                />
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
        </b-container>
      </b-form>
    </b-container>
  </b-modal>
</template>

<script>
import MetricService from "@/api-services/metric.service";
import SupplierService from "@/api-services/supplier.service";
import ProductVersionService from "@/api-services/productVersion.service";
import AddSupplier from "@/components/Supplier/AddEditComponent";
import AddMetric from "@/components/Metric/AddEditComponent";
import axios from "axios";
export default {
  components: {
    AddSupplier,
    AddMetric
  },
  data() {
    return {
      metrics: [],
      defaultMetrics: [],
      suppliers: [],
      isAddSupplier: false,
      isAddMetric: false
    };
  },
  props: {
    productVersion: Object
  },
  mounted() {
    this.getAllSuppliers();
    this.getAllMetrics();
  },
  methods: {
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
        this.productVersion.productId = this.productVersion.product.id;
        ProductVersionService.create(this.productVersion).then(response => {
          this.$emit("updateProduct");
          this.$router.push({ name: "products" });
        });
        this.$refs.modal.hide();
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      return valid;
    },
    async getAllSuppliers() {
      // eslint-disable-next-line
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${await this.$auth.getAccessToken()}`;
      try {
        SupplierService.getAll().then(response => {
          this.suppliers = [];
          response.data.forEach(element => {
            this.suppliers.push({
              value: element.id,
              text: element.supplierName
            });
          });
        });
      } catch (e) {
        this.$auth.loginRedirect();
      }
    },
    async getAllMetrics() {
      // eslint-disable-next-line
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${await this.$auth.getAccessToken()}`;
      try {
        MetricService.getAll().then(response => {
          this.metrics = [];
          response.data.forEach(element => {
            this.metrics.push({ value: element.id, text: element.metricName });
            this.defaultMetrics.push({
              value: element.id,
              text: element.metricName
            });
          });
        });
      } catch (e) {
        this.$auth.loginRedirect();
      }
    },
    CreateSupplier() {
      this.$store.commit("setAdress", {});
      this.isAddSupplier = true;
      this.$store.commit("setSupplierFromModal", true);
    },
    updateSupplierModal() {
      this.isAddSupplier = false;
      this.getAllSuppliers();
    },
    CreateMetric() {
      this.isAddMetric = true;
      this.$store.commit("setMetricFromModal", true);
    },
    updateMetricModal() {
      this.isAddMetric = false;
      this.getAllMetrics();
    }
  }
};
</script>
