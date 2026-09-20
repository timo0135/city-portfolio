/* ==========================================================================
   API → ÉCRAN
   --------------------------------------------------------------------------
   Les données de l'API sont neutres : elles ne connaissent ni la ville, ni la
   chambre, ni l'écran. Ce fichier les met en forme pour ce thème — et lui
   seul. Les autres portfolios font la même chose de leur côté.
   ========================================================================== */

const etiquette = (t) => (typeof t === 'string' ? { texte: t, enAvant: false } : { texte: t.label, enAvant: !!t.enAvant })

export function versEcran(api, theme) {
  const { identite = {}, reseaux = {}, experiences = [], projets = [], competences = {}, contact = {} } = api

  const sujet = contact.sujetMail ? `?subject=${encodeURIComponent(contact.sujetMail)}` : ''

  return {
    pilote: {
      nom: identite.nom,
      titre: identite.titre || identite.titreCourt,
      situation: identite.situation,
      bio: identite.bio,
      photo: identite.photo?.src ? identite.photo : null,
      lieu: [identite.ville, identite.region].filter(Boolean).join(', '),
      disponible: identite.disponible,
      disponibilite: identite.disponibilite,
      faits: (identite.faits || []).map((f) => ({
        label: theme.libellesFaits?.[f.cle] ?? f.label,
        valeur: f.valeur
      })),
      pointsForts: identite.pointsForts || []
    },

    experiences: experiences.map((e) => ({
      id: e.id,
      type: theme.types?.[e.type] ?? e.type,
      periode: [e.periode, e.duree].filter(Boolean).join(' · '),
      poste: e.poste,
      ou: [e.organisation, e.lieu].filter(Boolean).join(' · '),
      texte: e.description,
      points: e.points || [],
      tags: (e.tags || []).map(etiquette)
    })),

    projets: projets.map((p) => ({
      id: p.id,
      titre: p.titre,
      contexte: p.contexte,
      texte: p.description,
      image: p.images?.[0]?.src ? p.images[0] : null,
      fiche: p.fiche || [],
      points: p.points || [],
      liens: (p.liens || []).filter((l) => l.url),
      tags: (p.tags || []).map(etiquette)
    })),

    competences: {
      groupes: (competences.groupes || []).map((g) => ({
        titre: theme.niveaux?.[g.niveau] ?? g.label,
        items: g.items || [],
        precision: g.precision || ''
      })),
      notes: competences.notes || []
    },

    contact: {
      message: contact.message,
      zone: contact.zone,
      email: reseaux.email,
      mailto: reseaux.email ? `mailto:${reseaux.email}${sujet}` : '',
      liens: [
        { label: 'GitHub', url: reseaux.github },
        { label: 'LinkedIn', url: reseaux.linkedin },
        { label: 'CV (PDF)', url: reseaux.cv }
      ].filter((l) => l.url)
    }
  }
}
