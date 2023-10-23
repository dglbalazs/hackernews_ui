import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: { baseApiUrl: '' , options: null}
    },
    {
      path: '/new',
      name: 'new',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NewView.vue'),
      props: { baseApiUrl: '' , options: null}
    },
    {
      path: '/best',
      name: 'best',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BestView.vue'),
      props: { baseApiUrl: '' , options: null}
    },
    {
      path: '/ask',
      name: 'ask',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AskView.vue'),
      props: { baseApiUrl: '' , options: null}
    },
    {
      path: '/show',
      name: 'show',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ShowView.vue'),
      props: { baseApiUrl: '' , options: null}
    },
    {
      path: '/job',
      name: 'job',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/JobView.vue'),
      props: { baseApiUrl: '' , options: null}
    }
  ]
})

export default router
