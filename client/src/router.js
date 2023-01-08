import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import PetLover from './views/PetLoverProfile.vue'
import PetOwner from './views/PetOwnerProfile.vue'
import Pets from './views/Pets.vue'
import Services from './views/Services.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Void from './views/Void.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/profile/petlovers/:id',
    name: 'petLover profile',
    component: PetLover
  },
  {
    path: '/profile/petowners/:id',
    name: 'petOwner profile',
    component: PetOwner
  },
  {
    path: '/profile/petowners/:id/pets',
    name: 'pets',
    component: Pets
  },
  {
    path: '/profile/petlovers/:id/services',
    name: 'services',
    component: Services
  },
  {
    path: '/noprofile',
    name: 'void',
    component: Void
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
