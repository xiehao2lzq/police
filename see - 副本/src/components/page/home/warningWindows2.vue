<template>
  <div class="warning2" :style=style @mouseenter="enter" @mouseleave="leave">
    <div class="header">
      <span v-if="warning2.alarmLevel===2">人员提示（{{warning2.xqName}}）</span>
      <span v-else>特殊预警（{{warning2.xqName}}）</span>
      <span class="close" @click="remove">X</span>
    </div>
    <div>
      <p class="title">
        <span>监控位置:{{warning2.devAddress}}</span>
        <img class="camera" src="@/assets/images/camera4.png" alt>
        时间:{{warning2.alarmTime.split(" ")[1]}}
      </p>
    </div>
    <div class="center clear">
      <div class="img">
        <img class="pic" :src="warning2.capImgPath" alt>
        <span>抓拍照片</span>
      </div>
      <div class="info">
        <span v-if="warning2.alarmLevel===2">陌生人！</span>
        <span v-else-if="warning2.alarmLevel===52">车辆占道！</span>
        <span v-else>陌生车辆！</span>
      </div>
    </div>
    <div class="bottom">
      <div class="bleft">
      </div>
      <div class="btn">
          <button class="nowDeal" @click="nowDeal">立即处理</button>
          <button class="lookDetial" @click="lookDetial">查看详情</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex"
export default {
  props:["warning2"],
  mounted() {
    if(this.warning2.isActive){//根据isActive动态判断是否有动画
      var timeer = setInterval(() => {
        this.style.right = this.style.right.replace(/rem/g,"")*1 + 0.5+"rem";
        if (this.style.right.replace(/rem/g,"")*1 >= 0) {
          clearInterval(timeer);
        }
      }, 100);
    }else{
        this.style.right = 0.3+"rem";
    }
  },
  data(){
    return {
      style:{
        right:-4.7+"rem",
        zIndex:10
      }
    }
  },
  methods: {
    enter(){
      //鼠标移入将层级设高
      this.style.zIndex=100
      
    },
    leave(){
      //鼠标移出层级还原
      this.style.zIndex = 10 
      
    },
    nowDeal(){//点击显示处理界面
      console.log(this.warning2.alarmLevel)
      if(this.warning2.alarmLevel==="2"){
        this.$store.state.home.isshow3 = true
      }else{
        this.$store.state.home.type = "5"
        this.$store.state.home.isshow2 = true//显示提交窗口
      }
      this.$store.state.home.warning2 = this.warning2//将要处理的数据传入vuex
    },
    lookDetial(){
      this.$store.state.home.bigImgUrl = this.warning2.capImgPath//照片路径存入vuex
       this.$store.state.home.bigPicIsshow = true//显示大照片
    },
    //删除本条数据
    remove(){
      this.warnings2.forEach((item,index) => {
        if(item.id===this.warning2.id){
                this.$store.state.home.warnings2.splice(index,1)
              }
      });
    }
  },
  computed: {
    ...mapState({
      warnings2:state=>state.home.warnings2
    })
  }
};
</script>
<style lang="scss" scoped>
.warning2 {
  width: 4.5rem;
  height: 27%;
  background: #101737;
  position: absolute;
  right: -4.7rem;
  top: 6.4rem;
  border: 2px solid #00B7EE;
}
.header {
  height: 0.4rem;
  text-align: center;
  color: #00B7EE;
  font-size: 0.18rem;
  font-weight: 900;
  line-height: 0.4rem;
  position: relative;
  .close{
    float:right;
    color:#fff;
    font-size: 0.16rem;
    margin-right:0.1rem;
    margin-top:0.03rem;
    cursor: pointer;
  }
}
.title {
  line-height: 0.3rem;
  height: 0.3rem;
  color: #00B7EE;
  margin-left: 0.1rem;
  span{
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display:block;
    float: left;
  }
}

.camera {
  display: inline-block;
  height: 0.18rem;
  position: relative;
  top: 0.03rem;
  margin: 0 0.1rem;
}
.img {
  float: left;
  height: 1.2rem;
  margin: 0 0.6rem;
  text-align: center;
  background: #fff;
  span {
    display: block;
    width: 100%;
    height: 0.2rem;
    background: #5a93d1;
    color: #fff;
  }
}
.pic {
  width: 1rem;
  height: 1rem;
}
.info {
  float: left;
  width: 48%;
  margin-left: 0.1rem;
  color:#fff;
}

.btn{
    float: right;
    padding: 0.1rem 0 0 0.3rem;
    margin-right:0.23rem;
    
    
  .nowDeal{
      background:#00B7EE;
      width:0.8rem;
      height: 0.3rem;
      border:0;
      color:#FFF;
      outline: 0;
      cursor: pointer;
     
  }
  .lookDetial{
      background:#3E5B95;
      width:0.8rem;
      height: 0.3rem;
      border:0;
      color:#FFF;
      outline: 0;
      cursor: pointer;
       margin-left: -0.04rem;
  }
}
</style>
