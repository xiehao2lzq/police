<template>
    <li :class="contrastWindow.alarmLevel===4?'firstWarning':'special'" :style="style">
        <h3 class="title2"  :class="contrastWindow.alarmLevel===4?'firstWarningColor':'specialColor'">
            {{contrastWindow.alarmLevel===4?"一级目标警告":"特殊人员提示"}}
        </h3>
        <div class="img">
            <div class="imgBox">
                <img :src="contrastWindow.capImgPath" alt="">
                <span>抓拍信息</span>
            </div>
            <div class="imgBox">
                <img :src="contrastWindow.userFaceImgPath" alt="">
                <span>人脸库</span>
            </div>
         </div>
        <div class="info" :class="contrastWindow.alarmLevel===4?'firstWarningColor':'specialColor'">
            <p>监控位置：<span>{{contrastWindow.devAddress}}</span></p>
            <p>登记名称：<span>{{contrastWindow.personName}}</span></p>
            <p>时间：<span>{{contrastWindow.alarmTime}}</span></p>
            <p>相似度：<span>{{contrastWindow.contrastValue+"%"}}</span></p>
            <div class="percentage">
                <div class="status" :style="{width:contrastWindow.contrastValue+'%'}" :class="contrastWindow.alarmLevel===4?'firstWarningBc':'specialBc'"></div>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    props: ["contrastWindow"],
     data(){
        return{
            style:{
            opacity:0     
        }
        }
    },
    mounted () {
        if(this.contrastWindow.isActive){//根据isActive动态判断是否有动画
      var timeer = setInterval(() => {
        this.style.opacity = this.style.opacity + 0.2;
        if (this.style.opacity >= 1) {
          clearInterval(timeer);
        }
      }, 150);
    }else{
        this.style.opacity = 1;
    }
    }
}
</script>
<style lang="scss" scoped>
            li{
                width: 90%;
                height: 1.8rem;
                margin: 0.1rem auto 0;   
               
                .title2{
                    width: 100%;
                    text-align: center;
                    height: 0.35rem;
                    line-height: 0.35rem;
                }
                .img{
                    width: 50%;
                    //background: #FC6536;
                    height: 1.2rem;
                    float: left;
                    margin-left: 0.15rem;
                    display: flex;
                    justify-content: space-around;
                    .imgBox{
                        width: 40%;
                        height: 100%;
                        //background:red;
                        float: left;
                        position: relative;
                        img{
                            width: 100%;
                            height: 1rem;
                        }
                        span{
                            text-align: center;
                            width: 100%;
                            display: block;
                            position: absolute;
                            height: 0.2rem;
                            background:#287CD2;
                            //color: #FC6536;
                        }
                    }
                }
                .info{
                    float: left;
                    margin: 0.15rem 0 0 0.15rem;
                    width: 40%;
                    position: relative;
                    p{
                        margin-bottom: 0.05rem;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        width: 100%;
                        font-size: 0.14rem;
                        span{
                            color:#fff;
                        }
                    }
                }
                .firstWarningColor{
                    color:#FC6536;
                }
                .specialColor{
                    color:#00B7EE;
                }
                .percentage{
                    width: 100%;
                    height: 0.08rem;
                    background: #28316A;
                    border-radius: 0.04rem;
                    position: absolute;
                    .status{
                        /* width: 80%; */
                        height: 100%;
                        //background-color: #FC6536;
                        border-radius: 0.04rem;
                    }
                    .firstWarningBc{
                        background: #FC6536;
                    }
                    .specialBc{
                        background: #00B7EE;
                    }
                }
            }
</style>
