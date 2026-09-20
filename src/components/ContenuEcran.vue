<script setup>
/* Ce qui s'affiche sur l'écran, une fois le zoom terminé : tout le contenu
   venu de l'API. La page continue de défiler normalement ici. */
import { theme } from '../data/scene'

defineProps({
  donnees: { type: Object, required: true }
})

const sections = [
  { id: 'apropos', label: 'À propos' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
  { id: 'contact', label: 'Contact' }
]
</script>

<template>
  <div class="ecran">
    <div class="chrome">
      <span class="pastille rouge"></span>
      <span class="pastille jaune"></span>
      <span class="pastille verte"></span>
      <span class="onglet">{{ theme.fenetreTitre }}</span>
      <nav class="menu">
        <a v-for="s in sections" :key="s.id" :href="`#${s.id}`">{{ s.label }}</a>
      </nav>
    </div>

    <div class="dalle">
      <!-- À PROPOS -->
      <section id="apropos" class="bloc entete">
        <div>
          <p class="salut">Bonsoir, je suis</p>
          <h1>{{ donnees.pilote.nom }}</h1>
          <p class="metier">{{ donnees.pilote.titre }}</p>
          <p v-if="donnees.pilote.situation" class="situation">{{ donnees.pilote.situation }}</p>
          <p v-if="donnees.pilote.bio" class="bio" v-html="donnees.pilote.bio"></p>
          <p v-if="donnees.pilote.disponible" class="dispo">
            <span class="point"></span>{{ donnees.pilote.disponibilite || 'Disponible' }}
          </p>
        </div>
        <figure v-if="donnees.pilote.photo" class="portrait">
          <img :src="donnees.pilote.photo.src" :alt="donnees.pilote.photo.legende || donnees.pilote.nom" />
        </figure>
      </section>

      <section class="bloc">
        <dl class="faits">
          <div v-for="f in donnees.pilote.faits" :key="f.label">
            <dt>{{ f.label }}</dt>
            <dd>{{ f.valeur }}</dd>
          </div>
        </dl>
        <ul v-if="donnees.pilote.pointsForts.length" class="puces">
          <li v-for="(p, i) in donnees.pilote.pointsForts" :key="i" v-html="p"></li>
        </ul>
      </section>

      <!-- PARCOURS -->
      <section id="parcours" class="bloc">
        <h2>Parcours</h2>
        <ol class="parcours">
          <li v-for="e in donnees.experiences" :key="e.id">
            <p class="quand"><span class="type">{{ e.type }}</span>{{ e.periode }}</p>
            <h3>{{ e.poste }}</h3>
            <p class="ou">{{ e.ou }}</p>
            <p v-if="e.texte" class="texte" v-html="e.texte"></p>
            <ul v-if="e.points.length" class="puces">
              <li v-for="(pt, i) in e.points" :key="i" v-html="pt"></li>
            </ul>
            <p v-if="e.tags.length" class="tags">
              <span v-for="(t, i) in e.tags" :key="i" class="tag" :class="{ chaud: t.enAvant }">{{ t.texte }}</span>
            </p>
          </li>
        </ol>
      </section>

      <!-- PROJETS -->
      <section id="projets" class="bloc">
        <h2>Projets</h2>
        <div class="projets">
          <article v-for="p in donnees.projets" :key="p.id" class="projet">
            <figure v-if="p.image" class="visuel">
              <img :src="p.image.src" :alt="p.image.legende || p.titre" loading="lazy" />
            </figure>
            <h3>{{ p.titre }}</h3>
            <p v-if="p.contexte" class="contexte">{{ p.contexte }}</p>
            <p v-if="p.texte" class="texte" v-html="p.texte"></p>
            <dl v-if="p.fiche.length" class="faits serre">
              <div v-for="f in p.fiche" :key="f.label">
                <dt>{{ f.label }}</dt>
                <dd>{{ f.valeur }}</dd>
              </div>
            </dl>
            <ul v-if="p.points.length" class="puces">
              <li v-for="(pt, i) in p.points" :key="i" v-html="pt"></li>
            </ul>
            <p v-if="p.tags.length" class="tags">
              <span v-for="(t, i) in p.tags" :key="i" class="tag" :class="{ chaud: t.enAvant }">{{ t.texte }}</span>
            </p>
            <p v-if="p.liens.length" class="liens">
              <a v-for="l in p.liens" :key="l.label" :href="l.url" target="_blank" rel="noopener">{{ l.label }} ↗</a>
            </p>
          </article>
        </div>
      </section>

      <!-- COMPÉTENCES -->
      <section id="competences" class="bloc">
        <h2>Compétences</h2>
        <div class="niveaux">
          <div v-for="g in donnees.competences.groupes" :key="g.titre" class="niveau">
            <h3>{{ g.titre }}</h3>
            <p class="tags">
              <span v-for="i in g.items" :key="i" class="tag">{{ i }}</span>
            </p>
            <p v-if="g.precision" class="precision">{{ g.precision }}</p>
          </div>
        </div>
        <ul v-if="donnees.competences.notes.length" class="puces">
          <li v-for="(n, i) in donnees.competences.notes" :key="i" v-html="n"></li>
        </ul>
      </section>

      <!-- CONTACT -->
      <section id="contact" class="bloc contact">
        <h2>Contact</h2>
        <p v-if="donnees.contact.message" class="texte">{{ donnees.contact.message }}</p>
        <p class="actions">
          <a v-if="donnees.contact.mailto" class="bouton" :href="donnees.contact.mailto">
            {{ donnees.contact.email }}
          </a>
          <a
            v-for="l in donnees.contact.liens"
            :key="l.label"
            class="bouton fantome"
            :href="l.url"
            target="_blank"
            rel="noopener"
          >
            {{ l.label }} ↗
          </a>
        </p>
        <p v-if="donnees.contact.zone" class="zone">{{ donnees.contact.zone }}</p>
      </section>

      <footer class="pied">
        <span>{{ donnees.pilote.nom }}</span>
        <span>La lumière reste allumée tard</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.ecran {
  max-width: var(--largeur-max);
  margin: 0 auto;
  padding: 0 var(--gouttiere) 60px;
}
.chrome {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(19, 26, 44, 0.92);
  backdrop-filter: blur(8px);
  border: 1px solid var(--trait);
  border-radius: var(--rayon) var(--rayon) 0 0;
}
.pastille {
  width: 11px;
  height: 11px;
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
  font-size: 12px;
  color: var(--texte-faible);
  margin-left: 8px;
}
.menu {
  margin-left: auto;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
.menu a {
  font-size: 13px;
  color: var(--texte-doux);
  text-decoration: none;
}
.menu a:hover {
  color: var(--lampe);
}
.dalle {
  border: 1px solid var(--trait);
  border-top: 0;
  border-radius: 0 0 var(--rayon) var(--rayon);
  background: linear-gradient(180deg, rgba(255, 196, 107, 0.05), transparent 220px), var(--panneau);
}
.bloc {
  padding: 34px clamp(18px, 4vw, 44px);
  border-bottom: 1px solid var(--trait);
}
.bloc:last-of-type {
  border-bottom: 0;
}
.entete {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 28px;
  align-items: start;
  padding-top: 44px;
}
.salut {
  margin: 0 0 6px;
  font-family: var(--mono);
  font-size: 14px;
  color: var(--lampe);
}
h1 {
  font-size: clamp(30px, 5.4vw, 52px);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.metier {
  margin: 8px 0 0;
  font-size: clamp(17px, 2.2vw, 21px);
  color: var(--texte-doux);
}
.situation {
  margin: 4px 0 0;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--texte-faible);
}
.bio {
  margin: 18px 0 0;
  max-width: 62ch;
  color: #d5dced;
}
.dispo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 18px 0 0;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--lampe);
  border: 1px solid rgba(255, 196, 107, 0.35);
  border-radius: 999px;
  padding: 5px 12px;
}
.point {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--lampe);
  box-shadow: 0 0 10px var(--lampe);
}
.portrait {
  margin: 0;
  width: clamp(110px, 18vw, 170px);
}
.portrait img {
  width: 100%;
  border-radius: var(--rayon);
  border: 1px solid var(--trait);
}
h2 {
  font-size: clamp(21px, 3vw, 27px);
  margin-bottom: 20px;
}
h3 {
  font-size: 18px;
  margin: 0;
}
.faits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 1px;
  margin: 0 0 20px;
  background: var(--trait);
  border: 1px solid var(--trait);
  border-radius: 8px;
  overflow: hidden;
}
.faits.serre {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin: 14px 0;
}
.faits div {
  background: var(--panneau-2);
  padding: 10px 12px;
}
.faits dt {
  font-family: var(--mono);
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--texte-faible);
}
.faits dd {
  margin: 3px 0 0;
  font-size: 14px;
}
.puces {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.puces li {
  position: relative;
  padding-left: 20px;
  color: #c9d2e4;
  font-size: 14.5px;
}
.puces li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--lampe);
  opacity: 0.85;
}
.parcours {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 26px;
}
.parcours li {
  border-left: 2px solid var(--trait);
  padding-left: 18px;
}
.parcours li:first-child {
  border-left-color: var(--lampe);
}
.quand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin: 0 0 6px;
  font-family: var(--mono);
  font-size: 11.5px;
  letter-spacing: 0.06em;
  color: var(--lampe);
}
.type {
  color: var(--texte-doux);
  border: 1px solid var(--trait);
  background: var(--panneau-2);
  border-radius: 999px;
  padding: 2px 9px;
}
.ou {
  margin: 3px 0 10px;
  font-size: 13.5px;
  color: var(--texte-doux);
}
.texte {
  margin: 0;
  color: #d5dced;
  max-width: 68ch;
}
.projets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
}
.projet {
  border: 1px solid var(--trait);
  border-radius: 10px;
  background: var(--panneau-2);
  padding: 18px;
}
.visuel {
  margin: 0 0 14px;
}
.visuel img {
  width: 100%;
  border-radius: 6px;
}
.contexte {
  margin: 6px 0 10px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--lampe);
}
.niveaux {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 16px;
}
.niveau {
  border: 1px solid var(--trait);
  border-radius: 10px;
  background: var(--panneau-2);
  padding: 16px;
}
.niveau h3 {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--texte-faible);
  margin-bottom: 10px;
}
.precision {
  margin: 10px 0 0;
  font-size: 12.5px;
  color: var(--texte-faible);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 14px 0 0;
}
.tag {
  font-family: var(--mono);
  font-size: 11.5px;
  color: #bcc6db;
  border: 1px solid var(--trait);
  background: var(--panneau);
  border-radius: 999px;
  padding: 3px 10px;
}
.tag.chaud {
  border-color: rgba(255, 196, 107, 0.5);
  color: var(--lampe);
}
.liens {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 16px 0 0;
}
.liens a {
  font-size: 14px;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 196, 107, 0.4);
}
.contact .actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 22px 0 0;
}
.bouton {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  color: #201603;
  background: var(--lampe);
  border-radius: 999px;
  padding: 11px 20px;
  transition: transform 0.15s, background 0.15s;
}
.bouton:hover {
  background: var(--lampe-vive);
  transform: translateY(-1px);
}
.bouton.fantome {
  color: var(--texte);
  background: transparent;
  border: 1px solid var(--trait);
}
.bouton.fantome:hover {
  border-color: var(--lampe);
  color: var(--lampe);
}
.zone {
  margin: 18px 0 0;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--texte-faible);
}
.pied {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 20px clamp(18px, 4vw, 44px);
  border-top: 1px solid var(--trait);
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--texte-faible);
}
@media (max-width: 720px) {
  .entete {
    grid-template-columns: 1fr;
  }
  .menu {
    display: none;
  }
}
</style>
