<template>
    <div class="index-body">
       <Header/>
       <BasicInformation/>
       <OutOrInInfo/>
       <PeoplePerception/>
       <CommunityPerson/>
       <PeopleInOrOutList/>
       <PeopleList/>
    </div>
</template>

<script>
    import Header from "../indeedHouse/header"
    import BasicInformation from "./basicInformation"
    import OutOrInInfo from "./outOrInInfo"
    import PeoplePerception from "./peoplePerception"
    import CommunityPerson from "./communityPerson"
    import PeopleInOrOutList from "./peopleInOrOutList"
    import PeopleList from "./peopleList"
    export default {
        components: {
            Header,
            BasicInformation,
            OutOrInInfo,
            PeoplePerception,
            CommunityPerson,
            PeopleInOrOutList,
            PeopleList
        }
    }
</script>

<style lang="scss" scoped>
     .index-body{
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>