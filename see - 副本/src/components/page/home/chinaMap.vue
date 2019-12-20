<template>
  <div>
    <div class="box">
      <button class="backBtn" @click="back()" v-if="btnShow">返回上级</button>
      <div id="mapChart" class="chart"></div>
      <div class="rightBox">
        <p class="title">项目总数</p>
        <p class="num">{{chinaMap.amountSum||""}}</p>
        <p class="title">管理面积</p>
        <p class="num">{{chinaMap.areaSum||""}}</p>
        <div class="more" @click="lookMore" v-if="isshow">查看小区详情>></div>
      </div>
    </div>
  </div>
</template>

<script>
import cityMap from "@/js/china-main-city-map.js";
import echarts from "echarts";
import axios from "axios";
import Vue from "vue";
// import registerAndsetOption from '@/js/echarts-map'

//中国地图（第一级地图）的ID、Name、Json数据
var chinaId = 100000;
var chinaName = "china";
var chinaJson = null;

//记录父级ID、Name
var mapStack = [];
var parentId = null;
var parentName = null;

//Echarts地图全局变量，主要是在返回上级地图的方法中会用到
var myChart = null;

var map = "china";
var xqName = sessionStorage.getItem("username");
import { mapState } from "vuex";
export default {
  name: "chinaMap",
  props: {
    msg: String
  },
  data() {
    return {
      chinaMap: {},
      isshow: false,
      btnShow: false
    };
  },
  computed: {
    ...mapState({
      url: state => state.home.url
    })
  },
  mounted() {
    this.mapChart("mapChart");
    this.getInfo();
  },
  methods: {
    //查看更多小区
    lookMore() {
      this.$store.dispatch("lookMore"); //触发查询小区列表事件
      this.$store.state.home.isshow4 = true;
    },
    //获取数据
    getInfo() {
      this.$axios
        .get("http://" + this.url + ":9000/sjwl/manageport/tj/xqInfo", {
          params: {
            xqCode: "",
            areaId: "0"
          }
          /*  headers:{
          "Authorization":sessionStorage.getItem("Authorization"),
          'Content-Type':'application/json'
        } */
        })
        .then(res => {
          if (!res.data.code === "1000") {
            return false;
          }
          this.chinaMap = res.data.data;
          this.$forceUpdate();
        });
    },
    /**
     * 返回上一级地图
     */
    back() {
      if (mapStack.length != 0) {
        //如果有上级目录则执行
        var map = mapStack.pop();
        axios
          .get("./static/json/map/" + map.mapId + ".json", {})
          .then(response => {
            const mapJson = response.data;
            //隐藏查看更多
            this.isshow = false;
            //查看所有小区
            this.$store.state.home.xqCode = "";
            if (xqName == "xiahuayuan") {
              console.log(map.mapName)
              if (map.mapName === "china") {
                this.btnShow = false;
                var data = [
                  { name: "承德", value: [118.489341, 40.618128, 90] }
                ];
              } else if (map.mapName === "河北") {
                var data = [
                  { name: "承德", value: [118.489341, 40.618128, 90] }
                ];
              } else {
                var data = [];
              }
            } else {
              if (map.mapName === "china") {
                this.btnShow = false;
                var data = [{ name: "青岛", value: [120.33, 36.07, 90] }];
              } else if (map.mapName === "山东") {
                var data = [{ name: "青岛", value: [120.33, 36.07, 90] }];
              } else {
                var data = [];
              }
            }
            registerAndsetOption(
              myChart,
              map.mapId,
              map.mapName,
              mapJson,
              false,
              map.mapName,
              data
            );

            //返回上一级后，父级的ID、Name随之改变
            parentId = map.mapId;
            parentName = map.mapName;
          });
      }
    },
    /**
     * Echarts地图
     */

    mapChart(divid) {
      var _this = this;
      axios.get("./static/json/map/" + chinaId + ".json", {}).then(response => {
        const mapJson = response.data;
        chinaJson = mapJson;
        myChart = echarts.init(document.getElementById(divid));
        if (xqName == "xiahuayuan") {
          var data = [{ name: "承德", value: [118.489341, 40.618128, 90] }];
        } else {
          var data = [{ name: "青岛", value: [120.33, 36.07, 90] }];
        }

        registerAndsetOption(
          myChart,
          chinaId,
          chinaName,
          mapJson,
          false,
          "china",
          data
        );
        parentId = chinaId;
        parentName = "china";
        var _this = this;
        myChart.on("click", function(param) {
          var cityId = cityMap[param.name];
          if (cityId) {
            //代表有下级地图
            _this.btnShow = true;
            if (xqName == "xiahuayuan") {
              if (param.name === "河北") {
                var data = [
                  { name: "承德", value: [118.489341, 40.618128, 90] }
                ];
              } else if (param.name === "承德市") {
                //显示查看更多
                _this.isshow = true;
                var data = [
                  { name: "宽城满族自治县", value: [118.489341, 40.618128, 90] }
                ];
              } else {
                var data = [];
              }
            }else{
              if (param.name === "山东") {
              var data = [{ name: "青岛", value: [120.33, 36.07, 90] }];
            } else if (param.name === "青岛市") {
              //显示查看更多
              _this.isshow = true;
              var data = [
                { name: "西海岸新区", value: [120.201178, 35.968, 90] }
              ];
            } else {
              var data = [];
            }
            }
            
            axios
              .get("./static/json/map/" + cityId + ".json", {})
              .then(response => {
                const mapJson = response.data;
                //console.log(param.name + 123);
                registerAndsetOption(
                  myChart,
                  cityId,
                  param.name,
                  mapJson,
                  true,
                  param.name,
                  data
                );
              });
          } /* else {
            //没有下级地图，回到一级中国地图，并将mapStack清空
            var data = [
              { name: "青岛", value: [120.33, 36.07, 90] }, 
            ];
            registerAndsetOption(
              myChart,
              chinaId,
              chinaName,
              chinaJson,
              false,
              chinaName,
              data
            );
            mapStack = [];
            parentId = chinaId;
            parentName = chinaName;
          } */
        });
      });
    }
  }
};
/**
 *
 * @param {*} myChart
 * @param {*} id        省市县Id
 * @param {*} name      省市县名称
 * @param {*} mapJson   地图Json数据
 * @param {*} flag      是否往mapStack里添加parentId，parentName
 */
