<template>
  <div class="p-6 space-y-10">
    <section v-for="(products, category) in carousels" :key="category">
      <h2 class="text-2xl font-bold mb-4 capitalize">{{ category }}</h2>

      <div class="relative">
        <!-- Botão Esquerda -->
        <button @click="scrollLeft(category)" class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100">
        <i class="fa-solid fa-chevron-left"></i>
        </button>

        <!-- Carrossel de produtos -->
        <div class="flex overflow-x-auto scroll-smooth scrollbar-hide gap-4 px-10" :ref="el => carouselsRef[category] = el">
          <ProductCard v-for="product in products" :key="product.id" :product="product" class="min-w-[250px] max-w-[250px] flex-shrink-0"/>
        </div>

        <!-- Botão Direita -->
        <button @click="scrollRight(category)" class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100">
        <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCardComponent.vue'

const selectedCategories = ['smartphones', 'fragrances']
const carousels = ref({})
const carouselsRef = {}

const fetchCategory = async (category) => {
  const res = await axios.get(`https://dummyjson.com/products/category/${category}`)
  carousels.value[category] = res.data.products
}

const scrollLeft = (category) => {
  carouselsRef[category]?.scrollBy({ left: -300, behavior: 'smooth' })
}

const scrollRight = (category) => {
  carouselsRef[category]?.scrollBy({ left: 300, behavior: 'smooth' })
}

onMounted(() => {
  selectedCategories.forEach(fetchCategory)
})
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
