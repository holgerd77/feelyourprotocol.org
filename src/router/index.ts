import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { EIPs } from '@/views/structure'

function loadRoutes() {
  const homeRs = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ]

  const eipRs = []

  for (const [name, eip] of Object.entries(EIPs)) {
    eipRs.push({
      path: eip.path,
      name,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/eips/EIP' + eip.num + 'View.vue'),
    })
  }

  const hardforkRs = [
    {
      path: '/fusaka',
      name: 'fusaka',
      component: () => import('../views/FusakaView.vue'),
    },
  ]

  return [...homeRs, ...eipRs, ...hardforkRs]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: loadRoutes(),
})

export default router
