import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
      meta:{
        isShow:false
      },
      beforeEnter:(to,from,next)=>{
        if(store.state.token ==''){
          next()
        }else{
          next({path:'/home'})
        }
      }
    },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      isShow:true
    },
    beforeEnter:(to,from,next)=>{
      if(store.state.token==''){
        next("/")
      }else{
        next()
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      isShow:true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Mine.vue'),
    meta:{
      isShow:true
    }
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/submit',
    name: 'Submit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Submit.vue'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/addsite',
    name: 'Addsite',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Addsite.vue'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/savesite',
    name: 'Savesite',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Savesite.vue'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/payment',
    name: 'Payment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Payment.vue'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/money',
    name: 'Money',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Money.vue'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/seek',
    name: 'Seek',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Seek.vue'),
    meta:{
      isShow:false
    }
  },
  {
    path: '/quit',
    name: 'Quit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Quit.vue'),
    meta:{
      isShow:false
    }
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
