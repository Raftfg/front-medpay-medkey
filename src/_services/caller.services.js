// import axios from "axios";



// const baseURL =
//     process.env.NODE_ENV === "production" ?
//     "https://api-medkey.akasigroup.net/api/v1" :
//     "http://localhost:8000/api/v1";

// const Axios = axios.create({
//     baseURL: baseURL,
// });

// export default Axios;

import axios from "axios";
import cacheService from "./cache.service";

// Variable pour éviter les doublons de toasts d'erreur réseau
let lastNetworkErrorToastTime = 0;
const NETWORK_ERROR_TOAST_COOLDOWN = 5000; // 5 secondes entre les toasts d'erreur réseau

// Configuration du retry pour les erreurs réseau
const MAX_RETRIES = 3; // Nombre maximum de tentatives
const RETRY_DELAY = 1000; // Délai initial entre les tentatives (1 seconde)
const RETRYABLE_ERROR_CODES = ['ERR_NETWORK', 'ERR_CONNECTION_RESET', 'ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED'];

/**
 * Vérifie si une erreur est retryable (erreur réseau temporaire)
 */
const isRetryableError = (error) => {
    if (!error) return false;

    // Ne pas retry si c'est une erreur HTTP (4xx, 5xx avec réponse)
    if (error.response) return false;

    // Ne pas retry si c'est une erreur CORS
    if (error.message?.includes('CORS') || error.message?.includes('Access-Control')) {
        return false;
    }

    // Retry pour les erreurs réseau temporaires
    return RETRYABLE_ERROR_CODES.includes(error.code) ||
        error.code === 'ERR_NETWORK' ||
        error.message?.includes('Network Error') ||
        error.message?.includes('Connection reset');
};

/**
 * Retry une requête avec backoff exponentiel
 * Note: Cette fonction sera définie après la création de l'instance Axios
 */
let retryRequest = null;

/**
 * Détecte automatiquement la base URL selon l'environnement et le domaine tenant
 * En production multi-tenant, chaque hôpital a son propre domaine
 * Ex: hopital1.com -> api.hopital1.com ou hopital1.com/api
 */
const getBaseURL = () => {
    if (process.env.NODE_ENV === "production") {
        const currentDomain = window.location.hostname;

        // Si le domaine contient déjà "api.", utiliser tel quel
        if (currentDomain.startsWith("api.")) {
            return `https://${currentDomain}/api/v1`;
        }

        // Sinon, construire l'URL API selon la configuration
        // Option 1: Sous-domaine API (api.hopital1.com)
        // Option 2: Même domaine (/api/v1)
        // Pour l'instant, on utilise le même domaine avec /api/v1
        return `https://${currentDomain}/api/v1`;
    }

    // Développement local : support des sous-domaines (ex: hopital1.localhost)
    const currentDomain = window.location.hostname;
    const currentPort = window.location.port;

    // En développement, pointer directement vers Laravel sur le port 8000
    // Cela évite les problèmes de proxy et garantit que les requêtes arrivent bien à Laravel

    // Si on est sur localhost ou 127.0.0.1 standard, on garde le port 8000 par défaut
    if (currentDomain === 'localhost' || currentDomain === '127.0.0.1') {
        return "http://127.0.0.1:8000/api/v1";
    }

    // Pour les sous-domaines (ex: hopital1.localhost), pointer vers localhost:8000
    // Le header Host sera envoyé par Axios et préservé pour le middleware tenant
    // On utilise toujours le port 8000 pour Laravel en développement
    return "http://127.0.0.1:8000/api/v1";
};

const baseURL = getBaseURL();

// Debug: Afficher l'URL de base en développement
if (process.env.NODE_ENV !== "production") {
    console.log("[DEBUG] Base URL configurée:", baseURL);
}

const Axios = axios.create({
    baseURL: baseURL,
    timeout: 30000, // 30 secondes de timeout (augmenté pour les requêtes lourdes et le cache initial)
});

/**
 * Retry une requête avec backoff exponentiel
 */
