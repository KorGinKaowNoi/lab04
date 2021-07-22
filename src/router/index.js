import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import About from '../views/About.vue'
import EventLayout from '@/views/event/layout.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventRegister from '@/views/event/Register.vue'
import EventDetails from '@/views/event/details.vue'
import not_found from '@/views/not_found.vue'
import network_error from '@/views/network_error.vue'
const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route)=>({page:parseInt(route.query.page ||1), size: parseInt(route.query.limit) ||2})
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path:'/event/:id',
    name:'EventLayout',
    props:true,
    component:EventLayout,
    children:[{
      path:'',
      name:'EventDetails',
      component:EventDetails
    },
    {
      path:'register',
      name:'EventRegister',
      props:true,
      component:EventRegister
    },
    {
      path:'edit',
      name:'EventEdit',
      component:EventEdit
    }
  ]
  },
  {
    path:'/:catchAll(.*)',
    name:'not_found',
    component: not_found
  },
  {
    path:'/404/:resource',
    name:'404Resource',
    component:not_found,
    props:true
  },
  {
    path:'/network-error',
    name:'network-error',
    component:network_error
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
