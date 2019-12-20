<template>
  <div>
    <Header />
    <Map />
    <div class="rightBox box-opacity">
        <TadayData/>
        <PersonInOrOut/>
        <CarInOrOut/>
        <AbnormalInformation/>
    </div>
    <Tendency/>
  </div>
</template>

<script>
import Header from "./header";
import Map from "./map";
import TadayData from "./tadayData"
import PersonInOrOut from "./personInOrOut"
import CarInOrOut from "./carInOrOut"
import AbnormalInformation from "./abnormalInformation"
import Tendency from "./tendency"
export default {
  components: {
    Header,
    Map,
    TadayData,
    PersonInOrOut,
    CarInOrOut,
    AbnormalInformation,
    Tendency
  }
};
</script>

<style lang="scss" scoped>
.rightBox {
  position: absolute;
  width: 480px;
  height: 956px;
  right: 10px;
  top:110px;
}
</style>