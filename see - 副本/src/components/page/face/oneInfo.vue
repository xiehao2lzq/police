<template>
    <div class="oneInfos">
        <!-- <button>X</button> -->
        <div class="img">
            <!-- <img v-if="gainOneInfo.faceTypeCode.split('')[0]!='5'" :src="gainOneInfo.capImgUrl" alt=""> -->
            <img  :src="gainOneInfo.capImgUrl" alt="">
        </div>
        <div class="leftInfo">
            <p>基础信息</p>
            <p>小区:{{gainOneInfo.xqName||"未知"}}</p>
            <p>摄像头：{{gainOneInfo.deviceAddr||"未知"}}</p>
            <p>时间：{{gainOneInfo.alarmTime||"未知"}}</p>
            <div v-if="gainOneInfo.faceTypeCode.split('')[0]!='5'">
                <p>性别:{{gainOneInfo.personSex==="1"?"女":"男"||"未知"}}</p>
                <p>手机号：{{gainOneInfo.personTel||"未知"}}</p>
                <p>证件号：{{gainOneInfo.personIdCard||"未知"}}</p>
            </div>
            <div v-else>
                <p>车辆颜色:{{gainOneInfo.carColor||"未知"}}</p>
                <p>车牌号：{{gainOneInfo.carNumber||"未知"}}</p>
                <p>车辆类型：{{gainOneInfo.carVehicleType||"未知"}}</p>
            </div>
        </div>
        <div class="rightInfo">
            <p>处理信息</p>
            <p>处理人：{{gainOneInfo.clUser||"未知"}}</p>
            <p>处理时间：{{gainOneInfo.clTime||"未知"}}</p>
            <p>处理内容：</p>
            <p>{{gainOneInfo.clContent||"暂无处理内容"}}</p>
            <p></p>
        </div>
    </div>
</template>
<script>
//引入vuex
import {mapState} from "vuex"
export default {
    computed: {
        ...mapState({//获取单条详细信息
            gainOneInfo:state=>state.dealHistory.gainOneInfo
        })
    }
}
</script>
<style lang="scss" scoped>
    .oneInfos{
        padding-top:0.5rem;
        width:45%;
        height:35%;
        background:#0F193D;
        color:#9EC9F8;
        display: flex;
        justify-content: space-around;
        box-shadow: 0 0 0.1rem 0.1rem inset #3c488d91;
        //align-items: flex-start;
        
        
    }
    .img{
        width: 1.5rem;
        height:2rem;
        margin:0 0.3rem;
        img{
            width: 100%;
            height: 100%;
        } 
    }
    .leftInfo,.rightInfo{
        height:2rem;
        width: 3rem;
        p{
            line-height: 0.3rem;
        }
    }
</style>
