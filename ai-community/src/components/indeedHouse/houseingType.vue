<template>
  <div class="houseingType">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>住房类型信息</span>
    </div>
    <div id="houseingType"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import DataSet from "@antv/data-set";
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: [],
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
      if (res.data.code == "1000") {
        //this.$forceUpdata()
        var monthList = res.data.data.monthList.reverse();
        monthList.forEach((item, index) => {
          this.data.push({
            time: item + "月",
            type: "出租",
            value: res.data.data.roomPropertyNum.reverse()[index].rentNum*1
          });
          this.data.push({
            time: item + "月",
            type: "自住",
            value: res.data.data.roomPropertyNum.reverse()[index].selfOccupationNum*1
          });
          this.data.push({
            time: item + "月",
            type: "闲置",
            value: res.data.data.roomPropertyNum.reverse()[index].vacancyNum*1
          });
        });
        var _this = this;
    //异步执行
    setTimeout(function(){
      _this.canvas()
    },0);
      } else {
        this.$store.state.homePage.errorMsg.unshift(res.data.msg);
      }
    });
  },
  mounted() {
    
    /* this.$nextTick(() => {
         this.canvas()
      }); */
  },
  methods: {
    canvas() {
      const chart = new G2.Chart({
        container: "houseingType",
        forceFit: true,
        height: 450,
        padding: [50, 20, 40, 50],
        plotBackground: {
          fill: "#2B2F43" // 图表背景色
        }
      });
      chart.source(this.data);
      chart.axis("value", {
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
      chart.legend({
        position: "top-right",
        marker: "circle",
        textStyle: {
          fill: "#939FBD"
        }
      });
      chart.axis("time", {
        label: {
          textStyle: {
            fill: "#939FBD",
            fontSize: 12
          }
        }
      });
      chart
        .intervalStack()
        .position("time*value")
        .color("type",["#23D5D4","#9D75EC","#25BCFF"]);//记得改
      chart.render();
    }
  }
};
</script>

<style lang="scss" scoped>
.houseingType {
  width: 626px;
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
.houseingType {
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
</style>