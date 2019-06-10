<template>
  <div>
    <b-form @submit.prevent="updateStatus">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-form-group id="statusName" label="Name: " label-for="statusName">
              <b-form-input
                id="statusName"
                type="text"
                v-model="status.statusName"
                required
                placeholder="Enter status"
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
import StatusService from "@/api-services/status.service";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      status: {}
    };
  },
  created() {
    if (this.$route.params.id !== undefined) {
      StatusService.get(this.$route.params.id).then(response => {
        this.status = response.data;
      });
    }
  },
  computed: {
    ...mapGetters(["IsStatusFromModal"])
  },
  methods: {
    updateStatus() {
      if (this.status.id === undefined || this.status.id === null) {
        StatusService.create(this.status).then(response => {
          if (this.IsStatusFromModal) {
            this.$emit("updateStatusModal");
          } else {
            this.$router.push({ name: "statuses" });
          }
        });
      } else {
        StatusService.update(this.$route.params.id, this.status).then(
          response => {
            this.$router.push({ name: "statuses" });
          }
        );
      }
    },
    Cancel(evt) {
      evt.preventDefault();
      if (this.IsStatusFromModal) {
        this.$emit("updateStatusModal");
      } else {
        this.$router.push({ name: "statuses" });
      }
    }
  }
};
</script>
