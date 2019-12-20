// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)
Vue.config.productionTip = false
/* 引入样式 */
import "./stylesheets/main.scss"
//enement ui组件的引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//使用ElementUI
Vue.use(ElementUI);

/*引入资源请求插件*/ 
import axios from 'axios';
/*使用axios插件*/
Vue.prototype.$axios = axios;

/* 引入G2图表 */
import G2 from '@antv/g2';
//使用G2图表
Vue.prototype.$G2 = G2;

/* 引入g2依赖 */
import dataSet from '@antv/data-set';
//使用G2图表
Vue.prototype.$dataSet = dataSet;

/* 引入vuex */
//引入store
import store from './store' 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

//默认格式
 axios.defaults.headers.post['Content-Type'] = 'application/json';
 //请求拦截器
 /* axios.interceptors.request.use(    
  config => {
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
      const token = sessionStorage.getItem('Authorization');        
      token && (config.headers.Authorization = token);        
      return config;    
  },    
  error => {        
      return Promise.error(error);    
  }) */