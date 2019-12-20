<template>
  <div class="index-body">
    <Header />
    <div class="parentBox" v-if="!detailsIsshow">
      <BasicInformation />
      <SpecialPeople />
      <CommunityPerson />
      <SpecialCar />
    </div>
    <div class="childrenBox" v-else>
        <Detial/>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import Header from "../indeedHouse/header";
import BasicInformation from "./basicInformation";
import SpecialPeople from "./specialPeople";
import CommunityPerson from "./communityPerson";
import SpecialCar from "./specialCar";
import Detial from "./detial"
export default {
  components: {
    Header,
    BasicInformation,
    SpecialPeople,
    CommunityPerson,
    SpecialCar,
    Detial
  },
  computed: {
      ...mapState({
          detailsIsshow:state=>state.attentionPeople.detailsIsshow
      })
  },
  mounted () {
      
  }
};
</script>

<style lang="scss" scoped>
.index-body {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>