<template>
    <div class="header">
        <img class="logo" src="../../assets/images/logo.jpg" alt="">
        <p>
            <router-link tag="span" to="/face/faceCountrl">人脸布控</router-link>
            <router-link tag="span" :to='{name:"picFind"}'>以图搜图</router-link>
            <router-link tag="span" :to='{name:"countrlHistory"}'>布控记录</router-link>
            <router-link tag="span" :to='{name:"dealHistory"}'>处理记录</router-link>
            <router-link tag="span" :to='{name:"realTimeMonitoring"}'>实时布控</router-link>
            <!-- <router-link tag="span" :to='{name:"faceBankBinding"}'>人脸库人员绑定</router-link> -->
        </p>
        <div class="right" @click="back">
                返回
        </div>
    </div>
</template>
<script>

export default {
   methods: {
       back(){
           this.$router.push("/")
       }
   }
}
</script>
<style lang="scss" scoped>
    .header{
        display: flex;
        width:100%;
        height: 1rem;
        .logo{
        margin: 0.35rem 0 0 0.3rem;
        height: 0.24rem;
    }
        p{
            margin-left: 0.25rem;
            line-height: 1rem;
            color: #9EC9F8;
            span{
                font-size: 0.18rem;
                padding: 0 0.4rem 0 0.4rem;
                border-right: 2px solid #2a3a83;
                cursor: pointer;
            }
            .last{
                border: 0;
            }
           
        }
        .right{
           position: absolute;
           right:0.5rem;
           top:0.3rem;
           font-size: 0.18rem;
           width:0.85rem;
           height:0.4rem;
           box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
           cursor: pointer;
           text-align: center;
           line-height: 0.4rem;
        }
        .router-link-exact-active{
            color:#fff;
        } 
 }
</style>
