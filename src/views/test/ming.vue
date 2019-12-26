<template>
  <div>
    {{msg}}
    <p>{{name}}</p>
    <slot>作用域插槽</slot>
  </div>
</template>
<script>
export default {
  name: 'Ming',
  data() {
    return {
      msg: '毛毛雨'
    }
  },
  props: ['name'],
  created() {
    // console.log(this)
  }
}
</script>
<style lang="scss">

</style>
