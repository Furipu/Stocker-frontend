<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Home</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="setProductState()" to="/products">Product</b-nav-item>

        <b-nav-item-dropdown>
          <template slot="button-content">
            <em>Components</em>
          </template>
          <b-dropdown-item to="/statuses">Status</b-dropdown-item>
          <b-dropdown-item to="/brands">Brand</b-dropdown-item>
          <b-dropdown-item to="/suppliers">Supplier</b-dropdown-item>
          <b-dropdown-item to="/categories">Category</b-dropdown-item>
          <b-dropdown-item to="/locations">Location</b-dropdown-item>
          <b-dropdown-item to="/qualities">Quality</b-dropdown-item>
          <b-dropdown-item to="/postCities">Postalcode and cities</b-dropdown-item>
          <b-dropdown-item to="/countries">Countries</b-dropdown-item>
          <b-dropdown-item to="/metrics">Metrics</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown v-if="isAdmin">
          <template slot="button-content">
            <em>Admin</em>
          </template>
          <b-dropdown-item to="/users">Users</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          right
          disabled
          v-if="authenticated && loggedUser !== null && loggedUser !== undefined"
        >{{loggedUser.name}}</b-nav-item>
        <b-nav-item right>
          <button v-if="authenticated" v-on:click="logout" id="logout-button">Logout</button>
          <button v-else v-on:click="login" id="login-button">Login</button>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
import UserService from "@/api-services/user.service";
import axios from "axios";
import ProductState from "@/common/constants";
export default {
  props: ["loggedUser"],
  name: "Navbar",
  data: function() {
    return {
      authenticated: false,
      user: {},
      roles: [],
      isAdmin: false
    };
  },
  async created() {
    this.isAuthenticated();
    // this.getUser();
  },
  watch: {
    // Everytime the route changes, check for auth status
    $route: "isAuthenticated"
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
      this.user = await this.$auth.getUser();
      this.getUser();
    },
    async getUser() {
      // eslint-disable-next-line
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${await this.$auth.getAccessToken()}`;
      try {
        UserService.get(this.user.sub).then(response => {
          this.roles = response.data.roles;
          this.isAdmin = this.roles.includes("Admin");
        });
      } catch (e) {
        this.$auth.loginRedirect();
      }
    },
    login() {
      this.$auth.loginRedirect("/");
    },
    async logout() {
      await this.$auth.logout();
      await this.isAuthenticated();
      this.$auth.loginRedirect();
    },
    setProductState() {
      this.$store.commit("setProductState", ProductState.DEFAULT);
    }
  }
};
</script>
