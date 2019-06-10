<template>
  <v-app>
    <h2>Category</h2>
    <v-sheet>
      <v-flex md1>
        <v-text-field v-model="search" label="Search" append-icon="search"></v-text-field>
      </v-flex>
    </v-sheet>
    <v-flex md1>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="AddParent()">
            <v-icon>add</v-icon>
          </v-btn>
          <v-treeview :items="categories" :filter="filter" :search="search">
            <template v-slot:label="{ item }">
              {{ item.categoryName }}
              <v-btn
                flat
                icon
                color="dark lighten-1"
                v-on="on"
                @click="AddChild(item)"
                id="iconbtnfirst"
              >
                <v-icon small>add</v-icon>
              </v-btn>
              <v-btn flat icon color="dark lighten-1" v-on="on" @click="Edit(item)" id="iconbtn">
                <v-icon small>edit</v-icon>
              </v-btn>
              <v-btn flat icon color="dark lighten-1" @click="OpenDeleteDialog(item)" id="iconbtn">
                <v-icon small>delete</v-icon>
              </v-btn>
            </template>
          </v-treeview>
        </template>
        <v-card>
          <v-form v-model="valid" ref="form">
            <v-card-title
              v-if="this.crudState.state === 'addParent'"
              class="headline grey lighten-2"
              primary-title
            >Add main category</v-card-title>
            <v-card-title
              v-if="this.crudState.state === 'addChild'"
              class="headline grey lighten-2"
              primary-title
            >Add a child category in {{ crudState.category }}</v-card-title>
            <v-card-title
              v-if="this.crudState.state === 'edit'"
              class="headline grey lighten-2"
              primary-title
            >Edit {{ crudState.category }} category</v-card-title>
            <v-card-text>
              <v-container>
                <v-layout>
                  <v-flex xs12 md4>
                    <v-text-field
                      v-model="category.categoryName"
                      :rules="nameRules"
                      :counter="25"
                      label="Category"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="Cancel()" flat>Cancel</v-btn>
              <v-btn
                v-if="this.crudState.state === 'addParent' || this.crudState.state === 'addChild'"
                color="primary"
                @click="Add"
                flat
              >Save</v-btn>
              <v-btn
                v-if="this.crudState.state === 'edit'"
                color="primary"
                @click="Update"
                flat
              >Update</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" persistent max-width="500px">
        <v-card>
          <v-card-title class="headline red lighten-2">
            <v-flex class="text-xs-center">Delete</v-flex>
          </v-card-title>
          <v-card-text class="text-xs-center">Are you sure?</v-card-text>
          <v-card-actions>
            <v-flex class="text-xs-right">
              <v-btn right color="primary" @click="Cancel()" flat>Cancel</v-btn>
              <v-btn color="primary" flat @click="Delete()">Delete</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-app>
</template>

<script>
import CategoryService from "@/api-services/category.service";
export default {
  data() {
    return {
      categories: [],
      search: null,
      dialog: false,
      dialogDelete: false,
      category: {},
      nameRules: [v => !!v || "Name is required"],
      valid: false,
      crudState: {}
    };
  },
  mounted() {
    this.getCategories();
  },
  computed: {
    filter() {
      return (item, search, textKey) => item[textKey].indexOf(search) > -1;
    }
  },
  methods: {
    getCategories() {
      CategoryService.getAll().then(response => {
        this.categories = response.data;
      });
    },
    AddParent() {
      this.ResetCategory();
      this.crudState.state = "addParent";
    },
    AddChild(item) {
      this.category.parentId = item.id;
      this.crudState.state = "addChild";
      this.crudState.category = item.categoryName;
    },
    ResetCategory() {
      this.category = {};
      this.dialog = false;
      this.dialogDelete = false;
      this.$refs.form.reset();
      this.$emit("getAllCategories");
    },
    Add() {
      CategoryService.create(this.category).then(response => {
        this.getCategories();
        this.ResetCategory();
      });
    },
    Update() {
      CategoryService.update(this.category.id, this.category).then(response => {
        this.getCategories();
        this.ResetCategory();
      });
    },
    Edit(item) {
      CategoryService.get(item.id).then(response => {
        this.category = response.data;
      });
      this.crudState.state = "edit";
      this.crudState.category = item.name;
    },
    OpenDeleteDialog(item) {
      this.category.id = item.id;
      this.dialogDelete = true;
    },
    Delete() {
      CategoryService.delete(this.category.id)
        .then(response => {
          this.getCategories();
          this.ResetCategory();
        })
        .catch(error => {
          this.makeToastError(error);
        });
    },
    Cancel() {
      this.ResetCategory();
    },
    makeToastError(error) {
      this.$bvToast.toast(`Er is een fout opgetreden :  ${error}`, {
        title: "Error",
        autoHideDelay: 3000,
        appendToast: true
      });
    }
  }
};
</script>

<style scoped>
#iconbtn {
  margin: 0px;
  padding: 0px;
}
#iconbtnfirst {
  margin-right: 0px;
  margin-left: 50px;
  padding: 0px;
}
</style>
