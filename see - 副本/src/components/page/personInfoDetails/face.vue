<template>
    <div class="face">
        <div class="title">
            >>人脸录入
        </div>
        <div class="picBox" id="mountNode1"></div>
    </div>
</template>

<script>
import G2 from "@antv/g2"
import {mapState} from "vuex"
    export default {
        data () {
            return {
                 
            }
        },
        computed: {
          ...mapState({
            url:state=>state.home.url
          }),
         ...mapState({
            xqCode:state=>state.home.xqCode
         })
        },
        mounted () {
           this.$axios.get("http://"+this.url + ":9000/sjwl/manageport/tj/personInfo/overview",{
       params:{
           xqCode:this.xqCode,
           areaId:"0",
        },
    }).then(res=>{

      //console.log(res.data.data)
        var data = [
           {
    type: '已录入', 
    value: res.data.data.facePercent
  },{
    type: '未录入',
    value: (1-res.data.data.facePercent)
  },];
  
var max = 0;
  data.forEach(function(obj) {
    if (obj.value > max) {
      max = obj.value;
    }
  });
  // 自定义 other 的图形，增加两条线
  G2.Shape.registerShape('interval', 'sliceShape', {
    draw: function draw(cfg, container) {
      var points = cfg.points;
      var origin = cfg.origin._origin;
      var percent = origin.value / max;
      var xWidth = points[2].x - points[1].x;
      var width = xWidth * percent;
      var path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push(['L', points[1].x, points[1].y]);
      path.push(['L', points[0].x + width, points[2].y]);
      path.push(['L', points[0].x + width, points[3].y]);
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
    container: 'mountNode1',
    forceFit: true,
    height: window.innerHeight*0.25,
    padding:[0,150,0,50]
  });

  chart.source(data);
  //设置大小和中空度的
  chart.coord('theta', {
    radius: 0.9,//大小
    innerRadius: 0.7//中空度
  });
  chart.legend({
    position: 'right-top',
    offsetY:  30,
    offsetX: -30,
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
  chart.guide().html({
    position: ['50%', '50%'],
    html: '<div style="color:#fff;font-size: 0.2rem;text-align: center;width: 10em;">人脸<br><span style="color:#fff;font-size:20px">录入</span></div>',
    alignX: 'middle',
    alignY: 'middle'
  });
  chart.guide().html({
    position: ['50%', '105%'],
    html: '<div style="color:#fff;font-size: 0.1rem;text-align: center;width: 10em;">人脸录入百分比</div>',
    alignX: 'middle',
    alignY: 'middle'
  });
  chart.intervalStack().position('value').color('type',["#2BCABF","#FD9C79"])/* .shape('sliceShape') */.tooltip('type*value', function(type, value) {
    //数据操作
    value = (value * 1000/10).toFixed(1) + '%';
    return {
      name: type,
      value: value
    };
  }).style({
   /*  lineWidth: 1,
    stroke: '#fff' */
  });
  chart.render();
    });
        }
    }
</script>

<style lang="scss" scoped>
    .face{
        width: 98%;
        height: 3rem;
        margin: 0.1rem 0 0 0;
        box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
        float: left;
        overflow: hidden;
    }
    .title{
        margin: 0.1rem 0 0.1rem 0.2rem;
        color: #68abef;
        font-size: 0.14rem;
        font-weight: 900;
    }
    .picBox{
        width: 100%;
        height: 90%;
    }
</style>