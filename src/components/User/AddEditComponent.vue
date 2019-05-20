<template>
  <div>
    <b-form @submit.prevent="updateUser">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-form-group id="firstName" label="First Name: " label-for="firstName">
              <b-form-input
                id="firstName"
                type="text"
                v-model="user.firstName"
                required
                placeholder="Enter first name"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="lastName" label="Last Name: " label-for="lastName">
              <b-form-input
                id="lastName"
                type="text"
                v-model="user.lastName"
                required
                placeholder="Enter last name"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="email" label="Email: " label-for="email">
              <b-form-input
                id="email"
                type="email"
                v-model="user.email"
                required
                placeholder="Enter email"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group id="login" label="login: " label-for="login">
              <b-form-input
                id="login"
                type="email"
                v-model="user.login"
                required
                placeholder="Enter login"
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
import UserService from "@/api-services/user.service";
export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    if (this.$route.params.id !== undefined) {
      UserService.get(this.$route.params.id).then(response => {
        this.user = response.data;
      });
    }
  },
  methods: {
    updateUser() {
      if (this.user.id === undefined || this.user.id === null) {
        UserService.create(this.user).then(response => {
          this.$router.push({ name: "users" });
        });
      } else {
        UserService.update(this.$route.params.id, this.user).then(response => {
          this.$router.push({ name: "users" });
        });
      }
    },
    Cancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: "users" });
    }
  }
};
</script>
