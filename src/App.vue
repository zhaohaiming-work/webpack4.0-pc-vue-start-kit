<template>
  <div class="page-layout" id='app'>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "hello world"
    };
  },
  created() {
    // console.log(this.$store);
  }
};
</script>

<style lang="scss" scoped>
.page-layout {
  width: 100%;
}
</style>
