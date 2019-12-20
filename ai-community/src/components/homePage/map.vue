<template>
  <div class="mapBox">
    <div class="tabText">
      <router-link to="/indeedHouse" tag="p">数据中心</router-link>
      <router-link to="/nameSearch" tag="p">布控应用</router-link>
    </div>
    <div id="map"></div>
    <div class="btn">
      <img src="../../../static/bgImage/setting.png" alt />
      <img src="../../../static/bgImage/position.png" @click="mapSetFitView" alt />
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex"
export default {
  data() {
    return {
      map: null,
      position: [
        [120.186351, 35.947456],
        [120.225168, 35.956944],
        [120.231734, 35.955909]
      ],
      title: ["名嘉汇", "凤凰城", "海韵家园"],
      markerArr: [], //marker点集
      polygon: null, //不规则覆盖区域
      polygonArr: [
        //路线
        [120.18599, 35.945918],
        [120.188307, 35.947013],
        [120.186827, 35.949254],
        [120.18408, 35.948046]
      ],
      cameraMarker: [], //摄像头marker点集
      cameraPositions: [
        [120.184751, 35.948168],
        [120.185647, 35.94845],
        [120.1865, 35.948932],
        [120.185207, 35.947703],
        [120.186913, 35.948203],
        [120.185711, 35.947091],
        [120.187267, 35.947768],
        [120.186274, 35.946478],
        [120.187519, 35.947104]
      ], //摄像头坐标集
      zoom: 16,
      isshow: false
    };
  },
  computed: {
    ...mapState({
      selectedValue:state=>state.homePage.selectedValue
    }),
     ...mapState({
      url:state=>state.homePage.url
    })
  },
  created () {
    
  },
  watch: {
    selectedValue(){
      this.camera()
    }
  },
  mounted() {
    this.initMap();
    this.insertMarker();
  },
  methods: {
    //请求摄像头坐标数据
    camera(){
      this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/capture",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue
      }
    }).then(res=>{
     /* if(res.data.code=="1000"){
       var data = res.data.data
       data.forEach(item=>{
         var cameraPosition = item.deviceLocation.split(",")
         this.cameraPositions.push(cameraPosition)
       })
     }else{
       this.$store.state.homePage.errorMsg.unshift(res.data.msg)
     } */
    })
    },
    //地图初始化
    initMap() {
      var _this = this;
      this.map = new AMap.Map("map", {
        zoom: _this.zoom,
        zooms: [3, 20],
        center: [120.231734, 35.955909],
        mapStyle: "amap://styles/37065280e7b327b9d3daaac919db4770"
      });
    },
    //插入marker点
    insertMarker() {
      var _this = this;
      for (var i = 0; i < this.position.length; i++) {
        // 创建一个 Icon
        var imageIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(53, 63),
          // 图标的取图地址
          image: "./static/bgImage/marker.png",
          // 图标所用图片大小
          imageSize: new AMap.Size(53, 63)
          // 图标取图偏移量
          //imageOffset: new AMap.Pixel(-9, -3)
        });

        // 将 icon 传入 marker
        var iconMarker = new AMap.Marker({
          position: new AMap.LngLat(..._this.position[i]),
          icon: imageIcon,
          offset: new AMap.Pixel(-13, -30),
          anchor: "center" //设置锚点
        });
        iconMarker.on("click", this.polygonOver);
        this.markerArr.push(iconMarker);
      }
      this.map.add(this.markerArr); //插入
      this.map.on("zoomchange", this.mapZoom); //地图缩放事件
      this.map.setFitView();
    },
    /* 不规则区域 */
    polygonOver() {
      var _this = this;
      this.isshow = true; //打开缩放清除开关
      if (this.polygon) {
        this.map.remove(this.polygon);
      }
      if (this.cameraMarker.length) {
        this.map.remove(this.cameraMarker);
      }
      this.polygon = new AMap.Polygon({
        map: _this.map,
        path: _this.polygonArr, //设置多边形边界路径
        strokeColor: "#FF33FF", //线颜色
        strokeOpacity: 0.2, //线透明度
        strokeWeight: 3, //线宽
        fillColor: "#1791fc", //填充色
        fillOpacity: 0.35 //填充透明度
      });
      for (var i = 0; i < this.cameraPositions.length; i++) {
        // 创建一个 Icon
        var imageIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(48, 51),
          // 图标的取图地址
          image: "./static/bgImage/camera.png",
          // 图标所用图片大小
          imageSize: new AMap.Size(48, 51)
          // 图标取图偏移量
          //imageOffset: new AMap.Pixel(-9, -3)
        });

        // 将 icon 传入 marker
        var iconMarker = new AMap.Marker({
          position: new AMap.LngLat(..._this.cameraPositions[i]),
          icon: imageIcon,
          offset: new AMap.Pixel(-13, -10),
          anchor: "center" //设置锚点
        });
        this.cameraMarker.push(iconMarker);
      }
      this.map.add(this.cameraMarker); //插入
      this.map.setFitView(this.polygon);
    },
    mapZoom() {
      this.zoom = this.map.getZoom(); //获取当前地图级别
      if (this.zoom < 16 && this.isshow) {
        this.map.remove(this.cameraMarker);
        this.map.remove(this.polygon);
        this.isshow = false;
      }
    },
    mapSetFitView() {
      this.map.setFitView();
    }
  }
};
</script>

<style lang="scss" scoped>
.mapBox {
  width: 1370px;
  height: 684px;
  border-radius: 4px;
  background: url(../../../static/bgImage/mapBg.png);
  position: relative;
  margin-left: 8px;
  margin-top: 6px;
}
#map {
  width: 1299px;
  height: 616px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.btn {
  width: 37px;
  height: 80px;
  background: rgba($color: #000000, $alpha: 0.3);
  box-shadow: 0px 3px 6px 0px rgba(2, 7, 20, 0.19);
  border-radius: 5px;
  position: absolute;
  bottom: 40px;
  left: 50px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  img {
    cursor: pointer;
  }
}
.tabText {
  position: absolute;
  top: 50px;
  left: 40px;
  z-index: 10000;
  p {
    width: 120px;
    height: 35px;
    line-height: 35px;
    background: rgba($color: #000000, $alpha: 0.3);
    box-shadow: 0px 3px 6px 0px rgba(2, 7, 20, 0.19);
    text-align: center;
    border-radius: 5px 5px 0 0;
    float: left;
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>