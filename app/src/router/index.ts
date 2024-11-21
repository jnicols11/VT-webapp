import { createRouter, createWebHistory } from 'vue-router'

// Import your components
import Landing from '@/views/LandingView.vue'
import Men from '@/views/MenView.vue'
import Women from '@/views/WomenView.vue'
import Kids from '@/views/KidsView.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import SearchResults from '@/views/SearchResults.vue'
import CartPage from '@/views/CartPage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import ShopView from '@/views/ShopView.vue'
import OrdersPage from '@/views/OrdersPage.vue'
import AboutPage from '@/views/AboutPage.vue'
import AdminProductPage from '@/views/AdminProductPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Landing
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/men',
    name: 'Men',
    component: Men
  },
  {
    path: '/women',
    name: 'Women',
    component: Women
  },
  {
    path: '/kids',
    name: 'Kids',
    component: Kids
  },
  {
    path: '/product/:productId',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopView
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersPage
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminProductPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
