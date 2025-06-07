<template>
  <div class="relative w-full md:w-auto">
    <!-- Botão -->
    <button @click="toggleDropdown" class="hover:text-slate-400"> {{ selectedCategory || 'Category' }}
      <i class="fa-solid fa-chevron-down"></i>
    </button>

    <!-- Dropdown -->
    <ul
      v-if="dropdownOpen"
      class="absolute z-10 mt-1 left-1/2 -translate-x-1/2 bg-slate-300 border border-slate-400 rounded-lg shadow 
         w-64 md:w-40 max-h-60 overflow-y-auto transition">
      <li v-for="category in categories" :key="category">
        <router-link :to="`/category/${category.name}`"
          class="block px-4 py-2 hover:bg-slate-400 text-cyan-900 cursor-pointer capitalize transition"
          @click="dropdownOpen = false">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'


const categories = ref([])
const selectedCategory = (ref(''))
const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

onMounted(async () => {
  const res = await axios.get('https://dummyjson.com/products/categories')
  console.log('Category:', res.data)
  categories.value = res.data
})
</script>
