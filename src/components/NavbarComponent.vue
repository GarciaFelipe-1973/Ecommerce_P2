<template>
  <nav class="bg-slate-900 text-white px-6 py-8">
    <div class="container mx-auto flex flex-col gap-8">

      <!-- Logo + Busca + Menu -->
      <div class="w-full flex flex-col md:flex-row items-center justify-between gap-6">
        
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 shrink-0" @click="closeMenu">
          <img src="/public/images/logo-niviter.png" alt="Logo-Niviter" class="h-12 w-auto" />
          <span class="text-2xl font-bold">Niviter</span>
        </router-link>

        <!-- Barra de busca -->
        <div class="relative w-full md:max-w-2xl">
          <SearchBarComponent v-model="searchQuery" @submit="goToSearchPage" />

          <!-- Sugestões -->
          <ul v-if="searchResults.length && searchQuery"
            class="absolute z-50 mt-1 w-full bg-white text-slate-800 border rounded shadow max-h-80 overflow-y-auto">
            <li v-for="product in searchResults.slice(0, 5)" :key="product.id"
              class="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="goToProduct(product.id)">
              <img :src="product.thumbnail" :alt="product.title" class="w-10 h-10 object-cover rounded"/>
              <span class="truncate">{{ product.title }}</span>
            </li>
          </ul>
        </div>

        <!-- Menu (mobile) -->
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-white text-2xl">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      <!-- Categoria + Links adicionais -->
      <div
        class="w-full flex-col md:flex md:flex-row justify-center items-center gap-6"
        :class="{ 'flex': showMenu || isDesktop, 'hidden': !showMenu && !isDesktop }">
        <!-- Dropdown de categoria -->
        <div class="bg-slate-800 px-4 py-2 rounded-md">
          <CategoryListComponent @select-category="handleCategorySelectAndClose" />
        </div>

        <!-- Categoria Feminina -->
        <router-link to="/womensCategory" @click="closeMenu">
          <button class="hover:text-slate-400">Womens</button>
        </router-link>

        <!-- Categoria Masculina -->
        <router-link to="/mensCategory" @click="closeMenu">
          <button class="hover:text-slate-400">Mens</button>
        </router-link>

        <!-- Contato -->
        <router-link to="/contact" @click="closeMenu">
          <button class="hover:text-slate-400">Contact</button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import CategoryListComponent from '../components/CategoryListComponent.vue'
import SearchBarComponent from '../components/SearchBarComponent.vue'

const router = useRouter()

const searchQuery = ref('')
const searchResults = ref([])
const showMenu = ref(false)
const isDesktop = ref(window.innerWidth >= 768)

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function closeMenu() {
  showMenu.value = false
}

function handleCategorySelectAndClose(category) {
  handleCategorySelect(category)
  closeMenu()
}

function handleResize() {
  isDesktop.value = window.innerWidth >= 768
  if (isDesktop.value) {
    showMenu.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Busca em tempo real
watch(searchQuery, async (newQuery) => {
  if (!newQuery.trim()) {
    searchResults.value = []
    return
  }

  try {
    const res = await axios.get(`https://dummyjson.com/products/search?q=${newQuery}`)
    searchResults.value = res.data.products
  } catch (error) {
    console.error('Erro na busca:', error)
    searchResults.value = []
  }
})

const goToProduct = (id) => {
  searchResults.value = []
  searchQuery.value = ''
  closeMenu()
  router.push({ name: 'productPage', params: { id } })
}

const goToSearchPage = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'searchPage', query: { q: searchQuery.value } })
    searchQuery.value = ''
    searchResults.value = []
    closeMenu()
  }
}

const handleCategorySelect = (category) => {
  console.log('Categoria selecionada:', category)
}
</script>
