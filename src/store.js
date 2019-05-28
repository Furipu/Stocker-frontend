export default {
  state: {
    adress: {},
    status: "",
    productState: "",
    product: Object
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
    }
  }
}
