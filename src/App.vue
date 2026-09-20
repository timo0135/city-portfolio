<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import { chargerProfil, API_URL } from './api/client'
import { versEcran } from './api/versEcran'
import { scenes, hauteurPiste, reperes, theme } from './data/scene'
import { useZoom } from './composables/useZoom'

import VilleScene from './scenes/VilleScene.vue'
import ImmeubleScene from './scenes/ImmeubleScene.vue'
import FenetreScene from './scenes/FenetreScene.vue'
import ChambreScene from './scenes/ChambreScene.vue'
import EcranScene from './scenes/EcranScene.vue'
import ContenuEcran from './components/ContenuEcran.vue'

const decors = { ville: VilleScene, immeuble: ImmeubleScene, fenetre: FenetreScene, chambre: ChambreScene }

const donnees = ref(null)
const erreur = ref(null)
const { progression, piste, etats, reduit, allerAuContenu } = useZoom()

async function charger() {
  erreur.value = null
  try {
    donnees.value = versEcran(await chargerProfil(), theme)
  } catch (err) {
    console.error(`[portfolio] API injoignable (${API_URL})`, err)
    erreur.value = err
  }
}

const repereActif = computed(() => {
  if (progression.value > 0.96) return '' // on est arrivé : plus besoin de guide
  const visibles = reperes.filter((r) => progression.value >= r.a)
  return visibles.length ? visibles[visibles.length - 1].texte : ''
})

// la barre de progression du zoom, en %
const avancement = computed(() => Math.round(progression.value * 100))

onMounted(charger)

// le titre de l'onglet vient lui aussi de l'API
watch(donnees, (d) => {
  if (d?.pilote?.nom) document.title = `${d.pilote.nom} — ${d.pilote.titre || 'portfolio'}`
})

/* Si le visiteur a demandé moins d'animations, on raccourcit fortement la
   piste : le zoom reste possible mais se traverse en quelques tours de
   molette, et le bouton « passer l'intro » mène droit au contenu. */
const hauteur = computed(() => (reduit ? '180vh' : hauteurPiste))
</script>

<template>
  <a class="saut" href="#contenu">Aller directement au contenu</a>

  <!-- LE ZOOM : une longue piste de scroll, un cadre fixe, des décors empilés -->
  <div class="piste" ref="piste" :style="{ height: hauteur }" aria-hidden="true">
    <div class="cadre">
      <div
        v-for="s in scenes"
        :key="s.nom"
        class="decor"
        :class="{ efface: !etats[s.nom].actif }"
        :style="etats[s.nom].style"
      >
        <component :is="decors[s.nom]" v-if="decors[s.nom]" />
        <EcranScene v-else :pilote="donnees?.pilote || {}" />
      </div>

      <p class="repere">{{ repereActif }}</p>

      <div class="invite" v-show="progression < 0.04">
        <span class="fleche"></span>{{ theme.invite }}
      </div>

      <button class="passer" type="button" @click="allerAuContenu">Passer l'intro</button>

      <div class="jauge" role="presentation">
        <span :style="{ width: avancement + '%' }"></span>
      </div>
    </div>
  </div>

  <!-- LE CONTENU, sur l'écran -->
  <main id="contenu" class="contenu">
    <ContenuEcran v-if="donnees" :donnees="donnees" />

    <div v-else class="attente" role="status" aria-live="polite">
      <template v-if="erreur">
        <p class="titre">Personne ne répond</p>
        <p class="detail">Les données n'ont pas pu être chargées depuis l'API.</p>
        <button class="relancer" type="button" @click="charger">Réessayer</button>
      </template>
      <p v-else class="titre">Chargement…</p>
    </div>
  </main>
</template>

<style scoped>
.piste {
  position: relative;
}
.cadre {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  background: #070b16;
}
.decor {
  position: absolute;
  inset: 0;
  will-change: transform, opacity;
  backface-visibility: hidden;
}
/* un décor hors de sa fenêtre ne coûte rien : on ne le compose plus */
.decor.efface {
  display: none;
}
.repere {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 84px;
  margin: 0;
  text-align: center;
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.8);
  pointer-events: none;
}
.invite {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--lampe);
  pointer-events: none;
}
.fleche {
  width: 9px;
  height: 9px;
  border-right: 2px solid var(--lampe);
  border-bottom: 2px solid var(--lampe);
  transform: rotate(45deg);
  animation: descend 1.8s ease-in-out infinite;
}
@keyframes descend {
  0%,
  100% {
    transform: rotate(45deg) translate(0, 0);
    opacity: 0.4;
  }
  50% {
    transform: rotate(45deg) translate(3px, 3px);
    opacity: 1;
  }
}
.passer {
  position: absolute;
  top: 18px;
  right: 18px;
  font: inherit;
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
  background: rgba(10, 15, 30, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  padding: 8px 14px;
  cursor: pointer;
  backdrop-filter: blur(6px);
}
.passer:hover {
  color: var(--lampe);
  border-color: var(--lampe);
}
.jauge {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.08);
}
.jauge span {
  display: block;
  height: 100%;
  background: var(--lampe);
}
.contenu {
  position: relative;
  z-index: 1;
  background: var(--fond);
  padding-top: 28px;
}
.attente {
  min-height: 60vh;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 12px;
  text-align: center;
  font-family: var(--mono);
}
.titre {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--texte-doux);
}
.detail {
  margin: 0;
  max-width: 44ch;
  font-size: 13px;
  color: var(--texte-faible);
}
.relancer {
  font: inherit;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--texte-doux);
  background: transparent;
  border: 1px solid var(--trait);
  border-radius: 999px;
  padding: 9px 16px;
  cursor: pointer;
}
.relancer:hover {
  color: var(--lampe);
  border-color: var(--lampe);
}
@media (prefers-reduced-motion: reduce) {
  .fleche {
    animation: none;
  }
}
</style>
