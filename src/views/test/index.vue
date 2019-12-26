<template>
  <div>
    <h1>{{ msg }}{{ count }}</h1>
    <Button @click="add">点击事件</Button>
    <Pagination v-model="current" :total="50" />
    <ming name='啦啦啦'>人间情多</ming>
    <ul>
      <li v-for="(item, index) in cityArr" :key="index">
        <div>{{ item }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Button, Pagination } from 'ant-design-vue'
import ming from './ming'
export default {
  name: 'Index',
  components: {
    Button,
    Pagination,
    ming
  },
  data() {
    return {
      msg: '测试测试',
      current: 2
    }
  },
  computed: {
    count() {
      return this.$store.state.count
    },
    cityArr() {
      return this.$store.state.city
    }
  },
  created() {
    // console.log(this.$props)
  },
  methods: {
    add() {
      this.$store.dispatch('add')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background: red;
}
</style>
