<template>
  <div class="home">
    <SearchBox :title="title" :effect="effect"/>
    <div class="bottom">
      <div class="leftbox">
        <PicBox/>
        <SearchInfo/>
      </div>
      <div class="map">
        <GaodeMap/>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBox from "./searchBox";
import GaodeMap from "./gaodeMap";
import SearchInfo from "./searchInfo";
import PicBox from "./picBox";
export default {
  //组件内路由守卫
  beforeRouteLeave(to, from, next) {
    //离开此页面对数据还原
    this.$store.state.faceCountrl = {
      //人名搜索和以图搜图用了一个数据源
      tableData: [], //searchInfo数据
      faceImgUrl: "", //picBox数据
      capImgUrl: "",
      lineArr: [],
      positions: [],
      names: [],
      lines: [],
      mapCapImgUrl: [],
      capVideoUrl: "", //视频地址
      isshow: false,
      loading: false, //数据加载的遮罩层置否显示
      loading2: false, //地图部分的遮罩层
      nextRequest: true, //默认可以进行请求
      center:[120.138674, 35.977766],//地图中心点
    };
    next();
  },
  components: {
    SearchBox,
    GaodeMap,
    SearchInfo,
    PicBox
  },
  data() {
    return {
      title: "相似度",
      effect:">>人员轨迹查询"
    };
  }
};
</script>
<style lang="scss" scoped>
.leftbox {
  float: left;
  width: 35%;
  margin-right: 1%;
}
.bottom {
  width: 98%;
  margin: 0 auto;
}
</style>
