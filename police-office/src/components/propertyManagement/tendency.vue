<template>
  <div class="tendency box-opacity">
    <div class="title">
      <img src="@static/image/pointLeft.png" alt />
      <span>趋势研判分析</span>
      <img src="@static/image/pointRight.png" alt />
    </div>
    <li>
      <div class="title">流动人口信息</div>
      <div class="clear">
        <div class="info">
          <p class>
            本日新增
            <br />人口
          </p>
          <p class="green-text">{{rentAdd.rentAddDay || 0}}</p>
        </div>
        <div class="info">
          <p class>
            本月新增
            <br />人口
          </p>
          <p class="purple-text">{{rentAdd.rentAddMonth || 0}}</p>
        </div>
        <div class="info">
          <p class>
            本年新增
            <br />人口
          </p>
          <p class="green-text">{{rentAdd.rentAddYear || 0}}</p>
        </div>
      </div>
      <div class="title">租房信息</div>
      <div class="clear">
        <div class="info">
          <p class>
            本日新增
            <br />出租房
          </p>
          <p class="green-text">{{houseRentAdd.rentAddDay || 0}}</p>
        </div>
        <div class="info">
          <p class>
            本月新增
            <br />出租房
          </p>
          <p class="purple-text">{{houseRentAdd.rentAddMonth || 0}}</p>
        </div>
        <div class="info">
          <p class>
            本年新增
            <br />出租房
          </p>
          <p class="green-text">{{houseRentAdd.rentAddYear || 0}}</p>
        </div>
      </div>
    </li>
    <li>
      <div class="clear">
        <!--  <div class="info2">
          <div class="title">房屋性质统计</div>
          <div id="home"></div>
        </div>-->
        <div class="info2">
          <div class="title">人员性质统计</div>
          <div id="person"></div>
        </div>
      </div>
    </li>
    <li>
      <div class="clear">
        <div class="info3">
          <div class="title">房屋结构信息（近6个月）</div>
          <div id="house"></div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      rentAdd: {},
      houseRentAdd: {},
      persondata: null,
      data: []
    };
  },
  computed: {
    ...mapState({
      url: state => state.commonData.url
    }),
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    })
  },
  methods: {
    //人员性质统计画图
    canvas1() {
      var chart2 = new G2.Chart({
        container: "person",
        forceFit: true,
        height: 200,
        animate: false,
        padding: [30, 200, 30, 10]
      });
      chart2.source(this.persondata, {
        percent: {
          formatter: function formatter(val) {
            val = val + "%";
            return val;
          }
        }
      });
      chart2.coord("theta", {
        radius: 1,
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
        position: "right",
        offsetX: 20,
        offsetY: -15,
        textStyle: {
          fill: "#fff"
        },
        itemFormatter(val) {
          //自定义标注内容
          if (val.length > 3) {
            var topLabe = val.slice(0, 4);
            var bottLabe = val.slice(4);
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
        .color("personProperty", [
          "l(90) 0:#23E6BD 1:#23C5EB",
          "l(90) 0:#F3A254 1:#ED577E",
          "l(90) 0:#D298F1 1:#6E56E8"
        ])
        .label("percent", {
          formatter: function formatter(val, item) {
            return `${val}`;
          },
         // offset: 25,
          textStyle: {
            //textAlign: "start",
            shadowBlur: 2,
            shadowColor: "#939FBD",
            fill: "#fff",
           // textBaseline: "top"
          }
        })
        .tooltip("personProperty*num", function(personProperty, num) {
          //percent = percent * 100 + "%";
          return {
            name: personProperty,
            value: num + "人"
          };
        });
      chart2.render();
    },

    //流动人口信息和租房信息
    dataInfo() {
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
      }).then(res => {
        //console.log(res)
        this.rentAdd = res.data.data;
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
      }).then(res => {
        //console.log(res)
        //console.log(res.data.data)
        this.houseRentAdd = res.data.data;
      });
    },

    //房屋性质统计画图
    canvas2() {
      const chart = new G2.Chart({
        container: "house",
        forceFit: true,
        height: 200,
        padding: [25, 20, 20, 40]
        /* plotBackground: {
          fill: "#2B2F43" // 图表背景色
        } */
      });
      chart.source(this.data, {
        /*  value:{
          tickInterval: 1, // 自定义刻度间距
        } */
      });
      chart.axis("value", {
        label: {
          textStyle: {
            fill: "#fff",
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
      chart.legend({
        position: "top-right",
        marker: "circle",
        textStyle: {
          fill: "#fff"
        }
      });
      chart.axis("time", {
        label: {
          textStyle: {
            fill: "#fff",
            fontSize: 12
          }
        }
      });
      chart
        .intervalStack()
        .position("time*value")
        .color("type", ["#23D5D4", "#9D75EC", "#25BCFF"]); //记得改
      chart.render();
    },
    //人员性质统计数据获取
    personData() {
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
          this.$nextTick(() => {
            this.canvas1();
          });
        }
      });
    },
    //房屋性质统计数据获取
    houseData() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/house/room/property",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode: this.selectedValue,
          subdistrictId: ""
        }
      }).then(res => {
        //console.log(res)
        if (res.data.code == "1000") {
          //this.$forceUpdata()
          var monthList = res.data.data.monthList;
          monthList.forEach((item, index) => {
            this.data.push({
              time: item + "月",
              type: "出租",
              value: res.data.data.roomPropertyNum[index].rentNum * 1
            });
            this.data.push({
              time: item + "月",
              type: "自住",
              value:
                res.data.data.roomPropertyNum[index]
                  .selfOccupationNum * 1
            });
            this.data.push({
              time: item + "月",
              type: "闲置",
              value:
                res.data.data.roomPropertyNum[index].vacancyNum * 1
            });
          });
          var _this = this;
          //异步执行
          //console.log(this.data)
          setTimeout(function() {
            _this.canvas2();
          }, 0);
        }
      });
    }
  },
  created() {
    this.dataInfo();
    this.personData();
    this.houseData();
  }
};
</script>

<style lang="scss" scoped>
.tendency {
  width: 1399px;
  height: 288px;
  position: fixed;
  bottom: 14px;
  left: 15px;
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
  width: 100%;
  text-align: center;
}
.info3 {
  float: left;
  width: 100%;
  text-align: center;
}
</style>