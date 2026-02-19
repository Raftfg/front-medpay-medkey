# Rapport d’intégration du template Flex-IT (medkey)

Analyse comparative : `flex-it-html5-website-template` → projet Vue `front-medpay-medkey`.

---

## 1. Ce qui est correctement intégré

### 1.1 CSS (FlexItLayout.vue)
Tous les CSS du template utilisés dans le layout sont importés :

| Template (`index.html`) | Projet (`FlexItLayout.vue`) | Statut |
|-------------------------|-----------------------------|--------|
| `css/vendors/bootstrap.min.css` | `@/assets/flex-it/css/vendors/bootstrap.min.css` | OK |
| `css/vendors/animate.css` | idem | OK |
| `css/vendors/swiper-bundle.min.css` | idem | OK |
| `css/vendors/flaticon/flaticon.css` | idem | OK |
| `css/vendors/all.min.css` | idem | OK |
| `css/vendors/bootstrap-icons-1.9.1/bootstrap-icons.css` | idem | OK |
| `css/vendors/jquery.fancybox.min.css` | idem | OK |
| `css/main-LTR.css` | `@/assets/flex-it/css/main-LTR.css` | OK |

Police Google (Jost) : importée dans le layout.

### 1.2 JavaScript
- **main.js template** : copié et adapté sous `src/assets/flex-it/js/main.js` (logique encapsulée dans `window.initFlexItTemplate()`).
- **Vendors chargés dans l’app** :  
  `main.js` (Vue) charge jQuery, Swiper, WOW et `@/assets/flex-it/js/main.js`.
- **Init au bon moment** : `FlexItLayout.vue` appelle `initFlexItTemplate()` après `$nextTick` + délai 300 ms pour ré-attacher les listeners (menu, search, sticky côté jQuery, etc.).

### 1.3 Composants Vue “FlexIt”
Les blocs du template ont été transposés en composants réutilisables et utilisés dans les pages d’accueil :

- **Layout** : `FlexItLayout`, `FlexItHeader`, `FlexItFooter`, `FlexItNavbar`, etc.
- **Sections** : Hero, Services, About, Portfolio, Testimonials, Stats, Blog, CTA, Breadcrumb, etc.
- **Pages** : `FlexItAccueil`, `FlexItAbout`, `FlexItServices`, `FlexItPortfolio`, `FlexItBlog`, `FlexItContact`, `FlexItPricing`, `FlexItFAQ`, `FlexItTeam`, plus Home1–4, Home6, BlogSingle, PortfolioSingle, ServiceSingle, TeamMember, NotFound.

Routes sous `FlexItLayout` : `/`, `/home-5`, `/about-us`, `/services`, `/portfolio`, `/blog`, `/contact-us`, `/pricing`, `/faq`, `/our-team`, etc.

### 1.4 Comportement header (sticky)
- La logique “sticky” au scroll est gérée **dans le composant** `FlexItHeader.vue` (état `isSticky`, listener `scroll`), en plus de l’init jQuery, pour garantir le fond bleu au défilement même si `initFlexItTemplate` s’exécute avant le montage du header.

---

## 2. Écarts et points d’attention

### 2.1 Fichiers JS du template non utilisés (ou partiellement)
Le template original charge dans `index.html` des scripts qui ne sont **pas** tous référencés dans le bundle Vue (ou seulement via le `main.js` Flex-IT) :

| Fichier template | Dans le projet | Remarque |
|------------------|----------------|----------|
| `jquery-3.6.1.min.js` | Fourni par le projet (npm ou global) | OK si jQuery est dispo avant flex-it/main.js |
| `appear.min.js` | Présent dans `flex-it/js/vendors/` | Non chargé explicitement dans `main.js` Vue ; utilisé seulement si `initFlexItTemplate` le suppose |
| `bootstrap.bundle.min.js` | Présent dans `flex-it/js/vendors/` | Idem |
| `jquery.countTo.js` | Présent | Utilisé par le template pour les compteurs |
| `wow.min.js` | Chargé dans `main.js` (Vue) + `window.WOW` | OK |
| `swiper-bundle.min.js` | Chargé dans `main.js` (Vue) + `window.Swiper` | OK |
| `particles.min.js` | Dans `flex-it/js/vendors/` | Utilisé seulement si une page a `.particles-js` ; pas chargé globalement dans `main.js` Vue |
| `vanilla-tilt.min.js` | Présent | Idem, utilisé si `[data-tilt]` |
| `isotope-min.js` | Présent | Utilisé pour le filtre portfolio dans le template |
| `jquery.fancybox.min.js` | Présent | Utilisé pour lightbox / vidéos |

