import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import ('components/Login.vue')
const Home = () => import ('components/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 1.挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // next() 是一个函数 表示放行
  // next() 放行 next('/login')  强制跳转
  if (to.path === '/login') return next()
  // 获取token
  let tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
