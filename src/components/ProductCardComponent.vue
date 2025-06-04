<template>
  <router-link :to="`/productPage/${product.id}`" class="block">
    <div class="rounded-lg p-4 text-black shadow-md bg-gray-200 hover:bg-gray-300 hover:shadow-xl">
      <img :src="product.thumbnail" :alt="product.name" class="mx-auto mb-2 h-20" >
      <h2 class="text-right capitalize font-bold">{{ product.title }}</h2>
      <p class="text-right font-bold mt-2">$ {{ product.price }}</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
    product: Object
})
</script>