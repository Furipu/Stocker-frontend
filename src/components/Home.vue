<template>
  <div>
    <b-row>
      <b-col>
        <b-button variant="success" v-b-tooltip.hover title="Add Cart">
          <font-awesome-icon class="fa-10x" icon="cart-plus"/>
        </b-button>
      </b-col>
      <b-col>
         <b-button variant="primary" v-b-tooltip.hover title="Add Product">
          <font-awesome-icon class="fa-10x" icon="plus"/>
        </b-button>
      </b-col>
      <b-col>
         <b-button variant="danger" v-b-tooltip.hover title="Delete Product">
          <font-awesome-icon class="fa-10x" icon="minus"/>
        </b-button>
      </b-col>
    </b-row>
    <br>
  </div>
</template>
<script>
export default {
  name: "Home"
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
  height: 200px;
}
</style>
