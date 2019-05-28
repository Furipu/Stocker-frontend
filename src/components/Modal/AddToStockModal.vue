<template>
  <b-modal id="modalAddToStock" size="xl" title="Add To Stock" @ok="handleOk" ref="modal" lazy>
    <b-container>
      <b-form @submit.prevent="updateProduct">
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <b-form-group id="productName" label="Name: " label-for="productName">
                <b-form-input
                  id="productName"
                  type="text"
                  v-model="productModal.productName"
                  disabled
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="StatusName" label="Status: " label-for="statusName">
                <b-form-input v-model="productModal.status.statusName" disabled/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="productModal.category"
                label="Category: "
                label-for="productModal.category"
              >
                <b-form-input v-model="productModal.category.categoryName" disabled/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="QualityName" label="Quality: " label-for="qualityName">
                <b-form-input v-model="productModal.quality.qualityName" disabled/>
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
                <b-form-input v-model="productModal.location.locationName" disabled/>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="BrandName" label="Brand: " label-for="productVersion.brand">
                <b-form-input v-model="productModal.brand.brandName" disabled/>
              </b-form-group>
            </b-col>

          </b-row>
          <b-row>
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
          <b-row>
            <b-col>
              <b-form-group id="latestPrice" label="Price: " label-for="latestPrice">
                <b-form-input
                  id="latestPrice"
                  type="number"
                  v-model="productVersion.latestPrice"
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
                  <b-button variant="outline-secondary" v-b-tooltip.hover title="Add">
                    <font-awesome-icon icon="plus"/>
                  </b-button>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="DefaultMetricName" label="Default Metric: " label-for="metricName">
                <b-form-select v-model="productVersion.defaultMetricId" :options="metrics"></b-form-select>
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
// import ProductVersionService from "@/api-services/productVersion.service";
export default {
  data() {
    return {
      productVersion: {},
      metrics: [],
      defaultMetrics: [],
      suppliers: []
    };
  },
  props: {
    productModal: {}
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
        this.$refs.modal.hide();
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      return valid;
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
    }
  }
};
</script>
