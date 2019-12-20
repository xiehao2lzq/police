<template>
  <div class="warning4" :style=style @mouseenter="enter" @mouseleave="leave">
    <div class="header">
      目标警告（{{warning4.xqName}}）
      <span class="noDeal">未处理{{warning4.wclCount || 1}}条</span>
    </div>
    <div>
      <p class="title">
        监控位置:{{warning4.devAddress}}
        <img class="camera" src="@/assets/images/camera3.png" alt>
        时间:  {{warning4.alarmTime.split(" ")[1]}}
      </p>
    </div>
    <div class="center clear">
      <div class="img">
         <img class="pic" :src="warning4.userFaceImgPath" alt>
        <span>人脸库照片</span>
      </div>
      <div class="img">
        <img class="pic" :src="warning4.capImgPath" alt>
        <span>抓拍照片</span>
       
      </div>
      <div class="info">
        <p>
          <span>库名称:</span>
          {{warning4.faceGroupName}}
        </p>
        <p>
          <span>姓名:</span>
          {{warning4.personName}}
        </p>
        <p>
          <span>性别:</span>
          {{warning4.personSex}}
        </p>
        <p>
          <span>手机号码:</span>
          {{warning4.personTel}}
        </p>
        <p>
          <span>家庭住址:</span>
          {{warning4.personAddress}}
        </p>
      </div>
    </div>
    <div class="bottom">
      <div class="bleft">
        <p>
          相似度：
          <span>{{warning4.contrastValue}}%</span>
        </p>
        <div class="similarity">
          <div class="progress" :style="{width:warning4.contrastValue+'%'}"></div>
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
 props: ["warning4"],
 mounted() {
    if(this.warning4.isActive){//根据isActive动态判断是否有动画
     clearInterval(timeer);
      var timeer = setInterval(() => {
        this.style.right = this.style.right.replace(/rem/g,"")*1 + 0.5+"rem";
        if (this.style.right.replace(/rem/g,"")*1 >= 0) {
          clearInterval(timeer);
        }
      }, 50);
    }else{
        this.style.right = 0.3+"rem";
    }
    console.log(this.warning4)
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
    nowDeal(){
      //将类型传进vuex
      this.$store.state.home.type = "4"
      this.$store.state.home.isshow2 = true//显示提交窗口
      this.$store.state.home.warning4 = this.warning4//将要处理的数据传入vuex
    },
    lookDetial(){
      this.$store.state.home.bigImgUrl = this.warning4.capImgPath//照片路径存入vuex
       this.$store.state.home.bigPicIsshow = true//显示大照片
    },
  }
};
</script>
<style lang="scss" scoped>
.warning4 {
  width: 4.5rem;
  height: 27%;
  background: #101737;
  position: absolute;
  right: -4.7rem;
  top: 1.2rem;
  border: 2px solid #fc6536;
  
}
.header {
  height: 0.4rem;
  text-align: center;
  color: #fc6536;
  font-size: 0.18rem;
  font-weight: 900;
  line-height: 0.4rem;
  position: relative;
  .noDeal {
    position: absolute;
    display: block;
    border: 2px solid #fc6536;
    color: #fff;
    width: 1rem;
    height: 0.24rem;
    border-radius: 0.1rem;
    right: 0.3rem;
    top: 0.1rem;
    font-size: 0.14rem;
    line-height: 0.2rem;
  }
}
.title {
  line-height: 0.3rem;
  height: 0.3rem;
  color: #fc6536;
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
    color: #fc6536;
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
  background: #fc6536;
  height: 0.12rem;
  border-radius: 0.06rem;
}
.btn {
  float: left;
  padding: 0.1rem 0 0 0.3rem;

  .nowDeal {
    background: #fc6536;
    width: 0.8rem;
    height: 0.3rem;
    border: 0;
    color: #fff;
    outline: 0;
    cursor: pointer;
  }
  .lookDetial {
    background: #f98358;
    width: 0.8rem;
    height: 0.3rem;
    border: 0;
    color: #fff;
    outline: 0;
    cursor: pointer;
    margin-left: -0.04rem;
  }
}
</style>
