<template>
  <nav class="bg-slate-900 text-slate-300 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <!-- Logo -->
    <router-link to="/">
      <div class="flex items-center gap-2">
        <img src="/public/images/logo-niviter.png" alt="Logo-Niviter" class="h-12 w-auto" />
        <span class="text-xl font-bold">Niviter</span>
      </div>
    </router-link>

    <!-- Busca e Categorias -->
    <div class="flex flex-col md:flex-row gap-2 md:items-center w-full max-w-xl">
      <CategoryListComponent @select-category="handleCategorySelect" />
      <SearchBarComponent v-model="searchQuery" @submit="goToSearchPage" />


      <ul v-if="searchResults.length && searchQuery" class="bg-white text-slate-800 border rounded shadow mt-1 w-full md:w-64 absolute z-50">
        <li v-for="product in searchResults.slice(0, 5)" :key="product.id" class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="goToProduct(product.id)">
          {{ product.title }}
        </li>
      </ul>
    </div>

    <!-- Contato -->
    <div class="flex items-center gap-4 text-sm text-blue-900">
      <i class="fas fa-phone"></i>
      <a href="tel:+15555551234">(555) 555-1234</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import CategoryListComponent from '../components/CategoryListComponent.vue'
import SearchBarComponent from '../components/SearchBarComponent.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goToProduct = (id) => {
  searchResults.value = []
  searchQuery.value = ''
  router.push({ name: 'productPage', params: { id } })
}

const goToSearchPage = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'searchPage', query: { q: searchQuery.value } })
    searchQuery.value = ''
    searchResults.value = []
  }
}

const searchQuery = ref('')
const searchResults = ref([])

watch(searchQuery, async (newQuery) => {
  if (!newQuery) {
    searchResults.value = []
    return
  }
  try {
    const res = await axios.get(`https://dummyjson.com/products/search?q=${newQuery}`)
    searchResults.value = res.data.products
    console.log('Resultados da busca:', searchResults.value)
  } catch (error) {
    console.error('Erro na busca:', error)
    searchResults.value = []
  }
})

const handleCategorySelect = (category) => {
  console.log('Categoria selecionada:', category)
}
</script>
