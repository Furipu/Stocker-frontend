<template>
  <div>
    <b-form @submit.prevent="UpdatePostCity">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-form-group id="postcode" label="Postal Code: " label-for="postcode">
              <b-form-input
                id="postcode"
                type="text"
                v-model="postCity.postCode"
                required
                placeholder="Enter postal code"
              />
            </b-form-group>
            <b-form-group id="city" label="City:" label-for="city">
              <b-form-input
                id="city"
                type="text"
                required
                v-model="postCity.city"
                placeholder="Enter city"
              />
            </b-form-group>
            <b-form-group id="province" label="Province:" label-for="province">
              <b-form-input
                id="province"
                type="text"
                v-model="postCity.province"
                placeholder="Enter province"
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
import PostCityService from "@/api-services/postCity.service";
export default {
  data() {
    return {
      postCity: {}
    };
  },
  created() {
    if (this.$route.params.id !== undefined) {
      PostCityService.get(this.$route.params.id).then(response => {
        this.postCity = response.data;
      });
    }
  },
  methods: {
    UpdatePostCity() {
      if (this.postCity.id === undefined || this.postCity.id === null) {
        PostCityService.create(this.postCity).then(response => {
          this.$router.push({ name: "postcities" });
        });
      } else {
        PostCityService.update(this.$route.params.id, this.postCity).then(
          response => {
            this.$router.push({ name: "postcities" });
          }
        );
      }
    },
    Cancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: "postcities" });
    }
  }
};
</script>
