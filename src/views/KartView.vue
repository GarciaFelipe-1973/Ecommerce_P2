<template>
  <div class="p-6 max-w-5xl mx-auto space-y-8 bg-white rounded">
    <h1 class="text-3xl font-bold text-gray-800 border-b pb-4">Meu Carrinho</h1>
    
    <!-- Carrinho vazio -->
    <div v-if="!cartItems.length" class="text-center py-12">
      <div class="text-6xl text-gray-300 mb-4">
        <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <h2 class="text-2xl font-semibold text-gray-500 mb-4">Seu carrinho está vazio</h2>
      <p class="text-gray-500 mb-6">Adicione produtos ao seu carrinho para continuar comprando.</p>
      <router-link to="/" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow transition">
        Continuar comprando
      </router-link>
    </div>
    
    <!-- Lista de produtos no carrinho -->
    <div v-else class="space-y-6">
      <!-- Cabeçalho da tabela -->
      <div class="hidden md:grid grid-cols-12 gap-4 font-semibold text-gray-600 pb-2 border-b">
        <div class="col-span-5">Produto</div>
        <div class="col-span-2 text-center">Preço</div>
        <div class="col-span-2 text-center">Quantidade</div>
        <div class="col-span-2 text-center">Subtotal</div>
        <div class="col-span-1 text-center">Ações</div>
      </div>
      
      <!-- Itens do carrinho -->
      <div v-for="item in cartItems" :key="item.id" class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b">
        <!-- Produto (imagem + título) -->
        <div class="col-span-1 md:col-span-5 flex items-center gap-4">
          <img :src="item.thumbnail" :alt="item.title" class="w-20 h-20 object-cover rounded" />
          <div>
            <h3 class="font-medium text-gray-800">{{ item.title }}</h3>
            <p class="text-sm text-gray-500">{{ item.brand }}</p>
          </div>
        </div>
        
        <!-- Preço -->
        <div class="col-span-1 md:col-span-2 text-center">
          <span class="md:hidden font-medium text-gray-600">Preço: </span>
          <span class="font-medium text-gray-800">${{ item.price.toFixed(2) }}</span>
        </div>
        
        <!-- Quantidade -->
        <div class="col-span-1 md:col-span-2 text-center">
          <span class="md:hidden font-medium text-gray-600">Quantidade: </span>
          <span class="font-medium text-gray-800">{{ item.quantity }}</span>
        </div>
        
        <!-- Subtotal -->
        <div class="col-span-1 md:col-span-2 text-center">
          <span class="md:hidden font-medium text-gray-600">Subtotal: </span>
          <span class="font-medium text-gray-800">${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
        
        <!-- Botão remover -->
        <div class="col-span-1 md:col-span-1 text-center">
          <button 
            @click="removeFromCart(item.id)" 
            class="text-red-500 hover:text-red-700 transition-colors"
            title="Remover item">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      
      <!-- Resumo do carrinho -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center pt-4">
        <router-link to="/" class="mb-4 md:mb-0 text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <i class="fa-solid fa-arrow-left"></i>
          Continuar comprando
        </router-link>
        
        <div class="bg-gray-100 p-4 rounded w-full md:w-auto">
          <div class="flex justify-between gap-8 font-medium text-gray-800">
            <span>Total:</span>
            <span class="text-xl">${{ totalPrice.toFixed(2) }}</span>
          </div>
          <button class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow transition">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onMounted } from 'vue'

const { proxy } = getCurrentInstance()

// Referência aos itens do carrinho
const cartItems = computed(() => {
  return proxy.$cart.items
})

// Cálculo do preço total
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

// Função para remover item do carrinho
const removeFromCart = (productId) => {
  proxy.$cart.removeItem(productId)
}

// Atualizar a visualização quando o componente for montado
onMounted(() => {
  // Garantir que os dados do carrinho estão carregados do localStorage
  proxy.$cart.loadFromLocalStorage()
})
</script>

