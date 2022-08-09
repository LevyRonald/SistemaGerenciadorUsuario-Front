import provedor from '@/provedor'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      publica: true
    }

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
        path: '/home/editar',
        name: 'edit-user',
        component: () => import('@/components/editarUsuario/editar-usuario.vue')
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
      {
        path: '/home/editar/:id',
        name: 'editar-usuario',
        component: () => import('../components/editarUsuario/editar-usuario.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((routeTo, routeFrom, next) =>{
  if(!routeTo.meta.publica && !provedor.state.token){
    return routeTo == '/' ? next() : next({
      path: '/'
    });
  }
  next();
})

export default router
