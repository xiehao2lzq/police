<template>
    <div class="header">
        <img class="logo" src="../../assets/images/logo.jpg" alt="">
        <p>
            <!-- <span>首页</span> --> 
            <router-link tag="span" :to='{name:"face"}'>智能布控</router-link>
        </p>
        <div class="headertitle">
            <span class="texttitle">视界物联网云平台</span>
            <img class="title" src="../../assets/images/headertitle.jpg" alt="">
        </div>
        <div class="right">
            <p>
                <span>{{username}}</span>
                <span class="last" @click="layout">退出</span>
            </p>
        </div>
    </div>
</template>
<script>

export default {
   methods: {
       layout(){
           sessionStorage.removeItem("Authorization")//清除token
           //this.$store.state.home.limit = 0//允许socket重新连接
           this.$router.replace("/")//跳转到登录页
           location.reload(true);
       }
   },
   data () {
       return {
           username:sessionStorage.getItem("username")
       }
   }
}
</script>
<style lang="scss" scoped>
    .header{
        display: flex;
        width:100%;
        height: 1rem;
        //background: red;
        .logo{
        margin: 0.35rem 0 0 0.3rem;
        height: 0.24rem;
    }
        p{
            margin-left: 0.5rem;
            line-height: 1rem;
            width: 4rem;
            span{
                font-size: 0.18rem;
                padding: 0 0.4rem 0 0.4rem;
                //border-right: 2px solid #2a3a83;
                cursor: pointer;
                white-space: nowrap;
            }
            .last{
                margin-left:0.05rem;
                border: 0;
            }
           
        }
        .headertitle{
            position: fixed;
            width: 5.7rem;
            height: 0.97rem;
            left: 0;
            right: 0;
            margin: auto;
            img{
                width: 5.7rem;
                height: 0.97rem;
            }
            span{
                position: absolute;
                width: 5.7rem;
                height: 0.97rem;
                font-size: 0.3rem;
                text-align: center;
                line-height: 0.97rem;
                font-weight: 900;
               
            }
        }
        .right{
           /* margin-left:12rem; */
           //float: right;
           position: absolute;
           right: 0;
           font-size: 0.18rem;
           //background: green;
           span{
               border:0;
           }
        }
 }
</style>
