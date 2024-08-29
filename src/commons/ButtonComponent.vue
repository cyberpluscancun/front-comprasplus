<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  onClick: {
    type: Function,
    required: false
  },
  icon: {
    type: String,
    required: false
  },
  type: {
    type: String,
    default: 'button'
  },
  customClass: {
    type: String,
    default: ''
  },
  svgSize: {
    type: String,
    default: 'w-4 h-4' // Tamaño por defecto
  }
})

const emits = defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :class="`px-2 py-1 text-xs text-text-white bg-gray rounded-lg font-medium text-center inline-flex items-center ${customClass}`"
    @click="$emit('click')"
  >
    <svg
      v-if="icon"
      :class="`${svgSize} mr-1`"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        :d="icon"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
    <span>{{ label }}</span>
  </button>
</template>

<style scoped></style>
