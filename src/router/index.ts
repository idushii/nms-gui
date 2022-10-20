import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from "@/views/ProductsView.vue";
import RepairShipView from "@/views/RepairShipView.vue";
import StationsView from "@/views/StationsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
  },
  {
    path: '/repair-ship',
    name: 'repairShip',
    component: RepairShipView,
  },
  {
    path: '/stations',
    name: 'stations',
    component: StationsView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
