<template>
    <div class="home-index">
        <home-view/>
    </div>
</template>
<script>
import HomeView from './Home-item'

export default {
    name: 'HomeIndex',
    components: {
        HomeView
    }
}
</script>
<style lang="scss" scoped>
.home-index {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
