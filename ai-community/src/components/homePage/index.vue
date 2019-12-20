<template>
    <div class="index-body">
        <Header/>
        <div class="leftBox">
            <Map/>
            <Tendency/>
        </div>
        <div class="rightBox">
            <TadayData/>
            <PersonInOrOut/>
            <CarInOrOut/>
            <AbnormalInformation/>
            <DeviceInfo/>
        </div>
    </div>
</template>

<script>
    import Header from "./header";
    import Map from "./map"
    import TadayData from "./tadayData"
    import PersonInOrOut from "./personInOrOut"
    import CarInOrOut from "./carInOrOut"
    import AbnormalInformation from "./abnormalInformation"
    import DeviceInfo from "./deviceInfo"
    import Tendency from "./tendency"
    export default {
        components: {
            Header,
            Map,
            TadayData,
            PersonInOrOut,
            CarInOrOut,
            AbnormalInformation,
            DeviceInfo,
            Tendency
        },
        mounted () {
            this.$store.dispatch('Login')
        }
    }
</script>

<style lang="scss" scoped>
    .rightBox{
        float: left;
        margin-left: 5px;
    }
    .leftBox{
        float: left;
    }
    .index-body{
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>