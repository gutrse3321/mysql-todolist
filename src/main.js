import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.use(ElementUI)

// 路由导航钩子
// 一定要确保要调用 next() 方法，否则钩子就不会被 resolved
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('todo-token')
  // 如果是跳转到登陆页的
  if (to.path === '/') {
    if (token !== 'null' && token !== null) {
      // 如果有token跳转到todolist
      next('/todolist')
    }
    // 否则跳转回登录页
    next()
  } else {
    if (token !== 'null' && token !== null) {
      // 全局设定header的token验证
      // 为我们用了koa-jwt，所以只需要在每条请求头上加上Authorization属性
      // 但是如果每发一条请求就要手动写一句这个，太累了。于是我们可以做到全局Header设定
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
      // 如果有token就正常转向
      next()
    } else {
      // 否则跳转登录页
      next('/')
    }
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
