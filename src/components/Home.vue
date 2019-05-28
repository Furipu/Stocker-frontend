<template>
  <div>
    <b-row>
      <b-col>
        <b-button @click="AddCart()" variant="success" v-b-tooltip.hover title="Add Cart">
          <font-awesome-icon class="fa-6x" icon="cart-plus"/>
        </b-button>
      </b-col>
      <b-col>
        <b-button @click="AddStock()" variant="primary" v-b-tooltip.hover title="Add Stock">
          <font-awesome-icon class="fa-6x" icon="plus"/>
        </b-button>
      </b-col>
      <b-col>
        <b-button @click="DeleteStock()" variant="danger" v-b-tooltip.hover title="Remove Stock">
          <font-awesome-icon class="fa-6x" icon="minus"/>
        </b-button>
      </b-col>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <ShoppingCart/>
      </b-col>
      <b-col></b-col>
    </b-row>
    <br>
  </div>
</template>
<script>
import ProductState from "@/common/constants";
import ShoppingCart from "@/components/ShoppingCart";
export default {
  name: "Home",
  components: {
    ShoppingCart
  },
  methods: {
    AddCart() {
      this.$store.commit("setProductState", ProductState.ADD_TO_CHART);
      this.$router.push({ name: "products" });
    },
    AddStock() {
      this.$store.commit("setProductState", ProductState.ADD_TO_STOCK);
      this.$router.push({ name: "products" });
    },
    DeleteStock() {
      this.$store.commit("setProductState", ProductState.REMOVE_FROM_STOCK);
      this.$router.push({ name: "products" });
    }
  }
};
</script>
<style scoped>
.homeText {
  font-size: 35px;
  color: red;
  text-align: center;
  position: relative;
  top: 30px;
  text-shadow: 2px 2px 2px gray;
}
button {
  width: 300px;
  height: 100px;
}
</style>
