// const PRODUCT_STATE = {
//   ADD_TO_CHART: 1,
//   ADD_PRODUCT: 2,
//   DELETE_PRODUCT: 3
// }

// ProductState.install = function (Vue, options) {
//   Vue.prototype.$getConst = (key) => {
//     return PRODUCT_STATE[key]
//   }
// }

// export default ProductState

export default Object.freeze({
  ADD_TO_CHART: "AddToChart",
  ADD_TO_STOCK: "AddToStock",
  REMOVE_FROM_STOCK: "RemoveFromStock",
  DEFAULT: "Default"
})
