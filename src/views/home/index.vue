<template>
    <div>
        <div>{{msg}}</div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            msg: '你好这是个首页的轮廓'
        }
    },
    components: {

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