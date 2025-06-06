import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductPageView from '../views/ProductPageView.vue'
import CategoryProductsView from '../views/CategoryProductsView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/productPage/:id',
      name: 'productPage',
      component: ProductPageView,
    },
    {
      path: '/category/:categoryName',
      name: 'categoryPage',
      component: CategoryProductsView,
    },
    {
      path: '/search',
      name: 'searchPage',
      component: SearchResultsView,
    },
  ],
})

export default router
