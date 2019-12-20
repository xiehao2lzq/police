<template>
    <div class="rightBox">
        <div class="title">>>开门方式</div>
        <div id="mountNode3"></div>
        <div id="mountNode4"></div>
    </div>
</template>

<script>
import {mapState} from "vuex"
import G2 from "@antv/g2"
    export default {
      computed: {
        ...mapState({
          url:state=>state.home.url
        }),
        ...mapState({
          xqCode:state=>state.home.xqCode
        })
      },
        mounted () {
          this.$axios.get("http://"+this.url + ":9000/sjwl/manageport/tj/personInfo/openType",{
       params:{
           xqCode:this.xqCode,
           areaId:"0",
        },
    }).then(res=>{
      //console.log(res.data.data)
      var data = []
      res.data.data.forEach(item=>{
        data.push({
          type:item.openTypeStr,
          value:item.sumPercent
        })
      })

  /* var chart = new G2.Chart({
    container: 'mountNode3',
    forceFit: true,
    height: window.innerHeight*0.3,
    padding:[0,0,10,120]
  });
  chart.source(data);
  chart.legend({
    position: 'right',
    offsetY: -window.innerHeight / 2 + 450,
    offsetX: -350,
    textStyle: {
        fill: '#fff'
      }
  });
  chart.coord('theta', {
    radius: 0.75
  });
  //自定义部分
  chart.tooltip({
          showTitle: false,
          itemTpl:'<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'//定义标头
      });
  chart.intervalStack().position('value').color('type',["#ffd06b","#fd9c79","#25bcff","#6b4f99","#ff515e","#fd8f00","#2acabf","#a881e8","#cecece"]).shape('sliceShape').tooltip('type*value', function(type, value) {
    //数据操作
    value = (value * 1000/10).toFixed(1) + '%';
    return {
      name: type,
      value: value
    };
  }).style({
    lineWidth: 1,
    stroke: '#fff'
  }).label('value', function(val) {
    if (val < 0.03) {
      return null;
    } else {
      return {
        offset: -30,
        textStyle: {
          fill: 'white',
          fontSize: 14,
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        },
        formatter: function formatter(text) {
          return text*100 + '%';
        }
      };
    }
  }); */
  /* chart.intervalStack().position('value').color('type', ['#1890ff', '#37c661', '#fbce1e', '#2b3b79', '#8a4be2', '#1dc5c5']).style({
    stroke: 'white',
    lineWidth: 1
  }).label('value', function(val) {
    if (val < 3) {
      return null;
    } else {
      return {
        offset: -30,
        textStyle: {
          fill: 'white',
          fontSize: 14,
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        },
        formatter: function formatter(text) {
          return text + '%';
        }
      };
    }
  }); */
  //chart.render();
   var max = 0;
  data.forEach(function(obj) {
    if (obj.value > max) {
      max = obj.value;
    }
  });
  
  // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
  var sliceNumber = 0.01;

  // 自定义 other 的图形，增加两条线
  G2.Shape.registerShape('interval', 'sliceShape', {
    draw: function draw(cfg, container) {
      var points = cfg.points;
      var path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push(['L', points[1].x, points[1].y - sliceNumber]);
      path.push(['L', points[2].x, points[2].y - sliceNumber]);
      path.push(['L', points[3].x, points[3].y]);
      path.push('Z');
      path = this.parsePath(path);
      return container.addShape('path', {
        attrs: {
          fill: cfg.color,
          path: path
        }
      });
    }
  });

  var chart = new G2.Chart({
    container: 'mountNode3',
    forceFit: true,
    height: window.innerHeight*0.3,
    padding:[0,120,10,0]
  });

  chart.source(data);
  chart.coord('theta', {
    radius: 0.8,
    innerRadius: 0.7
  });
  chart.legend({
    position: 'right',
    offsetY: -20,
    //offsetX: -350,
    textStyle: {
        fill: '#fff'
      }
  });
  //自定义部分
  chart.tooltip({
          showTitle: false,
          itemTpl:'<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'//定义标头
      });
  // 辅助文本
  /* chart.guide().html({
    position: ['50%', '50%'],
    html: '<div style="color:#fff;font-size: 0.2rem;text-align:center; ">Open the<br><span style="color:#fff;font-size:20px">door</span></div>',
    alignX: 'middle',
    alignY: 'middle'
  }); */
  chart.intervalStack().position('value').color('type',["#ffd06b","#fd9c79","#25bcff","#2acabf","#ff515e","#fd8f00","#6b4f99","#a881e8","#cecece"]).shape('sliceShape').tooltip('type*value', function(type, value) {
    //数据操作
    value = (value * 1000/10).toFixed(1) + '%';
    return {
      name: type,
      value: value
    };
  }).style({
    //lineWidth: 2,
    //stroke: '#fff'
  });
  chart.render();
   //处理数据
var data2 = [];
res.data.data.forEach(item=>{
  for(var i = 0;i<item.weekList.length;i++){
    data2.push({
      time:item.weekList[i],
      type:item.openTypeStr,
      value:item.num[i]
    })
  }
})
  var chart1 = new G2.Chart({
    container: 'mountNode4',
    forceFit: true,
    height: window.innerHeight*0.3,
    padding: [50, 30, 50, 30]
  });
  chart1.source(data2);
  chart1.axis('time', {
    label: {
      textStyle: {
        fill: '#fff'
      }
    },
    tickLine: {
      alignWithLabel: false,
      length: 0
    }
  });

  chart1.axis('value', {
    label: {
      textStyle: {
        fill: '#fff'
      }
    },
    tickLine: {
      alignWithLabel: false,
      length: 0
    },
    /* line: {//纵坐标线
            lineWidth: 1
          }, */
  });
  chart1.legend({
    position: 'top-right',
    textStyle: {
         fill: "#fff"
       },
    offsetX:10
  });
  chart1.intervalStack().position('time*value').color('type',["#ffd06b","#fd9c79","#25bcff","#2acabf","#ff515e","#fd8f00","#6b4f99","#a881e8","#cecece"]).opacity(1)/* .label('value', function(val) {
    if (val < 10) {
      return false;
    }
    return {
      position: 'middle',
      offset: 0,
      textStyle: {
        fill: '#fff',
        fontSize: 12,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      },
      formatter: function formatter(text) {
        return text + '%';
      }
    };
  }); */
  //注释部分为柱状图可显示数据
  chart1.render();
    })
        }
    }
</script>

<style lang="scss" scoped>
    .rightBox{
        width: 49%;
        height: 3rem;
        box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
        float: left;
        margin: 0.1rem 0 0 0.1rem;
        overflow: hidden;
    }
    #mountNode3{
        width: 40%;
        height: 100%;
        float: left;
    }
    #mountNode4{
        float: left;
        width: 60%;
        height: 100%;
    }
    .title{
        margin: 0.1rem 0 0.1rem 0.2rem;
        color: #68ABEF;
        font-size: 0.14rem;
        font-weight: 900;
    }
</style>