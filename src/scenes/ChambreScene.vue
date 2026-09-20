<script setup>
/* PLAN 4 — la chambre, en grand. Le décor lui-même est dans ChambreDecor,
   partagé avec le plan « fenêtre » : c'est ce qui garantit qu'on n'a jamais
   deux écrans à l'image. */
import ChambreDecor from './ChambreDecor.vue'
</script>

<template>
  <svg class="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <ChambreDecor suffixe="piece" />
  </svg>
</template>

<style scoped>
.scene {
  width: 100%;
  height: 100%;
}
</style>
