/**
 * Service de cache pour optimiser les performances
 * Cache les réponses API avec expiration automatique
 */

// OPTIMISATION: Utiliser le préfixe tenant pour isoler le cache
const getTenantPrefix = () => {
    const hospitalId = localStorage.getItem("hospital_id") ||
        window.location.hostname.split(".")[0] ||
        "default";
    return `${hospitalId}_`;
};

const CACHE_PREFIX = `api_cache_${getTenantPrefix()}`;
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes par défaut

/**
 * Génère une clé de cache à partir d'une URL et de paramètres
 */
const generateCacheKey = (url, params = {}) => {
    const paramsStr = JSON.stringify(params);
    return `${CACHE_PREFIX}${url}_${btoa(paramsStr)}`;
};

/**
 * Vérifie si une entrée de cache est valide
 */
const isCacheValid = (cacheEntry) => {
    if (!cacheEntry || !cacheEntry.expiresAt) {
        return false;
    }
    return Date.now() < cacheEntry.expiresAt;
};

/**
 * Service de cache pour les requêtes API
 */
const cacheService = {
    /**
     * Récupère une valeur du cache
     */
    get: (url, params = {}) => {
        try {
            const key = generateCacheKey(url, params);
            const cached = localStorage.getItem(key);

            if (!cached) {
                return null;
            }

            const cacheEntry = JSON.parse(cached);

            if (!isCacheValid(cacheEntry)) {
                // Cache expiré, le supprimer
                localStorage.removeItem(key);
                return null;
            }

            return cacheEntry.data;
        } catch (error) {
            console.error('Erreur lors de la récupération du cache:', error);
            return null;
        }
    },

    /**
     * Stocke une valeur dans le cache
     */
    set: (url, params = {}, data, ttl = DEFAULT_TTL) => {
        try {
            const key = generateCacheKey(url, params);
            const cacheEntry = {
                data: data,
                expiresAt: Date.now() + ttl,
                cachedAt: Date.now()
            };

            localStorage.setItem(key, JSON.stringify(cacheEntry));
        } catch (error) {
            console.error('Erreur lors du stockage du cache:', error);
            // Si le localStorage est plein, nettoyer les anciennes entrées
            cacheService.cleanExpired();
        }
    },

    /**
     * Supprime une entrée du cache
     */
    remove: (url, params = {}) => {
        try {
            const key = generateCacheKey(url, params);
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Erreur lors de la suppression du cache:', error);
        }
    },

    /**
     * Supprime toutes les entrées du cache
     */
    clear: () => {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(CACHE_PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('Erreur lors du nettoyage du cache:', error);
        }
    },

    /**
     * Nettoie les entrées expirées du cache
     */
    cleanExpired: () => {
        try {
            const keys = Object.keys(localStorage);
            let cleaned = 0;

            keys.forEach(key => {
                if (key.startsWith(CACHE_PREFIX)) {
                    try {
                        const cached = localStorage.getItem(key);
                        if (cached) {
                            const cacheEntry = JSON.parse(cached);
                            if (!isCacheValid(cacheEntry)) {
                                localStorage.removeItem(key);
                                cleaned++;
                            }
                        }
                    } catch (e) {
                        // Entrée corrompue, la supprimer
                        localStorage.removeItem(key);
                        cleaned++;
                    }
                }
            });

            if (cleaned > 0) {
                console.log(`Cache nettoyé: ${cleaned} entrées expirées supprimées`);
            }
        } catch (error) {
            console.error('Erreur lors du nettoyage du cache:', error);
        }
    },

    /**
     * Vérifie si une URL doit être mise en cache
     * Les méthodes POST, PUT, DELETE ne sont généralement pas mises en cache
     */
    shouldCache: (method, url) => {
        // Ne pas mettre en cache les méthodes de modification
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
            return false;
        }

        // Ne pas mettre en cache les endpoints d'authentification
        if (url.includes('/login') || url.includes('/logout') || url.includes('/auth/')) {
            return false;
        }

        return true;
    }
};

// Nettoyer automatiquement le cache expiré au chargement
if (typeof window !== 'undefined') {
    // Nettoyer toutes les 10 minutes
    setInterval(() => {
        cacheService.cleanExpired();
    }, 10 * 60 * 1000);

    // Nettoyer au chargement de la page
    cacheService.cleanExpired();
}

export default cacheService;