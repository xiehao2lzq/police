<template>
  <div class="home">
    
    <div class="homeBox">
      <!-- <div class="video" @click.self="hide" v-if="isshow">
            <Video/>
      </div>-->
      <BigPic v-if="bigPicIsshow" /><!-- 大照片 -->
      <div class="xq"  @click="hide4" v-if= "isshow4">
        <xqList/>
      </div>
      <div class="dealInfo" @click="hide2" v-if="isshow2">
        <Warning4Deal/>
      </div>
      <div class="dealInfo2" @click="hide3" v-if="isshow3">
        <!-- 有问题 -->
        <Warning2Deal/>
      </div>
      <!--  <div class="oneInfo" @click="hide3" v-if="isshow3">
            <OneInfo/>
      </div>-->
     <!--  <div @click="qxrequest">实验</div>
      <div @click="connect">实验</div> -->
      <Header/>
      <div class="leftBox">
        <Tianqi/>
        <PersonInfo/>
        <div class="leftbottom" >
          <Carinfo/>
          <PersonNum/>
        </div>
      </div>
      <div class="centerBox">
        <ChinaMap/>
        <Infooppen/>
        <Light/>
      </div>
      <div class="right">
        <Checkinfo/>
        <Kqgl/>
        <Sbgl/>
      </div>
      <Warning4 v-for="warning4 in warnings4" :key="warning4.id" :warning4="warning4"></Warning4>
      <Warning3 v-for="warning3 in warnings3" :key="warning3.id" :warning3="warning3"></Warning3>
      <Warning2 v-for="warning2 in warnings2" :key="warning2.id" :warning2="warning2"></Warning2>
    </div>
  </div>
