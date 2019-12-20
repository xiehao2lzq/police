<template>
    <div class="basicInformation boxColor">
        <div class="title clear">
            <p></p>
            <span>基础信息</span>
        </div>
        <ul>
            <li class="clear">
                <img src="@static/image/car1.png" alt="">
                <p>登记车辆</p>
                <span>{{info.carTotalNum || 1}}个</span>
            </li>
             <li class="clear">
                <img src="@static/image/car2.png" alt="">
                <p>常住人口车辆</p>
                <span>{{info. permanentPersonCarNum || 1}}个</span>
            </li>
             <li class="clear">
                <img src="@static/image/car3.png" alt="">
                <p>流动人口车辆</p>
                <span>{{info.flowPersonCarNum || 1}}个</span>
            </li>
             <li class="clear">
                <img src="@static/image/car4.png" alt="">
                <p>本月新增车辆</p>
                <span>{{info.monthAddCarNum || 1}}个</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from "vuex"
    export default {
        data() {
    return {
        info:{}
    };
  },
  computed: {
     ...mapState({
      selectedValue:state=>state.commonData.selectedValue
    }),
     ...mapState({
      url:state=>state.commonData.url
    })  
  },
  created() {
    this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/car/baseInfo/new",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.selectedValue,
        subdistrictId:"",
      }
    }).then(res=>{
        //console.log(res)
        if(res.data.code=="1000"){
            this.info = res.data.data
        }
    })
  },
    }
</script>

<style lang="scss" scoped>
.basicInformation{
    width: 516px;
    height: 452px;
    position: relative;
    margin-left: 11px;
    margin-top: 10px;
    overflow: hidden;
    float: left;
}
.basicInformation{
    .title{
        margin-top: 13px;
        margin-left: 10px;
        font-size: 16px;
        color: #333333;
        p{
            width: 6px;
            height: 16px;
            float: left;
            background:linear-gradient(0deg,rgba(35,197,235,1),rgba(35,230,189,1));
            box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.12);
            border-radius:2px;
            margin-right: 10px;
        }
        span{
            float: left;
            font-size: 16px;
            line-height: 16px;
        }
    }
}
ul{
    width: 100%;
    margin-top: 28px;
    li:nth-child(odd){
        width:444px;
        height:68px;
        background:#E0EDF9;
        margin:27px auto 0;
        line-height: 68px;
        font-size: 24px;
        img{
            float: left;
            margin-top: 10px;
            margin-left: 12px;
        }
        p{
            float: left;
            margin-left: 20px;
             background:linear-gradient(0deg,rgba(35,197,235,1) 0%, rgba(35,230,189,1) 100%);
             -webkit-background-clip: text;
            color: transparent;
            
        }
        span{
            float:right;
            margin-right: 20px;
            background:linear-gradient(0deg,rgba(35,197,235,1) 0%, rgba(35,230,189,1) 100%);
             -webkit-background-clip: text;
            color: transparent;
        }
    }
     li:nth-child(even){
        width:444px;
        height:68px;
        background:#E0EDF9;
        margin:27px auto 0;
        line-height: 68px;
        font-size: 24px;
        img{
            float: left;
            margin-top: 10px;
            margin-left: 12px;
        }
        p{
            float: left;
            margin-left: 20px;
             background:linear-gradient(180deg,rgba(62,173,250,1) 0.4150390625%, rgba(6,104,225,1) 100%);
             -webkit-background-clip: text;
            color: transparent;
            
        }
        span{
            float:right;
            margin-right: 20px;
            background:linear-gradient(180deg,rgba(62,173,250,1) 0.4150390625%, rgba(6,104,225,1) 100%);
             -webkit-background-clip: text;
            color: transparent;
        }
    }
}
</style>