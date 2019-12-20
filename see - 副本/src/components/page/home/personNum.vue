<template>
  <div>
    <div id="personnum" >
    <div class="title">
      <router-link to="/personNumDetail" tag="div" class="p1">>>人流统计</router-link>
      <p class="p2">人流量分析TOPs</p>
    </div>
  </div>
  </div>
</template>
<script>
import G2 from "@antv/g2";
import { View } from "@antv/data-set";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isshow:true,
      dv:null
    };
  },
  watch: {
    xqCode(){
      //重新确认查看权限
      this.getPersonNum() 
    }
  },
  computed: {
    ...mapState({
      url: state => state.home.url
    }),
    ...mapState({
      xqCode: state => state.home.xqCode
    })
  },
  methods: {
    getPersonNum() {
      this.$axios
        .get("http://"+this.url + ":9000/sjwl/manageport/tj/peopleStream", {
          params: {
            xqCode: this.xqCode,
            areaId: "0"
          },
          /* headers: {
            Authorization: sessionStorage.getItem("Authorization"),
            "Content-Type": "application/json"
          } */
        })
        .then(res => {
          if(!res.data.code==="1000"){
          return false
        }
        console.log(res.data.data)
        var data3 = [];
          res.data.data.dateList.forEach(function(value, index, array) {
            data3.push({
              time: value,
              进门: res.data.data.enterCount[index] * 1,
              出门: res.data.data.outCount[index] * 1
            });
          });
          var _this = this
          if(this.isshow){
          _this.dv.source(data3);
          _this.dv.transform({
            type: "fold",
            fields: ["进门", "出门"],
            key: "type",
            value: "value"
          });
          var chart3 = new G2.Chart({
            container: "personnum",
            forceFit: true, //自适应宽度
            height: window.innerHeight * 0.17,
            padding: [65, 30, 25, 35]
          });
          chart3.source(_this.dv, {
            value: {
              alias: "The Share Price in Dollars",
              formatter: function formatter(val) {
                return val;
              },
            },
            time: {
              range: [0, 1]
            }
          });
          chart3.tooltip({
            crosshairs: true
          });
          chart3.axis("time", {
            label: {
              textStyle: {
                fill: "#fff",
                fontSize: 12
              }
            }
          });
          chart3.axis("value", {
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
          chart3
            .area()
            .position("time*value")
            .color("type", ["#834e29", "#2d6687"])
            .shape("smooth");
          chart3.legend({
            position: "top-right",
            marker: "circle",
            textStyle: {
              fill: "#fff"
            }
          });
          chart3.render();
          this.isshow = false;
          
          }else{
            _this.dv.source(data3)
            
          }
        });
    }
  },
  mounted() {
    //人流统计
    this.dv = new View();
    this.getPersonNum();
    
  }
};
</script>
<style lang="scss" scoped>
#personnum {
  width: 4.75rem;
  position: relative;
}
.title {
  position: absolute;
  z-index: 2;
  width: 100%;
  .p1 {
    font-size: 0.18rem;
    margin: 0rem 0 0 0.1rem;
    color: #68ABEF;
    cursor: pointer;
  }
  .p2 {
    font-size: 0.16rem;
    margin: 0.05rem 0 0 0.1rem;
    color: #93bce8;
  }
}
.more{
  font-size: 0.14rem;
  font-weight: 900;
  color: #7b9dc5;
  position: absolute;
  right: 0.2rem;
  top: 0.1rem;
  cursor: pointer;
  padding: 0.03rem;
  border: 1px solid #7b9dc5;
}
</style>
