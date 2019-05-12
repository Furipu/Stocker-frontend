<template>
  <div>
    <b-form @submit.prevent="updateCountry">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-form-group id="countryName" label="Name: " label-for="countryName">
              <b-form-input
                id="countryName"
                type="text"
                v-model="country.countryName"
                required
                placeholder="Enter country"
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
import CountryService from "@/api-services/country.service";
export default {
  data() {
    return {
      country: {}
    };
  },
  created() {
    if (this.$route.params.id !== undefined) {
      CountryService.get(this.$route.params.id).then(response => {
        this.country = response.data;
      });
    }
  },
  methods: {
    updateCountry() {
      if (this.country.id === undefined || this.country.id === null) {
        CountryService.create(this.country).then(response => {
          this.$router.push({ name: "countries" });
        });
      } else {
        CountryService.update(this.$route.params.id, this.country).then(
          response => {
            this.$router.push({ name: "countries" });
          }
        );
      }
    },
    Cancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: "countries" });
    }
  }
};
</script>
