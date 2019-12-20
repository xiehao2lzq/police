<template>
    <div class="index-body">
       <Header/>
       <BasicInformation/>
       <DeviceType/>
       <CommunityDevice/>
       <DeviceList/>
    </div>
</template>

<script>
    import Header from "../indeedHouse/header"
    import BasicInformation from "./basicInformation"
    import DeviceType from "./deviceType"
    import CommunityDevice from "./communityDevice"
    import DeviceList from "./deviceList"
    export default {
        components: {
            Header,
            BasicInformation,
            DeviceType,
            CommunityDevice,
            DeviceList
        }
    }
</script>

<style lang="scss" scoped>
     .index-body{
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>