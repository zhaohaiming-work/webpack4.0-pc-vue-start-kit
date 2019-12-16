<template>
  <div>
    <h1>{{ msg }}{{ count }}</h1>
    <button>点击事件</button>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      msg: "测试测试",
      count: this.$store.state.count
    };
  },
  created() {
    console.log(this.$store);
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background: red;
}
</style>
