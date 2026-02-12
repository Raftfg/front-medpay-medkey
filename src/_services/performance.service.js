/**
 * Service d'optimisation des performances
 * Fournit des utilitaires pour améliorer les performances de l'application
 */

/**
 * Annule les requêtes obsolètes pour éviter les fuites mémoire
 */
export class RequestCanceller {
    constructor() {
        this.controllers = new Map();
    }

    /**
     * Crée un nouveau contrôleur pour une requête
     * @param {string} key - Clé unique pour identifier la requête
     * @returns {AbortController} Contrôleur pour annuler la requête
     */
    create(key) {
        // Annuler la requête précédente avec la même clé
        this.cancel(key);

        const controller = new AbortController();
        this.controllers.set(key, controller);
        return controller;
    }

    /**
     * Annule une requête spécifique
     * @param {string} key - Clé de la requête à annuler
     */
    cancel(key) {
        const controller = this.controllers.get(key);
        if (controller && !controller.signal.aborted) {
            controller.abort();
            this.controllers.delete(key);
        }
    }

    /**
     * Annule toutes les requêtes en cours
     */
    cancelAll() {
        this.controllers.forEach((controller, key) => {
            if (!controller.signal.aborted) {
                controller.abort();
            }
        });
        this.controllers.clear();
    }
}

/**
 * Optimise le rendu d'une liste avec virtual scrolling
 * @param {Array} items - Liste d'éléments à rendre
 * @param {number} startIndex - Index de début
 * @param {number} endIndex - Index de fin
 * @returns {Array} Liste optimisée
 */
export const getVisibleItems = (items, startIndex = 0, endIndex = 50) => {
    return items.slice(startIndex, endIndex);
};

/**
 * Lazy load les images
 * @param {string} src - Source de l'image
 * @returns {Promise} Promise qui se résout quand l'image est chargée
 */
export const lazyLoadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

/**
 * Optimise les appels API en les regroupant
 * @param {Array<Function>} apiCalls - Tableau de fonctions retournant des Promises
 * @returns {Promise} Promise qui se résout avec tous les résultats
 */
export const parallelApiCalls = (apiCalls) => {
    return Promise.all(apiCalls.map(call => call()));
};

/**
 * Débounce avec annulation automatique
 * @param {Function} func - Fonction à débouncer
 * @param {number} wait - Délai en millisecondes
 * @returns {Function} Fonction débouncée avec annulation
 */
export const cancellableDebounce = (func, wait = 300) => {
    let timeout;
    let lastCallArgs;

    const debounced = (...args) => {
        lastCallArgs = args;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...lastCallArgs);
        }, wait);
    };

    debounced.cancel = () => {
        clearTimeout(timeout);
    };

    debounced.flush = () => {
        clearTimeout(timeout);
        if (lastCallArgs) {
            func(...lastCallArgs);
        }
    };

    return debounced;
};

/**
 * Mesure le temps d'exécution d'une fonction
 * @param {Function} func - Fonction à mesurer
 * @param {string} label - Label pour le log
 * @returns {Promise|any} Résultat de la fonction
 */
export const measurePerformance = async(func, label = 'Function') => {
    const start = performance.now();
    const result = await func();
    const end = performance.now();
    console.log(`[Performance] ${label}: ${(end - start).toFixed(2)}ms`);
    return result;
};

export default {
    RequestCanceller,
    getVisibleItems,
    lazyLoadImage,
    parallelApiCalls,
    cancellableDebounce,
    measurePerformance
};