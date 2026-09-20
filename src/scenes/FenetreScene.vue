<script setup>
/* PLAN 3 — la fenêtre de près.
   --------------------------------------------------------------------------
   Ce qu'on voit derrière la vitre n'est pas un décor à part : c'est LA
   chambre (ChambreDecor), la même qu'au plan suivant, dessinée en petit au
   centre. Son échelle n'est pas choisie à l'œil : elle est calculée pour
   qu'au moment où les deux plans se croisent en fondu, la chambre de la
   vitre et la chambre en grand aient exactement la même taille. Les deux
   images se superposent, et on ne voit jamais deux écrans.

   Du coup, la vitre montre logiquement une pièce plus petite que l'ouverture
   de la fenêtre : c'est ce qu'on voit en vrai, puisque la pièce est derrière.
   ========================================================================== */
import { computed } from 'vue'
import { scenes } from '../data/scene'
import ChambreDecor from './ChambreDecor.vue'

const fenetre = scenes.find((s) => s.nom === 'fenetre')
const chambre = scenes.find((s) => s.nom === 'chambre')

// milieu du fondu croisé entre les deux plans
const croisement = (chambre.debut + fenetre.fin) / 2
const echelleA = (s, p) => Math.pow(s.facteur, (p - s.debut) / (s.fin - s.debut))

/** Rapport de taille entre la chambre du plan suivant et celle de la vitre. */
const ratio = computed(
  () => echelleA(chambre, croisement) / echelleA(fenetre, croisement)
)
const transform = computed(
  () => `translate(800 450) scale(${ratio.value.toFixed(4)}) translate(-800 -450)`
)

/* Le mur et le sol de la vitre prolongent ceux de la chambre miniature :
   le sol de la pièce est à y = 700, on le reporte à la bonne échelle. */
const solY = computed(() => 450 + (700 - 450) * ratio.value)
</script>

<template>
  <svg class="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="boisCadre" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3c3049" />
        <stop offset="100%" stop-color="#241d30" />
      </linearGradient>
      <linearGradient id="murVitre" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2b2438" />
        <stop offset="100%" stop-color="#1f1a2a" />
      </linearGradient>
      <linearGradient id="refletVitre" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.14)" />
        <stop offset="45%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
      <radialGradient id="chaleurVitre" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stop-color="rgba(255,196,107,0.3)" />
        <stop offset="100%" stop-color="rgba(255,196,107,0.03)" />
      </radialGradient>
      <clipPath id="ouverture">
        <rect x="196" y="6" width="1208" height="888" rx="6" />
      </clipPath>
    </defs>

    <!-- le mur de la façade, autour de la fenêtre -->
    <rect width="1600" height="900" fill="#141c32" />

    <!-- l'embrasure -->
    <rect x="150" y="-40" width="1300" height="980" rx="12" fill="url(#boisCadre)" />

    <!-- l'intérieur, vu à travers la vitre -->
    <g clip-path="url(#ouverture)">
      <!-- mur et sol, prolongés depuis la chambre miniature -->
      <rect x="196" y="6" width="1208" height="888" fill="url(#murVitre)" />
      <rect x="196" :y="solY" width="1208" :height="894 - solY" fill="#3a2a22" />

      <!-- LA chambre, la même qu'au plan suivant -->
      <g :transform="transform">
        <ChambreDecor suffixe="apercu" :avec-fenetre="false" />
      </g>

      <!-- la lumière chaude de la lampe, diffusée par la vitre -->
      <rect x="196" y="6" width="1208" height="888" fill="url(#chaleurVitre)" />
    </g>

    <!-- les croisillons : bien à l'écart du centre, pour ne pas zoomer dedans -->
    <rect x="150" y="150" width="1300" height="40" fill="url(#boisCadre)" />
    <rect x="150" y="760" width="1300" height="40" fill="url(#boisCadre)" />
    <rect x="300" y="-40" width="40" height="980" fill="url(#boisCadre)" />
    <rect x="1260" y="-40" width="40" height="980" fill="url(#boisCadre)" />

    <!-- reflet sur la vitre et rideaux -->
    <rect x="196" y="6" width="1208" height="888" fill="url(#refletVitre)" />
    <path d="M150 -40 q70 300 24 560 q-34 200 12 380 l-96 0 l0 -940 z" fill="#2a2138" opacity="0.96" />
    <path d="M1450 -40 q-70 300 -24 560 q34 200 -12 380 l96 0 l0 -940 z" fill="#2a2138" opacity="0.96" />
  </svg>
</template>

<style scoped>
.scene {
  width: 100%;
  height: 100%;
}
</style>
