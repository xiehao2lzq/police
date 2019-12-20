<template>
    <div>
       <BasicInformation/>
       <RelationPic/>
       <OutOrInRule/>
    </div>
</template>

<script>
import BasicInformation from "./basicInformation"
import RelationPic from "./relationPic"
import OutOrInRule from "./outOrInRule"
    export default {
        components: {
            BasicInformation,
            RelationPic,
            OutOrInRule

        }
    }
</script>

<style lang="scss" scoped>

</style>