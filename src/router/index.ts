import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ImprintView from '@/views/ImprintView.vue'
import { EIPs, HARDFORKS, TOPICS } from '@/views/structure'

function loadRoutes() {
  // Use Vite's glob imports so production builds can resolve lazy routes
  const eipViews = import.meta.glob('../views/eips/*View.vue')
  const hardforkViews = import.meta.glob('../views/hardforks/*View.vue')
  const topicViews = import.meta.glob('../views/topics/*View.vue')

  const homeRs = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: ImprintView,
    },
  ]

  const eipRs = []
  for (const [name, eip] of Object.entries(EIPs)) {
    eipRs.push({
      path: eip.path,
      name,
      // Lazy-load via statically analyzable glob map
      component: eipViews[`../views/eips/EIP${eip.num}View.vue`],
    })
  }

  const hardforkRs = []
  for (const [name, hardfork] of Object.entries(HARDFORKS)) {
    hardforkRs.push({
      path: hardfork.path,
      name,
      // Lazy-load via statically analyzable glob map
      component: hardforkViews[`../views/hardforks/${hardfork.title}View.vue`],
    })
  }

  const topicRs = []
  for (const [name, topic] of Object.entries(TOPICS)) {
    topicRs.push({
      path: topic.path,
      name,
      // Lazy-load via statically analyzable glob map
      component: topicViews[`../views/topics/${topic.title}View.vue`],
    })
  }

  return [...homeRs, ...eipRs, ...hardforkRs, ...topicRs]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: loadRoutes(),
})

export default router