retryRequest = async (config, retryCount = 0) => {
    if (retryCount >= MAX_RETRIES) {
        throw new Error(`Échec après ${MAX_RETRIES} tentatives`);
    }

    // Délai exponentiel : 1s, 2s, 4s
    const delay = RETRY_DELAY * Math.pow(2, retryCount);

    // Attendre avant de réessayer
    await new Promise(resolve => setTimeout(resolve, delay));

    // Réessayer la requête (Axios clone automatiquement le config)
    console.log(`[Retry] Tentative ${retryCount + 1}/${MAX_RETRIES} pour ${config.url}`);

    // Créer une nouvelle config pour éviter de modifier l'original
    const retryConfig = {
        ...config,
        _retryCount: retryCount + 1
    };

    return Axios.request(retryConfig);
};
// const Axios = axios.create({
//         // baseURL: 'https://api-medpay.akasigroup.net/api'
//   baseURL: "http://127.0.0.1:8000/api",
// });

Axios.defaults.headers.common["Content-Type"] = "application/json";

/**
 * Wrapper pour localStorage (anciennement utilisé pour l'isolation par tenant)
 * L'isolation est maintenant gérée par le backend via une base de données par hôpital.
 */
const tenantStorage = {
    getItem: (key) => {
        return localStorage.getItem(key);
    },
    setItem: (key, value) => {
        localStorage.setItem(key, value);
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    },
    clear: () => {
        // Nettoyer explicitement les clés liées à la session
        const sessionKeys = ["user", "access_token", "loggedIn", "permission", "hospital_id", "token"];
        sessionKeys.forEach(key => localStorage.removeItem(key));
    }
};

