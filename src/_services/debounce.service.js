/**
 * Service de debounce pour optimiser les performances
 * Évite les appels API trop fréquents lors de la saisie utilisateur
 */

/**
 * Fonction debounce pour limiter la fréquence d'exécution
 * @param {Function} func - Fonction à débouncer
 * @param {number} wait - Délai d'attente en millisecondes
 * @param {boolean} immediate - Exécuter immédiatement au premier appel
 * @returns {Function} Fonction débouncée
 */
export const debounce = (func, wait = 300, immediate = false) => {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) func(...args);
    };
};

/**
 * Fonction throttle pour limiter la fréquence d'exécution
 * @param {Function} func - Fonction à throttler
 * @param {number} limit - Délai minimum entre les exécutions en millisecondes
 * @returns {Function} Fonction throttlée
 */
export const throttle = (func, limit = 300) => {
    let inThrottle;

    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Debounce spécialisé pour les recherches
 * @param {Function} searchFunction - Fonction de recherche
 * @param {number} delay - Délai en millisecondes (défaut: 300ms - optimisé)
 * @returns {Function} Fonction de recherche débouncée
 */
export const debounceSearch = (searchFunction, delay = 300) => {
    return debounce(searchFunction, delay, false);
};

/**
 * Throttle spécialisé pour le scroll
 * @param {Function} scrollFunction - Fonction à exécuter lors du scroll
 * @param {number} delay - Délai en millisecondes (défaut: 100ms)
 * @returns {Function} Fonction de scroll throttlée
 */
export const throttleScroll = (scrollFunction, delay = 100) => {
    return throttle(scrollFunction, delay);
};

export default {
    debounce,
    throttle,
    debounceSearch,
    throttleScroll
};