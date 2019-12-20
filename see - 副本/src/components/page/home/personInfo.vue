<template>
  <div class="personInfo">
    <router-link to="/personInfoDetails" tag="div" class="boxt01">>>人员信息</router-link>
    <div class="boxt02">小区人员总数:{{personInfo.perTotalNum}}</div>
    <div class="clear"></div>
    <div class="boxt03">人员信息分析tops</div>
    <div class="boxt04">当日新增:{{personInfo.newperNum}}</div>
    <div class="clear"></div>
    <div class="jztbox" usemap="#map">
      <img src="../../../assets/images/jzt01.png" class="jztbox01" usemap="#map01">
      <img src="../../../assets/images/jzt02.png" class="jztbox02" usemap="#map02">
      <img src="../../../assets/images/jzt03.png" class="jztbox03" usemap="#map03">
    </div>
    <div class="jzttext01">租户数量:{{personInfo.tenementNum}}</div>
    <div class="jzttext02">家庭成员数量:{{personInfo.familyMemberNum}}</div>
    <div class="jzttext03">业主数量:{{personInfo.ownerNum}}</div>
  </div>
</template>
<script>
import {mapState} from "vuex"
export default {
  data() {
    return {
      personInfo: {},
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
      this.getPersonInfo()
    }
  },
  methods: {
    getPersonInfo() {
      //console.log(sessionStorage.getItem("Authorization"))
      this.$axios({
        url:"http://"+this.url + ":9000/sjwl/manageport/tj/personInfo",
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
        this.personInfo = res.data.data
        this.$forceUpdate();
      })
    }
  },
  created() {
    this.getPersonInfo();
  }
};
</script>
<style lang="scss" scoped>
.personInfo {
  width: 4.75rem;
  height: 2rem;
  background-color: #101737;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
  margin: 0.1rem 0 0 0.1rem;
  background: url(../../../assets/images/conboxLT.png) no-repeat left top,
    url(../../../assets/images/conboxRT.png) no-repeat right top,
    url(../../../assets/images/conboxLB.png) no-repeat left bottom,
    url(../../../assets/images/conboxRB.png) no-repeat right bottom;
  overflow: hidden;
  position: relative;
}
.boxt01 {
  font-size: 0.18rem;
  margin: 0.1rem 0 0 0.2rem;
  color: #68ABEF;
  cursor: pointer;
}
.boxt03 {
  font-size: 0.16rem;
  margin: 0.05rem 0 0 0.2rem;
  color: #93bce8;
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
.boxt02 {
  font-size: 0.14rem;
  font-weight: 900;
  color: #7b9dc5;
  position: absolute;
  right: 0.2rem;
  top: 0.4rem;
}
.boxt04 {
  font-size: 0.14rem;
  font-weight: 900;
  color: #7b9dc5;
  position: absolute;
  right: 0.2rem;
  top: 0.6rem;
}
.jztbox {
  width: 1.2rem;
  position: absolute;
  left: 1.85rem;
  bottom: 0.2rem;
  img {
    margin: 0 auto;
    position: relative;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
.jztbox01 {
  width: 0.56rem;
  top: 0.36rem;
}
.jztbox02 {
  width: 0.94rem;
  top: 0.2rem;
}
.jztbox03 {
  width: 1.2rem;
}
.jzttext01 {
  position: relative;
  left: 2.8rem;
  top: 0.2rem;
  font-size: 0.14rem;
  font-weight: 900;
  color: #7b9dc5;
}
.jzttext02 {
  position: relative;
  left: 0.8rem;
  top: 0.3rem;
  font-size: 0.14rem;
  font-weight: 900;
  color: #7b9dc5;
}
.jzttext03 {
  position: relative;
  left: 3.2rem;
  top: 0.4rem;
  font-size: 0.14rem;
  font-weight: 900;
  color: #7b9dc5;
}
</style>