Axios.interceptors.request.use(
    function (config) {
        // Debug: Afficher l'URL complète en développement
        if (process.env.NODE_ENV !== "production") {
            const fullUrl = (config.baseURL || '') + (config.url || '');
            // Construire l'URL avec les paramètres de query
            let urlWithParams = fullUrl;
            if (config.params && Object.keys(config.params).length > 0) {
                const queryString = new URLSearchParams(config.params).toString();
                urlWithParams = fullUrl + (fullUrl.includes('?') ? '&' : '?') + queryString;
            }
            console.log("[DEBUG] Requête API:", {
                method: config.method,
                baseURL: config.baseURL,
                url: config.url,
                fullUrl: urlWithParams,
                params: config.params,
                originalHost: window.location.hostname + ':' + window.location.port,
                headers: config.headers
            });

            // Vérifier que l'URL ne pointe pas vers le port 8080
            if (fullUrl.includes(':8080')) {
                console.error("[ERREUR] L'URL pointe vers le port 8080 au lieu de 8000!", {
                    baseURL: config.baseURL,
                    url: config.url,
                    fullUrl: fullUrl
                });
            }
        }

        // OPTIMISATION: Vérifier le cache pour les requêtes GET
        if (config.method === 'get' && cacheService.shouldCache(config.method, config.url)) {
            const cached = cacheService.get(config.url, config.params);
            if (cached !== null) {
                // Retourner une réponse mockée depuis le cache
                return Promise.reject({
                    __fromCache: true,
                    data: cached,
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                    config: config
                });
            }
        }

        // OPTIMISATION: Ajouter un timestamp pour éviter les requêtes dupliquées
        config.metadata = { startTime: Date.now() };

        // Ajouter le token d'authentification
        const token = tenantStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        // Ajouter l'ID de l'hôpital pour identification du tenant par le backend (Expert-fix)
        const hospitalId = localStorage.getItem("hospital_id");
        if (hospitalId) {
            config.headers["X-Hospital-Id"] = hospitalId;
        }

        // En développement, préserver le domaine original pour le middleware tenant
        // Cela permet d'identifier l'hôpital même si on pointe vers localhost:8000
        if (process.env.NODE_ENV !== "production") {
            const originalHost = window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            if (originalHost && originalHost !== 'localhost:8000' && originalHost !== '127.0.0.1:8000') {
                // Ajouter le header Host original pour que le middleware tenant puisse identifier l'hôpital
                config.headers["X-Original-Host"] = originalHost;
                // Le backend utilisera ce header pour identifier le tenant
            }
        }

        // Headers par défaut
        config.headers["Accept"] = "application/json";
        config.headers["Accept-Language"] = "fr";

        // NOTE: Accept-Encoding est géré automatiquement par le navigateur
        // Ne pas le définir manuellement car cela cause une erreur "Refused to set unsafe header"

        return config;
    },
    function (error) {
        // Si c'est une réponse depuis le cache, la retourner comme succès
        if (error && error.__fromCache) {
            return Promise.resolve({
                data: error.data,
                status: error.status,
                statusText: error.statusText,
                headers: error.headers,
                config: error.config
            });
        }

        // Gestion des erreurs de requête (réseau, timeout, etc.)
        const errorMessage = error?.message || error?.toString() || JSON.stringify(error) || "Erreur de requête inconnue";
        console.error("Erreur de requête:", errorMessage, error);
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    function (response) {
        // OPTIMISATION: Mesurer le temps de réponse
        if (response.config.metadata) {
            const duration = Date.now() - response.config.metadata.startTime;
            if (duration > 1000) {
                console.warn(`[Performance] Requête lente: ${response.config.url} (${duration}ms)`);
            }
        }

        // OPTIMISATION: Mettre en cache les réponses GET réussies
        const config = response.config;
        if (config && config.method === 'get' && cacheService.shouldCache(config.method, config.url)) {
            // Mettre en cache avec TTL personnalisé selon l'endpoint
            let ttl = 5 * 60 * 1000; // 5 minutes par défaut

            // Cache plus long pour les données statiques
            if (config.url.includes('/users') || config.url.includes('/roles') || config.url.includes('/permissions')) {
                ttl = 15 * 60 * 1000; // 15 minutes
            }

            // Cache plus court pour les données dynamiques
            if (config.url.includes('/patients') || config.url.includes('/movments') || config.url.includes('/factures')) {
                ttl = 1 * 60 * 1000; // 1 minute (optimisé pour meilleure réactivité)
            }

            // Pas de cache pour les recherches (données toujours fraîches)
            if (config.url.includes('/search') || config.url.includes('/filter')) {
                return response; // Ne pas mettre en cache les recherches
            }

            cacheService.set(config.url, config.params, response.data, ttl);
        }

        // Succès: retourner la réponse telle quelle
        return response;
    },
    function (error) {
        // 1. GESTION DES REQUÊTES ANNULÉES (priorité absolue pour éviter les logs inutiles)
        // Les requêtes annulées (via CancelToken ou AbortController) ne sont pas de vraies erreurs
        if (axios.isCancel(error) ||
            error.code === 'ERR_CANCELED' ||
            error.code === 'ECONNABORTED' ||
            error.message?.includes('canceled') ||
            error.message?.includes('aborted') ||
            error.message?.includes('Cancelled')) {
            console.debug("Requête annulée (ignorée):", error.config?.url);
            return Promise.reject(error);
        }

        // Si c'est une réponse depuis le cache, la retourner comme succès
        // (au cas où elle n'aurait pas été interceptée par l'intercepteur de requête)
        if (error && error.__fromCache) {
            return Promise.resolve({
                data: error.data,
                status: error.status || 200,
                statusText: error.statusText || 'OK',
                headers: error.headers || {},
                config: error.config || {}
            });
        }

        // Gestion complète des erreurs HTTP
        if (error.response) {
            // ... (le reste du code reste identique jusqu'à error.request)
            const status = error.response.status;
            const url = error.response.config?.url || '';
            const message = error.response.data?.message || error.response.data?.erreur || "Une erreur est survenue";

            // Ignorer silencieusement les endpoints supprimés
            if (url.includes('/hospital-settings') || url.includes('/settings/public') || url.includes('/settings/group')) {
                return Promise.reject(error);
            }

            switch (status) {
                case 401:
                    // Cas d'erreur : non authentifié ou session expirée
                    {
                        const isUnauthenticated = status === 401 ||
                            error.response.data?.message === "Unauthenticated." ||
                            error.response.data?.message?.includes("Unauthenticated");

                        if (isUnauthenticated) {
                            // 1. Nettoyage TOTAL et IMMEDIAT pour arrêter toute autre requête d'API
                            tenantStorage.clear();

                            // 2. Rediriger vers le login UNIQUEMENT si on n'y est pas déjà
                            const currentPath = window.location.pathname;
                            if (currentPath !== "/auth-pages/login" && currentPath !== "/login") {
                                console.warn(`Session expirée (401) sur ${error.config.url}. Redirection depuis ${currentPath} vers /auth-pages/login.`);
                                window.location.href = "/auth-pages/login";
                            }
                        }
                    }
                    break;

                case 403:
                    // Accès refusé - Afficher message d'erreur
                    console.error("Accès refusé:", message);
                    // Optionnel: Afficher une notification à l'utilisateur
                    if (window.Vue && window.Vue.prototype.$toast) {
                        window.Vue.prototype.$toast.error("Vous n'avez pas l'autorisation d'accéder à cette ressource.");
                    }
                    break;

                case 404:
                    // Ressource non trouvée - Ne pas afficher de toast, juste logger silencieusement
                    console.debug("Ressource non trouvée:", url);
                    break;

                case 422:
                    // Erreur de validation - Les erreurs de validation sont généralement gérées par les composants
                    // Ne pas afficher de toast global, laisser les composants gérer
                    console.debug("Erreur de validation:", error.response.data);
                    break;

                case 500:
                case 502:
                case 503:
                    // Erreur serveur - Afficher uniquement si ce n'est pas une erreur silencieuse
                    console.error("Erreur serveur:", message);
                    if (window.Vue && window.Vue.prototype.$toast && !error.config?.silent) {
                        window.Vue.prototype.$toast.error("Une erreur serveur est survenue. Veuillez réessayer plus tard.");
                    }
                    break;

                default:
                    // Autres erreurs HTTP - Ne pas afficher de toast, juste logger
                    console.debug(`Erreur HTTP ${status}:`, message);
            }

            // IMPORTANT: Retourner ici pour éviter de traiter comme une erreur réseau
            return Promise.reject(error);
        } else if (error.request) {
            // Erreur réseau (pas de réponse du serveur)
            const url = error.config?.url || '';
            const config = error.config || {};

            // Ignorer silencieusement les endpoints supprimés
            if (url.includes('/hospital-settings') || url.includes('/settings/public') || url.includes('/settings/group')) {
                return Promise.reject(error);
            }

            // Ne pas afficher d'erreur pour les requêtes qui ont été explicitement ignorées
            if (config.skipErrorHandler || config.silent) {
                return Promise.reject(error);
            }

            // RETRY AUTOMATIQUE pour les erreurs réseau retryables
            // Vérifier si on peut retry et si on n'a pas déjà atteint le maximum
            const currentRetryCount = config._retryCount || 0;

            if (isRetryableError(error) && currentRetryCount < MAX_RETRIES) {
                // Essayer de récupérer depuis le cache d'abord (pour les requêtes GET)
                if ((config.method === 'get' || !config.method) && currentRetryCount === 0) {
                    const cached = cacheService.get(config.url, config.params);
                    if (cached !== null) {
                        console.log(`[Cache Fallback] Utilisation du cache pour ${url}`);
                        return Promise.resolve({
                            data: cached,
                            status: 200,
                            statusText: 'OK (from cache)',
                            headers: {},
                            config: config,
                            __fromCache: true
                        });
                    }
                }

                // Si pas de cache ou cache non disponible, essayer le retry
                const nextRetryCount = currentRetryCount + 1;
                config._retryCount = nextRetryCount;

                console.log(`[Retry] Tentative ${nextRetryCount}/${MAX_RETRIES} pour ${url}`);

                // Retry avec backoff exponentiel (passer currentRetryCount car retryRequest l'incrémente)
                return retryRequest(config, currentRetryCount).catch((retryError) => {
                    // Si le retry échoue aussi, continuer avec la gestion d'erreur normale
                    console.warn(`[Retry] Échec après ${nextRetryCount} tentatives pour ${url}`);
                    // Marquer comme ayant atteint le maximum pour éviter les boucles infinies
                    config._retryCount = MAX_RETRIES;
                    return Promise.reject(retryError);
                });
            }

            // Vérifier si c'est une erreur CORS (bloquée par le navigateur, pas un vrai problème de connexion)
            // Les erreurs CORS se manifestent comme ERR_NETWORK avec "Network Error"
            // Caractéristiques d'une erreur CORS :
            // - error.code === 'ERR_NETWORK'
            // - error.message === 'Network Error'
            // - error.request.status === 0 (pas de statut HTTP car bloqué par le navigateur)
            // - Pas de error.response (pas de réponse du serveur)
            // - Pas de error.request.responseText (pas de réponse)
            const request = error.request;

            // Détection complète des erreurs CORS
            const isCorsError =
                // Erreur mentionnant explicitement CORS dans le message
                error.message?.includes('CORS') ||
                error.message?.includes('Access-Control') ||
                error.message?.includes('blocked by CORS policy') ||
                // ERR_NETWORK avec Network Error ET status 0 (caractéristique des erreurs CORS)
                (error.code === 'ERR_NETWORK' &&
                    error.message === 'Network Error' &&
                    request &&
                    (request.status === 0 ||
                        !request.responseText ||
                        request.readyState === 0)); // Requête jamais envoyée (bloquée par CORS)

            if (isCorsError) {
                // Erreur CORS - ignorer silencieusement (problème de configuration backend, pas de connexion)
                console.debug("Erreur CORS ignorée:", url, {
                    code: error.code,
                    message: error.message,
                    status: request?.status,
                    readyState: request?.readyState
                });
                return Promise.reject(error);
            }

            // Vérifier si c'est vraiment une erreur réseau critique
            // Seules les erreurs réseau réelles (serveur inaccessible, timeout, DNS) doivent afficher le toast
            const isRealNetworkError =
                error.code === 'ECONNREFUSED' || // Serveur inaccessible
                error.code === 'ETIMEDOUT' ||     // Timeout
                error.code === 'ENOTFOUND';        // DNS non résolu

            // ERR_NETWORK peut être CORS (déjà vérifié) ou une vraie erreur réseau
            // On considère que c'est une vraie erreur réseau seulement si :
            // - Ce n'est pas une erreur CORS (déjà vérifié)
            // - ET la requête a été envoyée mais a échoué (readyState === 4)
            // - ET on a un statut HTTP (pas 0)
            if (!isRealNetworkError && error.code === 'ERR_NETWORK') {
                // ERR_NETWORK qui n'est pas CORS - vérifier si c'est vraiment une erreur réseau
                const hasHttpStatus = request && request.status && request.status !== 0;
                const requestCompleted = request && request.readyState === 4;

                // Si la requête n'a pas de statut HTTP ou n'a pas été complétée, c'est probablement CORS
                // (même si la détection précédente ne l'a pas capturé)
                if (!hasHttpStatus || !requestCompleted) {
                    console.debug("Erreur réseau probablement CORS (ignorée):", url, {
                        code: error.code,
                        status: request?.status,
                        readyState: request?.readyState
                    });
                    return Promise.reject(error);
                }
            }

            if (!isRealNetworkError) {
                // Ce n'est pas une vraie erreur réseau critique, juste logger
                console.debug("Erreur réseau non critique:", error.code, error.message || error.toString(), url);
                return Promise.reject(error);
            }

            // C'est une vraie erreur réseau - afficher le toast avec cooldown
            const errorMessage = error.message || error.toString() || "Erreur réseau inconnue";
            console.error("Erreur réseau critique:", errorMessage, error);

            // Détecter spécifiquement ERR_CONNECTION_REFUSED pour donner un message plus clair
            const isConnectionRefused =
                error.code === 'ERR_CONNECTION_REFUSED' ||
                error.code === 'ECONNREFUSED' ||
                error.message?.includes('Connection refused') ||
                error.message?.includes('ECONNREFUSED');

            // Éviter les doublons de toasts (cooldown de 5 secondes)
            const now = Date.now();
            if (window.Vue && window.Vue.prototype.$toast &&
                (now - lastNetworkErrorToastTime) > NETWORK_ERROR_TOAST_COOLDOWN) {
                lastNetworkErrorToastTime = now;

                if (isConnectionRefused) {
                    // Message spécifique pour ERR_CONNECTION_REFUSED
                    const baseURL = error.config?.baseURL || 'http://localhost:8000';
                    window.Vue.prototype.$toast.error(
                        `Serveur API non accessible sur ${baseURL}. Veuillez démarrer le serveur Laravel avec 'php artisan serve'.`,
                        {
                            timeout: 8000, // Message plus long pour cette erreur critique
                            position: 'top-right'
                        }
                    );
                } else {
                    // Message générique pour les autres erreurs réseau
                    window.Vue.prototype.$toast.error("Problème de connexion. Vérifiez votre connexion internet.");
                }
            }
        } else {
            // Erreur lors de la configuration de la requête
            const errorMessage = error?.message || error?.toString() || JSON.stringify(error) || "Erreur de configuration inconnue";
            console.error("Erreur de configuration:", errorMessage, error);
            // Ne pas afficher de toast pour les erreurs de configuration
        }

        return Promise.reject(error);
    }
);

// Exporter aussi tenantStorage pour utilisation dans d'autres fichiers
export { tenantStorage };
export default Axios;