<template>
  <div class="xqInfo">
    <div class="leftBox">
      <p class="title">>>小区信息</p>
      <div class="imgBox">
        <img src="../../../../static/lou.png" alt />
        <b>楼栋数</b>
        <p>{{xqInfos.lyslSum}}</p>
      </div>
      <div class="imgBox">
        <img src="../../../../static/danyuan.png" alt />
        <b>单元数</b>
        <p>{{xqInfos.dysSum}}</p>
      </div>
      <div class="imgBox">
        <img src="../../../../static/zhuhu.png" alt />
        <b>户数</b>
        <p>{{xqInfos.hsSum}}</p>
      </div>
    </div>
    <div class="rightBox" id="mountNode">
      <p>人群结构</p>
    </div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import axios from "axios";
import {mapState} from "vuex"
export default {
  data() {
    return {
      person: [
        /* {
          item: "事例一",
          count: 40,
          percent: 0.4
        },
        {
          item: "事例二",
          count: 21,
          percent: 0.21
        },
        {
          item: "事例三",
          count: 17,
          percent: 0.17
        },
        {
          item: "事例四",
          count: 13,
          percent: 0.13
        },
        {
          item: "事例五",
          count: 9,
          percent: 0.09
        } */
      ],
      xqInfos:{}
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
  created () {
    //请求数据
    axios.get("http://"+this.url + ":9000/sjwl/manageport/tj/xqInfo",{
       params:{
           xqCode:this.xqCode,
           areaId:"0",
        },
    }).then(res=>{
      if(res.data.code==="1000"){
        this.xqInfos = res.data.data
      }
    });
    
  },
  mounted() {
    //请求图表数据
    axios.get("http://"+this.url + ":9000/sjwl/manageport/tj/personInfo/faceTypes",{
       params:{
           xqCode:this.xqCode,
           areaId:"0",
        },
    }).then(res=>{
      if(res.data.code==="1000"){
        this.person = res.data.data
        var chart = new G2.Chart({
      container: "mountNode",
      forceFit: true,
      height: window.innerHeight * 0.35,
      padding: [50, 50, 80, 50]
    });
    var _this = this;
    chart.source(_this.person, {
      percent: {
        formatter: function formatter(val) {
          val = val * 100 + "%";
          return val;
        }
      }
    });
    chart.coord("theta");
    chart.tooltip({
      showTitle: false
    });
    chart.legend({
      position: "bottom",
      offsetY: 0,
      offsetX: 0,
      textStyle: {
            fill: "#fff"
          },
      itemFormatter(val) {//自定义标注内容
            let labe = _this.person.find(v => v.faceTypeName == val).percent
            return `${val}
 ${(labe * 100)}%` // val 为每个图例项的文本值
          }
    });
    chart
      .intervalStack()
      .position("percent")
      .color("faceTypeName",["#ffd06b","#fd9c79","#25bcff","#6b4f99","#ff515e","#fd8f00","#2acabf","#a881e8","#cecece"])
      .label("percent", {
        offset: -40,
        autoRotate: false,
        textStyle: {
          textAlign: "center",
          shadowBlur: 2,
          shadowColor: "rgba(0, 0, 0, .45)",
          fill: "#fff"
        }
      })
      .tooltip("faceTypeName*percent", function(faceTypeName, percent) {
        percent = percent * 100 + "%";
        return {
          name: faceTypeName,
          value: percent
        };
      })
      .style({
        /* lineWidth: 1,
        stroke: "#fff" */
      });
    chart.render();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.xqInfo {
  width: 100%;
  height: 3rem;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
  margin: 0.1rem 0 0 0.1rem;
  overflow: hidden;
}
.leftBox {
  width: 66.7%;
  //background: #18214891;
  height: 100%;
  float: left;
}
.rightBox {
  width: 33.3%;
  height: 100%;
  float: left;
}
.imgBox {
  width: 33.3%;
  display: flex;
  //justify-content: center;
  flex-direction: column;
  align-items: center;
  float: left;
  img {
    width: 1.2rem;
    margin: 0.2rem;
  }
  b {
    color: #68abef;
    font-size: 0.14rem;
  }
  p {
    font-size: 0.24rem;
    margin: 0.1rem;
  }
}
.title {
  margin: 0.1rem 0 0.1rem 0.2rem;
  color: #68abef;
  font-size: 0.14rem;
  font-weight: 900;
}
#mountNode{
  position: relative;
  p{
    position: absolute;
    text-align: center;
    width: 100%;
    margin-top:0.15rem;
    //font-weight: 900;
    font-size: 0.16rem;
    color: #68abef;
  }
}
</style>