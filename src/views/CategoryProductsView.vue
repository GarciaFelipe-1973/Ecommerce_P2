<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-center capitalize">
      Category products: {{ categoryName }}
    </h1>

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

    <!-- Carregando... -->
    <p v-else class="text-center text-gray-500">
      Loading products...<br />
      <!-- From Uiverse.io by devAaus -->
      <div class="flex-col gap-4 w-full flex items-center justify-center mt-4">
        <div class="w-20 h-20 border-4 border-transparent text-blue-800 text-4xl animate-spin flex items-center justify-center border-t-blue-800 rounded-full">
          <div class="w-16 h-16 border-4 border-transparent text-sky-600 text-2xl animate-spin flex items-center justify-center border-t-sky-600 rounded-full">
            <div class="w-12 h-12 border-4 border-transparent text-cyan-400 text-2xl animate-spin flex items-center justify-center border-t-cyan-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </p>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const categoryName = route.params.categoryName
const products = ref([])

const fetchProducts = async () => {
  const res = await axios.get(`https://dummyjson.com/products/category/${route.params.categoryName}`)
  products.value = res.data.products
}

onMounted(fetchProducts)

// Recarrega ao trocar de categoria sem sair da tela
watch(() => route.params.categoryName, fetchProducts)
</script>
