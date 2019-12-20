<template>
  <div class="deviceType">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>设备在线率统计</span>
    </div>
    <div id="deviceType"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import DataSet from "@antv/data-set";
import { mapState } from "vuex";
export default {
  data(){
    return{
      data:[]
    }
  },
  computed: {
    ...mapState({
      selectedValue: state => state.homePage.selectedValue
    }),
    ...mapState({
      url: state => state.homePage.url
    })
  },
  created () {
    this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/device/statistics",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue,
        subdistrictId: ""
      }
    }).then(res => {
      console.log(res)
      console.log(1123)
      if (res.data.code == "1000") {
        this.data = res.data.data.devices;
        this.$nextTick(()=>{
          this.canvas()
        })
      }
    });
  },
  mounted() {
    const data = [
      { State: "WY", 小于5岁: 25635, "5至13岁": 1890, "14至17岁": 9314 },
      { State: "DC", 小于5岁: 30352, "5至13岁": 20439, "14至17岁": 10225 },
      { State: "VT", 小于5岁: 38253, "5至13岁": 42538, "14至17岁": 15757 },
      { State: "ND", 小于5岁: 51896, "5至13岁": 67358, "14至17岁": 18794 },
      { State: "AK", 小于5岁: 72083, "5至13岁": 85640, "14至17岁": 22153 }
    ];
  },
  methods: {
    canvas(){
      const ds = new DataSet();
    const dv = ds.createView().source(this.data);
    dv.transform({
      type: "fold",
      fields: ["offline", "online"], // 展开字段集
      key: "是否在线", // key字段
      value: "设备数", // value字段
      retains: ["device_type_name"] // 保留字段集，默认为除fields以外的所有字段
    });
    // 数据被加工成 {State: 'WY', 年龄段: '小于5岁', 人口数量: 25635}

    const chart = new G2.Chart({
      container: "deviceType",
      forceFit: true,
      height: 450,
      padding: [50, 20, 40, 50],
      plotBackground: {
        fill: "#2B2F43" // 图表背景色
      }
    });
    chart.source(dv);
    chart.coord().transpose();
    chart.axis("device_type_name", {
      label: {
        offset: 12,
        textStyle: {
          fill: "#939FBD",
          fontSize: 12
        }
      }
    });
    //纵坐标
    chart.axis("设备数", {
      label: {
        formatter: val => {
          return val /* + "°C" */;
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
      },
      range:[0,1]
    });
    chart.legend({
      position: "top-right",
      marker: "circle",
      textStyle: {
        fill: "#939FBD"
      }
    });
    chart
      .intervalStack()
      .position("device_type_name*设备数")
      .color("是否在线");
    chart.render();
    }
  }
};
</script>

<style lang="scss" scoped>
.deviceType {
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
.deviceType {
  .title {
    margin-top: 13px;
    margin-left: 10px;
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
</style>