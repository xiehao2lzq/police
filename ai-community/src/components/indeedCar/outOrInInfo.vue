<template>
  <div class="outOrInInfo">
    <div class="rightLogo"></div>
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
      selectedValue: state => state.homePage.selectedValue
    }),
    ...mapState({
      url: state => state.homePage.url
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
        height: 450,
        padding: [30, 20, 40, 50],
        plotBackground: {
          fill: "#2B2F43" // 图表背景色
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
           _this.dv.source(_this.data)
          break;
        case "近一周":
          _this.data = _this.WeekData;
         // console.log(2)
            _this.dv.source(_this.data)
          break;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.outOrInInfo {
  width: 842px;
  height: 482px;
  background: #2f324b;
  box-shadow: 0px 1px 8px 0px rgba(28, 31, 52, 0.99);
  border-radius: 4px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
}
.rightLogo {
  width: 123px;
  height: 14px;
  background: url(../../../static/bgImage/point.png);
  position: absolute;
  top: 0;
  right: 4px;
}
.outOrInInfo {
  position: relative;
  .title4 {
    margin: 13px auto 0;
    width: 232px;
    p {
      background: #4b57b6;
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
ul {
  width: 100%;
  margin-top: 48px;
  li:nth-child(odd) {
    width: 444px;
    height: 68px;
    background: rgba(40, 42, 63, 1);
    margin: 27px auto 0;
    line-height: 68px;
    font-size: 24px;
    img {
      float: left;
      margin-top: 10px;
      margin-left: 12px;
    }
    p {
      float: left;
      margin-left: 20px;
      background: linear-gradient(
        0deg,
        rgba(35, 197, 235, 1) 0%,
        rgba(35, 230, 189, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
    span {
      float: right;
      margin-right: 20px;
      background: linear-gradient(
        0deg,
        rgba(35, 197, 235, 1) 0%,
        rgba(35, 230, 189, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  li:nth-child(even) {
    width: 444px;
    height: 68px;
    background: rgba(40, 42, 63, 1);
    margin: 27px auto 0;
    line-height: 68px;
    font-size: 24px;
    img {
      float: left;
      margin-top: 10px;
      margin-left: 12px;
    }
    p {
      float: left;
      margin-left: 20px;
      background: linear-gradient(
        180deg,
        rgba(62, 173, 250, 1) 0.4150390625%,
        rgba(6, 104, 225, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
    span {
      float: right;
      margin-right: 20px;
      background: linear-gradient(
        180deg,
        rgba(62, 173, 250, 1) 0.4150390625%,
        rgba(6, 104, 225, 1) 100%
      );
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}
.selectedType {
  background: #4896f7;
}
</style>