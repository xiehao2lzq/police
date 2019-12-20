<template>
  <div class="communityPerson boxColor">
    <div class="title clear">
      <p></p>
      <span>社区车辆分布统计</span>
    </div>
    <div id="communityPerson"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    }),
    ...mapState({
      url: state => state.commonData.url
    })
  },
  data() {
    return {
      data: []
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/car/num",
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
      if (res.data.code == 1000) {
        this.data = res.data.data;
        console.log(this.data)
        this.$nextTick(() => {
          this.canvas();
        });
      } else {
        this.$store.state.commonData.errorMsg.unshift(res.data.msg);
      }
    });
  },
  methods: {
    canvas() {
      const chart = new G2.Chart({
        container: "communityPerson",
        forceFit: true,
        height: 450,
        padding: [10, 10, 80, 10]
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
      chart.tooltip({
        showTitle: false,
        itemTpl:
          '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      chart.axis(false);
      chart
        .interval()
        .position("xqName*percent")
        .color("xqName",["#24cfcb","#f18c60","#b988ef","#23e4bf","#26a0d9","#ef9283","#5d72fd"])
        .label("xqName", {
          offset: 25,
          textStyle: {
            textAlign: "center",
            shadowBlur: 2,
            shadowColor: "#939FBD",
            fill: "#939FBD"
          }
        })
        .shape("sliceShape")
        .tooltip("xqName*percent", function(xqName, percent) {
          percent = percent + "%";
          return {
            name: xqName,
            value: percent
          };
        });
      chart.render();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.communityPerson {
  width: 426px;
  height: 452px;
  border-radius: 4px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
}
.communityPerson {
  .title {
    margin-top: 13px;
    margin-left: 10px;
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
</style>