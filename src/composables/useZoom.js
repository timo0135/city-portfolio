/* ==========================================================================
   LE ZOOM
   --------------------------------------------------------------------------
   Une seule valeur pilote tout le site : `progression`, entre 0 (la ville de
   loin) et 1 (l'écran en plein cadre). Elle vient de la position de scroll
   dans une longue section ; les décors, eux, ne bougent pas avec la page :
   ils sont empilés dans un cadre fixe et grossissent.

   Chaque décor a une fenêtre [debut, fin] sur cette progression. Pendant la
   sienne, il grossit de 1 à `facteur` — de façon exponentielle, sinon le zoom
   paraît ralentir — et les décors se croisent en fondu : le précédent
   continue de grossir en s'effaçant pendant que le suivant apparaît.
   ========================================================================== */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { scenes } from '../data/scene'

const FONDU = 0.16 // part de la fenêtre consacrée à l'apparition / disparition

const borne = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))

/** Ce que le décor `i` doit afficher pour une progression donnée. */
export function etatScene(scene, progression) {
  const t = borne((progression - scene.debut) / (scene.fin - scene.debut))
  const echelle = Math.pow(scene.facteur, t)

  // fondu d'entrée (sauf pour le premier décor) et de sortie (sauf pour le
  // dernier : il reste à l'écran, c'est lui qui rejoint le contenu de la page)
  const entree = scene.debut === 0 ? 1 : borne(t / FONDU)
  const sortie = scene.fin >= 1 ? 1 : borne((1 - t) / FONDU)
  const opacite = Math.min(entree, sortie)

  return {
    actif: opacite > 0.001,
    opacite,
    t,
    style: {
      opacity: opacite,
      transform: `scale(${echelle.toFixed(4)})`,
      transformOrigin: `${scene.cible[0]}% ${scene.cible[1]}%`
    }
  }
}

export function useZoom() {
  const progression = ref(0)
  const piste = ref(null) // la longue section qui sert de piste de scroll
  const reduit =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  let raf = null

  function mesurer() {
    const el = piste.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const course = rect.height - window.innerHeight
    progression.value = course <= 0 ? 0 : borne(-rect.top / course)
  }

  function auScroll() {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = null
      mesurer()
    })
  }

  onMounted(() => {
    mesurer()
    window.addEventListener('scroll', auScroll, { passive: true })
    window.addEventListener('resize', auScroll)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', auScroll)
    window.removeEventListener('resize', auScroll)
    if (raf) cancelAnimationFrame(raf)
  })

  const etats = computed(() =>
    Object.fromEntries(scenes.map((s) => [s.nom, etatScene(s, progression.value)]))
  )

  /** Amène directement le visiteur à la fin du zoom (bouton « passer »). */
  function allerAuContenu() {
    const el = piste.value
    if (!el) return
    const haut = el.offsetTop + el.offsetHeight - window.innerHeight
    window.scrollTo({ top: haut, behavior: reduit ? 'auto' : 'smooth' })
  }

  return { progression, piste, etats, reduit, allerAuContenu }
}
