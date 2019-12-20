<template>
  <div id="checkinfo">
    <div class="title">
      <p class="p1" @click="getCheckInfo">>>缴费信息</p>
      <p class="p2">缴费信息分析TOPs</p>
    </div>
    <div class="centerbox">
      <div class="leftbox">
        <img src="../../../assets/images/jfxxico01.png" alt>
        <p>
          <span>当日缴费</span>
          <br>
          <br>
          <span>{{checkinfo.payDay}}</span>
        </p>
      </div>
      <div class="rightbox">
        <img src="../../../assets/images/jfxxico02.png" alt>   
        <p>
          <span>当月缴费</span>
          <br>
          <br>
          <span>{{checkinfo.sumMonth}}</span>
        </p>
      </div>
    </div>
    <div v-if="checkinfo.monthOfYear == 'up'">
      <table class="jfxxtable">
        <tr class="c">
          <td>月份</td>
          <td>1月</td>
          <td>2月</td>
          <td>3月</td>
          <td>4月</td>
          <td>5月</td>
          <td>6月</td>
        </tr>
        <tr>
          <td class="c">
            缴费额
            <br>（万元）
          </td>
          <td>{{checkinfo.payMonth[0]}}</td>
          <td>{{checkinfo.payMonth[1]}}</td>
          <td>{{checkinfo.payMonth[2]}}</td>
          <td>{{checkinfo.payMonth[3]}}</td>
          <td>{{checkinfo.payMonth[4]}}</td>
          <td>{{checkinfo.payMonth[5]}}</td>
        </tr>
        <tr class="c">
          <td>完成率</td>
          <td>{{checkinfo.percent[0]}}</td>
          <td>{{checkinfo.percent[1]}}</td>
          <td>{{checkinfo.percent[2]}}</td>
          <td>{{checkinfo.percent[3]}}</td>
          <td>{{checkinfo.percent[4]}}</td>
          <td>{{checkinfo.percent[5]}}</td>
        </tr>
      </table>
    </div>
    <div v-if="checkinfo.monthOfYear == 'down'">
      <table class="checktable">
        <tr class="c">
          <td>月份</td>
          <td>7月</td>
          <td>8月</td>
          <td>9月</td>
          <td>10月</td>
          <td>11月</td>
          <td>12月</td>
        </tr>
        <tr>
          <td class="c">
            缴费额
            <br>（万元）
          </td>
          <td>{{checkinfo.payMonth[6]}}</td>
          <td>{{checkinfo.payMonth[7]}}</td>
          <td>{{checkinfo.payMonth[8]}}</td>
          <td>{{checkinfo.payMonth[9]}}</td>
          <td>{{checkinfo.payMonth[10]}}</td>
          <td>{{checkinfo.payMonth[11]}}</td>
        </tr>
        <tr class="c">
          <td>完成率</td>
          <td>{{checkinfo.percent[6]}}</td>
          <td>{{checkinfo.percent[7]}}</td>
          <td>{{checkinfo.percent[8]}}</td>
          <td>{{checkinfo.percent[9]}}</td>
          <td>{{checkinfo.percent[10]}}</td>
          <td>{{checkinfo.percent[11]}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import G2 from "@antv/g2";
import {mapState} from "vuex"
export default {
  data() {
    return {
      checkinfo: {},
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
  methods: {
    getCheckInfo(){
      this.$axios.get("http://"+this.url+":9000/sjwl/manageport/tj/pay",{params:{
        xqCode: this.xqCode,
        areaId: "0"
      },
      /* headers:{
         Authorization: sessionStorage.getItem("Authorization"),
      } */
      }).then(res=>{
        if(!res.data.code==="1000"){
          return false
        }
        this.checkinfo = res.data.data
      })
    }
  },
  mounted() {
    //缴费信息
    console.log(checkinfo.payDay===undefined)
    this.getCheckInfo()
  }
};
</script>
<style lang="scss" scoped>
#checkinfo {
  margin: 0.1rem 0 0 0.1rem;
  overflow: hidden;
  width: 4.3rem;
  height: 2.8rem;
  background: url(../../../assets/images/conboxLT.png) no-repeat left top,
    url(../../../assets/images/conboxRT.png) no-repeat right top,
    url(../../../assets/images/conboxLB.png) no-repeat left bottom,
    url(../../../assets/images/conboxRB.png) no-repeat right bottom;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
}
.title {
  margin: 0.1rem 0 0.1rem 0.1rem;
  .p1 {
    font-size: 0.18rem;
    margin: 0.1rem 0 0 0.1rem;
    color: #68ABEF;
  }
  .p2 {
    font-size: 0.16rem;
    margin: 0.05rem 0 0 0.1rem;
    color: #93bce8;
  }
}
.centerbox {
  display: flex;
  justify-content: space-around;
  .leftbox,
  .rightbox {
    float: left;
    img {
      float: left;
      width: 0.67rem;
      height: 0.67rem;
    }
    p {
      float: left;
      font-size: 0.16rem;
      font-weight: 900;
      color: #fff;
      margin-left: 0.2rem;
      text-align: center;
      span{
          line-height: 0.2rem;
      }
    }
  }
}
table{width: 100%;font-size: 0.14rem;color: #fff;text-align: center;margin-top: 0.1rem;}
table td{padding: 0.03rem 0;}
table td.c{background: #40455f;}
table tr.c{background: #1b203d;}
</style>
