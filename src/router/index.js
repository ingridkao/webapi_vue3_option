import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReqresView from '../views/ReqresView.vue'
import CRUDView from '../views/CRUDView.vue'
import TdxView from '../views/TdxView.vue'
import WeatherView from '../views/WeatherView.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/reqres',
    name: 'Reqres',
    component: ReqresView
  },
  {
    path: '/crud',
    name: 'CRUD',
    component: CRUDView
  },
  {
    path: '/tdx',
    name: 'TDX-Bike',
    component: TdxView
  },
  {
    path: '/weather',
    name: 'Weather',
    component: WeatherView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
