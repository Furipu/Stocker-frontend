<template>
  <div>
    <h1>Adress</h1>
    <div class="row">
      <div class="col-md-10"></div>
    </div>
    <br>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>Street</th>
          <th>Number</th>
          <th>Bus</th>
          <th>PostCode</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="Adress in Adresses" :key="Adress.id">
          <td>{{ Adress.street }}</td>
          <td>{{ Adress.streetNumber }}</td>
          <td>{{ Adress.streetBus }}</td>
          <td>{{ Adress.postcode }}</td>
          <td>{{ Adress.city }}</td>
          <td>
            <router-link
              :to="{name: 'adress/edit', params: { id: Adress.id }}"
              class="btn btn-primary"
            >Edit</router-link>
          </td>
          <td>
            <b-btn variant="danger" @click="showAlert(Adress.id)">Delete</b-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Adresses: []
    };
  },
  mounted() {
    this.getAdresses();
  },
  methods: {
    getAdresses() {
      let uri = "/api/adresses";
      this.axios.get(uri).then(response => {
        this.Adresses = response.data.data;
      });
    },
    showAlert(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            let uri = `/api/adress/delete/${id}`;
            this.axios.delete(uri).then(response => {
              this.getAdresses();
            });
          }
        });
    }
  }
};
</script>
