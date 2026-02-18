# Medkey - Frontend (Interface Patient)

## 📌 Contexte du Projet

Ce projet constitue l'interface utilisateur de la plateforme **Medkey**, une solution de gestion de Dossier Médical Électronique (DME). Elle permet aux praticiens et au personnel hospitalier de gérer les dossiers patients (antécédents, allergies, vaccinations, prescriptions) de manière intuitive et sécurisée.

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
