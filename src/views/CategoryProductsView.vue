<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 capitalize">
      Category products: {{ categoryName }}
    </h1>

    <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <router-link v-for="product in products" :key="product.id" :to="`/productPage/${product.id}`"
        class="border p-4 rounded-lg shadow hover:shadow-lg transition block text-black bg-gray-200 hover:bg-gray-300">
        <img :src="product.thumbnail" :alt="product.title" class="h-40 w-full object-cover rounded mb-2" />
        <h2 class="font-semibold">{{ product.title }}</h2>
        <p class="text-gray-700 text-sm">{{ product.description }}</p>
        <p class="font-bold mt-2">$ {{ product.price }}</p>
      </router-link>
    </div>

    <p v-else>
        <!-- From Uiverse.io by devAaus --> 
        <div class="flex-col gap-4 w-full flex items-center justify-center">
        <div
            class="w-20 h-20 border-4 border-transparent text-blue-800 text-4xl animate-spin flex items-center justify-center border-t-blue-800 rounded-full">
            <div
            class="w-16 h-16 border-4 border-transparent text-sky-400 text-2xl animate-spin flex items-center justify-center border-t-sky-400 rounded-full"></div>
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
