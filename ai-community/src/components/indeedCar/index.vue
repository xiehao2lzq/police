<template>
    <div class="index-body">
       <Header/>
       <BasicInformation/>
       <OutOrInInfo/>
       <CommunityCar/>
        <IndeedCarList/>
    </div>
</template>

<script>
    import Header from "../indeedHouse/header"
    import BasicInformation from "./basicInformation"
    import OutOrInInfo from "./outOrInInfo"
    import CommunityCar from "./communityCar"
    import IndeedCarList from "./indeedCarList"
    export default {
        components: {
            Header,
            BasicInformation,
            OutOrInInfo,
            CommunityCar,
            IndeedCarList,
            
        }
    }
</script>

<style lang="scss" scoped>
     .index-body{
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>