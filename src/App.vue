<template>
  <div id="app" class="page-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'hello world'
    }
  },
  created() {
    // console.log(this.$store);
  }
}
</script>

<style lang="scss" scoped>
.page-layout {
  width: 100%;
}
</style>
