/* ==========================================================================
   LA MISE EN SCÈNE
   --------------------------------------------------------------------------
   Le CONTENU (bio, expériences, projets, compétences, contact) vient de
   l'API portfolio-api, partagée par tous mes portfolios. Ce fichier ne
   contient que ce qui est propre à CE thème : le déroulé du zoom et les
   petits détails du décor.

   Un décor = { nom, debut, fin, facteur, cible }
     debut / fin  quand il est à l'écran, sur la progression 0 → 1
     facteur      de combien il grossit pendant sa fenêtre
     cible        le point de zoom, en % du cadre. Toujours le centre : les
                  décors sont recadrés selon la forme de l'écran, et seul le
                  centre reste au même endroit quel que soit l'écran. Le décor
                  suivant est donc dessiné, lui aussi, au centre du précédent.
   Les fenêtres se chevauchent : c'est ce qui enchaîne les plans.
   ========================================================================== */
export const scenes = [
  { nom: 'ville', debut: 0, fin: 0.3, facteur: 7, cible: [50, 50] },
  { nom: 'immeuble', debut: 0.22, fin: 0.52, facteur: 7, cible: [50, 50] },
  { nom: 'fenetre', debut: 0.44, fin: 0.72, facteur: 6.5, cible: [50, 50] },
  // la chambre ne s'arrête pas en route : elle continue de grossir jusqu'au
  // bout, pour qu'on voie le bureau et la lampe s'écarter autour de l'écran
  { nom: 'chambre', debut: 0.64, fin: 1, facteur: 7, cible: [50, 50] },
  // le dernier plan n'est pas un deuxième écran : c'est le CONTENU affiché
  // sur la dalle de l'écran de la chambre, calé exactement dessus
  { nom: 'ecran', debut: 0.86, fin: 1, facteur: 2.14, cible: [50, 50] }
]

/** Hauteur de la piste de scroll : plus c'est grand, plus le zoom est lent. */
export const hauteurPiste = '640vh'

/** Les légendes qui défilent pendant le zoom, avec leur moment d'apparition. */
export const reperes = [
  { a: 0.02, texte: 'Quelque part dans une ville, un soir' },
  { a: 0.26, texte: 'Un immeuble parmi les autres' },
  { a: 0.5, texte: 'Une fenêtre encore allumée' },
  { a: 0.7, texte: 'Une chambre, un bureau' },
  { a: 0.88, texte: 'Et sur le bureau, un écran' }
]

/** Libellés de ce thème pour les données de l'API. */
export const theme = {
  // faits de l'identité (identite.faits), relabellisés par leur `cle`
  libellesFaits: {},
  // types d'expérience (experiences[].type)
  types: {
    alternance: 'Alternance',
    stage: 'Stage',
    emploi: 'Contrat',
    benevolat: 'Bénévolat'
  },
  // niveaux de compétence (competences.groupes[].niveau)
  niveaux: {
    quotidien: 'Au quotidien',
    solide: 'Solide',
    specialite: 'Spécialité',
    apprentissage: 'En apprentissage'
  },
  // le nom de la fenêtre affichée sur l'écran
  fenetreTitre: 'à-propos.md',
  invite: 'Défile pour entrer'
}
