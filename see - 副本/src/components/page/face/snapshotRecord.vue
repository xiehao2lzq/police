<template>
  <div class="snapshotRecord">
    <div class="title">>>抓拍记录</div>
    <div class="bannerList">
      <div class="info">
        <ul>
          <OneSnapshot v-for="snapshotRecord in snapshotRecords" :key = "snapshotRecord.capTimeStr" :snapshotRecord = "snapshotRecord" />
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import OneSnapshot from "./oneSnapshot"
import {mapState} from "vuex"

export default {
  data(){
    return{
      snapshotRecords:[],
      style:{
        width:1.35+"rem"
      },
      ws:null,
    }
  },
  components: {
    OneSnapshot
  },
  computed: {
    ...mapState({
      captureId:state=>state.realTimeMonitoring.captureId
    }),
    ...mapState({
      url:state=>state.home.url
    }),
  },
  watch: {
    captureId(){
      if(this.ws){//之前开过先关了
        this.ws.close()
      }
      this.websocket()
    }
  },
  methods: {
    websocket(){
      var _this = this
      if ("WebSocket" in window) {
        this.ws = new WebSocket(
         "ws://"+_this.url+":9010/picWebSocket/"+this.captureId
        );
      } else if ("MozWebSocket" in window) {
        this.ws = new MozWebSocket(
          "ws://"+_this.url+":9010/picWebSocket/"+this.captureId
        );
      } else {
        alert("该浏览器不支持websocket");
      }
      var _this = this
       this.ws.onmessage = function(evt){
         console.log(evt.data)
         var newdata = JSON.parse(evt.data)
         var index = _this.snapshotRecords.length-1
          newdata = {...newdata,isActive:true,i:i}
         _this.snapshotRecords.unshift(newdata)
         if(index>=0){
          _this.snapshotRecords[index].isActive = false
         }
         if(_this.snapshotRecords.length>50){//限定50条
           _this.snapshotRecords.pop()
         }
   }
       this.ws.onopen = function(evt){
        console.log(" connect success")
       }
        this.ws.onclose = function(){
       console.log("已断开")
    }
    }
  },
  mounted () {
    
  },
  beforeDestroy () {
    if(this.ws){//如果打开了websocket，销毁页面时关掉
      this.ws.close()
    }
  }
  
};
</script>
<style lang="scss" scoped>
.snapshotRecord {
  margin-top: 0.1rem;
  width: 100%;
  height: 2.5rem;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
  overflow: hidden;
  .title {
    margin: 0.15rem 0.2rem;
    font-size: 0.14rem;
    color: #68abef;
  }
  .bannerList {
    height: 2rem;
    line-height: 2rem;
    display: flex;
    justify-content: space-around;
  }
  .info{
    float: left;
    height: 2rem;
    //background: red;
    width: 98%;
    padding: 0 1%;
    overflow-x: hidden;
  }
  ul {
    float: left;
    height: 1.9rem;
    //background: red;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }
}
</style>
