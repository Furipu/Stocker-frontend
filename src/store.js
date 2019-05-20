export default {
  state: {
    adress: {},
    status: "",
    productState: ""
  },
  getters: {
    adress: state => {
      return state.adress
    },
    productState: state => {
      return state.productState
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
    }
  }
}
