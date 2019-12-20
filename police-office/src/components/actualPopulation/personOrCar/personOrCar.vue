<template>
    <div>
        <Person v-if="nowShow"/>
        <Car v-else/>
    </div>
</template>

<script>
import Header from "../header"
import Person from "./person"
import Car from "./car"
import {mapState} from "vuex"
    export default {
        components: {
            Header,
            Person,
            Car
        },
        computed: {
    ...mapState({
      nowShow:state=>state.actualPopulation.nowShow
    })
  },
    }
</script>

<style lang="scss" scoped>

</style>