<template>
  <v-app>
    <h2>Location</h2>
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
          <v-treeview :items="locations" :filter="filter" :search="search">
            <template v-slot:label="{ item }">
              {{ item.locationName }}
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
            >Add main location</v-card-title>
            <v-card-title
              v-if="this.crudState.state === 'addChild'"
              class="headline grey lighten-2"
              primary-title
            >Add a child location in {{ crudState.location }}</v-card-title>
            <v-card-title
              v-if="this.crudState.state === 'edit'"
              class="headline grey lighten-2"
              primary-title
            >Edit {{ crudState.location }} location</v-card-title>
            <v-card-text>
              <v-container>
                <v-layout>
                  <v-flex xs12 md4>
                    <v-text-field
                      v-model="location.locationName"
                      :rules="nameRules"
                      :counter="25"
                      label="Location"
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
import LocationService from "@/api-services/location.service";
export default {
  data() {
    return {
      locations: [],
      search: null,
      caseSensitive: false,
      dialog: false,
      dialogDelete: false,
      location: {},
      nameRules: [v => !!v || "Name is required"],
      valid: false,
      crudState: {}
    };
  },
  mounted() {
    this.getLocations();
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  },
  methods: {
    getLocations() {
      LocationService.getAll().then(response => {
        this.locations = response.data;
      });
    },
    AddParent() {
      this.ResetLocation();
      this.crudState.state = "addParent";
    },
    AddChild(item) {
      this.location.parentId = item.id;
      this.crudState.state = "addChild";
      this.crudState.location = item.locationName;
    },
    ResetLocation() {
      this.location = {};
      this.dialog = false;
      this.dialogDelete = false;
      this.$refs.form.reset();
    },
    Add() {
      LocationService.create(this.location).then(response => {
        this.getLocations();
        this.ResetLocation();
      });
    },
    Update() {
      LocationService.update(this.location.id, this.location).then(response => {
        this.getLocations();
        this.ResetLocation();
      });
    },
    Edit(item) {
      LocationService.get(item.id).then(response => {
        this.location = response.data;
      });
      this.crudState.state = "edit";
      this.crudState.location = item.name;
    },
    OpenDeleteDialog(item) {
      this.location.id = item.id;
      this.dialogDelete = true;
    },
    Delete() {
      LocationService.delete(this.location.id).then(response => {
        this.getLocations();
        this.ResetLocation();
      });
    },
    Cancel() {
      this.ResetLocation();
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
