<script setup>
/* PLAN 5 — ce qui s'affiche SUR l'écran du bureau.
   Il n'y a qu'un seul écran dans tout le zoom : celui de la chambre. Ce plan
   ne redessine donc ni moniteur ni pied : il ne contient que la dalle, dont
   la taille est calée sur celle de l'écran de ChambreScene au moment où les
   deux se croisent (272 × 172 sur un viewBox de 1600 × 900, soit 62vw de
   large une fois le plan « chambre » agrandi). Le fond reste transparent :
   le bureau, la lampe et le mur continuent de s'écarter autour.

   Les tailles de texte sont choisies pour qu'à la fin du zoom elles tombent
   sur celles du vrai contenu : le passage de l'aperçu à la page se voit à
   peine. */
import { theme } from '../data/scene'

defineProps({
  pilote: { type: Object, default: () => ({}) }
})
</script>

<template>
  <div class="plan">
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
  </div>
</template>

<style scoped>
.plan {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  /* fond transparent : c'est la chambre, derrière, qu'on voit autour */
}
.dalle {
  width: 62vw;
  aspect-ratio: 272 / 172;
  border-radius: 0.5vw;
  background: var(--fond);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.chrome {
  display: flex;
  align-items: center;
  gap: 0.25vw;
  padding: 0.32vw 8vw 0.32vw 15.5vw;
  background: var(--panneau);
  border-bottom: 1px solid var(--trait);
}
.pastille {
  width: 0.35vw;
  height: 0.35vw;
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
  font-size: 0.39vw;
  color: var(--texte-faible);
  margin-left: 0.35vw;
}
.apercu {
  padding: 4vw 0 0 15.5vw;
}
.salut {
  margin: 0 0 0.3vw;
  font-family: var(--mono);
  font-size: 0.46vw;
  color: var(--lampe);
}
.nom {
  margin: 0;
  font-size: 1.69vw;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
}
.metier {
  margin: 0.25vw 0 0;
  font-size: 0.68vw;
  color: var(--texte-doux);
}
</style>
