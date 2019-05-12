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
export default {
  data() {
    return {
      metric: {}
    };
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
          this.$router.push({ name: "metrics" });
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
      this.$router.push({ name: "metrics" });
    }
  }
};
</script>
