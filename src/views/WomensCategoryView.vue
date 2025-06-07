<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center">Women's Categories</h1>

    <!-- Categorias -->
    <div class="flex flex-wrap gap-4 justify-center mb-6">
      <button
        v-for="cat in womensCategories"
        :key="cat"
        @click="selectCategory(cat)"
        :class="[
          'px-4 py-2 rounded-full border',
          selectedCategory === cat ? 'bg-cyan-900 text-white' : 'bg-white transition-colors duration-700 text-gray-700'
        ]"
      >
        {{ formatCategory(cat) }}
      </button>
    </div>

    <!-- Lista de produtos -->
    <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <router-link v-for="product in products" :key="product.id" :to="`/productPage/${product.id}`"
            class="block bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            <div class="aspect-[3/3] flex flex-col">
            <!-- Imagem com zoom -->
            <div class="overflow-hidden">
                <img :src="product.thumbnail" :alt="product.title"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"/>
            </div>
            </div>
            <div class="p-4">
                <h2 class="text-lg font-bold mb-1 truncate">{{ product.title }}</h2>
                <p class="text-sm text-gray-600 line-clamp-2">{{ product.description }}</p>
                <p class="mt-2 font-semibold text-green-700">$ {{ product.price }}</p>
            </div>
        </router-link>
    </div>

    <div v-else-if="selectedCategory" class="text-center text-gray-500">Loading products...<br>
        <!-- From Uiverse.io by devAaus --> 
        <div class="flex-col gap-4 w-full flex items-center justify-center">
          <div class="w-20 h-20 border-4 border-transparent text-slate-800 text-4xl animate-spin flex items-center justify-center border-t-slate-800 rounded-full">
              <div class="w-16 h-16 border-4 border-transparent text-sky-600 text-2xl animate-spin flex items-center justify-center border-t-sky-600 rounded-full">
                <div class="w-12 h-12 border-4 border-transparent text-cyan-400 text-2xl animate-spin flex items-center justify-center border-t-cyan-400 rounded-full"></div>
              </div>
          </div>
        </div>
      </div><br>

    <!-- Paginação -->
    <div v-if="selectedCategory" class="flex justify-center gap-4">
      <button @click="previousPage" :disabled="skip === 0" class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
        Anterior
      </button>
      <button @click="nextPage" class="px-4 py-2 bg-gray-200 rounded">
        Próximo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const womensCategories = ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches']
const selectedCategory = ref('')
const products = ref([])
const limit = 6
const skip = ref(0)

const formatCategory = (slug) =>
  slug.replace('womens-', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const fetchProducts = async () => {
  const res = await axios.get(
    `https://dummyjson.com/products/category/${selectedCategory.value}?limit=${limit}&skip=${skip.value}`
  )
  products.value = res.data.products
}

const selectCategory = (cat) => {
  selectedCategory.value = cat
  skip.value = 0
  fetchProducts()
}

const nextPage = () => {
  skip.value += limit
  fetchProducts()
}

const previousPage = () => {
  if (skip.value >= limit) {
    skip.value -= limit
    fetchProducts()
  }
}

onMounted(() => {
  if (womensCategories.length) {
    selectCategory(womensCategories[0])
    fetchProducts()
  }
})
</script>
