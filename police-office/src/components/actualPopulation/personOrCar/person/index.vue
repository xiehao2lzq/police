<template>
    <div>
        <BasicInformation/>
        <Emigrant/>
        <ForeignerList/>
        <CommunityPerson/>
        <NowHavePerson/>
        <StrangerList/>
    </div>
</template>

<script>
import BasicInformation from "./basicInformation"
import StrangerList from "./strangerList"
import Emigrant from "./emigrant"
import CommunityPerson from "./communityPerson"
import NowHavePerson from "./nowHavePerson"
import ForeignerList from "./foreignerList"
    export default {
        components: {
            BasicInformation,
            StrangerList,
            Emigrant,
            CommunityPerson,
            NowHavePerson,
            ForeignerList
        }
    }
</script>

<style lang="scss" scoped>

</style>