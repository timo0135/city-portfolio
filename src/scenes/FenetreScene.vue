<script setup>
/* PLAN 3 — la fenêtre de près : le cadre, la vitre, et derrière, la chambre.
   Le grand carreau du milieu est laissé libre : c'est par là qu'on entre, et
   au centre exact se trouve déjà le bureau avec son écran. */
</script>

<template>
  <svg class="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="boisCadre" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3c3049" />
        <stop offset="100%" stop-color="#241d30" />
      </linearGradient>
      <linearGradient id="murInterieur" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f0cfa2" />
        <stop offset="100%" stop-color="#e2b075" />
      </linearGradient>
      <linearGradient id="refletVitre" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.16)" />
        <stop offset="45%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
      <radialGradient id="lampeChambre" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(255,214,150,0.9)" />
        <stop offset="100%" stop-color="rgba(255,214,150,0)" />
      </radialGradient>
    </defs>

    <!-- le mur de la façade, autour de la fenêtre -->
    <rect width="1600" height="900" fill="#141c32" />

    <!-- l'embrasure -->
    <rect x="150" y="-40" width="1300" height="980" rx="12" fill="url(#boisCadre)" />

    <!-- l'intérieur vu à travers la vitre -->
    <g>
      <rect x="196" y="6" width="1208" height="888" fill="url(#murInterieur)" />
      <rect x="196" y="600" width="1208" height="294" fill="#c98f52" />

      <!-- lit, à gauche -->
      <rect x="220" y="470" width="230" height="150" rx="12" fill="#a86a3c" />
      <rect x="236" y="436" width="96" height="56" rx="12" fill="#f3e2c8" />

      <!-- étagère, à droite -->
      <rect x="1150" y="300" width="220" height="12" rx="4" fill="#9a6a3c" />
      <rect x="1180" y="250" width="16" height="50" fill="#b9714f" />
      <rect x="1202" y="262" width="13" height="38" fill="#6fa3c9" />

      <!-- lampe de bureau -->
      <circle cx="1020" cy="430" r="150" fill="url(#lampeChambre)" />
      <rect x="1040" y="450" width="10" height="150" fill="#8a5a2a" />
      <path d="M1044 452 l-54 -34 l22 -32 l54 34 z" fill="#9a6a3c" />

      <!-- le bureau et l'écran, au centre exact du cadre -->
      <rect x="560" y="600" width="520" height="26" rx="6" fill="#8a5a2a" />
      <rect x="770" y="550" width="60" height="50" fill="#6b4520" />
      <rect x="650" y="350" width="300" height="200" rx="12" fill="#4a3a26" />
      <rect x="664" y="364" width="272" height="172" rx="6" fill="#cfe4ff" opacity="0.85" />
      <rect x="678" y="378" width="120" height="12" rx="6" fill="#7d8ea8" opacity="0.6" />
      <rect x="678" y="400" width="200" height="8" rx="4" fill="#7d8ea8" opacity="0.45" />

      <!-- chaise -->
      <rect x="700" y="640" width="180" height="18" rx="9" fill="#7a5426" />
    </g>

    <!-- les croisillons : bien à l'écart du centre -->
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
