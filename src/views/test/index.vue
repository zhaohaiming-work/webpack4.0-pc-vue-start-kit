<template>
  <div>
    <h1>{{ msg }}{{ count }}</h1>
    <Button @click="add">点击事件</Button>
    <Pagination v-model="current" :total="50" />
    <ul>
      <li v-for="(item, index) in cityArr">
        <h2>{{ item }}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
import { Button, Pagination } from "ant-design-vue";
export default {
  name: "index",
  components: {
    Button,
    Pagination
  },
  data() {
    return {
      msg: "测试测试",
      current: 2
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
