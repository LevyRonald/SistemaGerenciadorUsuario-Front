import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue')

  },
  {
    path: '/home',
    name: 'home',
    redirect: {
      name: "inicio"
  },
    component: () => import('../views/home/home.vue'),
    children: [
      {
        path: '/home/inicio',
        name: 'inicio',
        component: () => import('@/components/inicio/inicio.vue')
      },
      {
        path: '/home/tabela',
        name: 'tabela',
        component: () => import('../views/tabela/users.vue')
      },
      {
        path: '/home/cadastro',
        name: 'cadastrar',
        component: () => import('../views/cadastrar/cadastro.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
