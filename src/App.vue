<script setup>
import Navbar from './components/NavbarComponent.vue'
import Footer from './components/FooterComponent.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-300">
    <Navbar/>
    <main class="flex-grow container mx-auto px-4 py-6">
      <router-view></router-view>
    </main>
    <Footer/>
  </div>
</template>