<template>
  <div>
    <h1>{{ msg }}{{ count }}</h1>
    <button @click="add">点击事件</button>
    <ul>
      <li v-for="(item, index) in cityArr">
        <h2>{{ item }}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      msg: "测试测试"
    };
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    cityArr() {
      return this.$store.state.city;
    }
  },
  created() {
    // console.log(this.$store);
  },
  methods: {
    add() {
      this.$store.dispatch("add");
    }
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
