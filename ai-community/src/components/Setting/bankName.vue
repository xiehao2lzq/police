<template>
    <div class="bankName">
        <div class="rightLogo"></div>
        <div class="title clear">
            <p></p>
            <span>布控库选定</span>
        </div>
        <ul>
            <li :class="{slectedBank:isSlected}"><i class="el-icon-s-custom"></i><span>人脸库</span></li>
            <li :class="{slectedBank:!isSlected}"><i class="el-icon-truck"></i><span>车辆库</span></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isSlected:true
            }
        }
    }
</script>

<style lang="scss" scoped>
.bankName{
    width: 352px;
    height: 975px;
    background:#2F324B;
    box-shadow:0px 1px 8px 0px rgba(28,31,52,0.99);
    border-radius:4px;  
    position: relative;
    margin-left: 11px;
    margin-top: 10px;
    overflow: hidden;
    float: left;
}
.rightLogo{
    width: 123px;
    height: 14px;
    background: url(../../../static/bgImage/point.png);
    position:absolute;
    top:0;
    right: 4px;
}
.bankName{
    .title{
        margin-top: 13px;
        margin-left: 10px;
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
    width: 324px;
    margin: 20px auto;
    overflow: hidden;
    li{
        width: 100%;
        margin-top: 10px;
        height:68px;
        border-radius: 5px;
        background: #4B57B6;
        font-size: 20px;
        i{
            font-size: 30px;
            margin:0 30px 0 80px;
            padding-top:20px;
        }
        span{
            position: relative;
            top: -3px;
        }
    }
}
.slectedBank{
    background: #6978F5;
}
</style>