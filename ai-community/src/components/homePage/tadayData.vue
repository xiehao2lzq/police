<template>
    <div class="tadayData">
        <div class="title">
            <img src="../../../static/bgImage/pointLeft.png" alt="">
            <span>今日数据统计</span>
            <img src="../../../static/bgImage/pointRight.png" alt="">
        </div>
        <div class="info">
            <li>
                <p>人员出入</p>
                <p class="green-text">1234</p>
            </li>
            <li>
                <p>车辆出入</p>
                <p class="purple-text">1234</p>
            </li>
            <li>
                <p>异常报警</p>
                <p class="green-text">1351</p>
            </li>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .tadayData{
        width: 531px;
        height: 130px;
        background:url(../../../static/bgImage/right1.png);
        overflow: hidden;
        margin-top: 7px;
    }
    .title{
        width: 100%;
        height: 20px;
        margin-top:10px;
        font-size: 16px;
        img{
            display: inline-block;
        }
        text-align: center;
    }
    .info{
        width: 100%;
        li{
            margin-top: 10px;
            width: 33.3%;
            float: left;
            text-align: center;
        }
        p:first-child{
            margin-top: 10px;
        }
        p:last-child{
            font-size: 18px;
            margin-top: 10px;
        }
    }
</style>