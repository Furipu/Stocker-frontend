<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Home</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="products">Product</b-nav-item>

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
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-item v-if="!isLoggedIn" right to="/login">Login</b-nav-item>
        <b-nav-item v-if="!isLoggedIn" right to="/Register">Register</b-nav-item>-->
        <!-- <b-nav-item-dropdown right v-if="isAdmin"> -->
        <!-- Using 'button-content' slot -->
        <!-- <template slot="button-content">
              <em>Admin</em>
            </template>
            <b-dropdown-item to="/users">User</b-dropdown-item>
          </b-nav-item-dropdown>
        <b-nav-item v-if="isLoggedIn" @click="logout">Logout</b-nav-item>-->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar"
};
</script>
