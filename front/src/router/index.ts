import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import("@/views/Home.vue")
  },
  {
    path: '/redefinir_senha',
    component: () => import("@/views/RedefinirSenha.vue")
  },
  {
    path: '/nova_conta_1',
    component: () => import("@/views/NovaConta1.vue")
  },
  {
    path: '/nova_conta_2',
    component: () => import("@/views/NovaConta2.vue")
  },
  {
    path: '/feed',
    component: () => import("@/views/Feed.vue")
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
