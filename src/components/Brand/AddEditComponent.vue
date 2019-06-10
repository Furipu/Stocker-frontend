<template>
  <div>
    <b-form @submit.prevent="UpdateBrand">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-form-group id="brandNameGroup" label="Name" label-for="brandName">
              <b-form-input
                id="brandName"
                type="text"
                v-model="brand.brandName"
                required
                placeholder="Enter name"
              />
            </b-form-group>
            <b-form-group id="phoneGroup" label="Phone:" label-for="phone">
              <b-form-input id="phone" type="text" v-model="brand.phone" placeholder="Enter phone"/>
            </b-form-group>
            <b-form-group id="emailGroup" label="Email:" label-for="email">
              <b-form-input
                id="email"
                type="email"
                v-model="brand.email"
                placeholder="Enter email"
              />
            </b-form-group>
            <b-form-group id="websiteGroup" label="Website:" label-for="website">
              <b-form-input
                id="website"
                type="text"
                v-model="brand.website"
                placeholder="Enter website"
              />
            </b-form-group>
            <b-form-group id="personContactGroup" label="Contact:" label-for="PersonContact">
              <b-form-input
                id="PersonContact"
                type="text"
                v-model="brand.contactPerson"
                placeholder="Enter contact"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <AdresEditComponent/>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary">Save</b-button>
        <b-button type="button" @click="Cancel">Cancel</b-button>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import BrandService from "@/api-services/brand.service";
import AdresEditComponent from "@/components/Adress/EditComponent";
// import { EventBus } from "@/main.js";
// import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  components: {
    AdresEditComponent
  },
  data() {
    return {
      brand: {}
    };
  },
  computed: {
    ...mapGetters(["adress", "IsBrandFromModal"])
  },
  created() {
    if (this.$route.params.id !== undefined) {
      BrandService.get(this.$route.params.id).then(response => {
        this.brand = response.data;
      });
    }
  },
  methods: {
    UpdateBrand() {
      this.brand.adress = this.adress;
      if (this.brand.id === null || this.brand.id === undefined) {
        BrandService.create(this.brand).then(response => {
          if (this.IsBrandFromModal) {
            this.$emit("updateBrandModal");
          } else {
            this.$router.push({ name: "brands" });
          }
        });
      } else {
        BrandService.update(this.$route.params.id, this.brand).then(
          response => {
            this.$router.push({ name: "brands" });
          }
        );
      }
    },
    Cancel(evt) {
      evt.preventDefault();
      if (this.IsBrandFromModal) {
        this.$emit("updateBrandModal");
      } else {
        this.$router.push({ name: "brands" });
      }
    }
  }
};
</script>
