import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import Login from '@/components/login'
import chat from '@/components/chat'
import AI from '@/components/AI'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/AI',
      name: 'AI',
      component: AI
    }
  ]
})
