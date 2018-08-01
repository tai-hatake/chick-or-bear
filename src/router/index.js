import Vue from 'vue'
import Vuetify from 'vuetify'
import Router from 'vue-router'
import Main from '@/components/Main'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
