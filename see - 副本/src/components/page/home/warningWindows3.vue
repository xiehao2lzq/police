<template>
  <div class="warning3" :style=style @mouseenter="enter" @mouseleave="leave">
    <div class="header">
      人员提示（{{warning3.xqName}}）
      <span class="noDeal">未处理{{warning3.wclCount || 1}}条</span>
      <span class="close" @click="remove">X</span>
    </div>
    
    <div>
      <p class="title">
        监控位置:{{warning3.devAddress}}
        <img class="camera" src="@/assets/images/camera4.png" alt>
        时间:  {{warning3.alarmTime.split(" ")[1]}}
      </p>
    </div>
    <div class="center clear">
      
      <div class="img">
        <img class="pic" :src="warning3.userFaceImgPath" alt>
        <span>人脸库照片</span>
      </div>
      <div class="img">
        <img class="pic" :src="warning3.capImgPath" alt>
        <span>抓拍照片</span>
      </div>
      <div class="info">
        <p>
          <span>库名称:</span>
          {{warning3.faceGroupName}}
        </p>
        <p>
          <span>姓名:</span>
          {{warning3.personName}}
        </p>
        <p>
          <span>性别:</span>
          {{warning3.personSex}}
        </p>
        <p>
          <span>手机号码:</span>
          {{warning3.personTel}}
        </p>
        <p>
          <span>家庭住址:</span>
          {{warning3.personAddress}}
        </p>
      </div>
    </div>
    <div class="bottom">
      <div class="bleft">
        <p>
          相似度：
          <span>{{warning3.contrastValue}}%</span>
        </p>
        <div class="similarity">
          <div class="progress" :style="{width:warning3.contrastValue+'%'}"></div>
        </div>
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
  props: ["warning3"],
   mounted() {
    if(this.warning3.isActive){//根据isActive动态判断是否有动画
      var timeer = setInterval(() => {
        this.style.right = this.style.right.replace(/rem/g,"")*1 + 0.5+"rem";
        if (this.style.right.replace(/rem/g,"")*1 >= 0) {
          clearInterval(timeer);
        }
      }, 50);
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
  computed: {
    ...mapState({
      warnings3:state=>state.home.warnings3
    })
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
    nowDeal(){
      //将类型传进vuex
      this.$store.state.home.type = "3"
      this.$store.state.home.isshow2 = true//显示提交窗口
      this.$store.state.home.warning3 = this.warning3//将要处理的数据传入vuex
    },
    lookDetial(){
      this.$store.state.home.bigImgUrl = this.warning3.capImgPath//照片路径存入vuex
       this.$store.state.home.bigPicIsshow = true//显示大照片
    },
    //删除本条数据
    remove(){
      this.warnings3.forEach((item,index) => {
        if(item.id===this.warning3.id){
                this.$store.state.home.warnings3.splice(index,1)
              }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.warning3 {
  width: 4.5rem;
  height: 27%;
  background: #101737;
  position: absolute;
  right: -4.7rem;
  top: 3.8rem;
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
  .noDeal {
    position: absolute;
    display: block;
    border: 2px solid #00B7EE;
    color: #fff;
    width: 1rem;
    height: 0.24rem;
    border-radius: 0.1rem;
    right: 0.3rem;
    top: 0.1rem;
    font-size: 0.14rem;
    line-height: 0.2rem;
  }
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
  margin-left: 0.1rem;
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
  p {
    color: #00B7EE;
    line-height: 0.2rem;
    height: 0.2rem;
    span {
      color: #fff;
    }
  }
}
.bleft {
  margin-left: 0.1rem;
  width: 50%;
  float: left;
  p {
    color: #fff;
    height: 0.3rem;
    line-height: 0.3rem;
  }
}
.similarity {
  width: 100%;
  background: #28316a;
  height: 0.12rem;
  border-radius: 0.06rem;
}
.progress {
  width: 80%;
  background: #00B7EE;
  height: 0.12rem;
  border-radius: 0.06rem;
}
.btn{
    float: left;
    padding: 0.1rem 0 0 0.3rem;
    
    
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
