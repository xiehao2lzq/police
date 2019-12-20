<template>
  <div>
    <div id="infooppen">
    <div class="title">
      <p class="p1">>>信息发布</p>
      <p class="p2">当月信息发布数：{{dyxxfbNum}}</p>
    </div>
  </div>
  </div>
</template>
<script>
import G2 from "@antv/g2";
import {mapState} from "vuex"
export default {
  data() {
    return {
      dyxxfbNum: "",
      isshow:true,
      chart5:null
    };
  },
  computed: {
    ...mapState({
        url:state=>state.home.url
    }),
    ...mapState({
        xqCode:state=>state.home.xqCode
    })
  },
  watch: {
    xqCode(){
      this.getInfoOppen()
    }
  },
  methods: {
    getInfoOppen(){
      this.$axios({
        url:"http://"+ this.url + ":9000/sjwl/manageport/tj/informationPublish",
        method: "get",
        /* headers: {
          Authorization: sessionStorage.getItem("Authorization"),
          "Content-Type": "application/json"
        }, */
        params: {
          xqCode: this.xqCode,
          areaId: "0"
        }
      }).then(res=>{
        if(!res.data.code==="1000"){
          return false
        }
        const d = new Date();
      this.dyxxfbNum = res.data.data.infoCountOfMonth[d.getMonth()+1];
      //this.$forceUpdate()
      var data5 = [];
      if (res.data.data.monthOfYear == "up") {
        data5 = [
          {
            月份: "1月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[0])
          },
          {
            月份: "2月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[1])
          },
          {
            月份: "3月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[2])
          },
          {
            月份: "4月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[3])
          },
          {
            月份: "5月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[4])
          },
          {
            月份: "6月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[5])
          }
        ];
      } else {
        data5 = [
          {
            月份: "7月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[6])
          },
          {
            月份: "8月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[7])
          },
          {
            月份: "9月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[8])
          },
          {
            月份: "10月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[9])
          },
          {
            月份: "11月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[10])
          },
          {
            月份: "12月",
            信息发布: parseInt(res.data.data.infoCountOfMonth[11])
          }
        ];
      }
      if(this.isshow){
        this.chart5 = new G2.Chart({
        container: "infooppen",
        forceFit: true,
        height: window.innerHeight * 0.18,
        padding: [20, 20, 25, 35]
      });
      this.chart5.source(data5);
      this.chart5.scale("value", {
        min: 0
      });
      this.chart5.scale("月份", {
        range: [0, 1]
      });
      this.chart5.tooltip({
        crosshairs: {
          type: "line"
        }
      });
      this.chart5.axis("月份", {
        label: {
          textStyle: {
            fill: "#fff",
            fontSize: 12
          }
        }
      });
      this.chart5.axis("信息发布", {
        label: {
          textStyle: {
            fill: "#fff",
            fontSize: 12
          }
        },
        /* line: {//纵坐标线
            lineWidth: 1,
            
          }, */
        grid: {
          lineStyle: {
            stroke: "#37477f",
            lineWidth: 1,
            lineDash: [2, 2]
          }
        }
      });
      this.chart5
        .line()
        .position("月份*信息发布")
        .color("#69e9b2")
        .opacity(1)
        .size(2)
        .shape("smooth");
      this.chart5
        .point()
        .position("月份*信息发布")
        .color("#fd9c79")
        .size(6)
        .shape("circle")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
      this.chart5.render();
      this.isshow = false//只实例化图表一次
      }else{
        this.chart5.changeData(data5)
      }
      
      })
    }
  },
  mounted() {
    //信息发布
    this.getInfoOppen()
  }
};
</script>
<style lang="scss" scoped>
#infooppen {
  float: left;
  width: 4.74rem;
  margin-bottom: 0.1rem;
  height: 2.07rem;
  margin: 0.1rem 0 0 0.1rem;
  background: url(../../../assets/images/conboxLT.png) no-repeat left top,
    url(../../../assets/images/conboxRT.png) no-repeat right top,
    url(../../../assets/images/conboxLB.png) no-repeat left bottom,
    url(../../../assets/images/conboxRB.png) no-repeat right bottom;
    box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
}
.title {
  .p1 {
    font-size: 0.18rem;
    margin: 0.1rem 0 0 0.1rem;
    color: #68ABEF;
    float: left;
  }
  .p2 {
    font-size: 0.16rem;
    margin: 0.1rem 0 0 0.1rem;
    color: #93bce8;
    float: right;
    margin-right: 0.1rem;
  }
}
</style>
