
import Vue from 'vue'
import App from './App'
import router from './router'
//enement ui组件的引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//使用ElementUI
Vue.use(ElementUI);
Vue.config.productionTip = false
//引入store
import store from './store'
//引入rem
import "./modules/rem.js"
//引入scss文件
import "./stylesheets/main.scss"
/*引入资源请求插件*/ 
import axios from 'axios';
/*使用axios插件*/
Vue.prototype.$axios = axios;
//引入echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//引入jq
import $ from 'jquery'
//引入兼容ie插件
import "babel-polyfill"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//挂载路由
  store,//挂载仓库
  components: { App },
  template: '<App/>'
})


//全局路由拦截
router.beforeEach((to, from, next) => {//路由拦截，切记避免死循环
  if(to.name==="register"){
    if(sessionStorage.getItem('Authorization')){
      next("/home")
    }else{
      next()
    }
  }else{
    if(!sessionStorage.getItem('Authorization')){//未登录
      next("/")
    }else{
      next()
    }
  } 
 })
 //默认格式
 //axios.defaults.headers.post['Content-Type'] = 'application/json';
 //请求拦截器
 axios.interceptors.request.use(    
  config => {
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
      const token = sessionStorage.getItem('Authorization');        
      token && (config.headers.Authorization = token);        
      return config;    
  },    
  error => {        
      return Promise.error(error);    
  })
  //响应拦截器
  axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    sessionStorage.removeItem('Authorization')
                    router.replace({
                        path: '/',
                    })
            }
        }
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });
    // 使用由库提供的配置的默认值来创建实例
/* // 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 500; */

