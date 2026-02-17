// Mixin for initializing WOW.js animations on page mount
export default {
    mounted() {
        this.$nextTick(() => {
            try {
                // Check if WOW is available
                if (typeof window.WOW !== 'undefined') {
                    new window.WOW({
                        boxClass: 'wow',
                        animateClass: 'animated',
                        offset: 0,
                        mobile: true,
                        live: true,
                        resetAnimation: true
                    }).init();
                }
            } catch (error) {
                console.warn('WOW.js initialization warning:', error);
            }
        });
    }
};
