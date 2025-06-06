<template>
  <div class="p-6 max-w-5xl mx-auto">
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <img :src="product.thumbnail" :alt="product.title" class="w-full rounded shadow" />

      <div>
        <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
        <p class="text-gray-700 mb-4">{{ product.description }}</p>
        <p class="text-2xl font-bold text-green-700 mb-2">$ {{ product.price }}</p>
        <p class="text-sm text-gray-500 mb-6">Category: {{ product.category }}</p>

        <button class="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded shadow">
          Buy
        </button>
      </div>
    </div>

    <p v-else class="text-center text-gray-500 mt-10">Loading product...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const product = ref(null)

const fetchProduct = async () => {
  const id = route.params.id
  const res = await axios.get(`https://dummyjson.com/products/${id}`)
  product.value = res.data
}

onMounted(fetchProduct)
</script>
