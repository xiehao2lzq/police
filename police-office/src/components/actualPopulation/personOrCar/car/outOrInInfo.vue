<template>
  <div class="outOrInInfo boxColor">
    <div class="title clear">
      <p></p>
      <span>出入信息统计</span>
    </div>
    <div class="title4 clear">
      <p class="clear">
        <span class="selectedType">今日</span>
        <span>近一周</span>
      </p>
    </div>
    <div id="outOrInInfo"></div>
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
  created() {
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
      ///console.log(res);
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
            进入车辆: res.data.data.week.enterCount[index] * 1,
            离开车辆: res.data.data.week.outCount[index] * 1
          });
        });
        this.$nextTick(() => {
          switch ($(".title4 .selectedType").text()) {
            case "今日":
              this.data = this.dayData;
              break;
            case "近一周":
              this.data = this.WeekData;
              break;
          }
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
        container: "outOrInInfo",
        forceFit: true,
        height: 420,
        padding: [30, 20, 40, 50],
        plotBackground: {
          fill: "rgba(197,208,218,0.3)" // 图表背景色
        }
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
      //横坐标
      chart.axis("time", {
        label: {
          formatter: val => {
            //console.log(val)
            if (val % 2 == 0) {
              return val + "h";
            } else if (val % 2 == 1) {
              return "";
            }else{
              return val
            }
          },
          textStyle: {
            fill: "#939FBD",
            fontSize: 12
          }
        }
      });
      chart.legend({
        position: "top-right",
        marker: "circle",
        textStyle: {
          fill: "#939FBD"
        }
      });
      chart
        .line()
        .position("time*value")
        .color("type");
      chart
        .point()
        .position("time*value")
        .color("type")
        .size(6)
        .shape("circle")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
      chart.render();
    }
  },
  mounted() {
    var _this = this;
    $(".title4 span").click(function() {
      $(".title4 span").removeClass("selectedType");
      $(this).addClass("selectedType");
      //console.log($(this).text())
      switch ($(this).text()) {
        case "今日":
          _this.data = _this.dayData;
          //console.log(1)
          _this.dv.source(_this.data);
          break;
        case "近一周":
          _this.data = _this.WeekData;
          // console.log(2)
          _this.dv.source(_this.data);
          break;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.outOrInInfo {
  width: 932px;
  height: 452px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
}

.outOrInInfo {
  position: relative;
  .title4 {
    margin: 13px auto 0;
    width: 232px;
    p {
      background: #3BA9E6;
      overflow: hidden;
      border-radius: 4px;
      width: 232px;
    }
    span {
      float: left;
      font-size: 16px;
      line-height: 16px;
      width: 116px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;
    }
  }
  .title {
    position: absolute;
    top: 13px;
    left: 10px;
    font-size: 16px;
    color: #333333;
    p {
      width: 6px;
      height: 16px;
      float: left;
      background: linear-gradient(
        0deg,
        rgba(35, 197, 235, 1),
        rgba(35, 230, 189, 1)
      );
      box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.12);
      border-radius: 2px;
      margin-right: 10px;
    }
    span {
      float: left;
      font-size: 16px;
      line-height: 16px;
    }
  }
}
.selectedType {
  background: #5FC9FB;
}
</style>