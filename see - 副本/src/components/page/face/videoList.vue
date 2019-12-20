<template>
      <div class="videoList">
      <div class="title">
        <h3>>>设备列表</h3>
        <span>离线 {{tjNotOnline}}</span>
        <span>在线 {{tjOnline}}</span>
      </div>
      <div class="auto">
        <div class="ul" v-for="list in lists" :key="list.index">
        <div class="xqName">
          <div class="more" @click="moreOrLess(list.xqCode)">{{list.state?"-":"+"}}</div>{{list.xqName}}
        </div>
        <ul v-if="list.state">
          <li v-for="capture in list.captures" :key="capture.index" @click="gainVideo(capture.capDevChannel,list.xqCode,capture.captureId,capture.url,capture.capDevCode)">
            {{capture.deviceName}}
            <span :class="capture.status==='0'?'err':'succ'"></span>
          </li>
        </ul>
      </div>
      </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
  methods: {
    moreOrLess(xqCode){//点击收缩
     this.lists.forEach(list => {
       if(list.xqCode === xqCode){
         list.state = !list.state
       }
     });
    },
    gainVideo(capDevChannel,xqCode,captureId,url,capDevCode){//获取视频地址，切换下部抓拍记录
      var tokenId = sessionStorage.getItem("Authorization").split(" ")[1];
      var param ={xqCode:xqCode,capDevChannel:capDevChannel,tokenId:tokenId,capDevCode:capDevCode}
      if(this.$store.state.realTimeMonitoring.param){
      this.$store.dispatch("closeVideoUrl",this.$store.state.realTimeMonitoring.param)//关闭上次视频拉流
      }
      if(xqCode=="04"){
        this.$store.dispatch("gainVideoUrl",param)//软博会视频拉流
      }else{
        this.$store.dispatch("gainVideoUrl2",param)//其他视频拉流
      }
      this.$store.state.realTimeMonitoring.param = param//将本次拉流的参数存到vuex
      this.$store.state.realTimeMonitoring.captureId = captureId//将id存入vuex webscoket用
    //this.$store.state.realTimeMonitoring.url = url//方案二，软博会视频地址
    }
    
  },
  computed: {
    ...mapState({
      lists:state=>state.realTimeMonitoring.list//摄像头表
    }),
    ...mapState({
      tjOnline:state=>state.realTimeMonitoring.tjOnline//摄像头表
    }),
    ...mapState({
      tjNotOnline:state=>state.realTimeMonitoring.tjNotOnline//摄像头表
    })
  },
  mounted () {
    this.$store.dispatch("gainVideoList",{"areaId":"0"})
    //关闭浏览器时回调
    var _this = this
    window.onbeforeunload = function (e) {
               _this.$store.dispatch("closeVideoUrl",_this.$store.state.realTimeMonitoring.param)
            }


  },
  beforeDestroy () {
    if(this.$store.state.realTimeMonitoring.param){
      this.$store.dispatch("closeVideoUrl",this.$store.state.realTimeMonitoring.param)//关闭上次视频拉流
      }
  }
};
</script>
<style lang="scss" scoped>
.videoList {
  float: left;
  width: 20%;
  height: 8rem;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
  margin: 0.1rem;
 
  .title {
    height: 1rem;
    line-height: 0.6rem;
    h3 {
      float: left;
      color: #68abef;
      margin-left: 0.15rem;
    }
    span {
      float: right;
      color: #68abef;
      margin: 0 0.15rem;
    }
  }
}
.auto{
  overflow: auto;
  height:7rem;
}
.ul {
  margin-left: 0.3rem;
  .xqName {
    padding-bottom: 0.1rem;
  }
  /* ul{
    height: 5rem;
    overflow-y: auto;
  } */
  .more {
    display: inline-block;
    width: 0.18rem;
    height: 0.18rem;
    line-height: 0.16rem;
    text-align: center;
    border: 1px solid #fff;
    cursor: pointer;
    margin-right: 0.1rem;
  }
  li {
    margin-left: 0.35rem;
    height: 0.2rem;
    line-height: 0.2rem;
    margin-bottom: 0.05rem;
    cursor: pointer;
    .err {
      width: 0.08rem;
      height: 0.08rem;
      border-radius: 50%;
      background: red;
      float: right;
      margin-right: 0.4rem;
      margin-top: 0.06rem;
    }
    .succ{
      background:green;
      width: 0.08rem;
      height: 0.08rem;
      border-radius: 50%;
      float: right;
      margin-right: 0.4rem;
      margin-top: 0.06rem;
    }
  }
}
</style>
