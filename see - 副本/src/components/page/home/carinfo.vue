<template>
  <div>
    <div id="carinfo">
    <div class="title" >
      <router-link to="/carInfoDetial" tag="p" class="p1">>>车辆信息</router-link>
      <p class="p2">车辆总数：1500</p>
    </div>
  </div>
  </div>
</template>
<script>
import G2 from "@antv/g2";
import { mapState } from "vuex";
export default {
  data() {
    return {
      parkLotSum: "",
      isshow:true,
      chart2:null
    };
  },
  computed: {
    ...mapState({
      url: state => state.home.url
    }),
    ...mapState({
      xqCode: state => state.home.xqCode
    })
  },
   watch: {
    xqCode(){
      //重新确认查看权限
      this.getCarInfo() 
    }
  },
  methods: {
    getCarInfo() {
      //console.log(sessionStorage.getItem("Authorization"))
      this.$axios({
        url: "http://"+this.url + ":9000/sjwl/manageport/tj/carInfo",
        method: "get",
       /*  headers: {
          Authorization: sessionStorage.getItem("Authorization"),
          "Content-Type": "application/json"
        }, */
        params: {
          xqCode:this.xqCode,
          areaId: "0"
        }
      }).then(res => {
        //console.log(res)
        var data2 = [];
        if(!res.data.code==="1000"){
          return false
        }
        res.data.data.dateList.forEach(function(value, index, array) {
          if (res.data.data.AmOrPm == "AM") {
            if (index < 12) {
              data2[index * 2] = {
                country: "进场车辆",
                time: res.data.data.dateList[index],
                value: res.data.data.enterCount[index] * 1
              };
              data2[index * 2 + 1] = {
                country: "出场车辆",
                time: res.data.data.dateList[index],
                value: res.data.data.outCount[index] * 1
              };
            }
          } else {
            if (index >= 12) {
              data2[(index - 12) * 2] = {
                country: "进场车辆",
                time: res.data.data.dateList[index],
                value: res.data.data.enterCount[index] * 1
              };
              data2[(index - 12) * 2 + 1] = {
                country: "出场车辆",
                time: res.data.data.dateList[index],
                value: res.data.data.outCount[index] * 1
              };
            }
          }
        });
        if(this.isshow){
          this.chart2 = new G2.Chart({
          container: "carinfo",
          forceFit: true, //自适应宽度
          height: window.innerHeight * 0.15,
          padding: [25, 20, 30, 35],
          /* plotBackground: {
            fill: "#141d3a", // 图表背景色
          } */
        });
        this.chart2.source(data2, {
          value: {
            //tickInterval: 500, // 自定义刻度间距
            /* nice: false, // 不对最大最小值优化
            max: 50, // 自定义最大值
            min: 0, // 自定义最小是 */
            alias: "数量（个）"
          }
        });
        this.chart2.scale("sales", {
          tickInterval: 20
        });
        this.chart2.legend({
          position: "top-right",
          textStyle: {
            fill: "#fff"
          }
        });
        this.chart2.axis("time", {
          label: {
            textStyle: {
              fill: "#fff",
              fontSize: 12
            },
            formatter: val => {
              return val + "h"; // 格式化坐标轴显示文本
            }
          },
          line: {
            lineWidth: 1 // 设置线的宽度
          }
        });
        this.chart2.axis("value", {
          label: {
            textStyle: {
              fill: "#fff",
              fontSize: 12
            },
            formatter: val => {
              return val; // 格式化坐标轴显示文本
            }
          },
          /* line: {//纵坐标线
            lineWidth: 1
          }, */
          grid: {
            lineStyle: {
              stroke: "#37477f",
              lineWidth: 1,
              lineDash: [2, 2]
            }
          }
        });
        this.chart2
          .interval()
          .position("time*value")
          .shape("top")
          .opacity(1)
          .color("country", ["#4bcea4", "#6b4d95"])
          .adjust([
            {
              type: "dodge",
              marginRatio: 1 / 32
            }
          ])
          /* .style({
          stroke: '#545454', 
          lineWidth: 2
        }); */
        this.chart2.render();
        this.isshow = false//只渲染一次
        }else{
          this.chart2.changeData(data2)
        }
        
      });
    }
  },
  mounted() {
    //车辆信息
    /* $.getJSON(this.url + "/tj/carInfo", function(data) {
      //this.parkLotSum = data.data.parkLotSum;
      console.log(data)
    }); */
    this.getCarInfo();
  }
};
</script>
<style lang="scss" scoped>
#carinfo {
  width: 4.75rem;
  margin-bottom: -0.1rem;
  position: relative;
}
.title {
  margin-bottom: -0.1rem;
  .p1 {
    padding-top: 0.1rem;
    font-size: 0.18rem;
    margin: 0.1rem 0 0 0.1rem;
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


