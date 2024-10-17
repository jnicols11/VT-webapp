import { createRouter, createWebHistory } from 'vue-router'

// Import your components
import Home from '@/views/LandingView.vue'
import Men from '@/views/MenView.vue'
import Women from '@/views/WomenView.vue'
import Kids from '@/views/KidsView.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import SearchResults from '@/views/SearchResults.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/men',
    name: 'Men',
    component: Men,
  },
  {
    path: '/women',
    name: 'Women',
    component: Women,
  },
  {
    path: '/kids',
    name: 'Kids',
    component: Kids,
  },
  {
    path: '/product/:productId',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router