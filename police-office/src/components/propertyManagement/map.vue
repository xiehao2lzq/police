<template>
  <div class="mapBox">
    <div class="tabText">
      <router-link to="/propertyManagement/houseingInfo" tag="p">实有房产</router-link>
      <p @click="person">实有人口</p>
      <p @click="car">实有车辆</p>
    </div>
    <div id="map"></div>
    <div class="building">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>6号楼</li>
          <li>房屋总数：125</li>
          <li>自住房屋总数：76</li>
          <li>出租房屋总数：27</li>
          <li>闲置房屋总数：22</li>
          <li>居住人员：200</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building0">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>11号楼</li>
          <li>房屋总数：125</li>
          <li>自住房屋总数：81</li>
          <li>出租房屋总数：30</li>
          <li>闲置房屋总数：14</li>
          <li>居住人员：216</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building1">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>7号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：72</li>
          <li>出租房屋总数：14</li>
          <li>闲置房屋总数：10</li>
          <li>居住人员：194</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building2">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>5号楼</li>
          <li>房屋总数：125</li>
          <li>自住房屋总数：79</li>
          <li>出租房屋总数：30</li>
          <li>闲置房屋总数：16</li>
          <li>居住人员：230</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building3">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>25号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：79</li>
          <li>出租房屋总数：10</li>
          <li>闲置房屋总数：7</li>
          <li>居住人员：203</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building4">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>19号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：82</li>
          <li>出租房屋总数：8</li>
          <li>闲置房屋总数：6</li>
          <li>居住人员：193</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
     <div class="building5">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>13号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：72</li>
          <li>出租房屋总数：18</li>
          <li>闲置房屋总数：6</li>
          <li>居住人员：213</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
     <div class="building6">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>23号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：76</li>
          <li>出租房屋总数：14</li>
          <li>闲置房屋总数：6</li>
          <li>居住人员：198</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building7">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>31号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：73</li>
          <li>出租房屋总数：17</li>
          <li>闲置房屋总数：6</li>
          <li>居住人员：201</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building8">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>26号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：74</li>
          <li>出租房屋总数：16</li>
          <li>闲置房屋总数：6</li>
          <li>居住人员：211</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building9">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>20号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：70</li>
          <li>出租房屋总数：16</li>
          <li>闲置房屋总数：10</li>
          <li>居住人员：191</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building10">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>15号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：75</li>
          <li>出租房屋总数：11</li>
          <li>闲置房屋总数：10</li>
          <li>居住人员：187</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building11">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>8号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：80</li>
          <li>出租房屋总数：11</li>
          <li>闲置房屋总数：5</li>
          <li>居住人员：217</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building12">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>30号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：71</li>
          <li>出租房屋总数：15</li>
          <li>闲置房屋总数：10</li>
          <li>居住人员：187</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
     <div class="building13">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>29号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：73</li>
          <li>出租房屋总数：15</li>
          <li>闲置房屋总数：8</li>
          <li>居住人员：199</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
     <div class="building14">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>28号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：75</li>
          <li>出租房屋总数：15</li>
          <li>闲置房屋总数：6</li>
          <li>居住人员：229</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building15">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>22号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：74</li>
          <li>出租房屋总数：16</li>
          <li>闲置房屋总数：6</li>
          <li>居住人员：199</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building16">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>18号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：77</li>
          <li>出租房屋总数：13</li>
          <li>闲置房屋总数：6</li>
          <li>居住人员：209</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
     <div class="building17">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>17号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：77</li>
          <li>出租房屋总数：10</li>
          <li>闲置房屋总数：9</li>
          <li>居住人员：210</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
    <div class="building18">
      <el-popover placement="right" width="200" trigger="hover">
        <router-link to="/propertyManagement/houseingInfo" style="cursor: pointer;font-size:14px">
          <li>10号楼</li>
          <li>房屋总数：96</li>
          <li>自住房屋总数：78</li>
          <li>出租房屋总数：10</li>
          <li>闲置房屋总数：8</li>
          <li>居住人员：211</li>
        </router-link>
        <!-- <el-button slot="reference">hover 激活</el-button> -->
        <div class="hover" slot="reference"></div>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
      selectedValue: state => state.commonData.selectedValue
    }),
    ...mapState({
      url: state => state.commonData.url
    })
  },
  created() {},
  watch: {
    selectedValue() {
      this.camera();
    }
  },
  mounted() {
    //this.initMap();
    //this.insertMarker();
  },
  methods: {
    person() {
      this.$store.state.actualPopulation.nowShow = true;
      this.$router.push("/actualPopulation");
    },
    car() {
      this.$store.state.actualPopulation.nowShow = false;
      this.$router.push("/actualPopulation");
    },
    //请求摄像头坐标数据
    camera() {
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
      }).then(res => {
        /* if(res.data.code=="1000"){
       var data = res.data.data
       data.forEach(item=>{
         var cameraPosition = item.deviceLocation.split(",")
         this.cameraPositions.push(cameraPosition)
       })
     }else{
       this.$store.state.homePage.errorMsg.unshift(res.data.msg)
     } */
      });
    },
    //地图初始化
    initMap() {
      var _this = this;
      this.map = new AMap.Map("map", {
        zoom: _this.zoom,
        zooms: [3, 20],
        center: [120.231734, 35.955909]
        /*  pitch: 75, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode: "3D" // 地图模式 */
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
          image: "./static/image/marker.png",
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
          image: "./static/image/camera.png",
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
  width: 1920px;
  height: 980px;
  position: relative;
  .building {
    width: 120px;
    height: 80px;
    position: absolute;
    /* background: red; */
    left: 890px;
    top: 340px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building0 {
    width: 120px;
    height: 80px;
    position: absolute;
    /* background: red; */
    left: 813px;
    top: 440px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building1 {
    width: 120px;
    height: 80px;
    position: absolute;
    /* background: red; */
    left: 843px;
    top: 240px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building2 {
    width: 120px;
    height: 80px;
    position: absolute;
    /* background: red; */
    left: 983px;
    top: 440px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building3 {
    width: 110px;
    height: 80px;
    position: absolute;
    //background: red;
    left: 597px;
    top: 325px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building4 {
    width: 100px;
    height: 80px;
    position: absolute;
    //background: red;
    left: 660px;
    top: 245px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
   .building5 {
    width: 100px;
    height: 60px;
    position: absolute;
   // background: red;
    left: 790px;
    top: 215px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
   .building6 {
    width: 100px;
    height: 60px;
    position: absolute;
    //background: red;
    left: 620px;
    top: 445px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building7 {
    width: 100px;
    height: 60px;
    position: absolute;
    //background: red;
    left: 477px;
    top: 220px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building8 {
    width: 100px;
    height: 60px;
    position: absolute;
    //background: red;
    left: 527px;
    top: 140px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building9 {
    width: 100px;
    height: 60px;
    position: absolute;
   // background: red;
    left: 617px;
    top: 90px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
   .building10 {
    width: 100px;
    height: 60px;
    position: absolute;
    //background: red;
    left: 767px;
    top: 30px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building11 {
    width: 100px;
    height: 60px;
    position: absolute;
    //background: red;
    left: 867px;
    top: 130px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
   .building12 {
    width: 100px;
    height: 60px;
    position: absolute;
    //background: red;
    left: 507px;
    top: 330px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building13 {
    width: 100px;
    height: 60px;
    position: absolute;
    //background: red;
    left: 507px;
    top: 440px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building14 {
    width: 100px;
    height: 60px;
    position: absolute;
    //background: red;
    left: 517px;
    top: 540px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building15 {
    width: 80px;
    height: 50px;
    position: absolute;
    //background: red;
    left: 667px;
    top: 540px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building16 {
    width: 80px;
    height: 50px;
    position: absolute;
    //background: red;
    left: 737px;
    top: 490px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
   .building17 {
    width: 80px;
    height: 50px;
    position: absolute;
    //background: red;
    left: 767px;
    top: 580px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
  .building18 {
    width: 80px;
    height: 50px;
    position: absolute;
    //background: red;
    left: 897px;
    top: 550px;
    .hover {
      width: 100%;
      height: 100%;
    }
  }
}
#map {
  width: 100%;
  height: 100%;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(../../../static/image/map2.png);
  background-size: cover;
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
  top: 5px;
  left: 20px;
  z-index: 10000;
  p {
    width: 120px;
    height: 35px;
    line-height: 35px;
    background: rgba(64, 71, 81, 0.9);
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    text-align: center;
    margin-left: 15px;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>