import Vue from 'vue';
import VueI18n from 'vue-i18n';
import fr from './locales/fr.json';
import en from './locales/en.json';

Vue.use(VueI18n);

const messages = {
    fr,
    en
};

const i18n = new VueI18n({
    locale: 'fr', // langue par défaut
    fallbackLocale: 'en', // langue de secours
    messages,
});

export default i18n;
