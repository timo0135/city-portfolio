<script setup>
/* LA CHAMBRE, dessinée UNE SEULE FOIS.
   --------------------------------------------------------------------------
   Ce décor sert deux fois : en grand dans ChambreScene, et en tout petit au
   centre de FenetreScene — ce qu'on aperçoit par la vitre. C'est la même
   pièce, le même bureau, le même écran : au moment où les deux plans se
   croisent, ils se superposent exactement, et on ne voit qu'un seul écran.

   `suffixe` rend les identifiants des dégradés uniques : les deux copies
   coexistent dans la page.
   ========================================================================== */
const props = defineProps({
  suffixe: { type: String, required: true },
  // vue de l'extérieur, on ne redessine pas la fenêtre par laquelle on entre
  avecFenetre: { type: Boolean, default: true }
})

const id = (nom) => `${nom}-${props.suffixe}`
const url = (nom) => `url(#${id(nom)})`
</script>

<template>
  <g>
    <defs>
      <linearGradient :id="id('mur')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2b2438" />
        <stop offset="100%" stop-color="#1d1828" />
      </linearGradient>
      <radialGradient :id="id('lampeHalo')" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(255,196,107,0.55)" />
        <stop offset="100%" stop-color="rgba(255,196,107,0)" />
      </radialGradient>
      <linearGradient :id="id('ecranLueur')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#9fd8ff" />
        <stop offset="100%" stop-color="#5aa8e0" />
      </linearGradient>
    </defs>

    <rect width="1600" height="900" :fill="url('mur')" />
    <!-- plinthe et sol -->
    <rect y="700" width="1600" height="200" fill="#3a2a22" />
    <rect y="690" width="1600" height="16" fill="#4a3730" />
    <ellipse cx="800" cy="860" rx="520" ry="80" fill="#5c4038" opacity="0.6" />

    <!-- la fenêtre, à gauche : c'est par là qu'on est entré -->
    <g v-if="avecFenetre">
      <rect x="70" y="150" width="300" height="360" rx="6" fill="#171f38" />
      <rect x="86" y="166" width="268" height="328" rx="4" fill="#243154" />
      <rect x="206" y="166" width="12" height="328" fill="#171f38" />
      <rect x="86" y="324" width="268" height="12" fill="#171f38" />
      <rect x="56" y="510" width="330" height="18" rx="6" fill="#2c2439" />
      <circle cx="150" cy="230" r="3" fill="#dce6ff" opacity="0.8" />
      <circle cx="300" cy="290" r="2.5" fill="#dce6ff" opacity="0.6" />
    </g>

    <!-- lit -->
    <g>
      <rect x="1150" y="470" width="420" height="230" rx="14" fill="#4a3550" />
      <rect x="1150" y="440" width="420" height="60" rx="14" fill="#5d4364" />
      <rect x="1190" y="452" width="130" height="70" rx="14" fill="#efe3d2" />
      <rect x="1150" y="530" width="420" height="120" rx="8" fill="#6c5a8c" />
      <rect x="1150" y="560" width="420" height="20" fill="#7e6aa1" opacity="0.6" />
    </g>

    <!-- étagère et affiche -->
    <g>
      <rect x="1180" y="180" width="330" height="14" rx="4" fill="#5a4436" />
      <rect x="1210" y="120" width="18" height="60" fill="#c96f5a" />
      <rect x="1232" y="132" width="14" height="48" fill="#6fa3c9" />
      <rect x="1250" y="126" width="20" height="54" fill="#d9b06a" />
      <rect x="1290" y="140" width="52" height="40" rx="4" fill="#3f5c7a" />
      <rect x="470" y="140" width="220" height="280" rx="6" fill="#33405e" />
      <circle cx="580" cy="250" r="60" fill="#e0a765" opacity="0.8" />
      <rect x="500" y="340" width="160" height="10" rx="5" fill="#8fa3c4" opacity="0.7" />
      <rect x="500" y="364" width="110" height="10" rx="5" fill="#8fa3c4" opacity="0.45" />
    </g>

    <!-- plante -->
    <g>
      <rect x="120" y="600" width="90" height="100" rx="8" fill="#8d5a3c" />
      <path d="M165 600 q-70 -60 -40 -140 q50 40 40 140z" fill="#3e7a52" />
      <path d="M165 600 q70 -50 50 -130 q-60 30 -50 130z" fill="#4c8f60" />
      <path d="M165 600 q-10 -90 10 -150 q26 70 -10 150z" fill="#2f6442" />
    </g>

    <!-- tapis -->
    <ellipse cx="820" cy="820" rx="330" ry="70" fill="#7a4a52" opacity="0.7" />

    <!-- bureau -->
    <g>
      <rect x="520" y="620" width="600" height="24" rx="6" fill="#6b4a33" />
      <rect x="540" y="644" width="24" height="120" fill="#553a28" />
      <rect x="1076" y="644" width="24" height="120" fill="#553a28" />
      <!-- chaise -->
      <rect x="760" y="700" width="140" height="18" rx="8" fill="#2f3b55" />
      <rect x="820" y="718" width="18" height="70" fill="#2f3b55" />
      <rect x="770" y="788" width="120" height="12" rx="6" fill="#2f3b55" />
      <!-- lampe de bureau -->
      <circle cx="1010" cy="470" r="120" :fill="url('lampeHalo')" />
      <rect x="1030" y="560" width="70" height="10" rx="5" fill="#3b4763" />
      <rect x="1060" y="470" width="8" height="96" fill="#3b4763" />
      <path d="M1064 470 l-52 -34 l24 -34 l52 34 z" fill="#4a597c" />
      <circle cx="1022" cy="452" r="14" fill="#ffd9a0" />
      <!-- clavier, souris, tasse -->
      <rect x="690" y="596" width="220" height="24" rx="5" fill="#2b3550" />
      <rect x="930" y="600" width="36" height="20" rx="10" fill="#2b3550" />
      <rect x="590" y="580" width="54" height="40" rx="6" fill="#e6d7c3" />
      <path d="M644 590 q22 10 0 22" stroke="#e6d7c3" stroke-width="7" fill="none" />

      <!-- L'ÉCRAN — au centre exact du cadre, et le seul de tout le zoom -->
      <rect x="770" y="550" width="60" height="42" fill="#232c44" />
      <rect x="720" y="584" width="160" height="14" rx="7" fill="#2b3550" />
      <rect x="650" y="350" width="300" height="200" rx="12" fill="#1b2236" />
      <rect x="664" y="364" width="272" height="172" rx="6" :fill="url('ecranLueur')" />
      <rect x="678" y="378" width="120" height="12" rx="6" fill="#0d1322" opacity="0.5" />
      <rect x="678" y="400" width="200" height="8" rx="4" fill="#0d1322" opacity="0.35" />
      <rect x="678" y="416" width="170" height="8" rx="4" fill="#0d1322" opacity="0.3" />
    </g>
  </g>
</template>
