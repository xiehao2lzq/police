<template>
    <div class="index-body">
       <Header/>
       <BasicInformation/>
       <HouseingType/>
       <HousingPeopleNum/>
       <CommunityHouse/>
       <HousingList/>
    </div>
</template>

<script>
    import Header from "./header"
    import BasicInformation from "./basicInformation"
    import HouseingType from "./houseingType"
    import HousingPeopleNum from "./housingPeopleNum"
    import CommunityHouse from "./communityHouse"
    import HousingList from "./housingList"
    export default {
        components: {
            Header,
            BasicInformation,
            HouseingType,
            HousingPeopleNum,
            CommunityHouse,
            HousingList
        }
    }
</script>

<style lang="scss" scoped>
     .index-body{
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>