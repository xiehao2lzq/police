import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/index';

import propertyManagement from "@/components/propertyManagement"
import propertyManagementHomePage from "@/components/propertyManagement/homePage"
import propertyManagementHouseingInfo from "@/components/propertyManagement/houseingInfo"

import actualPopulation from "@/components/actualPopulation"
import personOrCar from "@/components/actualPopulation/personOrCar/personOrCar"
import personParticularList from "@/components/actualPopulation/particularList/personParticularList"
import CarParticularList from "@/components/actualPopulation/particularList/CarParticularList"
import personRecord from "@/components/actualPopulation/personRecord"


import dataTreating from "@/components/dataTreating"
import perception from "@/components/dataTreating/perception"


import SafetyMonitor from "@/components/SafetyMonitor"
import person from "@/components/SafetyMonitor/person"
import car from "@/components/SafetyMonitor/car"
import bank from "@/components/SafetyMonitor/bank"
import policeRoom from "@/components/SafetyMonitor/policeRoom"


import BigDataAnalysis from "@/components/BigDataAnalysis"
import BigDataAnalysisList from "@/components/BigDataAnalysis/BigDataAnalysisList"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage,
      meta: {
        title: '平安社区智能管控平台'
      }
    },
    {
      path: '/propertyManagement',
      name: 'propertyManagement',
      component: propertyManagement,
      //redirect:"/face/faceCountrl",
      meta: {
        title: '平安社区智能管控平台'
      },
      children:[
        {
          path:"",
          name:"propertyManagementHomePage",
          component:propertyManagementHomePage,
          meta: {
            title: '平安社区智能管控平台'
          }
        },
        {
          path:"houseingInfo",
          name:"propertyManagementHouseingInfo",
          component:propertyManagementHouseingInfo,
          meta: {
            title: '平安社区智能管控平台'
          }
        }
      ]
    },
    {
      path: '/actualPopulation',
      name: 'actualPopulation',
      component: actualPopulation,
      meta: {
        title: '平安社区智能管控平台'
      },
      children:[
        {
          path:"",
          name:"personOrCar",
          component:personOrCar,
          meta: {
            title: '平安社区智能管控平台'
          }
        },
        {
          path:"personParticularList/:id?",
          name:"personParticularList",
          component:personParticularList,
          meta: {
            title: '平安社区智能管控平台'
          }
        },
        {
          path:"CarParticularList",
          name:"CarParticularList",
          component:CarParticularList,
          meta: {
            title: '平安社区智能管控平台'
          }
        },
        {
          path:"personRecord",
          name:"personRecord",
          component:personRecord,
          meta: {
            title: '平安社区智能管控平台'
          }
        }
      ]
    },
    {
      path: '/dataTreating',
      name: 'dataTreating',
      component: dataTreating,
      redirect:"/dataTreating/perception",
      meta: {
        title: '平安社区智能管控平台'
      },
      children:[
        {
          path:"perception",
          name:"perception",
          component:perception,
          meta: {
            title: '平安社区智能管控平台'
          }
        }
      ]
    },
    {
      path: '/SafetyMonitor',
      name: 'SafetyMonitor',
      component: SafetyMonitor,
      meta: {
        title: '平安社区智能管控平台'
      },
      children:[
        {
          path: '',
          name: 'person',
          component: person,
          meta: {
            title: '平安社区智能管控平台'
          },
        },
        {
          path: 'car',
          name: 'car',
          component: car,
          meta: {
            title: '平安社区智能管控平台'
          },
        },
        {
          path: 'bank',
          name: 'bank',
          component: bank,
          meta: {
            title: '平安社区智能管控平台'
          },
        },
        {
          path: 'policeRoom',
          name: 'policeRoom',
          component: policeRoom,
          meta: {
            title: '平安社区智能管控平台'
          }
        }
      ]
    },
    {
      path: '/BigDataAnalysis',
      name: 'BigDataAnalysis',
      component: BigDataAnalysis,
      meta: {
        title: '平安社区智能管控平台'
      },
      children:[
        {
          path: '',
          name: 'BigDataAnalysisList',
          component: BigDataAnalysisList,
          meta: {
            title: '平安社区智能管控平台'
          }
        }
      ]
    }
  ]
})
