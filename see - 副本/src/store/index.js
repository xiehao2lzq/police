//引入vue和vuex
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);//使用vux

//引入人脸布控的的数据
import faceCountrl from "./faceCountrl"
//引入布控记录数据
import countrlHistory from "./countrlHistory"
//引入处理记录记录数据
import dealHistory from "./dealHistory"
//引入首页数据
import home from "./home"
//引入首页数据
import register from "./register"
//引入登录数据
import realTimeMonitoring from "./realTimeMonitoring"
//导出数据
export default new Vuex.Store({
    modules:{
        faceCountrl,
        countrlHistory,
        dealHistory,
        home,
        register,
        realTimeMonitoring
    }
});