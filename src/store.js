export default {
  state: {
    adress: {},
    status: "",
    productState: "",
    product: Object,
    IsSupplierFromModal: false,
    IsMetricFromModal: false
  },
  getters: {
    adress: state => {
      return state.adress
    },
    productState: state => {
      return state.productState
    },
    product: state => {
      return state.product
    },
    IsSupplierFromModal: state => {
      return state.IsSupplierFromModal
    },
    IsMetricFromModal: state => {
      return state.IsMetricFromModal
    }
  },
  mutations: {
    setAdress(state, adress) {
      state.adress = adress
    },
    setCountryId(state, id) {
      state.adress.countryId = id
    },
    setProductState(state, newState) {
      state.productState = newState
    },
    setProduct(state, product) {
      state.product = product
    },
    setSupplierFromModal(state, stateSupplier) {
      state.IsSupplierFromModal = stateSupplier
    },
    setMetricFromModal(state, stateMetric) {
      state.IsMetricFromModal = stateMetric
    }
  }
}
