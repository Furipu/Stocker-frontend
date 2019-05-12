// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import Vuex from "vuex"
import Axios from "axios"
import Vuelidate from "vuelidate"
import vSelect from "vue-select"
import VueBootstrapTypeahead from "vue-bootstrap-typeahead"
import StoreData from "@/store"
import Vue2Filters from "vue2-filters"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faTrashAlt,
  faEdit,
  faTimesCircle,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Vuetify from "vuetify"
import Treeselect from "@riophae/vue-treeselect"
import "@riophae/vue-treeselect/dist/vue-treeselect.css"

Vue.config.productionTip = false

Axios.defaults.baseURL = process.env.API_ENDPOINT

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(Vue2Filters)
Vue.use(Vuelidate)
Vue.component("vue-bootstrap-typeahead", VueBootstrapTypeahead)
Vue.component("v-select", vSelect)
Vue.use(Vuetify)
Vue.component(Treeselect)
library.add(faTrashAlt)
library.add(faEdit)
library.add(faTimesCircle)
library.add(faExclamationCircle)
Vue.component("font-awesome-icon", FontAwesomeIcon)

/* eslint-disable no-new */
const store = new Vuex.Store(StoreData)

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
})
