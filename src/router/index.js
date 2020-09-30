import Vue from 'vue'
import VueRouter from 'vue-router'
import Category from '../views/Category.vue'
import Product from '../views/Product.vue'
import AddProduct from '../views/AddProduct.vue'
import AddCategory from '../views/AddCategory.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('is_login') === 'true') {
        next('/category')
      } else {
        next()
      }
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('is_login') === 'true') {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('is_login') === 'true') {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/addproduct/:pId',
    name: 'AddProduct',
    component: AddProduct,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('is_login') === 'true') {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/addcategory/:cId',
    name: 'AddCategory',
    component: AddCategory,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('is_login') === 'true') {
        next()
      } else {
        next('/')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
