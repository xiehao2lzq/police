<template>
    <div class="header">
        <img class="logo" src="../../../assets/images/logo.jpg" alt="">
        <div class="right">
            <p>
                <span class="last" @click="layout">返回</span>
            </p>
        </div>
    </div>
</template>
<script>

export default {
   methods: {
       layout(){
           this.$router.replace("/home")//跳转到登录页
       }
   },
   data () {
       return {
          
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
            margin-left: 0.5rem;
            width: 4rem;
            span{
                font-size: 0.18rem;
                cursor: pointer;
                white-space: nowrap;
            }
            .last{
                margin-left:0.05rem;
                border: 0;
            }
           
        }

        .right{
           margin-left:12rem;
           font-size: 0.18rem;
           span{
               border:0;
               float: right;
               box-shadow: 0 0 0.05rem 0.05rem inset #18214891;
               padding: 0.05rem 0.25rem;
               margin-top:0.2rem;
           }
        }
 }
</style>
