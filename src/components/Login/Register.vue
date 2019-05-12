<template>
  <div class="container">
    <div class="card card-default">
      <div class="card-header">Register</div>
      <div class="card-body">
        <div class="alert alert-danger" v-if="has_error && !success">
          <p
            v-if="error == 'registration_validation_error'"
          >Erreur(s) de validation, veuillez consulter le(s) message(s) ci-dessous.</p>
          <p
            v-else
          >Erreur, impossible de s'inscrire pour le moment. Si le problème persiste, veuillez contacter un administrateur.</p>
        </div>
        <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.name }">
          <label for="password">Name</label>
          <input type="name" id="name" class="form-control" v-model="name">
          <span class="help-block" v-if="has_error && errors.password">{{ errors.name }}</span>
        </div>
        <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
          <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              placeholder="user@example.com"
              v-model="email"
            >
            <span class="help-block" v-if="has_error && errors.email">{{ errors.email }}</span>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control" v-model="password">
            <span class="help-block" v-if="has_error && errors.password">{{ errors.password }}</span>
          </div>
          <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
            <label for="password_confirmation">Repeat Password</label>
            <input
              type="password"
              id="password_confirmation"
              class="form-control"
              v-model="password_confirmation"
            >
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null,
      has_error: false,
      error: "",
      errors: {},
      success: false
    };
  },
  methods: {
    //
    register: function() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        is_admin: this.is_admin
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/login"))
        .catch(err => console.log(err));
    }
  }
};
</script>
