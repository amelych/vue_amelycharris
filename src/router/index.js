import PaginaInicio from '@/components/PaginaInicio.vue'
import TablaClientes from '@/components/TablaClientes.vue'
import TablaTareas from '@/components/TablaTareas.vue'
import TablaArticulos from '@/components/TablaArticulos.vue'
import TablaViajes from '@/components/TablaViajes.vue'
import NotFound from '@/components/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: PaginaInicio
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: TablaClientes
  },
  {
    path: '/tareas',
    name: 'tareas',
    component: TablaTareas
  },
  {
    path: '/articulos',
    name: 'articulos',
    component: TablaArticulos
  },
  {
    path: '/viajes',
    name: 'viajes',
    component: TablaViajes
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
