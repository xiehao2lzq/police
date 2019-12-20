<template>
  <div class="map">
    <div class="c">
      <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        id="container"
      ></div>
    </div>
    <div class="input-card" v-show="false">
      <h4 style="color: white"></h4>
      <button @click="reloadPath">随机重排</button>
      <button @click="startAnimation">开始动画</button>
    </div>
  </div>
</template>
<script>
//引入事件总线
import bus from "../../../assets/eventsbus.js";
//引入仓库
import { mapState } from "vuex";
export default {
  name: "c",
  computed: {
    ...mapState({
      center: state => state.faceCountrl.center
    }),
    ...mapState({
      lineArr: state => state.faceCountrl.lineArr
    }),
    ...mapState({
      names: state => state.faceCountrl.names
    }),
    ...mapState({
      positions: state => state.faceCountrl.positions
    }),
    ...mapState({
      lines: state => state.faceCountrl.lines
    }),
    ...mapState({
      mapCapImgUrl: state => state.faceCountrl.mapCapImgUrl
    }),
    ...mapState({
      loading: state => state.faceCountrl.loading2
    }),
    ...mapState({
      xqName: state => state.faceCountrl.xqName
    }),
    ...mapState({
      time: state => state.faceCountrl.time
    }),
  },
  watch: {
    //检测地图数据出现变化就重置地图
    positions() {
      this.initMap();
       //将遮罩层在标点都标记后取消
      var _this = this;
      setTimeout(() => {
        _this.$store.state.faceCountrl.loading2 = false;
      }, 0); 
    }
  },
  data() {
    return {
      map: null,
      /*  lineArr: [],
      names: [],
      positions: [],
      markerList: [], //标定所有的marker
      lines: [], //标定回放的路径 */
      startMarker: null, //全局变量
      marker: null,
      searchInfo: null,
      //center: [120.138674, 35.977766]
    };
  },
  mounted() {
    // 创建地图实例  控制container可以控制地图区域
    this.initMap(); //初始化地图
    this.map.setFeatures(["road", "point", "building", "bg"]); // 多个种类要素显示
    this.map.on("complete", function() {
      console.log("地图加载完成！");
    });

    //给实例绑定事件  bus.$on("事件名",事件执行函数)
    bus.$on("reset", this.reloadPath);
    bus.$on("startAction", this.startAnimation);
    bus.$on("initMap", this.initMap);
  },
  methods: {
    //地图初始化
    initMap() {
      var _this = this
      this.map = new AMap.Map("container", {
        zoom: 18, //缩进   越大看的范围越小
        center: _this.center, //经纬度
        resizeEnable: true,
        mapStyle: "amap://styles/normal" //设置地图的显示样式
      });
      this.createWatchList();
    },
    //构建地图上的显示所有摄像头
    createWatchList() {
      for (let i = 0; i < this.positions.length; i++) {  
        //使用let形成块级作用域使每个点击事件有独立的 i 值
        this.marker = this.addMarkerByPostion(
          this.positions[i],
          this.names[i],
          this.map
        );
        //点击事件
        var that = this;

        this.marker.on("click", function(e) {
          //点击之后将值给picBox
          that.$store.state.faceCountrl.capImgUrl = that.mapCapImgUrl[i];
          var info = [];
          console.log(that.xqName)
          info.push(
            `<div style=\"padding:0px 0px 0px 4px;\"><b style='color:red;font-weight:bold;font-style:oblique'>${that.xqName[i]}</b>`
          );
          info.push(e.target.getTitle());
          info.push(`时间 :${that.time[i]}</div></div>`);
          var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>"), //使用默认信息窗体框样式，显示信息内容
            position: e.target.getPosition(),
            offset: new AMap.Pixel(0, -32)
          });
          infoWindow.open(that.map, e.target.getPosition());
        });
        //路过事件
        this.marker.on("mouseover", function(e) {
          var info = [];
          info.push(
            `<div style=\"padding:0px 0px 0px 4px;\"><b style='font-weight:bold;font-style:oblique'>${that.xqName[i]}</b>`
          );
          info.push(e.target.getTitle());
          info.push(`时间 :${that.time[i]}</div></div>`);
          var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>"), //使用默认信息窗体框样式，显示信息内容
            position: e.target.getPosition(),
            offset: new AMap.Pixel(0, -32)
          });
          infoWindow.open(that.map, e.target.getPosition());
        });
        //离开事件
        this.marker.on("mouseout", function(e) {});
      }
    },
    reloadPath() {
      //先看看是否有数据，如果没有就终止操作
      if (this.positions.length) {
        //干掉所有之前的路径
        var polylines = this.map.getAllOverlays("polyline");
        if (polylines) {
          this.map.remove(polylines);
        }
        if (this.startMarker) {
          this.map.remove(this.startMarker);
        }

        //随机重排
        /*  this.lines = this.lineArr.sort(function () {
           return .5-Math.random();
        }); */
        // 图标尺寸
        var person = new AMap.Icon({
          size: new AMap.Size(26, 32),
          image: "static/person.png",
          imageSize: new AMap.Size(26, 32)
        });
        this.marker = new AMap.Marker({
          map: this.map,
          position: this.lines[0],
          icon: person,
          offset: new AMap.Pixel(0, -32),
          autoRotation: true
        });
        //赋值给全局变量
        this.startMarker = this.marker;
        this.renderPath(this.startMarker, this.lines);
      }
    },
    //渲染路径
    renderPath(marker, lines) {
      // 绘制轨迹
      var polyline = new AMap.Polyline({
        map: this.map,
        path: lines,
        showDir: true,
        strokeColor: "#28F", //线颜色
        strokeWeight: 6 //线宽
      });
      //走过的路径
      var passedPolyline = new AMap.Polyline({
        map: this.map,
        strokeColor: "#f99b4c", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 6, //线宽
        strokeStyle: "solid" //线样式
      });
      //当marker移动绑定渲染走过的路径
      marker.on("moving", function(e) {
        passedPolyline.setPath(e.passedPath);
      });
    },
    //开始动画
    startAnimation() {
      if (this.startMarker) {
        this.startMarker.moveAlong(this.lines, 100);
      }
    },
    //添加一个显示设备标记
    addMarkerByPostion(point, name, map) {
      var bgIcon = new AMap.Icon({
        size: new AMap.Size(21, 7),
        image: "./static/marker_bg.png",
        imageSize: new AMap.Size(21, 7)
      });
      var bgMarker = new AMap.Marker({
        map: map,
        position: point,
        icon: bgIcon,
        anchor: "center", //设置锚点
        offset: new AMap.Pixel(0, 0) //设置偏移量
      });

      // 图标尺寸
      var pointIcon = new AMap.Icon({
        size: new AMap.Size(26, 32),
        image: "./static/marker.png",
        imageSize: new AMap.Size(26, 32)
      });
      // 将 Icon 传入 marker
      var marker = new AMap.Marker({
        map: map,
        position: point,
        icon: pointIcon,
        anchor: "center", //设置锚点
        offset: new AMap.Pixel(0, -17), //设置偏移量
        title: name
      });
      return marker;
    }
  }
};
</script>
<style lang="scss" scoped>
/* .map{
  float:left;
} */
#container {
  width: 64%;
  height: 6.5rem;
}
.amap-icon img {
  width: 0.25rem;
  height: 0.25rem;
}
.input-card {
  background: black;
  opacity: 0.1;
}
</style>
