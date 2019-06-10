<template>
  <div>
    <b-form @submit.prevent="updateQuality">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-form-group id="qualityName" label="Name: " label-for="qualityName">
              <b-form-input
                id="qualityName"
                type="text"
                v-model="quality.qualityName"
                required
                placeholder="Enter quality"
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
import QualityService from "@/api-services/quality.service";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      quality: {}
    };
  },
  computed: {
    ...mapGetters(["IsQualityFromModal"])
  },
  created() {
    if (this.$route.params.id !== undefined) {
      QualityService.get(this.$route.params.id).then(response => {
        this.quality = response.data;
      });
    }
  },
  methods: {
    updateQuality() {
      if (this.quality.id === undefined || this.quality.id === null) {
        QualityService.create(this.quality).then(response => {
          if (this.IsQualityFromModal) {
            this.$emit("updateQualityModal");
          } else {
            this.$router.push({ name: "qualities" });
          }
        });
      } else {
        QualityService.update(this.$route.params.id, this.quality).then(
          response => {
            this.$router.push({ name: "qualities" });
          }
        );
      }
    },
    Cancel(evt) {
      evt.preventDefault();
      if (this.IsQualityFromModal) {
        this.$emit("updateQualityModal");
      } else {
        this.$router.push({ name: "qualities" });
      }
    }
  }
};
</script>
