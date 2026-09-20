<script setup>
/* PLAN 1 — la ville de loin : le ciel, la lune, les collines de tours, et au
   centre l'immeuble vers lequel on plonge. */
import { computed } from 'vue'
import { fenetres } from '../utils/alea'
import { alea } from '../utils/alea'

const etoiles = computed(() => {
  const rnd = alea(7)
  return Array.from({ length: 90 }, (_, i) => ({
    key: i,
    cx: rnd() * 1600,
    cy: rnd() * 420,
    r: 0.6 + rnd() * 1.5,
    o: 0.25 + rnd() * 0.65
  }))
})

/** Une rangée de tours : plus elle est loin, plus elle est pâle et basse. */
function rangee({ graine, base, hauteurMin, hauteurMax, largeurMin, largeurMax, densite }) {
  const rnd = alea(graine)
  const tours = []
  let x = -60
  while (x < 1660) {
    const l = largeurMin + rnd() * (largeurMax - largeurMin)
    const h = hauteurMin + rnd() * (hauteurMax - hauteurMin)
    tours.push({
      key: x,
      x,
      y: base - h,
      l,
      h,
      fenetres: fenetres({
        x,
        y: base - h,
        largeur: l,
        hauteur: h,
        colonnes: Math.max(2, Math.round(l / 22)),
        rangees: Math.max(3, Math.round(h / 26)),
        graine: graine + x,
        densite
      })
    })
    x += l + 6 + rnd() * 16
  }
  return tours
}

const loin = computed(() =>
  rangee({ graine: 11, base: 640, hauteurMin: 90, hauteurMax: 260, largeurMin: 46, largeurMax: 86, densite: 0.32 })
)
const proche = computed(() =>
  rangee({ graine: 29, base: 900, hauteurMin: 150, hauteurMax: 340, largeurMin: 70, largeurMax: 130, densite: 0.4 })
)

// L'immeuble central : c'est lui qu'on va regarder de plus près.
const heros = {
  x: 690,
  y: 300,
  l: 220,
  h: 600
}
const fenetresHeros = computed(() =>
  fenetres({
    x: heros.x,
    y: heros.y,
    largeur: heros.l,
    hauteur: heros.h,
    colonnes: 5,
    rangees: 12,
    graine: 5,
    densite: 0.3
  })
)
</script>

<template>
  <svg class="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#070b16" />
        <stop offset="55%" stop-color="#101a34" />
        <stop offset="100%" stop-color="#24304f" />
      </linearGradient>
      <radialGradient id="halo" cx="50%" cy="100%" r="70%">
        <stop offset="0%" stop-color="rgba(255,196,107,0.18)" />
        <stop offset="100%" stop-color="rgba(255,196,107,0)" />
      </radialGradient>
      <radialGradient id="luneHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(232,240,255,0.5)" />
        <stop offset="100%" stop-color="rgba(232,240,255,0)" />
      </radialGradient>
    </defs>

    <rect width="1600" height="900" fill="url(#ciel)" />
    <circle
      v-for="e in etoiles"
      :key="e.key"
      :cx="e.cx"
      :cy="e.cy"
      :r="e.r"
      fill="#dce6ff"
      :opacity="e.o"
    />
    <circle cx="1270" cy="170" r="120" fill="url(#luneHalo)" />
    <circle cx="1270" cy="170" r="46" fill="#e9eeff" />
    <circle cx="1248" cy="156" r="9" fill="#d5dcf2" opacity="0.7" />
    <circle cx="1286" cy="188" r="6" fill="#d5dcf2" opacity="0.55" />

    <rect y="520" width="1600" height="380" fill="url(#halo)" />

    <!-- tours lointaines -->
    <g opacity="0.55">
      <g v-for="t in loin" :key="t.key">
        <rect :x="t.x" :y="t.y" :width="t.l" :height="t.h" fill="var(--ville-loin)" />
        <rect
          v-for="f in t.fenetres"
          :key="f.key"
          :x="f.x"
          :y="f.y"
          :width="f.l"
          :height="f.h"
          :fill="f.allumee ? '#ffd9a0' : '#101932'"
          :opacity="f.allumee ? 0.35 + f.chaleur * 0.4 : 0.5"
        />
      </g>
    </g>

    <!-- l'immeuble central -->
    <g>
      <rect :x="heros.x" :y="heros.y" :width="heros.l" :height="heros.h" fill="#1d2744" />
      <rect :x="heros.x" :y="heros.y" width="10" :height="heros.h" fill="#27324f" />
      <rect :x="heros.x + 70" :y="heros.y - 34" width="80" height="34" fill="#1d2744" />
      <rect :x="heros.x + 104" :y="heros.y - 74" width="12" height="40" fill="#27324f" />
      <circle :cx="heros.x + 110" :cy="heros.y - 78" r="5" fill="#ff5f6d">
        <animate attributeName="opacity" values="1;0.15;1" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <rect
        v-for="f in fenetresHeros"
        :key="f.key"
        :x="f.x"
        :y="f.y"
        :width="f.l"
        :height="f.h"
        :fill="f.allumee ? '#ffd9a0' : '#16203a'"
        :opacity="f.allumee ? 0.45 + f.chaleur * 0.4 : 0.9"
      />
      <!-- LA fenêtre : celle de la chambre, au centre exact du cadre -->
      <rect x="784" y="437" width="32" height="26" fill="#ffc46b" />
      <rect x="774" y="427" width="52" height="46" fill="#ffc46b" opacity="0.22" />
    </g>

    <!-- tours du premier plan -->
    <g v-for="t in proche" :key="t.key">
      <rect :x="t.x" :y="t.y" :width="t.l" :height="t.h" fill="var(--ville-proche)" />
      <rect
        v-for="f in t.fenetres"
        :key="f.key"
        :x="f.x"
        :y="f.y"
        :width="f.l"
        :height="f.h"
        :fill="f.allumee ? '#ffcf8a' : '#0a1020'"
        :opacity="f.allumee ? 0.3 + f.chaleur * 0.45 : 0.85"
      />
    </g>
  </svg>
</template>

<style scoped>
.scene {
  width: 100%;
  height: 100%;
}
</style>