</template>
<script>
import Header from "../../common/header";
import Tianqi from "./tianqi";
import PersonInfo from "./personInfo";
import ChinaMap from "./ChinaMap";
import Carinfo from "./carinfo";
import PersonNum from "./personNum";
import Infooppen from "./infooppen";
import Light from "./light";
import Checkinfo from "./checkinfo";
import Kqgl from "./kqgl";
import Sbgl from "./sbgl";
import Warning4 from "./warningWindows4";
import Warning3 from "./warningWindows3";
import Warning2 from "./warningWindows2";
import Warning4Deal from "./warning4Deal";
import Warning2Deal from "./warning2Deal";
import XqList from "./xqList"
import BigPic from "./bigPic"
import { mapState } from "vuex";
var tokenId = sessionStorage.getItem("Authorization").split(" ")[1];
var lockReconnect = false; //避免连续重连
export default {
  components: {
    Header,
    Tianqi,
    PersonInfo,
    ChinaMap,
    Carinfo,
    PersonNum,
    Infooppen,
    Light,
    Checkinfo,
    Kqgl,
    Sbgl,
    Warning4,
    Warning3,
    Warning2,
    Warning4Deal,
    Warning2Deal,
    XqList,
    BigPic
  },
 
  computed: {
    ...mapState({
      warnings4: state => state.home.warnings4
    }),
    ...mapState({
      warnings3: state => state.home.warnings3
    }),
    ...mapState({
      warnings2: state => state.home.warnings2
    }),
    ...mapState({
      isshow2: state => state.home.isshow2
    }),
    ...mapState({
      isshow3: state => state.home.isshow3
    }),
    ...mapState({
      isshow4: state => state.home.isshow4
    }),
    ...mapState({
      xqCode: state => state.home.xqCode
    }),
    ...mapState({
      limit: state => state.home.limit
    }),
    ...mapState({
      url: state => state.home.url
    }),
    ...mapState({
      bigPicIsshow: state => state.home.bigPicIsshow
    }),
  },
  data() {
    return {
      isHeart: 1,
      timeout: null,
      //url: "ws://47.103.36.248:9010/socketServer/",
      tokenId: sessionStorage.getItem("Authorization").split(" ")[1],
      reconnects:null,
      isshow:true
    };
  },
  watch: {
    xqCode(){
      //重新确认查看权限
      this.qxrequest();
      var _this =this
      this.isshow = false
      setTimeout(function(){
        _this.isshow = true
      },0)
    }
  },
  mounted(){
    if(!this.limit){
      this.qxrequest();
    }
    this.$store.state.home.limit = 1
  },
  methods: {
    closeWebSocket() {
      console.log(123)
      //ws.close;//手动关闭
      this.reconnect() 
    },
    reconnect() {
      //websocket重连方法
      var _this = this
      if (lockReconnect){
        clearInterval(this.reconnects)
        return false;
      };
      clearInterval(this.reconnects)
      this.reconnects = setInterval(function() { 
        //没连接上会一直重连，设置延迟避免请求过多
        _this.qxrequest(); 
        lockReconnect = false;
      }, 10000);
    },
    qxrequest() {
      var _this = this
      //确定登录权限
      console.log(this.xqCode)
      this.$axios
        .get("http://"+this.url+":9010/wpi", {
          params: {
            areaId: 0,
            xqCode: this.xqCode,   
            tokenId: this.tokenId,
            userId: sessionStorage.getItem("userId")
          }
        })
        .then(res => {
          console.log(res)
          if(res.data.code==="1000"){
            //设置延时链接websocket
             _this.connect()
          }else{
            this.qxrequest()//失败后重新确认身份
          }
        });
    },
    connect() {
      //console.log(1)
      var _this = this;
      var tokenId = sessionStorage.getItem("Authorization").split(" ")[1];
      if ("WebSocket" in window) {
        var ws = new WebSocket(
          "ws://"+ _this.url  +":9010/socketServer/" + tokenId
        );
      } else if ("MozWebSocket" in window) {
        var ws = new MozWebSocket(
          "ws://"+_this.url+":9010/socketServer/" + tokenId
        );
      } else {
        alert("该浏览器不支持websocket");
      }
      
      ws.onmessage = function(evt) {
        //console.log(evt.data)
        if(evt.data.indexOf("pong")>-1){
          var splits = evt.data.split(":");
          if (splits[0] === "pong") {
            _this.isHeart = 1;
          } else {
             //console.log("error")
            _this.closeWebSocket();
          
          }
        }else{
          //console.log(JSON.parse(evt.data));
          var newData = JSON.parse(evt.data);
          //是否具有移入移出效果，默认新数据具有移入效果
          newData = { ...newData, isActive: true };
          if(newData.alarmLevel===4 || newData.alarmLevel===3 ){
            //console.log( _this.$store.state.realTimeMonitoring.contrastWindows)
            var index = _this.$store.state.realTimeMonitoring.contrastWindows.length - 1
            if(index>=0){
              _this.$store.state.realTimeMonitoring.contrastWindows[0].isActive = false
            }
            if(index>50){
              _this.$store.state.realTimeMonitoring.contrastWindows.pop()//限制50个为最多
            }
            _this.$store.state.realTimeMonitoring.contrastWindows.unshift(newData)//将对比页面的右侧的对比数据存入vuex
          }
          switch (newData.alarmLevel) {
            case 4:
              var index4 = _this.$store.state.home.warnings4.length - 1;
              if (index4 >= 0) {
                _this.$store.state.home.warnings4[index4].isActive = false;
              }
              if(index4>20){
                _this.$store.state.home.warnings4.shift();
              }
              _this.$store.state.home.warnings4.push(newData);
              break;
            case 3:
              var index3 = _this.$store.state.home.warnings3.length - 1;
              if (index3 >= 0) {
                _this.$store.state.home.warnings3[index3].isActive = false;
              }
              if(index3>20){
                _this.$store.state.home.warnings3.shift();
              }
              _this.$store.state.home.warnings3.push(newData);
              break;
            case 2:
            case 5:
            case 51:
            case 52:
              var index2 = _this.$store.state.home.warnings2.length - 1;
              console.log(index2)
              if (index2 >= 0) { 
                _this.$store.state.home.warnings2[index2].isActive = false;
              }
              if(index2>20){
                _this.$store.state.home.warnings2.shift();
              }
              _this.$store.state.home.warnings2.push(newData);
              break;
            default:
              console.log("数据有误");
          }
        }
      };
      ws.onopen = function(evt) {
      lockReconnect = true;//正常链接后拒绝重连
      _this.reconnect()//调用拒绝重连
      console.log("链接成功");
      clearInterval(_this.timeout)
      _this.timeout = setInterval(function() {
        if (_this.isHeart === 1) {
          ws.send("ping:" + _this.tokenId);
          _this.isHeart = 0;
        } else {
          lockReconnect = false;//断开之后允许重连
          _this.closeWebSocket();
          //console.log(222)
          clearInterval(_this.timeout)//重连就关闭心跳计时器
           _this.isHeart = 1;//允许发送心跳
        }
      }, 10000);
      };
      //连接发生错误的回调方法
		  ws.onerror = function () {
      console.log("WebSocket连接发生错误");
      _this.reconnect()//错误后重连
		};
      //连接关闭的回调方法
		 /*  ws.onclose = function () {
      //_this.closeWebSocket()//
			console.log("WebSocket连接关闭");
		} */
    },
    hide2(e) {
      if (e.target.className === "dealInfo" || e.target.tagName === "BUTTON") {
        this.$store.state.home.isshow2 = false; //隐藏窗口
      }
    },
    hide3(e) {
      if (e.target.className === "dealInfo2" || e.target.tagName === "BUTTON") {
        this.$store.state.home.isshow3 = false; //隐藏窗口
      }
    },
    hide4(e) {
      if (e.target.className === "list" || e.target.tagName === "LI") {
        this.$store.state.home.isshow4 = false; //隐藏窗口
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
.homeBox {
  height: 9.5rem;
  overflow: hidden;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.leftBox {
  float: left;
}
.centerBox {
  float: left;
}
.leftbottom {
  margin: 0.1rem 0 0 0.1rem;
  height: 3.6rem;
  background: url(../../../assets/images/conboxLT.png) no-repeat left top,
    url(../../../assets/images/conboxRT.png) no-repeat right top,
    url(../../../assets/images/conboxLB.png) no-repeat left bottom,
    url(../../../assets/images/conboxRB.png) no-repeat right bottom;
  box-shadow: 0 0 0.1rem 0.1rem inset #18214891;
}
.right {
  float: left;
}
.video,
.dealInfo,
.oneInfo,
.dealInfo2 {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000;
  background: rgba($color: #fff, $alpha: 0.3);
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
