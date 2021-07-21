// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'

// 不需要暴露任何数据，只需要加載就可以
import './mock/mockServer'   
/* eslint-disable no-new */
//注册全局组件标签
Vue.component(Button.name, Button) //<mt-button></mt-button>
new Vue({
  el: '#app',
  render: h => h(App),
  router,  //使用vue-router
  store   //使用vuex
})
