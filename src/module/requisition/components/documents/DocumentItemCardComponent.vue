<script setup>
import { defineProps } from 'vue'

// Define props
const props = defineProps({
  Quantity: Number,
  Description: String,
  Comments: String
})
</script>

<template>
  {{ props.Quantity }}
  {{ props.Description }}
  {{ props.Comments }}
</template>

<style scoped>
/* Estilos por defecto (para resoluciones más grandes) */

/* Media query para dispositivos móviles */
@media (max-width: 720px) {
  #item-card-view {
    padding: 1rem;
    /* Ajusta el alto de la tarjeta cuando se expanda */
    height: auto;
    /* Estilo del fondo */
  }

  /* Ajuste de los elementos dentro del formulario */
  form {
    padding: 1rem;
  }

  /* Ajuste de inputs */
  input {
    width: 50%;
    height: 2.5rem; /* Aumentar el tamaño de los inputs */
  }

  /* Ajuste de botones */
  .button-group {
    button {
      height: 2rem;
    }

    input {
      width: 10rem;
      height: 2rem;
    }
  }
}
</style>