**Recommandation** : Vérifier que les pages qui utilisent compteurs, particles, tilt, isotope ou fancybox chargent les bons vendors (ou les ajouter dans `main.js` / layout si besoin).

### 2.2 Images du template manquantes dans le projet
Le dossier **template** (`flex-it-html5-website-template/html`) ne contient que des placeholders sous `assets/images-placeholders/` et `assets/images/icons/`.  
Le **projet Vue** référence de nombreux chemins sous `@/assets/flex-it/assets/images/` qui **n’existent pas** dans le dépôt (seuls `images/icons/` et `images-placeholders/` sont présents).

Chemins attendus par les composants FlexIt (à créer ou à copier depuis une version complète du template) :

```
src/assets/flex-it/assets/images/
├── hero/
│   ├── hero-bg-1.jpg, hero-bg-2.jpg, hero-bg-3.jpg
│   └── inner-page-hero.jpg
├── about/
│   ├── 1.png, 2.png, 4.png, 5.png
│   └── signature-dark.png, signature-light.png   (référencés dans main-LTR.css)
├── portfolio/
│   └── 1.jpg … 6.jpg
├── our-team/
│   └── 1.jpg … 8.jpg
├── testimonials/
│   └── 1.png, 2.png, 3.png
├── sections-bg-images/
│   ├── 1.jpg, 2.jpg
│   ├── pattern-bg-3.jpg
│   └── footer-bg-1.jpg
├── blog/post-images/
│   └── 1.jpg, 2.jpg, 3.jpg
├── clients-logos/
│   └── 1-white.png … 7-white.png
└── logo/
    └── logo-colored.png
```

**Risque** : erreurs au build (fichiers introuvables) ou images cassées à l’exécution sur les pages qui utilisent ces assets.

**Recommandation** :  
- Soit récupérer le jeu d’images complet du template (version achetée / livrée) et le placer dans `src/assets/flex-it/assets/images/` avec la structure ci-dessus.  
- Soit ajouter des images de remplacement ou des placeholders pour chaque fichier référencé, puis adapter les chemins si besoin.

### 2.3 main.js template vs main.js projet
- **Template original** : tout le code est dans `$(function () { ... })` (exécution au DOM ready).
- **Projet** : le même code est dans `window.initFlexItTemplate = function () { ... }`, puis appelé :
  - au DOM ready : `$(function () { window.initFlexItTemplate(); });`
  - et depuis `FlexItLayout.vue` après montage (nextTick + 300 ms).

Cela peut entraîner une double initialisation (listeners dupliqués). Le `main.js` Flex-IT utilise déjà `.off("click").on("click")` et `.off("scroll.sticky").on("scroll.sticky")` pour limiter les doublons, ce qui est correct.

### 2.4 RTL
- Le template fournit `main-RTL.css` et des pages RTL.
- Le projet importe uniquement `main-LTR.css`. Pas d’intégration RTL dans le layout actuel.  
Si une version RTL est requise, il faudra importer `main-RTL.css` et gérer la direction (classe sur `html` ou body, etc.).

---

## 3. Synthèse

| Élément | Intégré | Remarque |
|--------|--------|----------|
| CSS (vendors + main-LTR) | Oui | Complet dans FlexItLayout |
| JS principal (header, menu, search, scroll sticky) | Oui | main.js + init depuis layout + sticky dans FlexItHeader.vue |
| Swiper / WOW | Oui | Exposés globalement |
| Composants Vue FlexIt | Oui | Layout + pages accueil + sections |
| Routes sous FlexItLayout | Oui | Cohérent avec le template |
| Images hero, about, portfolio, team, etc. | Non | Dossiers / fichiers manquants sous `assets/flex-it/assets/images/` |
| Particles / CountTo / Isotope / Fancybox / Tilt | Partiel | Vendors présents mais pas tous chargés globalement ; à lier selon les pages |
| RTL | Non | Non intégré |

En l’état, **l’intégration structurelle (CSS, JS, composants, routes) est correcte**. Le point bloquant pour un rendu identique au template et sans erreurs est **l’absence des assets images** listés en 2.2 : il faut les ajouter (ou les remplacer par des placeholders) sous `front-medpay-medkey/src/assets/flex-it/assets/images/` avec la structure indiquée.
