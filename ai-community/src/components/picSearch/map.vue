<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  methods: {
    initMap() {
      var _this = this;
      this.map = new AMap.Map("map", {
        zoom: 16,
        zooms: [3, 20],
        center: [120.231734, 35.955909],
        mapStyle: "amap://styles/37065280e7b327b9d3daaac919db4770"
      });
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style lang="scss" scoped>
.map {
  width: 1264px;
  height: 974px;
  float: left;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  background: red;
}
#map{
    width: 100%;
    height: 100%;
}
</style>