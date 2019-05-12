<template>
  <b-container fluid>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"/>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="text-right">
        <b-button class="btn btn-primary" @click="CreateBrand()">Create brand</b-button>
      </b-col>
    </b-row>
    <b-table :items="Brands" :fields="fields" responsive flex :busy="isBusy" :filter="filter">
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"/>
        <strong>Loading...</strong>
      </div>
      <!------------------------ details ------------------------->
      <template slot="show_details" slot-scope="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
        >{{ row.detailsShowing ? 'Hide' : 'Show'}} Details</b-button>
      </template>
      <!------------------------ delete ------------------------->
      <template slot="delete" slot-scope="row">
        <b-button
          variant="outline-dark"
          v-b-tooltip.hover
          title="Delete"
          v-b-modal.modal-delete
          @click="SetIdForDelete(row.item.id)"
        >
          <font-awesome-icon icon="trash-alt"/>
        </b-button>
      </template>
      <!------------------------ edit ------------------------->
      <template slot="edit" slot-scope="row">
        <router-link :to="{name: 'brand/edit', params: { id: row.item.id }}">
          <b-button
            @click="editBrand(row.item)"
            variant="outline-dark"
            v-b-tooltip.hover
            title="Edit"
          >
            <font-awesome-icon icon="edit"/>
          </b-button>
        </router-link>
      </template>
      <!------------------------ street ------------------------->
      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Street</b>
            </b-col>
            <b-col>{{ row.item.adress ? row.item.adress.street : '' }}</b-col>
          </b-row>
          <!------------------------ number ------------------------->
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Number</b>
            </b-col>
            <b-col>{{ row.item.adress ? row.item.adress.streetNumber : '' }}</b-col>
          </b-row>
          <!------------------------ bus ------------------------->
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Bus</b>
            </b-col>
            <b-col>{{ row.item.adress ? row.item.adress.streetBus : '' }}</b-col>
          </b-row>
          <!------------------------ postcode ------------------------->
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Postcode</b>
            </b-col>
            <b-col>{{ row.item.adress.postCity ? row.item.adress.postCity.postCode : '' }}</b-col>
          </b-row>
          <!------------------------ city ------------------------->
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>City</b>
            </b-col>
            <b-col>{{ row.item.adress.postCity ? row.item.adress.postCity.city : '' }}</b-col>
          </b-row>
          <!------------------------ country ------------------------->
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Country</b>
            </b-col>
            <b-col>{{ row.item.adress.country ? row.item.adress.country.countryName : '' }}</b-col>
          </b-row>
          <!------------------------ edit ------------------------->
        </b-card>
      </template>
    </b-table>
    <b-modal id="modal-delete" title="Delete" @ok="handleOk">
      <p class="my-4">Are you sure!</p>
    </b-modal>
    <!-- <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="col-12 modal-title text-center" id="exampleModalLongTitle">Are you sure?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <font-awesome-icon class="fa-10x fa-spin" style="color: Tomato" icon="times-circle"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="Delete()"
              data-dismiss="modal"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>-->
  </b-container>
</template>

<script>
import ModalDeleteComponent from "../Shared/ModalDeleteComponent";
import BrandService from "@/api-services/brand.service";
export default {
  components: {
    ModalDeleteComponent
  },
  data() {
    return {
      id: 0,
      filter: null,
      isBusy: false,
      Brands: [],
      fields: [
        { key: "brandName", label: "Name", sortable: true },
        "phone",
        "email",
        "website",
        "contactPerson",
        "quality",
        { key: "show_details", label: "" },
        { key: "delete", label: "" },
        { key: "edit", label: "" }
      ]
    };
  },
  mounted() {
    this.toggleBusy();
    this.getBrands();
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getBrands() {
      BrandService.getAll().then(response => {
        this.Brands = response.data;
        this.toggleBusy();
      });
    },
    Delete() {
      this.toggleBusy();
      BrandService.delete(this.id).then(response => {
        this.getBrands();
      });
    },
    expandAdditionalInfo(row) {
      row._showDetails = !row._showDetails;
    },
    toggleBusy() {
      this.isBusy = !this.isBusy;
    },
    editBrand(item) {
      this.$store.commit("setAdress", item.adress);
    },
    CreateBrand() {
      this.$store.commit("setAdress", {});
      this.$router.push({ name: "brand/create" });
    },
    SetIdForDelete(id) {
      this.id = id;
    },
    handleOk(bvModalEvt) {
      this.Delete();
    }
  }
};
</script>
