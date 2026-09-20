# Ville, chambre, écran

Portfolio interactif : on arrive sur une ville de nuit, et le scroll fait
**zoomer sans interruption sur la ville, puis sur un immeuble, puis sur la
seule fenêtre encore allumée, puis sur la chambre derrière, puis sur l'écran
posé sur le bureau** — et cet écran affiche le portfolio.

Vite + Vue 3, sans dépendance d'exécution autre que Vue. Tous les décors sont
des SVG écrits à la main : aucune image à charger.

**Le contenu (bio, expériences, projets, compétences, contact) vient de
[portfolio-api](../portfolio-api)**, l'API partagée par tous mes portfolios.
Ce dépôt ne contient que la mise en scène.

Il fait partie d'un trio :

| Dépôt | Rôle |
| --- | --- |
| [portfolio-api](https://github.com/timo0135/portfolio-api) | les données, partagées par tous les portfolios |
| [circuit-portfolio](https://github.com/timo0135/circuit-portfolio) | le même contenu en circuit de Formule 1 |
| **city-portfolio** (ce dépôt) | le même contenu au bout d'un zoom sur une ville |

Changer une ligne dans l'API met les deux portfolios à jour, sans rebuild.

---

## Démarrer

Lancer d'abord l'API (dans `../portfolio-api`) :

```bash
docker compose up -d             # -> http://localhost:3000
```

Puis le portfolio :

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # génère dist/
npm run preview    # sert dist/ sur http://localhost:4173
```

Avec Docker :

```bash
docker compose up --build            # build + nginx  -> http://localhost:8081
docker compose up dev                # serveur Vite   -> http://localhost:5174
```

L'adresse de l'API se règle avec `VITE_API_URL` (défaut `http://localhost:3000`) :
copier `.env.example` en `.env`. C'est le navigateur du visiteur qui appelle
l'API, et la valeur est figée au build.

---

## Comment marche le zoom

Une seule valeur pilote tout : **la progression**, de 0 (la ville de loin) à 1
(l'écran). Elle vient de la position de scroll dans une longue section
(`hauteurPiste`), et les décors ne défilent pas avec la page : ils sont empilés
dans un cadre fixe et **grossissent**.

Chaque décor occupe une fenêtre `[debut, fin]` de cette progression. Pendant la
sienne, il grossit de 1 à `facteur` — de façon exponentielle, sinon le zoom
paraît ralentir. Les fenêtres se **chevauchent** : le décor précédent continue
de grossir en s'effaçant pendant que le suivant apparaît. C'est ce croisement
qui donne l'impression d'un seul mouvement continu.

Tout se règle dans **`src/data/scene.js`** :

```js
{ nom: 'immeuble', debut: 0.22, fin: 0.52, facteur: 7, cible: [50, 50] }
```

- `debut` / `fin` : quand le décor est à l'écran ;
- `facteur` : de combien il grossit ;
- `hauteurPiste` : la longueur de la piste de scroll — plus elle est grande,
  plus le zoom est lent.

**Il n'y a qu'un seul écran dans tout le zoom**, et même une seule chambre :
elle est dessinée une fois pour toutes dans `ChambreDecor.vue`, puis affichée
deux fois — en petit derrière la vitre du plan « fenêtre », en grand au plan
« chambre ». L'échelle de la miniature n'est pas choisie à l'œil : elle est
**calculée** depuis les réglages des deux plans pour qu'au moment du fondu,
les deux images se superposent exactement. Changer `facteur` ou `debut` d'un
de ces deux plans ne casse donc rien.

L'écran, lui, est celui posé sur le bureau de cette chambre. Le dernier plan ne redessine pas de moniteur, il se contente
d'afficher le contenu **sur la dalle** de celui-là, à la taille exacte qu'elle
occupe au moment où les deux se croisent. La chambre, elle, continue de
grossir jusqu'au bout : le bureau et la lampe s'écartent pendant qu'on entre
dans l'écran.

**La règle à respecter en redessinant un décor** : ce qu'on verra ensuite doit
être **au centre exact** du SVG (800, 450 dans un `viewBox` de 1600 × 900). Les
décors sont recadrés selon la forme de l'écran, et seul le centre reste au même
endroit quel que soit l'écran. C'est pour ça que la fenêtre allumée est au
centre de la ville, que le bureau est au centre de la fenêtre, et que l'écran
est au centre de la chambre.

---

## Structure

```
.
├── index.html
├── Dockerfile / docker-compose.yml / nginx.conf
├── .env.example               VITE_API_URL : l'adresse de l'API
└── src/
    ├── App.vue                la piste de scroll, les décors empilés, le contenu
    ├── api/
    │   ├── client.js          appel à l'API (VITE_API_URL)
    │   └── versEcran.js       données neutres de l'API → contenu de l'écran
    ├── composables/
    │   └── useZoom.js         progression du scroll → échelle de chaque décor
    ├── data/
    │   └── scene.js           le déroulé du zoom, les légendes, les libellés
    ├── scenes/
    │   ├── VilleScene.vue     plan 1 — la ville, la lune, les tours
    │   ├── ImmeubleScene.vue  plan 2 — la façade et sa fenêtre allumée
    │   ├── FenetreScene.vue   plan 3 — la fenêtre de près
    │   ├── ChambreScene.vue   plan 4 — la chambre, en grand
    │   ├── ChambreDecor.vue   la chambre elle-même, partagée avec le plan 3
    │   └── EcranScene.vue     plan 5 — le contenu posé sur la dalle de l'écran
    ├── components/
    │   └── ContenuEcran.vue   le portfolio affiché sur l'écran
    ├── utils/alea.js          tirage déterministe : la ville est toujours la même
    └── assets/styles/         tokens.css (couleurs, typos) et base.css
```

---

## Modifier le contenu

Dans l'API : `../portfolio-api/data/profil.json`. Le changement apparaît sur ce
portfolio **et sur les autres**, sans rebuild.

Ce dépôt ne décide que de la présentation. Dans `src/data/scene.js`, `theme`
traduit les valeurs neutres de l'API dans le vocabulaire du site : les `type`
d'expérience, les `niveau` de compétence, les libellés des faits.

---

## Accessibilité

- Un lien « Aller directement au contenu » en tout premier au clavier, et un
  bouton « Passer l'intro » toujours visible : le zoom n'est jamais un passage
  obligé.
- Les décors sont `aria-hidden` : un lecteur d'écran lit le contenu, pas la
  mise en scène.
- `prefers-reduced-motion` raccourcit fortement la piste de scroll et coupe les
  animations d'ambiance.
- Le contenu est du vrai texte, navigable et sélectionnable, jamais une image.

---

## Déployer

L'API doit être déployée d'abord, en HTTPS, et son URL passée au build via
`VITE_API_URL`.

- **Netlify / Vercel** : build `npm run build`, dossier publié `dist`.
- **GitHub Pages** : `npm run build` puis publier `dist/` (`base: './'` gère
  déjà le sous-dossier).
- **Un serveur à toi** : `docker compose up --build -d`, nginx sert sur le port 8081.
