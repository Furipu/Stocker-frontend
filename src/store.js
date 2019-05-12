export default {
  state: {
    adress: {},
    status: ""
  },
  getters: {
    adress: state => {
      return state.adress
    }
  },
  mutations: {
    setAdress(state, adress) {
      (state.adress = adress)
    },
    setCountryId(state, id) {
      state.adress.countryId = id
    }
  }
}
