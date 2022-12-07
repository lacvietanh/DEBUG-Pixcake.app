<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

export default {
    components: {
    }
}
</script>

<style lang="scss">
body {
    padding: 0;
    margin: 0;
    -webkit-user-select: none;
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 0px;
    height: calc(100vh - 0px);
}

.user-operation-popover {
    background: #1E1E1E !important;
    border-radius: 10px !important;
}
</style>
