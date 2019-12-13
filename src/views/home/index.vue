<template>
  <div>
    <div class="box">{{ msg }}</div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      msg: "这是一个很寂寞的天"
    };
  },
  components: {},
  created() {
    console.log("fdsafsdfasd");
  }
};
</script>

<style lang="scss" scoped>
// .box {
//     width: 100px;
//     height: 100px;
//     background: red;
// }
</style>
