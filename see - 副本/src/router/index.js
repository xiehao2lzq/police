import Vue from 'vue'
import Router from 'vue-router'
//import Home from '@/components/page/home/home'
/* import Face from "@/components/page/face/face"
import FaceCountrl from '@/components/page/face/faceCountrl'
import PicFind from '@/components/page/face/picFind'
import CountrlHistory from '@/components/page/face/countrlHistory'
import DealHistory from '@/components/page/face/dealHistory'
import FaceBank from '@/components/page/face/FaceBank'
import FaceBankBinding from '@/components/page/face/FaceBankBinding'
import Register from "@/components/page/register/register" */
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path:"/",
      name:"register",
      component:()=> import("@/components/page/register/register"),
    },
    {
      path: '/home',
      name: 'home',
      component:()=> import("@/components/page/home/home")//首页路由
    },
    {
      path:"/face",
      name:"face",
      component:()=> import("@/components/page/face/face"),
      redirect:"/face/faceCountrl",
      children:[//人脸布控二级路由
        {path:"faceCountrl",name:"faceCountrl",component:()=> import("@/components/page/face/faceCountrl")},
        {path:"picFind",name:"picFind",component:()=> import("@/components/page/face/picFind")},
        {path:"countrlHistory",name:"countrlHistory",component:()=>import("@/components/page/face/countrlHistory")},
        {path:"dealHistory",name:"dealHistory",component:()=>import("@/components/page/face/dealHistory")},
        {path:"realTimeMonitoring",name:"realTimeMonitoring",component:()=>import("@/components/page/face/realTimeMonitoring")}
      ]
    },
    {
      path:"/personInfoDetails",
      name:"personInfoDetails",
      component:()=>import("@/components/page/personInfoDetails")
    },
    {
      path:"/personNumDetail",
      name:"personNumDetail",
      component:()=>import("@/components/page/personNumDetail")
    },
    {
      path:"/carInfoDetial",
      name:"carInfoDetial",
      component:()=>import("@/components/page/carInfoDetial")
    }
  ]
})

export default router