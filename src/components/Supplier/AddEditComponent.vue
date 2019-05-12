<template>
  <div>
    <b-form @submit.prevent="UpdateSupplier">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-form-group id="supplierNameGroup" label="Name" label-for="supplierName">
              <b-form-input
                id="supplierName"
                type="text"
                v-model="supplier.supplierName"
                required
                placeholder="Enter name"
              />
            </b-form-group>
            <b-form-group id="phoneGroup" label="Phone:" label-for="phone">
              <b-form-input
                id="phone"
                type="text"
                v-model="supplier.phone"
                placeholder="Enter phone"
              />
            </b-form-group>
            <b-form-group id="emailGroup" label="Email:" label-for="email">
              <b-form-input
                id="email"
                type="email"
                v-model="supplier.email"
                placeholder="Enter email"
              />
            </b-form-group>
            <b-form-group id="websiteGroup" label="Website:" label-for="website">
              <b-form-input
                id="website"
                type="text"
                v-model="supplier.website"
                placeholder="Enter website"
              />
            </b-form-group>
            <b-form-group id="personContactGroup" label="Contact:" label-for="PersonContact">
              <b-form-input
                id="PersonContact"
                type="text"
                v-model="supplier.contactPerson"
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
import SupplierService from "@/api-services/supplier.service";
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
      supplier: {}
    };
  },
  computed: {
    ...mapGetters(["adress"])
  },
  created() {
    if (this.$route.params.id !== undefined) {
      SupplierService.get(this.$route.params.id).then(response => {
        this.supplier = response.data;
      });
    }
  },
  methods: {
    UpdateSupplier() {
      this.supplier.adress = this.adress;
      if (this.supplier.id === null || this.supplier.id === undefined) {
        SupplierService.create(this.supplier).then(response => {
          this.$router.push({ name: "suppliers" });
        });
      } else {
        SupplierService.update(this.$route.params.id, this.supplier).then(
          response => {
            this.$router.push({ name: "suppliers" });
          }
        );
      }
    },
    Cancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: "suppliers" });
    }
  }
};
</script>
