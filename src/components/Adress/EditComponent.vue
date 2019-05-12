<template>
  <div>
    <b-form @submit.prevent="UpdateBrand">
      <b-form-group id="streetGroup" label="street" label-for="street">
        <b-form-input id="street" type="text" v-model="adress.street"/>
      </b-form-group>
      <b-form-group id="numberGroup" label="Number:" label-for="number">
        <b-form-input id="number" type="number" v-model="adress.streetNumber"/>
      </b-form-group>
      <b-form-group id="busGroup" label="Bus:" label-for="bus">
        <b-form-input id="bus" type="text" v-model="adress.streetBus"/>
      </b-form-group>
      <b-form-group id="postcodeGroup" label="Postal Code:" label-for="postcode">
        <vue-bootstrap-typeahead
          :v-model="adress.postcity"
          :data="postcities"
          :serializer="s => s.postCode"
          @hit="updateCity"
          ref="postcode"
        >
          <template slot="suggestion" slot-scope="{ data, htmlText }">
            <div class="d-flex align-items-center">
              <span v-html="htmlText"></span>
              <span class="ml-4">{{data.city}}</span>
            </div>
          </template>
        </vue-bootstrap-typeahead>
      </b-form-group>
      <b-form-group id="cityGroup" label="City:" label-for="city">
        <vue-bootstrap-typeahead
          :v-model="adress.postcity"
          :data="postcities"
          :serializer="s => s.city"
          @hit="updatePostcode"
          ref="city"
        >
          <template slot="suggestion" slot-scope="{ data, htmlText }">
            <div class="d-flex align-items-center">
              <span>{{data.postcode}}</span>
              <span class="ml-4" v-html="htmlText"></span>
            </div>
          </template>
        </vue-bootstrap-typeahead>
      </b-form-group>
      <b-form-group id="countryGroup" label="Country:" label-for="country">
        <vue-bootstrap-typeahead
          :v-model="adress.country"
          :data="countries"
          :serializer="s => s.countryName"
          @hit="updateCountry"
          ref="country"
        ></vue-bootstrap-typeahead>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
// import { EventBus } from "@/router/index";
import { mapState } from "vuex";
// import { mapGetters } from "vuex";
import CountryService from "@/api-services/country.service";
import PostCityService from "@/api-services/postCity.service";
export default {
  data() {
    return {
      postcities: [],
      countries: []
    };
  },
  computed: {
    ...mapState(["adress"])
  },
  mounted() {
    this.setAdress();
  },

  methods: {
    setAdress() {
      PostCityService.getAll().then(response => {
        this.postcities = response.data;
        CountryService.getAll().then(response => {
          this.countries = response.data;
          if (this.adress.id !== undefined) {
            if (this.adress.postcity !== null) {
              this.$refs.city.inputValue = this.adress.postCity.city;
              this.$refs.postcode.inputValue = this.adress.postCity.postCode;
            }
            if (this.adress.country !== null) {
              this.$refs.country.inputValue = this.adress.country.countryName;
            }
          } else {
            this.$refs.country.inputValue = this.countries[0].countryName;
            this.adress.country = this.countries[0];
          }
        });
      });
    },

    updatePostcode(q) {
      this.$refs.postcode.inputValue = q.postCode;
      this.adress.postcity = q;
    },
    updateCity(q) {
      this.$refs.city.inputValue = q.city;
      this.adress.postcity = q;
    },
    updateCountry(q) {
      this.adress.country = q;
    }
  }
};
</script>

<style>
.adressContainer {
  padding: 0;
}
</style>
