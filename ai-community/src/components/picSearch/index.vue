<template>
  <div>
    <Header />
    <div class="leftBox">
      <SearchBox />
      <SearchInfo />
    </div>
    <Map />
  </div>
</template>

<script>
import Header from "../nameSearch/header";
import SearchBox from "./searchBox";
import SearchInfo from "./searchInfo";
import Map from "./map";
export default {
  components: {
    Header,
    SearchBox,
    SearchInfo,
    Map
  }
};
</script>

<style lang="scss" scoped>
.leftBox{
    float: left;
}
</style>