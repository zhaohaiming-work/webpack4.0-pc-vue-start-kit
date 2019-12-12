<template>
    <div class='page-layout'>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            msg: 'hello world'
        }
    }
}
</script>

<style lang="scss" scoped>
.page-layout {
    width: 100%;
}
</style>