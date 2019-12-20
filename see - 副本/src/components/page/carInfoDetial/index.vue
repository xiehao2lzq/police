<template>
    <div class="carInfoDetail">
        <BigPic  v-if="bigPicIsshow" />
        <Header/>
        <TopBox/>
        <CarInfo/>
        <Table/>
    </div>
</template>

<script>
import {mapState} from "vuex"
import Header from "../personInfoDetails/header"
import TopBox from "./TopBox"
import CarInfo from "./carInfo"
import Table from "./table"
import BigPic from "../home/bigPic"
    export default {
        components: {
            Header,
            TopBox,
            CarInfo,
            Table,
            BigPic
        },
        computed: {
            ...mapState({
                bigPicIsshow:state=>state.home.bigPicIsshow
            })
        }
    }
</script>

<style lang="scss" scoped>
    .carInfoDetail{
        width: 100%;
        overflow: hidden;
    }
</style>