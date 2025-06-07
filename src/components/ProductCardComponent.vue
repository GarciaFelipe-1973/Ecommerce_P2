<template>
  <router-link :to="`/productPage/${product.id}`" class="block">
    <div class="rounded-lg bg-white border shadow hover:shadow-lg transition p-4">
      <div class="overflow-hidden rounded-md mb-2">
        <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"/>
      </div>
      <h2 class="text-lg font-bold mb-1 truncate">{{ product.title }}</h2>
      <p class="text-sm text-gray-600 line-clamp-2">{{ product.description }}</p>
      <p class="mt-2 font-semibold text-green-700">$ {{ product.price }}</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
    product: Object
})
</script>