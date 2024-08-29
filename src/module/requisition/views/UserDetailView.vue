<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import UserDetailComponent from '@/module/requisition/components/UserDetailComponent.vue'

const route = useRoute()
const id = ref(route.params.id || '')

watch(
  () => route.params.id,
  (newId) => {
    id.value = newId
  }
)
</script>

<template>
  <UserDetailComponent :id="id" />
</template>

<style scoped></style>
