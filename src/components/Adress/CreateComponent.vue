<template>
  <div>
    <div class="container adressContainer">
      <!-----StreetField------>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Street:</label>
            <input type="text" class="form-control" v-model="adress.street">
          </div>
        </div>
      </div>
      <!-----NumberField------>
      <div class="row">
        <div class="col-md-2">
          <div class="form-group">
            <label>Number:</label>
            <input type="number" min="0" class="form-control" v-model="adress.streetNumber">
          </div>
        </div>
      </div>
      <br>
      <!-----BusField------>
      <div class="row">
        <div class="col-md-2">
          <div class="form-group">
            <label>Bus:</label>
            <input type="text" class="form-control" v-model="adress.streetBus">
          </div>
        </div>
      </div>
      <br>

      <!-----PostCodeField------>
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group">
            <label>Postal Code:</label>
            <vue-bootstrap-typeahead
              :v-model="adress.postcityd"
              :data="postcities"
              :serializer="s => s.postcode"
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
          </div>
        </div>
      </div>
      <br>
      <!-----CityField------>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label>City:</label>
            <vue-bootstrap-typeahead
              :v-model="adress.postcity_id"
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
          </div>
        </div>
      </div>
      <br>
      <!-----CountryieldF------>
      <div class="row">
        <div class="col-sm-4">
          <div class="form-group">
            <label>Country:</label>
            <vue-bootstrap-typeahead
              :v-model="adress.country_d"
              :data="countries"
              :serializer="s => s.country"
              @hit="updateCountry"
              ref="country"
            ></vue-bootstrap-typeahead>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group"></div>
  </div>
</template>

<script>
import { EventBus } from "../../app.js";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import CountryService from "@api-services/country.service";
import PostCityService from "@api-services/postCity.service";
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
    this.getpostcities();
    this.getCountries();
    this.$refs.city.inputValue = this.adress.postcity.city;
    this.$refs.postcode.inputValue = this.adress.postcity.postcode;
    this.$refs.country.inputValue = this.adress.country.country;

    // this.$refs.defaultCountry.inputValue =
    //   this.$store.state.adress.country.country == null
    //     ? "Belgium"
    //     : this.$store.state.adress.country.country;
    // this.adress.countryId =
    //   this.$store.state.adress.country.country == null
    //     ? 17
    //     : this.$store.state.adress.countryId;
  },
  created() {
    EventBus.$on("addAdress", () => {
      this.$store.commit("setAdress", this.adress);
    });
  },
  methods: {
    getpostcities() {
      PostCityService.getAll().then(response => {
        this.postcities = response.data;
      });
    },
    getCountries() {
      CountryService.getAll().then(response => {
        this.countries = response.data;
      });
    },
    updatePostcode(q) {
      this.$refs.postcode.inputValue = q.postcode;
      this.adress.postcity_id = q.id;
    },
    updateCity(q) {
      this.$refs.city.inputValue = q.city;
      this.adress.postcity_id = q.id;
    },
    updateCountry(q) {
      this.adress.countryId = q.id;
    }
  }
};
</script>

<style>
.adressContainer {
  padding: 0;
}
</style>
