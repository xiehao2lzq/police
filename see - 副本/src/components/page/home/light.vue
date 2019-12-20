<template>
  <div>
    <div id="light">
    <div class="title">
      <p class="p1">>>智慧灯杆</p>
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
      isshow:true,
      chart6:null
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
      this.getLight()
    }
  },
  methods: {
    getLight(){
      this.$axios.get("http://"+this.url+":9000/sjwl/manageport/tj/wisdomlamp",{
        params:{
           xqCode:this.xqCode,
           areaId:"0",
        },
        /* headers:{
          "Authorization":sessionStorage.getItem("Authorization"),
          'Content-Type':'application/json'
        } */
      }).then(res=>{
        if(!res.data.code==="1000"){
          return false
        }
        var data = res.data
        var data6 = [
        {
          all: "总设备",
          name: "灯具",
          value: data.data.lightDeviceAll
        },
        {
          all: "在线设备",
          name: "灯具",
          value: data.data.lightDeviceOnline
        },
        {
          all: "总设备",
          name: "LED设备",
          value: data.data.LEDDeviceAll
        },
        {
          all: "在线设备",
          name: "LED设备",
          value: data.data.LEDDeviceOnline
        },
        {
          all: "总设备",
          name: "广播",
          value: data.data.gbDeviceAll
        },
        {
          all: "在线设备",
          name: "广播",
          value: data.data.gbDeviceOnline
        },
        {
          all: "总设备",
          name: "环境监测",
          value: data.data.hjjcDeviceAll
        },
        {
          all: "在线设备",
          name: "环境监测",
          value: data.data.hjjcDeviceOnline
        }
      ];
      if(this.isshow){
        this.chart6 = new G2.Chart({
        container: "light",
        forceFit: true,
        height: window.innerHeight * 0.18,
        padding: [25, 20, 30, 35]
      });
      this.chart6.source(data6);
      this.chart6
        .interval()
        .position("name*value")
        .shape("borderRadius")
        .opacity(1)
        .color("all", ["#fd9c79", "#4dcf9f"])
        .adjust([
          {
            type: "dodge",
            marginRatio: 1 / 32
          }
        ]);
      this.chart6.axis("value", {
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
      this.chart6.axis("name", {
        label: {
          textStyle: {
            fill: "#fff",
            fontSize: 12
          }
        }
      });
      this.chart6.legend({
        position: "top-right",
        textStyle: {
          fill: "#fff"
        }
      });
      this.chart6.render();
      this.isshow =false
      }else{
        this.chart6.changeData(data6)
        //console.log(data6)
      }   
      })
    }
  },
  mounted() {
    //智慧灯杆
    this.getLight()
  }
};
</script>
<style lang="scss" scoped>
#light {
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
    margin: 0.05rem 0 0 0.1rem;
    color: #93bce8;
    float: right;
    margin-right: 0.1rem;
  }
}
</style>
