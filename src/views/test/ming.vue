<template>
  <div>
    {{msg}}
    <p>{{name}}</p>
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
  props: ['name']
}
</script>
<style lang="scss">

</style>
