<template>
    <h1>
        {{msg}}
    </h1>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            msg: '你好这是测试页面'
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