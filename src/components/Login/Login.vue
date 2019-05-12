<template>
  <div class="container">
    <div class="card card-default">
      <div class="card-header">Login</div>
      <div class="card-body">
        <div class="alert alert-danger" v-if="has_error">
          <p>Error, impossible to connect with those credentials.</p>
        </div>
        <form autocomplete="off" @submit.prevent="login" method="post">
          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              placeholder="user@example.com"
              v-model="email"
              required
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control" v-model="password" required>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      has_error: false
    };
  },
  mounted() {
    //
  },
  methods: {
    // login() {
    //   axios
    //     .post("api/auth/login", {
    //       email: this.email,
    //       password: this.password
    //     })
    //     .then(response => {
    //       console.log(response.data);
    //       localStorage.setItem("token", response.data.access_token);
    //       this.$router.push("/products");
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    login() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>
