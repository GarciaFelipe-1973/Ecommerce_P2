<template>
  <footer class="bg-gray-900 text-white py-6 mt-10">
    <div class="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
      <!-- Texto de direitos -->
      <p class="text-sm">
        &copy; {{ new Date().getFullYear() }} José Vitor & Felipe Garcia. All rights reserved.
      </p>

      <!-- Links para perfis -->
      <div class="flex flex-col md:flex-row items-center gap-2 text-sm">
        <a href="https://github.com/ZezoDebug" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
          José Vitor
        </a>
        <span class="hidden md:inline">|</span>
        <a href="https://github.com/GarciaFelipe-1973" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
          Felipe Garcia
        </a>
      </div>
    </div>
  </footer>
</template>