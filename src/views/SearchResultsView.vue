<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Results for "{{ query }}"</h1>

    <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <router-link v-for="product in products" :key="product.id" :to="`/productPage/${product.id}`">
            <div v-for="product in products" :key="product.id" class="border p-4 rounded-lg shadow bg-gray-200 hover:bg-gray-300">
                <img :src="product.thumbnail" :alt="product.title" class="h-40 w-full object-cover mb-2">
                <h2 class="font-semibold">{{ product.title }}</h2>
                <p class="text-slate-800 text-sm">{{ product.description }}</p>
                <p class="font-bold mt-2">$ {{ product.price }}</p>
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