<template>
    <input
    type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @keydown.enter="$emit('submit')"
    placeholder="Search products" class="border border-gray-300 text-gray-500 px-4 py-2 w-full md:w-64 rounded-full py-3 px-6"/>
</template>

<script setup>
defineProps({ modelValue: String })
defineEmits(['update:modelValue'])

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>
