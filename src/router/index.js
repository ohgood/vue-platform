import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/pages/index.vue'
import Detail from '@/components/pages/detail.vue'
import OrderList from '@/components/pages/orderList.vue'
import Product from '@/components/detailComponents/product.vue'
import BookList from '@/components/bookList/imageList.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Index},
  {path: '/book/java', component: BookList},
  {path: '/orderList', component: OrderList},
  {
    path: '/detail',
    component: Detail,
    redirect: '/detail/pro',
    children: [
      {
        path: 'pro',
        component: Product
      }
    ]
  }
]

const router = new VueRouter({
  routes: routes
})

export default router
