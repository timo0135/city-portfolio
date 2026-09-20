/* ==========================================================================
   CLIENT DE L'API PORTFOLIO
   --------------------------------------------------------------------------
   L'adresse de l'API se règle avec VITE_API_URL (fichier .env, variable
   d'environnement, ou argument de build Docker). Par défaut : l'API locale.
   ========================================================================== */
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

const DELAI_MS = 8000

/** Récupère toutes les données du portfolio en une requête. */
export async function chargerProfil() {
  const controle = new AbortController()
  const minuteur = setTimeout(() => controle.abort(), DELAI_MS)
  try {
    const rep = await fetch(`${API_URL}/api/v1/profil`, { signal: controle.signal })
    if (!rep.ok) throw new Error(`L'API a répondu ${rep.status}`)
    return await rep.json()
  } finally {
    clearTimeout(minuteur)
  }
}
