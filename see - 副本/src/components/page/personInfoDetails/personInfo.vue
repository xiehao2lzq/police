<template>
    <div class="personInfo">
        <div class="title">
            >>人员信息
        </div>
        <p class="p1 clear"><span>小区人员总数：{{personInfo.perTotalNum}}</span></p>
        <p class="p2 clear"><span>当日新增：{{personInfo.newperNum}}</span></p>
        <div class="botBox " >
            <div class="leftBox ">
                <div class="jztbox" usemap="#map">
                    <img src="../../../assets/images/jzt01.png" class="jztbox01" usemap="#map01">
                    <img src="../../../assets/images/jzt02.png" class="jztbox02" usemap="#map02">
                    <img src="../../../assets/images/jzt03.png" class="jztbox03" usemap="#map03">
                </div>
                <p class="jzttext01">租户数量：{{personInfo.tenementNum}}</p>
                <p class="jzttext02">家庭成员数量：{{personInfo.familyMemberNum}}</p>
                <p class="jzttext03">业主数量：{{personInfo.ownerNum}}</p>
            </div>
            <div class="rightBox ">
                <div class="infoBox">
                    <div class="left">
                        <p class="little">小区人员总数</p>
                        <p class="big">{{personInfo.perTotalNum}}</p>
                    </div>
                    <img src="../../../../static/persons.png" alt="">
                </div>
                <div class="infoBox">
                    <div class="left">
                        <p class="little">业主数量</p>
                        <p class="big">{{personInfo.ownerNum}}</p>
                    </div>
                    <img src="../../../../static/ower.png" alt="">
                </div>
                <div class="infoBox">
                    <div class="left">
                        <p class="little">家庭数量</p>
                        <p class="big">{{personInfo.familyMemberNum}}</p>
                    </div>
                    <img src="../../../../static/fam.png" alt="">
                </div>
                <div class="infoBox">
                    <div class="left">
                        <p class="little">租户数量</p>
                        <p class="big">{{personInfo.tenementNum}}</p>
                    </div>
                    <img src="../../../../static/rent.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex"
    export default {
        data () {
            return {
                personInfo:{}
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
        //console.log(res.data.data)
        this.$forceUpdate();
      })
        }
    }
</script>

<style lang="scss" scoped>
    .personInfo{
        width: 100%;
        height: 5rem;
        box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
        margin: 0.1rem 0  0 0.1rem;
        overflow: hidden;
    }
    .title{
        margin: 0.1rem 0 0.1rem 0.2rem;
        color: #68ABEF;
        font-size: 0.14rem;
        font-weight: 900;
    }
    .p1,.p2{
        width:100%;
        span{
            float:right;
            color:#9EC9F8;
            margin-right:0.2rem;
        }
    }
    .botBox{
        position: relative;
        width: 100%;
        .leftBox{
            float: left;
            width: 45%;
        }
        .rightBox{
                width: 55%;
                height: 4rem;
                //background:red;
                float: left;
                display: flex;
                justify-content: space-around;
                align-content: center;
                flex-flow: wrap;
            }
    }
    .jztbox {
  width: 1.2rem;
  position: absolute;
  left: 1.25rem;
  top: 0.5rem;
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
  width: 1.12rem;
  top: 0.72rem;
  left:0.6rem;
}
.jztbox02 {
  width: 1.88rem;
  top: 0.4rem;
  left:0.27rem;
}
.jztbox03 {
  width: 2.4rem;
}
.jzttext01 {
  position: relative;
  left: 3rem;
  top: 1.4rem;
  font-size: 0.14rem;
  font-weight: 900;
  color: #7b9dc5;
}
.jzttext02 {
  position: relative;
  left: 0.2rem;
  top: 1.8rem;
  font-size: 0.14rem;
  font-weight: 900;
  color: #7b9dc5;
}
.jzttext03 {
  position: relative;
  left: 3.8rem;
  top: 2.2rem;
  font-size: 0.14rem;
  font-weight: 900;
  color: #7b9dc5;
}
.infoBox{
    width: 40%;
    height: 25%;
    box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
    margin: 0.1rem;
    .left{
        float: left;
        
        .little{
            margin: 0.2rem 0  0 0.25rem;
            color: #9EC9F8;
            font-size: 0.14rem;
        }
        .big{
            margin: 0.1rem 0  0 0.25rem;
            font-size: 0.18rem;
        }
    }
    img{
        float: right;
        padding: 0.18rem 0.25rem;
        }
}
</style>