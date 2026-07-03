import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/venue',
    name: 'venue',
    component: () => import('../views/VenueVR.vue'),
  },
  {
    path: '/hero',
    name: 'hero',
    component: () => import('../views/HeroLesson.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
