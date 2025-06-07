import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductPageView from '../views/ProductPageView.vue'
import CategoryProductsView from '../views/CategoryProductsView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import ContactView from '../views/ContactView.vue'
import MensCategoryView from '../views/MensCategoryView.vue'
import WomensCategoryView from '../views/WomensCategoryView.vue'
import KartView from '../views/KartView.vue'

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
    {
      path: "/womensCategory",
      name: "womensCategory",
      component: WomensCategoryView,
    },
    {
      path: "/mensCategory",
      name: "mensCategory",
      component: MensCategoryView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/kart",
      name: "kart",
      component: KartView,
    },
  ],
})

export default router