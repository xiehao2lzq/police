<template>
  <div id="container">
    <div id="output">
      <div class="containerT">
        <h1>用户登录</h1>
        <!-- <form class="form" id="entry_form"> -->
          <input type="text" placeholder="用户名" id="entry_name"  v-model="id">
          <input type="password" placeholder="密码" id="entry_password" v-model="password">
          <button type="button" id="entry_btn" @click="register">登录</button>
          <div id="prompt" class="prompt"></div>
       <!--  </form> -->
      </div>
    </div>
  </div>
</template>
<script>
import  "../../../../static/vector"
import {mapState,mapActions} from "vuex"
//回车登录
$(document).keydown(function(event){
            if(event.keyCode==13){
                $("#entry_btn").click();
            }
        });
export default {
    data(){
        return{
            id:"",
            password:"",
        }
    },
    mounted () {
        $(function(){
        Victor("container", "output");   //登陆背景函数
        $("#entry_name").focus();
    });
    },
    methods: {
        //...mapActions(["register"]),
        register(){
          var param = {
            username:this.id,
            password:this.password,
            verifyCode:"1234"
          }
          //console.log(this.$store)
          sessionStorage.setItem("username",this.id)//存上用户名
          this.$store.dispatch("register",param)
        },
        open2() {
        this.$message({
          message: '登录成功',
          type: 'success'
        });
      },
        open4() {
        this.$message.error('账号或密码错误');
      }
    },
    computed: {
      ...mapState({
        success:state=>state.register.success
      }),
      ...mapState({
        fail:state=>state.register.fail
      })
    },
    watch: {
      success(){
        this.open2()//显示登录成功
        this.$router.push("/home")//跳转到首页
      },
      fail(){
        this.open4()
      }
    }

}
</script>

<style lang="scss" scoped>
/* *{margin:0;padding:0;font-size:13px;font-family:microsoft yahei}
html,body{width:100%;height:100%;background:#fff} */

#container{width:100%;height:100%;position:fixed;top:0;left:0;z-index:999}
#output{width:100%;height:100%}
.prompt{width:60%;height:30px;margin:5px auto;text-align:center;line-height:30px;font-family:microsoft yahei,Arial,sans-serif;font-size:13px;color:#df0000}
.containerT{width:400px;height:300px;text-align:center;position:absolute;top:50%;left:50%;margin:-150px 0 0 -200px;border-radius:3px}
.containerT h1{padding:20px 0; font-size:18px;font-family:microsoft yahei,Arial,sans-serif;-webkit-transition-duration:1s;transition-duration:1s;-webkit-transition-timing-function:ease-in-put;transition-timing-function:ease-in-put;font-weight:500}
/* {padding:20px 0;position:relative;z-index:2} */
 input{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;border:1px solid rgba(255,255,255,.4);background-color:rgba(255,255,255,.2);width:200px;border-radius:3px;padding:8px 15px;margin:0 auto 10px;display:block;text-align:center;font-size:15px;color:#fff;-webkit-transition-duration:.25s;transition-duration:.25s;font-weight:300}
 input:hover{background-color:rgba(255,255,255,.4)}
 input:focus{background-color:#fff;width:230px;color:#333}
 button{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0;background-color:#fff;border:0;padding:10px 15px;color:#333;border-radius:3px;width:200px;cursor:pointer;font-family:microsoft yahei,Arial,sans-serif;font-size:16px;font-weight:700;-webkit-transition-duration:.25s;transition-duration:.25s}
 button:hover{background-color:#f5f7f9}
</style>
