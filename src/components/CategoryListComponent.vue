<template>
  <div class="relative w-full md:w-auto">
    <button
      @click="toggleDropdown"
      class="flex items-center w-full md:w-auto bg-gray-500 px-4 py-2 rounded-full py-3 px-6 border-gray-300">
      <i class="fas fa-bars mr-2"></i>
      {{ selectedCategory || 'Category' }}
      <i class="fas fa-chevron-down ml-2"></i>
    </button>

    <ul
      v-if="dropdownOpen"
      class="absolute z-10 mt-1 bg-gray-500 border border-slate rounded-b-lg shadow w-full md:w-40 max-h-60 overflow-y-auto">
        <li v-for="category in categories" :key="category">
        <router-link
            :to="`/category/${category.name}`"
            class="block px-4 py-2 hover:bg-slate-800 cursor-pointer"
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
