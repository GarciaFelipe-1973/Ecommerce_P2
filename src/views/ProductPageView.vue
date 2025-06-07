<template>
  <div class="p-6 max-w-5xl mx-auto space-y-12 bg-white rounded">
    <!-- Produto -->
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Imagem com zoom -->
      <div class="overflow-hidden rounded-lg">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <!-- Detalhes -->
      <div class="space-y-4">

        <!-- Título -->
        <h1 class="text-3xl font-semibold text-gray-800">{{ product.title }}</h1>

        <!-- Avaliação + estoque -->
        <div class="flex items-center gap-4 text-sm text-gray-500">
          <span><i class="fa-regular fa-star" style="color: #ffb61a;"></i> {{ product.rating }}</span>
          <span>{{ product.stock }} available</span>
          <span class="capitalize">Category: {{ product.category }}</span>
        </div>

        <!-- Preço + desconto -->
        <div class="flex items-baseline gap-3">
          <p class="text-4xl font-bold text-green-700">${{ product.price }}</p>
          <span class="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
            -{{ product.discountPercentage }}% OFF
          </span>
        </div>

        <!-- Descrição -->
        <p class="text-gray-700 text-base leading-relaxed">{{ product.description }}</p>

        <!-- Botões -->
        <div class="flex flex-col md:flex-row gap-4">
          <button
            class="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded shadow transition">
            Buy now
          </button>

          <button
            @click="addToCart"
            class="flex-1 md:flex-none bg-sky-200 hover:bg-blue-300 text-sky-800 font-semibold px-8 py-3 rounded shadow transition flex items-center justify-center gap-2">
            <i class="fa-solid fa-cart-shopping"></i>
            Add to cart
          </button>
        </div>
        
        <!-- Mensagem de confirmação -->
        <div v-if="showAddedMessage" class="mt-2 text-green-600 font-medium flex items-center gap-2">
          <i class="fa-solid fa-circle-check"></i> Produto adicionado ao carrinho!
        </div>
      </div>
    </div>

    <!-- Comentários  -->
    <div v-if="product?.reviews?.length" class="space-y-4">
      <h2 class="text-xl font-bold border-b pb-2">User Reviews</h2>
      <div v-for="review in product.reviews" :key="review.reviewerEmail" class="bg-gray-100 p-4 rounded shadow">
        <p class="font-semibold text-gray-800 mb-1">{{ review.reviewerName }}</p>
        <p class="text-sm text-gray-600 italic">"{{ review.comment }}"</p>
        <p class="text-yellow-600 text-sm mt-1">Rating: {{ review.rating }}</p>
      </div>
    </div>

    <p v-else class="text-center text-gray-500 mt-10">Loading reviews product...
        <!-- From Uiverse.io by devAaus --> 
        <div class="flex-col gap-4 w-full flex items-center justify-center">
          <div class="w-20 h-20 border-4 border-transparent text-blue-800 text-4xl animate-spin flex items-center justify-center border-t-blue-800 rounded-full">
              <div class="w-16 h-16 border-4 border-transparent text-sky-600 text-2xl animate-spin flex items-center justify-center border-t-sky-600 rounded-full">
                <div class="w-12 h-12 border-4 border-transparent text-cyan-400 text-2xl animate-spin flex items-center justify-center border-t-cyan-400 rounded-full"></div>
              </div>
          </div>
        </div>
    </p><br>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const product = ref(null)
const showAddedMessage = ref(false)

const fetchProduct = async () => {
  const id = route.params.id
  const res = await axios.get(`https://dummyjson.com/products/${id}`)
  product.value = res.data
}

const addToCart = () => {
  // Adicionar o produto ao carrinho global
  proxy.$cart.addItem(product.value)
  
  // Mostrar mensagem de confirmação
  showAddedMessage.value = true
  
  // Esconder a mensagem após 3 segundos
  setTimeout(() => {
    showAddedMessage.value = false
  }, 3000)
}

onMounted(fetchProduct)
</script>

