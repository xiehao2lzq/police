<template>
  <div class="manOrwoman clear">
    <div class="title">>>男女比例</div>
    <div id="mountNode2"></div>
    <div class="all">
        <div class="color">
            <div class="manColor" :style="style"></div>
            <div class="womanColor" :style="style2"></div>
        </div>
        <p>人群总数：{{totalNum}}</p>
    </div>
    <div id="mountNode3"></div>
    <div id="mountNode5">
      <p>性别比例 &nbsp; 婚姻状况构成图</p>
    </div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import {mapState} from "vuex"
export default {
  data() {
    return {
      style:{

      },
      style2:{

      },
      totalNum:""
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
  mounted() {
    //请求数据
    this.$axios.get("http://"+this.url + ":9000/sjwl/manageport/tj/personInfo/overview",{
       params:{
           xqCode:this.xqCode,
           areaId:"0",
        },
    }).then(res=>{
      
      //男女柱形图
      this.style = {
        width:res.data.data.manPercent*100+"%"
      }
      this.style2 = {
        width:res.data.data.womanPercent*100+"%",
        float:"left",
        background:"#FD9C79",
        height:"100%"
      }
      var data = [];
      data = [
        {
          type:"男性",
          value:res.data.data.manPercent*1000/10
        },
        {
          type:"女性",
          value:(res.data.data.womanPercent*1000)/10//造假数据
        }
      ];
      //总人数
      this.totalNum = res.data.data.totalNum
      var chart = new G2.Chart({
      container: "mountNode2",
      forceFit: true,
      height: window.innerHeight * 0.2,
      padding: [10,10,10,10]
    });
    //console.log(G2)
    chart.source(data);
    chart.legend(false);
    chart.facet("rect", {
      fields: ["type"],
      padding: 20,
      showTitle: false,
      eachView: function eachView(view, facet) {
         // console.log(view)
        var data = facet.data;
        var color = void 0;
        if (data[0].type === "男性") {
          color = "#0a9afe";
        } else {
          color = "#FD9C79";
        }
        data.push({
          type: "其他",
          value: 100 - data[0].value
        });
        view.source(data);
        view.coord("theta", {
          radius: 0.9,
          innerRadius: 0.8
        });
        view
          .intervalStack()
          .position("value")
          .color("type", [color, "#eceef1"])
          .opacity(1);
        view.guide().html({
          position: ["53%", "110%"],
          html:
            '<div class="g2-guide-html">' +"<span>"+
            data[0].type +"<span/>"
            +"<span>"+
            (data[0].value + "%") +"<span/>"+
            "</div>"
        });
        if(data[0].type==="男性"){
          view.guide().html({
          position: ["50%", "50%"],
          html:'<div class="g2-guide-html2"><img src="../../../../static/man.png" alt="" class="man"></div>'
        });  
        }else{
            view.guide().html({
          position: ["50%", "50%"],
          html:'<div class="g2-guide-html2"><img src="../../../../static/woman.png" alt="" class="man"></div>'
        });   
        }
      }
    });
    chart.render();
    var data2 = [
      {
        type: "已婚",
        value: res.data.data.marryPercent*1000/10
      },
      {
        type: "未婚",
        value: res.data.data.singlePercent*1000/10
      }
    ];
    
    var chart2 = new G2.Chart({
      container: "mountNode5",
      forceFit: true,
      height: window.innerHeight * 0.2,
      padding: [0,10,30,10]
    });
    //console.log(G2)
    chart2.source(data2);
    chart2.legend(false);
    chart2.facet("rect", {
      fields: ["type"],
      padding: 20,
      showTitle: false,
      eachView: function eachView(view, facet) {
         // console.log(view)
        var data = facet.data;
        var color = void 0;
        if (data[0].type === "已婚") {
          color = "#FD9C79";
        } else {
          color = "#2BCABF";
        }
        data.push({
          type: "其他",
          value: 100 - data[0].value
        });
        view.source(data);
        view.coord("theta", {
          radius: 1,
          innerRadius: 0.8
        });
        view
          .intervalStack()
          .position("value")
          .color("type", [color, "#eceef1"])
          .opacity(1);
        view.guide().html({
        position: ['50%', '50%'],
        html: '<div class="g2-guide-html"><p class="title">' + data[0].type + '</p><p class="value">' + (data[0].value + '%') + '</p></div>'
      });
      }
    });
    chart2.render();
    })
    
  }
};
</script>

<style lang="scss" scoped>
.manOrwoman {
  margin: 0.1rem 0rem 0 0rem;
  width: 98%;
  height: 5rem;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
  float: left;
}
.title{
        margin: 0.1rem 0 0.1rem 0.2rem;
        color: #68ABEF;
        font-size: 0.14rem;
        font-weight: 900;
    }
#mountNode {
  width: 100%;
  height: 30%;
}
#mountNode5{
  position: relative;
  width: 100%;
  p{
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 0;
    line-height: 0.5rem;
  }
}
.all{
    height:0.7rem;
    //background-color: red;
    width: 100%;
    overflow: hidden;
    .color{
        width: 90%;
        height: 0.12rem;
        background: rgb(114, 111, 110);
        border-radius: 0.06rem;
        margin:0.15rem auto;
        overflow: hidden;
        .manColor{
            width: 67.5%;
            background: #68ABEF;
            height: 100%;
            float: left;
        }
    }
    p{
        width: 100%;
        text-align: center;
    }
}
</style>