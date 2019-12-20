<template>
  <div class="carInOrOut">
    <div class="title">
      <img src="@static/image/pointLeft.png" alt />
      <span>车辆出入统计</span>
      <img src="@static/image/pointRight.png" alt />
    </div>
    <div id="carInOrOut"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import { View } from "@antv/data-set";
import { mapState } from "vuex";
export default {
   data() {
    return {
      dayData: [],
      WeekData: [],
      data: [],
      dv: null
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
  created () {
    this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/car/stream",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue,
        subdistrictId: ""
      }
    }).then(res => {
      //console.log(res);
      if (res.data.code == 1000) {
        res.data.data.day.dateList.forEach((item, index) => {
          this.dayData.push({
            time: item * 1 + 1 + "",
            进入车辆: res.data.data.day.enterCount[index] * 1,
            离开车辆: res.data.data.day.outCount[index] * 1
          });
        });
        res.data.data.week.dateList.forEach((item, index) => {
          this.WeekData.push({
            time: item,
            进入车辆: res.data.data.day.enterCount[index] * 1,
            离开车辆: res.data.data.day.outCount[index] * 1
          });
        });
        this.$nextTick(() => {
          this.data = this.dayData;
         /*  switch ($(".title4 .selectedType").text()) {
            case "今日":
              this.data = this.dayData;
              break;
            case "近一周":
              this.data = this.WeekData;
              break;
          } */
          this.dv = new View();
          this.canvas();
        });
      }
    });
  },
  methods: {
    canvas() {
      var _this = this;
      this.dv.source(this.data);
      // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
      this.dv.transform({
        type: "fold",
        fields: ["进入车辆", "离开车辆"], // 展开字段集
        key: "type", // key字段
        value: "value" // value字段
      });
      const chart = new G2.Chart({
        container: "carInOrOut",
        forceFit: true,
        height: 205,
        padding: [30, 20, 40, 50],
        /* plotBackground: {
          fill: "#2B2F43" // 图表背景色
        } */
      });
      chart.source(_this.dv, {
        month: {
          range: [0, 1]
        }
      });
      //悬浮提示框
      chart.tooltip({
        crosshairs: {
          type: "line"
        },
        showTitle: false // 默认标题不显示
      });
      //纵坐标
      chart.axis("value", {
        label: {
          formatter: val => {
            return val + "";
          },
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
      //横坐标
      chart.axis("time", {
        label: {
          formatter: val => {
            //console.log(val)
            if (val % 2 == 0) {
              return val + "h";
            } else if (val % 2 == 1) {
              return "";
            }
          },
          textStyle: {
            fill: "#fff",
            fontSize: 12
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
       chart
      .area()
      .position("time*value")
      .color("type", ["l(90) 0:#22dcbe 1:#2B2F43", "l(90) 0:#ff6166 1:#2B2F43"])
      .shape("smooth");
    chart
      .line()
      .position("time*value")
      .color("type",["l(0) 0:#37e4fe 1:#20dbb6", "l(0) 0:#ff977f 1:#ff515e"])
      .size(2)
      .shape("smooth").tooltip(false);
    chart.render();
    }
  },
  mounted() {
   
  }
};
</script>

<style lang="scss" scoped>
.carInOrOut {
  width: 100%;
  height: 246px;
  overflow: hidden;
   margin-top: 2px;
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
</style>