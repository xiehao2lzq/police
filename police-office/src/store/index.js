//引入vue和vuex
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);//使用vux


//引入公共数据
import commonData from "./commonData"
//引入实有人口的数据
import propertyManagement from "./propertyManagement"
//引入实有人口的数据
import actualPopulation from "./actualPopulation"
//引入数据处理的数据
import dataTreating from "./dataTreating"
//引入安全布控的数据
import SafetyMonitor from "./SafetyMonitor"
//引入大数据分析的数据
import BigDataAnalysis from "./BigDataAnalysis"
//导出数据
export default new Vuex.Store({
    modules:{
        commonData,
        propertyManagement,
        actualPopulation,
        dataTreating,
        SafetyMonitor,
        BigDataAnalysis
    }
});