<script setup>
/* PLAN 2 — la façade : on ne voit plus qu'un immeuble, et une seule fenêtre
   est vraiment allumée. C'est celle-là qu'on vise. */
import { computed } from 'vue'
import { alea } from '../utils/alea'

const COLONNES = 6
const RANGEES = 7
const CIBLE = { c: 2, r: 3 } // la fenêtre allumée, au centre exact du cadre

const grille = computed(() => {
  const rnd = alea(23)
  const x0 = 420
  const y0 = 48
  const pasX = 160
  const pasY = 120
  const out = []
  for (let r = 0; r < RANGEES; r++) {
    for (let c = 0; c < COLONNES; c++) {
      const cible = c === CIBLE.c && r === CIBLE.r
      const d = rnd()
      out.push({
        key: `${c}-${r}`,
        x: x0 + c * pasX,
        y: y0 + r * pasY,
        cible,
        allumee: cible || d < 0.16,
        force: 0.3 + rnd() * 0.5,
        rideau: rnd() < 0.5
      })
    }
  }
  return out
})
</script>

<template>
  <svg class="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="facade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1b2540" />
        <stop offset="50%" stop-color="#222d4d" />
        <stop offset="100%" stop-color="#18213a" />
      </linearGradient>
      <radialGradient id="lueurFenetre" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(255,196,107,0.55)" />
        <stop offset="100%" stop-color="rgba(255,196,107,0)" />
      </radialGradient>
    </defs>

    <rect width="1600" height="900" fill="#0a0f1e" />
    <rect x="240" y="0" width="1120" height="900" fill="url(#facade)" />
    <!-- refends verticaux : le béton entre les travées -->
    <rect x="240" y="0" width="26" height="900" fill="#2a3557" opacity="0.8" />
    <rect x="1334" y="0" width="26" height="900" fill="#141c32" opacity="0.9" />
    <g opacity="0.35">
      <rect v-for="r in 8" :key="r" x="240" :y="r * 120 - 26" width="1120" height="6" fill="#0d1425" />
    </g>

    <g v-for="f in grille" :key="f.key">
      <rect :x="f.x - 22" :y="f.y - 22" width="164" height="128" fill="#131b31" opacity="0.5" rx="4" />
      <rect
        :x="f.x"
        :y="f.y"
        width="120"
        height="84"
        rx="3"
        :fill="f.allumee ? '#ffd9a0' : '#0e1628'"
        :opacity="f.allumee ? 0.25 + f.force * 0.6 : 0.95"
      />
      <!-- croisillons -->
      <rect :x="f.x + 57" :y="f.y" width="6" height="84" fill="#0b1120" opacity="0.7" />
      <rect :x="f.x" :y="f.y + 39" width="120" height="6" fill="#0b1120" opacity="0.7" />
      <rect
        v-if="f.allumee && f.rideau && !f.cible"
        :x="f.x"
        :y="f.y"
        width="120"
        height="30"
        fill="#0b1120"
        opacity="0.45"
      />
      <!-- appui de fenêtre -->
      <rect :x="f.x - 8" :y="f.y + 84" width="136" height="9" fill="#2c3860" />
    </g>

    <!-- la fenêtre visée : halo, silhouette de bureau, lumière de lampe -->
    <g>
      <circle cx="800" cy="450" r="240" fill="url(#lueurFenetre)" />
      <rect x="740" y="408" width="120" height="84" rx="3" fill="#ffc46b" />
      <rect x="740" y="408" width="120" height="84" rx="3" fill="#fff0d2" opacity="0.35" />
      <rect x="752" y="460" width="52" height="32" fill="#8a5a2a" opacity="0.55" />
      <rect x="812" y="430" width="34" height="26" fill="#6b4520" opacity="0.5" />
      <rect x="797" y="408" width="6" height="84" fill="#7a5426" opacity="0.6" />
      <rect x="740" y="447" width="120" height="6" fill="#7a5426" opacity="0.6" />
    </g>
  </svg>
</template>

<style scoped>
.scene {
  width: 100%;
  height: 100%;
}
</style>
