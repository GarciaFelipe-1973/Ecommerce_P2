<template>
  <section class="max-w-5xl mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold text-center text-sky-700 mb-10">Contact us</h2>
      <!-- Formulário de sugestões -->
      <form class="bg-stone-400 p-8 rounded-xl shadow-md max-w-lg mx-auto space-y-6">
        <h3 class="text-2xl font-semibold mb-4 text-center text-gray-800">How can we help you?</h3>

        <input
          type="text"
          placeholder="Your name"
          class="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"/>

        <input
          type="email"
          placeholder="Your email"
          class="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"/>

        <textarea
          placeholder="Your suggestion or message"
          rows="5"
          class="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 resize-none"></textarea>

        <button
          type="submit"
          class="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-3 rounded-md transition-colors duration-300">
          Send
        </button>
      </form>
  </section>
</template>