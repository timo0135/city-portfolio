<script setup>
/* PLAN 5 — l'écran. En HTML et non en SVG : il affiche déjà le début du
   contenu, avec les mêmes styles que la page qui suit, pour que le passage
   du décor au vrai texte ne se voie pas. */
import { theme } from '../data/scene'

defineProps({
  pilote: { type: Object, default: () => ({}) }
})
</script>

<template>
  <div class="plan">
    <div class="moniteur">
      <div class="dalle">
        <div class="chrome">
          <span class="pastille rouge"></span>
          <span class="pastille jaune"></span>
          <span class="pastille verte"></span>
          <span class="onglet">{{ theme.fenetreTitre }}</span>
        </div>
        <div class="apercu">
          <p class="salut">Bonsoir, je suis</p>
          <p class="nom">{{ pilote.nom }}</p>
          <p class="metier">{{ pilote.titre }}</p>
        </div>
      </div>
      <div class="pied"></div>
    </div>
  </div>
</template>

<style scoped>
.plan {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: radial-gradient(90% 70% at 50% 45%, #1d2438 0%, #0d1322 70%);
}
.moniteur {
  width: 72vw;
  max-width: 1500px;
  aspect-ratio: 3 / 2;
  background: #1b2236;
  border-radius: 1.6vw;
  padding: 1.1vw;
  box-shadow: 0 0 6vw rgba(111, 211, 255, 0.18);
}
.dalle {
  width: 100%;
  height: 100%;
  border-radius: 0.8vw;
  background: var(--fond);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.chrome {
  display: flex;
  align-items: center;
  gap: 0.36vw;
  padding: 0.46vw 12vw 0.46vw 13.6vw;
  background: var(--panneau);
  border-bottom: 1px solid var(--trait);
}
.pastille {
  width: 0.5vw;
  height: 0.5vw;
  border-radius: 50%;
  background: #3b4763;
}
.pastille.rouge {
  background: #ff5f57;
}
.pastille.jaune {
  background: #febc2e;
}
.pastille.verte {
  background: #28c840;
}
.onglet {
  font-family: var(--mono);
  font-size: 0.55vw;
  color: var(--texte-faible);
  margin-left: 0.5vw;
}
/* Tailles choisies pour qu'à la fin du zoom (× 1,5) elles tombent sur
   celles du vrai contenu : le passage de l'aperçu à la page se voit à peine. */
.apercu {
  padding: 5.4vw 0 0 13.6vw;
}
.salut {
  margin: 0 0 0.4vw;
  font-family: var(--mono);
  font-size: 0.65vw;
  color: var(--lampe);
}
.nom {
  margin: 0;
  font-size: 2.4vw;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}
.metier {
  margin: 0.35vw 0 0;
  font-size: 0.97vw;
  color: var(--texte-doux);
}
.pied {
  width: 22%;
  height: 1.4vw;
  margin: 0 auto;
  background: #1b2236;
  border-radius: 0 0 0.6vw 0.6vw;
}
</style>
