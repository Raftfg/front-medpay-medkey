# Medkey - Frontend (Interface Patient)

## 📌 Contexte du Projet

MedKey est une plateforme de gestion des systeme d'information hospitalier qui vise à dématérialiser la gestion des recettes sanitaires et assurer la transparence dans la gestion de tout l'hopital. Son objectif est de simplifier et d'optimiser la gestion des opérations financières liées aux soins de santé.

Elle permet à l'hôpital de gérer électroniquement toutes les transactions financières liées aux soins de santé, telles que la facturation, la gestion des paiements, la gestion des patients, la gestion de la carte sanitaire, la gestion des actes médicaux et la gestion de la trésorerie.

Le frontend est conçu pour s'intégrer à un backend multi-tenant, supportant ainsi plusieurs établissements hospitaliers via une architecture modulaire.

## 🚀 Mise en route

### 📋 Prérequis Techniques

Avant de commencer, assurez-vous d'avoir une configuration compatible :
- **Node.js** : Version **14.18.x** ou **16.x** (Recommandé : utiliser `nvm` pour gérer les versions).
- **Yarn** : Version 1.22+ (ou NPM 6+).
- **Navigateur** : Chrome, Firefox ou Edge (versions récentes).

### ⚙️ Installation & Configuration

1. **Cloner le projet** :
   ```bash
   git clone <url-du-depot>
   cd front-medpay-medkey
   ```

2. **Installer les dépendances** :
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Variables d'Environnement** :
   Créez un fichier `.env` à la racine (si nécessaire) pour pointer vers l'API backend :
   ```env
   VUE_APP_API_URL=http://your-api-domain.com/api
   ```

### 💻 Commandes de Développement

- **Lancer le serveur local** (`http://localhost:8080`) :
  ```bash
  yarn serve
  ```

- **Compiler pour la production** :
  ```bash
  yarn build
  ```

- **Vérification du code (Lint)** :
  ```bash
  yarn lint
  ```

## 🛠 Stack Technique

- **Framework Core** : Vue.js 2 (Vue CLI 4)
- **Design & UI** : BootstrapVue, SASS/SCSS, Ti-Icons, Font-Awesome
- **Visualisation** : Chart.js, C3.js
- **Utilitaires** : Axios (Appels API), SweetAlert2 (Modales), HTML2PDF

## 📄 Notes Additionnelles

- **Inactivité** : Le système déconnecte automatiquement l'utilisateur après 15 minutes d'inactivité pour des raisons de sécurité.
- **Support Multi-Tenant** : Le frontend gère dynamiquement les domaines en fonction de l'établissement connecté.