function registerAndsetOption(myChart, id, name, mapJson, flag, map, data) {
  //map为坐标的参照地图，data为坐标数据
  echarts.registerMap(name, mapJson);
  myChart.setOption({
    tooltip: { trigger: "item", formatter: "{b}" }, //移动跟随框
    //地图坐标系必备的配置
    geo: {
      silent: false,
      map: map, //坐标定位必须点，标准城市名与下面的name相同
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        hoverAnimation: false,
        normal: {
          areaColor: "#323c48",
          borderColor: "#000"
        },
        emphasis: {
          areaColor: "#2a333d",
          opacity: 0
        }
      }
    },
    series: [
      //地图配置
      {
        label: {
          normal: {
            show: false,
            textStyle: {
              color: "#999",
              fontSize: 13
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 13
            }
          }
        },
        itemStyle: {
          normal: {
            areaColor: "#2c4a80",
            borderColor: "#101737"
          },
          emphasis: {
            areaColor: "rgb(31,47,83)"
          }
        },
        type: "map",
        map: name, //坐标定位必须点，标准城市名与下面的name相同
        data: initMapData(mapJson)
      },
      {
        name: "销量",
        type: "effectScatter",
        coordinateSystem: "geo",
        //tooltip:{trigger: "item", formatter: "{b}"},
        data: data, // series数据内容
        //symbol: 'pin',//气泡
        rippleEffect: {
          period: 2.5, //波纹秒数
          brushType: "stroke", //stroke(涟漪)和fill(扩散)，两种效果
          scale: 3.5 //波纹范围
        },
        /*  symbolSize: function (val) {
                return val[2] / 10;
            }, */
        label: {
          normal: {
            formatter: "{b}",
            position: "right",
            show: false
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: "#ddb926"
          }
        }
      }
    ]
  });

  if (flag) {
    //往mapStack里添加parentId，parentName,返回上一级使用
    mapStack.push({
      mapId: parentId,
      mapName: parentName
    });
    parentId = id;
    parentName = name;
  }
}

function initMapData(mapJson) {
  var mapData = [];
  for (var i = 0; i < mapJson.features.length; i++) {
    mapData.push({
      name: mapJson.features[i].properties.name
      //id:mapJson.features[i].id
    });
  }
  return mapData;
}
</script>

<style>
</style>

<style scoped>
#mapChart {
  width: 6.8rem;
  height: 5rem;
}
.box {
  position: relative;
  background-color: #101737;
  width: 9.58rem;
  height: 5.64rem;
  background-image: url(../../../assets/images/conbox2.png);
  background-size: 100% 100%;
  margin: 0.1rem 0 0 0.1rem;
}

.chart {
  position: relative;
  height: 90%;
  top: 10%;
}
.backBtn {
  position: absolute;
  top: 0.4rem;
  left: 0.6rem;
  background-color: #101737;
  box-shadow: 0 0 0.1rem 0.1rem inset #455ab691;
  border: 0;
  color: #fff;
  height: 27px;
  font-family: Microsoft Yahei;
  font-size: 1em;
  cursor: pointer;
}
.myBlog {
  position: absolute;
  top: 2px;
  right: 5%;
  display: block;
  border: 2px solid #262a53;
}
.myBlog a {
  text-decoration: none;
  display: inline-block;
  color: #fff;
  padding: 5px;
  font-size: 1em;
}

.myBlog a img {
  vertical-align: middle;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: -5px 5px auto auto;
}
.bottom {
  position: absolute;
  width: 100%;
  height: 5%;
  line-height: 100%;
  left: 0;
  bottom: 0%;
  text-align: center;
}
.rightBox {
  position: absolute;
  top: 1.05rem;
  right: 0.55rem;
}
p {
  margin-bottom: 0.1rem;
}
.title {
  font-size: 0.18rem;
  font-weight: 900;
  color: #68abef;
  margin-left: 0.05rem;
}
.num {
  width: 1.6rem;
  height: 0.38rem;
  border: 2px solid #37477f;
  text-align: center;
  font-weight: 900;
  font-size: 0.22rem;
  color: #ffff00;
}
.more {
  border: 2px solid #37477f;
  color: #fff;
  text-align: center;
  padding: 0.1rem 0;
  font-size: 0.16rem;
  font-weight: 900;
  margin-top: 1.5rem;
  cursor: pointer;
}
button {
  outline: 0;
}
</style>
