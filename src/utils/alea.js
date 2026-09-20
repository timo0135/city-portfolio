/* Tirage pseudo-aléatoire déterministe : la ville est toujours dessinée à
   l'identique d'une visite à l'autre, et le rendu serveur donnerait la même
   image que le navigateur. */
export function alea(graine) {
  let x = graine >>> 0 || 1
  return () => {
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    x >>>= 0
    return x / 4294967296
  }
}

/** Génère la grille de fenêtres d'une façade. */
export function fenetres({ x, y, largeur, hauteur, colonnes, rangees, graine, densite = 0.5 }) {
  const rnd = alea(graine)
  const marge = largeur * 0.1
  const pasX = (largeur - marge * 2) / colonnes
  const pasY = (hauteur - marge) / rangees
  const l = pasX * 0.56
  const h = pasY * 0.5
  const out = []
  for (let c = 0; c < colonnes; c++) {
    for (let r = 0; r < rangees; r++) {
      const allumee = rnd() < densite
      out.push({
        key: `${c}-${r}`,
        x: x + marge + c * pasX + (pasX - l) / 2,
        y: y + marge + r * pasY,
        l,
        h,
        allumee,
        chaleur: rnd()
      })
    }
  }
  return out
}
