<template>
  <div>
    <b-form @submit.prevent="updateMetric">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-form-group id="metricName" label="Name: " label-for="metricName">
              <b-form-input
                id="metricName"
                type="text"
                v-model="metric.metricName"
                required
                placeholder="Enter metric"
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
import MetricService from "@/api-services/metric.service";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      metric: {}
    };
  },
  computed: {
    ...mapGetters(["IsMetricFromModal"])
  },
  created() {
    if (this.$route.params.id !== undefined) {
      MetricService.get(this.$route.params.id).then(response => {
        this.metric = response.data;
      });
    }
  },
  methods: {
    updateMetric() {
      if (this.metric.id === undefined || this.metric.id === null) {
        MetricService.create(this.metric).then(response => {
          if (this.IsMetricFromModal) {
            this.$emit("updateMetricModal");
          } else {
            this.$router.push({ name: "metrics" });
          }
        });
      } else {
        MetricService.update(this.$route.params.id, this.metric).then(
          response => {
            this.$router.push({ name: "metrics" });
          }
        );
      }
    },
    Cancel(evt) {
      evt.preventDefault();
      if (this.IsMetricFromModal) {
        this.$emit("updateMetricModal");
      } else {
        this.$router.push({ name: "metrics" });
      }
    }
  }
};
</script>
