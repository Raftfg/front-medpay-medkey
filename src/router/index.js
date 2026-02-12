// Init
import Vue from "vue";
import Router from "vue-router";
import App from "../App.vue";

//Import defaul layaout
import layout from "../layout";
import layout2 from "../layout-2";
import accueil from "../pages/accueil/accueil.vue";

// Import Modules routes
import paymentRoutes from './payment.js';
import movmentRoutes from './movment.js';
import serviceRoutes from './service.js';

import assuranceRoutes from './assurance.js';
import patientRoutes from './patient.js';
import stockRoutes from './stock.js';
import hospitalizationRoutes from './hospitalization.js';
import userRoutes from './user.js';
import pharmacyRoutes from './pharmacy.js';
import grhRoutes from './grh.js';
import contratRoutes from './contrat.js';
import rapport_statistiqueRoutes from './rapport_statistique.js';
import rembourse_recouvreRoutes from './rembourse_recouvre.js';
import rendezvousRoutes from './rendezvous.js';

// Initialisation du routeur
Vue.use(Router);

const router = new Router({

    linkExactActiveClass: "active",
    scrollBehavior: () => ({ y: 0 }),
    mode: "history",

    routes: [

        {
            path: "/",
            component: accueil,
        },

        {
            path: "/auth-pages",
            component: {
                render(c) {
                    return c("router-view");
                },
            },
            children: [{
                path: "login",
                name: "login",
                component: () =>
                    import("@/pages/authentification/auth-pages/login"),
            },
            {
                path: "register",
                name: "register",
                component: () =>
                    import("@/pages/authentification/auth-pages/register"),
            },
            {
                path: "first-change-password",
                name: "first-change-password",
                component: () =>
                    import("@/pages/authentification/auth-pages/first-change-password"),
            },
            {
                path: "reset",
                name: "reset",
                component: () =>
                    import("@/pages/authentification/auth-pages/reset-password"),
            },
            {
                path: "forget-password",
                name: "forget-password",
                component: () =>
                    import("@/pages/authentification/auth-pages/forget-password"),
            },
            {
                path: "forget-password-confirm",
                name: "forget-password-confirm",
                component: () =>
                    import("@/pages/authentification/auth-pages/forget-password-confirm"),
            },
            ],
        },

        {
            path: "/home",
            component: layout2,
            children: [{
                path: "",
                name: "home",
                component: () =>
                    import("@/pages/dashboard/home"),
            },],
        },
        {
            path: "/onboarding/wizard",
            component: layout2,
            children: [{
                path: "",
                name: "onboarding-wizard",
                component: () =>
                    import("@/pages/onboarding/OnboardingWizard.vue"),
            },],
        },


        //Movement routes
        ...movmentRoutes,
        ...serviceRoutes,
        //Stock routes
        ...stockRoutes,
        //Hospitalization routes
        ...hospitalizationRoutes,
        //Payment routes
        ...paymentRoutes,
        // Pharmacy Routes
        ...pharmacyRoutes,



        //Assurance
        ...assuranceRoutes,

        // Patient
        ...patientRoutes,

        ...userRoutes,
        ...grhRoutes,
        ...contratRoutes,
        ...rapport_statistiqueRoutes,

        // remboursement et recouvrement
        ...rembourse_recouvreRoutes,

        // Rendez-vous
        ...rendezvousRoutes

    ],
});

// Vérification robuste de l'authentification (Niveau Expert)
const isAuthenticated = () => {
    try {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("access_token");

        // Logger pour le débogage (à retirer en production)
        // console.log("Auth Check:", { hasUser: !!userStr, hasToken: !!token });

        // Vérification de base (existence et contenu non-vide)
        if (!userStr || !token || token === "undefined" || token === "null" || userStr === "undefined" || userStr === "null") {
            return false;
        }

        // Vérification du format JSON de l'utilisateur
        const user = JSON.parse(userStr);
        const isValid = !!(user && typeof user === 'object');

        if (!isValid) {
            console.warn("Auth check: User object is invalid JSON");
        }

        return isValid;
    } catch (e) {
        console.error("Auth check failed:", e);
        return false;
    }
};

// Contrôle des accès (Navigation Guard)
router.beforeEach((to, from, next) => {
    const loggedIn = isAuthenticated();

    // Pages qui ne nécessitent pas d'authentification
    const publicPages = [
        "/",
        "/auth-pages/login",
        "/auth-pages/register",
        "/auth-pages/forget-password",
        "/auth-pages/reset",
        "/auth-pages/forget-password-confirm",
    ];

    const isPublicPage = publicPages.includes(to.path);

    // LOG de navigation pour débugger la redirection
    console.log(`Navigation: ${from.path} -> ${to.path} | LoggedIn: ${loggedIn} | PublicPage: ${isPublicPage}`);

    // 1. Rediriger les utilisateurs connectés qui tentent d'accéder aux pages publiques (sauf accueil '/')
    if (loggedIn && isPublicPage && to.path !== "/") {
        console.log("Redirecting logged user from public page to /home");
        return next("/home");
    }

    // 2. Rediriger les utilisateurs NON connectés qui tentent d'accéder aux pages protégées
    if (!loggedIn && !isPublicPage) {
        console.log("Redirecting unauthenticated user to login");
        // Nettoyage de sécurité avant redirection
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        return next("/auth-pages/login");
    }

    // 3. Autoriser la navigation
    next();
});


export default router;
