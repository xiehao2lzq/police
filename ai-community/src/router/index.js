import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import indeedHouse from '@/components/indeedHouse'
import indeedPeopleNum from '@/components/indeedPeopleNum'
import indeedCar from '@/components/indeedCar'
import indeedDevice from '@/components/indeedDevice'
import attentionPeople from '@/components/attentionPeople'
import nameSearch from '@/components/nameSearch'
import picSearch from '@/components/picSearch'
import history from '@/components/history'
import Setting from '@/components/Setting'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/indeedHouse',
      name: 'indeedHouse',
      component: indeedHouse
    },
    {
      path: '/indeedPeopleNum',
      name: 'indeedPeopleNum',
      component: indeedPeopleNum
    },
    {
      path: '/indeedCar',
      name: 'indeedCar',
      component: indeedCar
    },
    {
      path: '/indeedDevice',
      name: 'indeedDevice',
      component: indeedDevice
    },
    {
      path: '/attentionPeople',
      name: 'attentionPeople',
      component: attentionPeople
    },
    {
      path: '/nameSearch',
      name: 'nameSearch',
      component: nameSearch
    },
    {
      path: '/picSearch',
      name: 'picSearch',
      component: picSearch
    },
    {
      path: '/history',
      name: 'history',
      component: history
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    },
  ]
})
