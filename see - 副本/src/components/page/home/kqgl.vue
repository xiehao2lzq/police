<template>
  <div>
    <div id="kqgl" >
    <div class="title">
      <p class="p1">>>考勤管理</p>
      <p class="p2">人员信息分析TOPs</p>
    </div>
    <div class="rightbox">
        <p>全部人员数:{{kqgl.perTotal||""}}</p>
        <p>当日到岗人数:{{kqgl.perDuty||""}}</p>
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
      kqgl: {},
      isshow:true,
      chart8:null
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
      this.getKqInfo();
    }
  },
  methods: {
     getKqInfo() {
      //console.log(sessionStorage.getItem("Authorization"))
      this.$axios({
        url:"http://"+this.url +":9000/sjwl/manageport/tj/attendance",
        method:'get',
        /* headers:{
            "Authorization":sessionStorage.getItem("Authorization"),
            'Content-Type':'application/json'
          }, */
        params:{
           xqCode:this.xqCode,
           areaId:"0"
        }
      }).then(res=>{
        if(!res.data.code==="1000"){
          return false
        }
        var data =res.data
        this.kqgl = data.data
        var data8 = [{
                type: '正常考勤',
                value: data.data.perTotal * parseInt(data.data.normal) / 100
            }, {
                type: '迟到',
                value: data.data.perTotal * parseInt(data.data.late) / 100
            }, {
                type: '未到岗',
                value: data.data.perTotal * parseInt(data.data.leave) / 100
            }];

            // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
            if(this.isshow){
              var sliceNumber = 0.001;

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
            this.chart8 = new G2.Chart({
                container: 'kqgl',
                forceFit: true,
                height: window.innerHeight*0.21,
                padding: [20, 100, 20, 0]
            });
            this.chart8.source(data8);
            this.chart8.coord('theta', {
                innerRadius: 0.75
            });
            this.chart8.tooltip({
                showTitle: false,
            });
            this.chart8.guide().html({
                position: ['50%', '100%'],
                html: `<div style="color:#8c8c8c;font-size:0.16rem;text-align: center;width: 10em;">一共<br><span style="color:#fff;font-size:0.2rem">${data.data.perTotal}</span>人</div>`,
                alignX: 'middle',
                alignY: 'middle'
            });
            this.chart8.legend({
                position: 'right-center',
                marker:'circle',
                textStyle:{
                    fill:"#fff",
                }
            });
            this.chart8.intervalStack().position('value').color('type',['#4dcf9f','#df3470','#fd9c79']).shape('sliceShape');
            this.chart8.render();
            this.isshow = false;
            }else{
              this.chart8.changeData(data8)
            }
            
      })
    }
  },
  mounted() {
    this.getKqInfo()
  }
};
</script>
<style lang="scss" scoped>
#kqgl {
  margin: 0.1rem 0 0 0.1rem;
  overflow: hidden;
  width: 4.3rem;
  height: 2.75rem;
  background: url(../../../assets/images/conboxLT.png) no-repeat left top,
    url(../../../assets/images/conboxRT.png) no-repeat right top,
    url(../../../assets/images/conboxLB.png) no-repeat left bottom,
    url(../../../assets/images/conboxRB.png) no-repeat right bottom;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
}
.title {
  margin: 0.1rem 0 0.1rem 0.1rem;
  float: left;
  .p1 {
    font-size: 0.18rem;
    margin: 0rem 0 0 0.1rem;
    color: #68ABEF;
  }
  .p2 {
    font-size: 0.16rem;
    margin: 0.05rem 0 0 0.1rem;
    color: #93bce8;
  }
}
.rightbox{
    float:right;
    margin:0.2rem 0.1rem 0 0;
    p{
        font-size: 0.14rem;
        font-weight: 900;
        color:#7b9dc5;
    }
}
</style>
