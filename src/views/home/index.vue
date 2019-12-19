<template>
  <div>
    <div class="box">{{ msg }}</div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {},
  data() {
    return {
      msg: '这是一个很寂寞的天,下着有些伤心的🌧'
    }
  },
  created() {
    // console.log("测试开始页面");
  }
}
</script>

<style lang="scss" scoped>
// .box {
//     width: 100px;
//     height: 100px;
//     background: red;
// }
</style>
