<template>
    <div>
        <Header/>
        <!-- <router-view></router-view> -->
        <Perception/>
    </div>
</template>

<script>
import Header from "./header"
import Perception from "./perception"
    export default {
        components: {
            Header,
            Perception
        }
    }
</script>

<style lang="scss" scoped>

</style>