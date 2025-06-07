<template>
  <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Search products..." class="border border-gray-300 text-gray-800 px-4 py-2 w-full rounded-full"/>
</template>

<script setup>
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])
</script>
