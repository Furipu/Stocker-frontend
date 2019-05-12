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
            <treeselect
            v-model= "product.categoryId"
            :options="categories"
            :disable-branch-nodes="true"
            :show-count="true"
            placeholder="Where are you from?"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="SatusName" label="Status: " label-for="statusName">
              <b-form-select v-model="statuses.id" :options="statuses"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="QualityName" label="Quality: " label-for="qualityName">
              <b-form-select v-model="qualities.id" :options="qualities"></b-form-select>
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
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="MetricName" label="Metric: " label-for="metricName">
              <b-form-select v-model="metrics.id" :options="metrics"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="DefaultMetricName" label="Default Metric: " label-for="metricName">
              <b-form-select v-model="metrics.id" :options="metrics"></b-form-select>
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
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: { Treeselect },
  data() {
    return {
      product: {},
      // set default value for treeselect
      value: null,
      categories: [],
      normalizer(treeData) {
        return {
          label: treeData.categoryName
        };
      },
      statuses: [],
      qualities: [],
      metrics: []
    };
  },
  created() {
    if (this.$route.params.id !== undefined) {
      ProductService.get(this.$route.params.id).then(response => {
        this.product = response.data;
      });
    }
    this.getallCategories();
    this.getAllStatuses();
    this.getAllQualities();
    this.getAllMetrics();
  },
  methods: {
    updateProduct() {
      if (this.product.id === undefined || this.product.id === null) {
        ProductService.create(this.product).then(response => {
          this.$router.push({ name: "products" });
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
        this.categories = response.data;
      });
    },

    getAllStatuses() {
      StatusService.getAll().then(response => {
        response.data.forEach(element => {
          this.statuses.push({ value: element.id, text: element.statusName });
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
        });
      });
    }
  }
};
</script>
