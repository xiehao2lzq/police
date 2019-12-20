<template>
  <div class="tendency">
    <div class="title">
      <img src="../../../static/bgImage/pointLeft.png" alt />
      <span>趋势研判分析</span>
      <img src="../../../static/bgImage/pointRight.png" alt />
    </div>
    <li>
      <div class="title">流动人口信息</div>
      <div class="clear">
        <div class="info">
          <p class="gray-text">
            本日新增
            <br />人口
          </p>
          <p class="green-text">{{rentAdd.rentAddDay || 0}}</p>
        </div>
        <div class="info">
          <p class="gray-text">
            本月新增
            <br />人口
          </p>
          <p class="purple-text">{{rentAdd.rentAddMonth || 0}}</p>
        </div>
        <div class="info">
          <p class="gray-text">
            本年新增
            <br />人口
          </p>
          <p class="green-text">{{rentAdd.rentAddYear || 0}}</p>
        </div>
      </div>
      <div class="title">租房信息</div>
      <div class="clear">
        <div class="info">
          <p class="gray-text">
            本日新增
            <br />出租房
          </p>
          <p class="green-text">{{houseRentAdd.rentAddMonth || 0}}</p>
        </div>
        <div class="info">
          <p class="gray-text">
            本月新增
            <br />出租房
          </p>
          <p class="purple-text">{{houseRentAdd.rentAddDay || 0}}</p>
        </div>
        <div class="info">
          <p class="gray-text">
            本年新增
            <br />出租房
          </p>
          <p class="green-text">{{houseRentAdd.rentAddYear || 0}}</p>
        </div>
      </div>
    </li>
    <li>
      <div class="clear">
        <div class="info2">
          <div class="title">房屋性质统计</div>
          <div id="home"></div>
        </div>
        <div class="info2">
          <div class="title">人员性质统计</div>
          <div id="person"></div>
        </div>
      </div>
    </li>
    <li>
      <div class="clear">
        <div class="info3">
          <div class="title">活动规律统计</div>
          <div id="activeRule"></div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data(){
    return{
      rentAdd:{},
      houseRentAdd:{},
      persondata:null,
    }
  },
  computed: {
    ...mapState({
      url: state => state.homePage.url
    }),
    ...mapState({
      selectedValue: state => state.homePage.selectedValue
    })
  },
  methods: {

    //人员性质统计画图
    canvas1(){
      var chart2 = new G2.Chart({
          container: "person",
          forceFit: true,
          height: 200,
          animate: false,
          padding: [10, 10, 50, 10]
        });
        chart2.source(this.persondata, {
          percent: {
            formatter: function formatter(val) {
              val = val * 100 + "%";
              return val;
            }
          }
        });
        chart2.coord("theta", {
          radius: 0.85,
          innerRadius: 0.6
        });
        chart2.tooltip({
          showTitle: false,
          itemTpl:
            '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        });
        // 辅助文本
        /* chart2.guide().html({
          position: ["50%", "50%"],
          html:
            '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">总计<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
          alignX: "middle",
          alignY: "middle"
        }); */
        chart2.legend({
          textStyle: {
            fill: "#939FBD"
          },
          itemFormatter(val) {
            //自定义标注内容
            if (val.length > 3) {
              var topLabe = val.slice(0, 3);
              var bottLabe = val.slice(3);
              return `${topLabe}
${bottLabe}`;
            } else {
              return val;
            }
          }
        });
        var interval = chart2
          .intervalStack()
          .position("percent")
          .color("personProperty",["l(90) 0:#23E6BD 1:#23C5EB", "l(90) 0:#F3A254 1:#ED577E", "l(90) 0:#D298F1 1:#6E56E8"])
          .label("percent", {
            formatter: function formatter(val, item) {
              return `${val}`;
            },
            offset: 20,
            textStyle: {
              textAlign: "center",
              shadowBlur: 2,
              shadowColor: "#939FBD",
              fill: "#939FBD"
            }
          })
          .tooltip("personProperty*num", function(personProperty, num) {
            //percent = percent * 100 + "%";
            return {
              name: personProperty,
              value: num+'人'
            };
          });
        chart2.render();
    },


    //流动人口信息和租房信息
    dataInfo(){
      this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/person/floating",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        subdistrictId: "",
        xqCode: this.selectedValue
      }
    }).then(res=>{
      this.rentAdd = res.data.data
    });
    this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/house/rent/statistics",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        subdistrictId: "",
        xqCode: this.selectedValue
      }
    }).then(res=>{
      //console.log(res.data.data)
      this.houseRentAdd = res.data.data
    })
    },


    //房屋性质统计画图
    canvas2(){
      var chart = new G2.Chart({
      container: "home",
      forceFit: true,
      height: 200,
      animate: false,
      padding: [10, 10, 50, 10]
    });
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + "%";
          return val;
        }
      }
    });
    chart.coord("theta", {
      radius: 0.85,
      innerRadius: 0.6
    });
    chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    // 辅助文本
    chart.guide().html({
      position: ["50%", "50%"],
      html:
        '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">总计<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
      alignX: "middle",
      alignY: "middle"
    });
    var interval = chart
      .intervalStack()
      .position("percent")
      .color("item")
      .label("percent", {
        formatter: function formatter(val, item) {
          //console.log(item,val)
          return item.point.item + ": " + val;
        },
        textStyle: {
          textAlign: "center",
          shadowBlur: 2,
          shadowColor: "#939FBD",
          fill: "#939FBD"
        }
      })
      .tooltip("item*percent", function(item, percent) {
        percent = percent * 100 + "%";
        return {
          name: item,
          value: percent
        };
      });
    chart.render();
    },
    //人员性质统计数据获取
    personData(){
      this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/person/property",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        subdistrictId: "",
        xqCode: this.selectedValue
      }
    }).then(res => {
      if (res.data.code == "1000") {
        this.persondata = res.data.data;
        this.$nextTick(()=>{
          this.canvas1()
        })
      }
    });
    },
    //房屋性质统计数据获取
    houseData(){
      this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/house/room/property/statistics",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        subdistrictId: "",
        xqCode: this.selectedValue
      }
    }).then(res=>{
      //console.log(res)
      this.$nextTick(()=>{
          this.canvas2()
        })
    })
    },
    activeRule(){
      this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/person/activity/statistics",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        subdistrictId: "",
        xqCode: this.selectedValue
      }
    }).then(res=>{
      //console.log(res.data.data)
      var week = []
      res.data.data.forEach(item=>{
        //week.push(item.weekName)
      })
    })
    }
  },
  created () {
    this.personData();
    //this.houseData();
    this.activeRule( )
  },
  mounted() {  
    var data = [
      {
        item: "事例一",
        count: 40,
        percent: 0.4
      },
      {
        item: "事例二",
        count: 21,
        percent: 0.21
      }
    ];

    var _G = G2,
      Global = _G.Global;

    var colorMap = {
      Asia: Global.colors[0],
      Americas: Global.colors[1],
      Europe: Global.colors[2],
      Oceania: Global.colors[3]
    };
    $.getJSON(
      "https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json",
      function(data) {
        var chart3 = new G2.Chart({
          container: "activeRule",
          forceFit: true,
          height: 200,
          padding: [30, 20, 20, 30],
          plotBackground: {
            fill: "#2B2F43" // 图表背景色
          }
        });
        chart3.source(data);
        // 为各个字段设置别名
        chart3.scale({
          LifeExpectancy: {
            alias: "人均寿命（年）"
          },
          Population: {
            type: "pow",
            alias: "人口总数"
          },
          GDP: {
            alias: "人均国内生产总值($)"
          },
          Country: {
            alias: "国家/地区"
          }
        });

        chart3.axis("GDP", {
          label: {
            formatter: function formatter(value) {
              return (value / 1000).toFixed(0) + "k";
            }, // 格式化坐标轴的显示
            textStyle: {
              fill: "#939FBD",
              fontSize: 12
            }
          }
        });
        chart3.axis("LifeExpectancy", {
          label: {
            textStyle: {
              fill: "#939FBD",
              fontSize: 12
            }
          },
          grid: {
            lineStyle: {
              stroke: "#37477f",
              lineWidth: 1,
              lineDash: [2, 2]
            }
          }
        });
        chart3.tooltip({
          showTitle: false // 不显示默认标题
        });
        chart3.legend("Population", false); // 该图表默认会生成多个图例，设置不展示 Population 和 Country 两个维度的图例
        chart3.legend({
          position: "top-right",
          marker: "circle",
          textStyle: {
            fill: "#939FBD"
          }
        });
        chart3
          .point()
          .position("GDP*LifeExpectancy")
          .size("Population", [5, 15])
          .color("continent", function(val) {
            return colorMap[val];
          })
          .shape("circle")
          .tooltip("Country*Population*GDP*LifeExpectancy")
          .style("continent", {
            lineWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0.3,
            opacity: 0.65,
            stroke: function stroke(val) {
              return colorMap[val];
            }
          });
        chart3.render();
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.tendency {
  width: 1370px;
  height: 299px;
  margin-left: 8px;
  background: url(../../../static/bgImage/bottom.png);
  overflow: hidden;
}
.title {
  width: 100%;
  height: 20px;
  margin-top: 10px;
  font-size: 16px;
  img {
    display: inline-block;
  }
  text-align: center;
}
.tendency li {
  width: 33.3%;
  height: 259px;
  float: left;
  .title {
    font-size: 14px;
    margin-bottom: 15px;
  }
  .info {
    float: left;
    width: 33.3%;
    text-align: center;
    p:last-child {
      font-size: 22px;
    }
  }
  p {
    margin-bottom: 10px;
  }
}
.info2 {
  float: left;
  width: 50%;
  text-align: center;
}
.info3 {
  float: left;
  width: 100%;
  text-align: center;
}
</style>