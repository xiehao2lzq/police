<template>
  <div id="app">
    <div class="popWindows">
      <PopWindow v-for="item in popList" :key="item.timeStamp" :item="item" />
    </div>
    <router-view v-wechat-title="$route.meta.title" />
  </div>
</template>

<script>
import PopWindow from "./components/commonPopWindows/popWindow1";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    PopWindow
  },
  data() {
    return {
      list: [],
      list1: [],
      list2: [],
      ws: null,
      ws1: null,
      ws2: null
    };
  },
  computed: {
    ...mapState({
      wsUrl: state => state.commonData.wsUrl
    }),
    ...mapState({
      popList: state => state.commonData.popList
    }),
    ...mapState({
      wsUrl1: state => state.commonData.wsUrl1
    }),
    ...mapState({
      wsUrl2: state => state.commonData.wsUrl2
    }),
    ...mapState({
      onceLogin: state => state.commonData.onceLogin
    }),
    ...mapState({
      successMsg: state => state.commonData.successMsg
    }),
    ...mapState({
      errorMsg: state => state.commonData.errorMsg
    })
  },
  watch: {
    /* 监听登录成功后连接websocket */
    onceLogin() {
      this.wst();
    },
    successMsg() {
      this.open2(this.successMsg[0]);
    },
    errorMsg() {
      this.open4(this.errorMsg[0]);
    }
  },
  created() {
    if (sessionStorage.getItem("Authorization")) {
      this.$store.state.commonData.onceLogin = false;
    } else {
      this.$store.state.commonData.onceLogin = true;
    }
   /*  if (!this.onceLogin) {
      this.wst();
    } */
  },
  methods: {
    open2(val) {
      this.$message({
        message: val,
        type: "success"
      });
    },
    open4(val) {
      this.$message.error(val);
    },
    wst() {
      var _this = this;
      if ("WebSocket" in window) {
        _this.ws = new WebSocket(_this.wsUrl);
      } else if ("MozWebSocket" in window) {
        _this.ws = new MozWebSocket(_this.wsUrl);
      } else {
        alert("该浏览器不支持websocket");
      }
      this.ws.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
        //data = JSON.parse(data);
        console.log(data)
        var type = {};
        //console.log(data);
        switch (data.event) {
          case "0": //车辆占到
            type = { type: 8 };
            break;
          case "4": //流浪动物
            type = { type: 7 };
            break;
          case "5": //严重犯罪车辆
            type = { type: 1 };
            break;
          case "6": //肇事逃逸车辆
            type = { type: 3 };
            break;
          case "7": //疑似被盗车辆
            type = { type: 6 };
            break;
          case "8": //A级通缉犯人员
            type = { type: 2 };
            break;
          case "9": //c级通缉犯人员
            type = { type: 4 };
            break;
          case "10": //疑似犯罪人员
            type = { type: 5 };
            break;
          default:
            break;
        }
        data = Object.assign(data,type);
        _this.$store.state.commonData.popList.push(data);
      };

      this.ws.onopen = function(evt) {
        console.log("WebSocket链接成功");
      };
      this.ws.onerror = function() {
        console.log("WebSocket连接发生错误");
      };
      this.ws.onclose = function() {
        console.log("WebSocket连接关闭");
      };

      /* 人员的ws */
      if ("WebSocket" in window) {
        _this.ws1 = new WebSocket(_this.wsUrl1);
      } else if ("MozWebSocket" in window) {
        _this.ws1 = new MozWebSocket(_this.wsUrl1);
      } else {
        alert("该浏览器不支持websocket");
      }
      this.ws1.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
        _this.$store.state.commonData.peopleList.unshift(data);
        console.log(data);
      };

      this.ws1.onopen = function(evt) {
        console.log("WebSocket链接成功");
      };
      this.ws1.onerror = function() {
        console.log("WebSocket连接发生错误");
      };
      this.ws1.onclose = function() {
        console.log("WebSocket连接关闭");
      };

      /* 车辆的ws */
      if ("WebSocket" in window) {
        _this.ws2 = new WebSocket(_this.wsUrl2);
      } else if ("MozWebSocket" in window) {
        _this.ws2 = new MozWebSocket(_this.wsUrl2);
      } else {
        alert("该浏览器不支持websocket");
      }
      this.ws2.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
        _this.$store.state.commonData.carList.unshift(data);
        console.log(data);
      };

      this.ws2.onopen = function(evt) {
        console.log("WebSocket链接成功");
      };
      this.ws2.onerror = function() {
        console.log("WebSocket连接发生错误");
      };
      this.ws2.onclose = function() {
        console.log("WebSocket连接关闭");
      };
    }
  }
};
</script>

<style>
.popWindows {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 10000;
}
</style>
