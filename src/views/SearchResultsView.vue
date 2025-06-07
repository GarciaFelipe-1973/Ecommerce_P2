<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Results for "{{ query }}"</h1>

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

    <p v-else class="text-slate-800">No products found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const query = route.query.q || ''
const products = ref([])

onMounted(async () => {
  const res = await axios.get(`https://dummyjson.com/products/search?q=${query}`)
  products.value = res.data.products
})
</script>