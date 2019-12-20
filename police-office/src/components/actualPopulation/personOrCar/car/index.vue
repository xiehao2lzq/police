<template>
    <div class="index">
        <BasicInformation/>
        <OutOrInInfo/>
        <CommunityCar/>
        <CarList/>
        <NowHaveCar/>
    </div>
</template>

<script>
import BasicInformation from "./basicInformation";
import OutOrInInfo from "./outOrInInfo"
import CommunityCar from "./communityCar"
import CarList from "./carList"
import NowHaveCar from "./nowHaveCar"
    export default {
        components: {
            BasicInformation,
            OutOrInInfo,
            CommunityCar,
            CarList,
            NowHaveCar
        }
    }
</script>

<style lang="scss" scoped>
    .index{
        margin-top:10px;
    }
</style>