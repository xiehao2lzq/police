//引入vue和vuex
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);//使用vux


//引入关注人员的数据
import attentionPeople from "./attentionPeople"
//引入首页的数据
import homePage from "./homePage"
//引入实有车辆的数据
import indeedCar from "./indeedCar"
//引入实有房产的数据
import indeedHouse from "./indeedHouse"
//引入实有人员的数据
import indeedPeopleNum from "./indeedPeopleNum"
//导出数据
export default new Vuex.Store({
    modules:{
        attentionPeople,
        homePage,
        indeedCar,
        indeedHouse,
        indeedPeopleNum
    }
});