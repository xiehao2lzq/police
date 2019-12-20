<template>
    <div>
        <PersonPerceptionList v-if="nowShow"/>
        <CarPerceptionList v-else/>
    </div>
</template>

<script>
import {mapState} from "vuex"
import CarPerceptionList from "./CarPerceptionList"
import PersonPerceptionList from "./personPerceptionList"
    export default {
        computed: {
            ...mapState({
                nowShow:state=>state.dataTreating.nowShow
            })
        },
        components: {
            PersonPerceptionList,
            CarPerceptionList
        }
    }
</script>

<style lang="scss" scoped>

</style>