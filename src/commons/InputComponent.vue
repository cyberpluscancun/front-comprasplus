<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  id: {
    type: String,
    required: false
  },
  customClass: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false // El input está desactivado por defecto
  }
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <input
    :id="id"
    :type="type"
    :class="`bg-gray-50 h-[2rem] w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${customClass}`"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="props.disabled"
    @input="updateValue"
  />
</template>
