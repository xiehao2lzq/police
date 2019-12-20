<template>
  <div>
    <div id="sbgl">
    <div class="title">
      <p @click="getSbInfo" class="p1">>>设备管理</p>
      <p class="p2">设备在线率统计</p>
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
      sbgl: "",
      isshow:true,
      chart9:null
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
      this.getSbInfo()
    }
  },
  methods: {
    getSbInfo() {
      //console.log(sessionStorage.getItem("Authorization"))
      this.$axios({
        url:"http://"+this.url + ":9000/sjwl/manageport/tj/device",
        method:'get',
        /* headers:{
            "Authorization":sessionStorage.getItem("Authorization"),
            'Content-Type':'application/json'
          }, */
        params:{
           xqCode:this.xqCode,
           areaId:"0",
        }
      }).then(res=>{
        if(!res.data.code==="1000"){
          return false
        }
        this.sbgl = res.data.data;
        var data = res.data
            var sortType = 'positive';
            var data9 = [{
                type: '室内机(' + data.data.devices[0].totalDevice + ')',
                value: data.data.devices[0].online
            }, {
                type: '门禁(' + data.data.devices[1].totalDevice + ')',
                value: data.data.devices[1].online
            }, {
                type: '监控(' + data.data.devices[2].totalDevice + ')',
                value: data.data.devices[2].online
            }, {
                type: '道闸(' + data.data.devices[3].totalDevice + ')',
                value: data.data.devices[3].online
            }];
            if(this.isshow){
              this.chart9 = new G2.Chart({
                container: 'sbgl',
                forceFit: true,
                height: window.innerHeight*0.2,
                padding: [20, 50, 50, 80]
            });
            var max = Math.max(data.data.devices[0].online,data.data.devices[1].online,data.data.devices[2].online,data.data.devices[3].online)
            //console.log(max)
            this.chart9.source(data9, {
                value: {
                    max: max,
                    min: 0,
                    nice: false,
                    alias: '数量（个）'
                }
            });
            this.chart9.axis('type', {
                label: {
                    textStyle: { 
                        fill: '#fff',
                        fontSize: 12
                    }
                },
                tickLine: {
                    alignWithLabel: false,
                    length: 0
                },
                line: {
                    lineWidth: 0
                },
            });
            this.chart9.axis('value', {
                label: null,
                title: {
                    offset: 30,
                    textStyle: {
                        fontSize: 12,
                        fontWeight: 300,
                    }
                },
                grid: {
                    lineStyle: {
                        stroke: '#37477f',
                        lineWidth: 0,
                        lineDash: [ 2, 2 ]
                    }
                }
            });
            
            this.chart9.legend(false);
            this.chart9.coord().transpose();
            this.chart9.interval().position('type*value').color('type',['#4dcf9f','#fd9c79','#25bcff','#6b4f99']).size(14).opacity(1).label('value', {
                textStyle: {
                    fill: '#fff'
                },
                offset: 10
            });
            this.chart9.render();
            this.isshow  = false
            }else{
              this.chart9.changeData(data9)
            }
            
      })
    }
  },
  mounted() {
    this.getSbInfo()
    //设备管理
  }
};
</script>
<style lang="scss" scoped>
#sbgl {
  width: 4.3rem;
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
    margin: 0.13rem 0 0 0.1rem;
    color: #93bce8;
    float: right;
    margin-right: 0.1rem;
  }
}
</style>
