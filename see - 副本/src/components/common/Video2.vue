<template>
  <div class="videos">
    <div id="f_ocx" style=" width: 8rem; height: 5rem;"></div>
    <div class="button" v-show="false">
      <button id="Login" href="javascript:;" @click="LoginDevice()">请先登录</button>
      <button id="idQuery" href="javascript:;" @click="QueryRecord()">链接视频通道</button>
      <button id="PlayBack" href="javascript:;" @click="PlayBack()">开始播放</button>
      <button id="PauseRec" href="javascript:;" @click="PauseRec()">暂停</button>
    </div>
  </div>
</template>
<script>
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/))
  ? (Sys.ie = s[2])
  : (s = ua.match(/firefox\/([\d.]+)/))
  ? (Sys.firefox = s[1])
  : (s = ua.match(/chrome\/([\d.]+)/))
  ? (Sys.chrome = s[1])
  : (s = ua.match(/opera.([\d.]+)/))
  ? (Sys.opera = s[1])
  : (s = ua.match(/version\/([\d.]+).*safari/))
  ? (Sys.safari = s[1])
  : 0;
function checkPlugins() {
  var PLUGINS_NAME = "WebActiveEXE.Plugin.1";
  var result;
  if (Sys.ie) {
    try {
      result = new ActiveXObject(PLUGINS_NAME);
      //delete result;
    } catch (e) {
      return false;
    }
    return true;
  } else {
    navigator.plugins.refresh(false);
    result = navigator.mimeTypes["application/media-plugin-version-3.1.0.2"];
    return !!(result && result.enabledPlugin);
  }
}
var hasPlugin = checkPlugins();

var g_ocx; //控件对象，初始化完毕后，可以调用《二次开发使用 WEB32网页调用接口说明.doc》文档中的接口
var g_PlayTime;
var g_curSpeed = 4; //默认的正常速度
var htmlStChn1 = "";
var recInfosByFile = [];
import {mapState} from "vuex"
export default {
  computed: {
    ...mapState({
      capDevChannel:state=>state.faceCountrl.capDevChannel
    }),
    ...mapState({
      capVedioBeginTime:state=>state.faceCountrl.capVedioBeginTime
    }),
    ...mapState({
      capVUrl:state=>state.faceCountrl.capVUrl
    }),
    ...mapState({
      xqCode:state=>state.faceCountrl.xqCode
    }),
  },
  methods: {
    loadPageOcx() {
      var mainOcxHtml = "";
      if (Sys.ie) {
        mainOcxHtml =
          '<object id="ocx" width="100%" height="100%" classid="CLSID:7F9063B6-E081-49DB-9FEC-D72422F2727F"></object>';
      } else {
        mainOcxHtml =
          '<object id="ocx" width="100%" height="100%" type="application/media-plugin-version-3.1.0.2" VideoWindTextColor="9c9c9c" VideoWindBarColor="414141"></object>';
      }
      document.getElementById("f_ocx").innerHTML = mainOcxHtml;
      document.getElementById("Login").style.display = "";
      this.initPageOcx();
    },
    initPageOcx() {
      g_ocx = document.getElementById("ocx");
      //控件加载成功后注册需要关注的监听事件
      //详见《二次开发使用 WEB32网页调用接口说明》章节二：事件

      //TransEvent: 注册这个事件接收控件内部状态
      //这个非常重要，是按时间查找录像查询的关键；调用本例中QueryRecordInfoByTimeEx()会触发回调
      //  g_ocx.AddEventListener("TransEvent", TransEvent);

      //SetNetPlayFileInfo: 注册这个事件接收查询到的录像信息
      //这个非常重要，是录像查询的关键；调用本例中QueryRecord()会触发回调
      //g_ocx.AddEventListener("SetNetPlayFileInfo", ShowRecInfo);
      //g_ocx.AddEventListener("NetPlayTimeInform", ShowPlayTime);

      //InsertNetRecordFileInfo: 注册这个事件接收查询到的录像信息
      //这个非常重要，是按时间查找录像查询的关键；调用本例中QueryRecordInfoByTimeEx()会触发回调
      /* g_ocx.AddEventListener(
        "InsertNetRecordFileInfo",
        InsertNetRecordFileInfo
      ); */

      //在这里可以隐藏工具栏上的按钮
      this.hideToolbarBtns();
      this.LoginDevice()
      
    },
    hideToolbarBtns() {
      //按钮隐藏可以自由选择怎么设置，遵从此协议格式即可
      //按钮名称有如下几种：{"Fisheye", "ZoomIn", "Record", "CloseVideo", "Snapshot", "Audio"}
      var str =
        '{"Protocol":"VideoFuncProtocol","Params":{"Audio":false, "Snapshot": false, "Record": false, "Fisheye":false, "ZoomIn":false}}';
      g_ocx.ProtocolPluginWithWebCall(str);
    },
    LoginDevice() {
      //var _this = this
      console.log(this.capVUrl)
      if(/:/g.test(this.capVUrl)){
        var ip = this.capVUrl.split(":")[0]
        var port = this.capVUrl.split(":")[1]
      }else{
        var ip  = this.capVUrl
        var port = "37777"
      }
      
      //console.log(_this.port)
      var bRet = g_ocx.LoginDeviceEx(
        ip,
        port,
        "admin",
        "admin123",
        0
      );
      this.QueryRecord()
    },
    GetAllChannelInfo() {
      var data = g_ocx.GetAllChannelInfo();
    },
    QueryRecord() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var date = new Date().getDate();

      g_ocx.SetModuleMode(4); //回放模式
      //  g_ocx.SetWinBindedChannel(4, 0, 0, 3);
      console.log(this.capDevChannel)
      var chnlArray = "{" + '"channels"' + ":[" + this.capDevChannel + "]}";
      //参数1：窗口分割数；参数2：窗口号； 参数3：通道号数组； 参数4：对应通道3解析的字符串
      g_ocx.SetWinBindedChannelEx(1, 0, chnlArray, "channels");
      var time = this.capVedioBeginTime.split(" ")
      var yearMonthDate = time[0].split("-")
      console.log(this.capVedioBeginTime)
      g_ocx.SwitchMonth(yearMonthDate[0], yearMonthDate[1], yearMonthDate[2]);
      g_ocx.SwitchDay(yearMonthDate[0], yearMonthDate[1], yearMonthDate[2]);
      htmlStChn1 = "";
      this.PlayBack()
    },
    PlayBack() {
      console.log(this.capVedioBeginTime.split(" ")[1])
      g_ocx.PlayBackByTime(0,this.capVedioBeginTime.split(" ")[1]);
    },
    
  },
  mounted() {
    /* if(this.xqCode=="04"){
      this.port = 80
    }else{
      this.port = 37777
    } */
    //console.log(this.capDevChannel,this.capVedioBeginTime,this.capVUrl)
    this.loadPageOcx(); //视频组件注入
   /*  var _this =this
    setTimeout(()=>{
      _this.LoginDevice()//登录
    },10000) */
  }
};
</script>
<style lang="scss" scoped>
.videos {
  width: 8rem;
  height: 5rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #0f193d;
  //display: none;
}
.button {
  display: flex;
  width: 100%;
  height: 0.3rem;
  justify-content: center;
  align-items: center;
  button {
    margin: 0 0.15rem;
    background: #409eff;
    outline: 0;
    border: 0;
    padding: 0.05rem 0.15rem;
    color: #fff;
    border-radius: 0.05rem;
  }
}
</style>
