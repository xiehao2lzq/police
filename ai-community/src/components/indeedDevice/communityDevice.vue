<template>
  <div class="CommunityDevice">
    <div class="rightLogo"></div>
    <div class="title clear">
      <p></p>
      <span>社区设备分布统计</span>
    </div>
    <div id="CommunityDevice"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: []
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
      url: "http://" + this.url + ":9000/sjwl/webapi/device/num",
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
      if (res.data.code == "1000") {
        this.data = res.data.data;
        this.$nextTick(()=>{
            this.canvas()
        })
      }
    });
  },
  methods: {
    canvas(){
         const chart = new G2.Chart({
      container: "CommunityDevice",
      forceFit: true,
      height: 450,
      padding: [30, 10, 60, 10]
    });
    chart.source(this.data);
    chart.coord("polar");
    chart.legend({
      position: "bottom",
      textStyle: {
        shadowBlur: 2,
        shadowColor: "#939FBD",
        fill: "#939FBD"
      }
    });
    chart.axis(false);
    chart.tooltip({
      showTitle: false,
      itemTpl:
        '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
    });
    chart
      .interval()
      .position("xqName*percent")
      .color("xqName", G2.Global.colors_pie_16)
      .label("xqName", {
        offset: 15,
        textStyle: {
          textAlign: "center",
          shadowBlur: 2,
          shadowColor: "#939FBD",
          fill: "#939FBD"
        }
      })
      .shape("sliceShape").tooltip("xqName*percent", function(xqName, percent) {
        percent = percent + "%";
        return {
          name: xqName,
          value: percent
        };
      });;
    chart.render();
    }  
  },
  mounted() {
    /* const data = [
      { year: "2001", population: 41.8 },
      { year: "2002", population: 38 },
      { year: "2003", population: 33.7 },
      { year: "2004", population: 30.7 },
      { year: "2005", population: 25.8 },
      { year: "2006", population: 31.7 },
      { year: "2007", population: 33 },
      { year: "2008", population: 46 },
      { year: "2009", population: 38.3 },
      { year: "2010", population: 28 },
      { year: "2011", population: 42.5 },
      { year: "2012", population: 30.3 }
    ]; */
  }
};
</script>

<style lang="scss" scoped>
.CommunityDevice {
  width: 516px;
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
.CommunityDevice {
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