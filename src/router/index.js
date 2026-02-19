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

// Import New Template Components
import FlexItLayout from "../layout/FlexItLayout.vue";
import FlexItAccueil from "../pages/accueil/FlexItAccueil.vue";
import Accueil from "../pages/accueil/accueil.vue";
import FlexItAbout from "../pages/accueil/FlexItAbout.vue";
import FlexItServices from "../pages/accueil/FlexItServices.vue";
import FlexItPortfolio from "../pages/accueil/FlexItPortfolio.vue";
import FlexItBlog from "../pages/accueil/FlexItBlog.vue";
import FlexItContact from "../pages/accueil/FlexItContact.vue";
import FlexItPricing from "../pages/accueil/FlexItPricing.vue";
import FlexItFAQ from "../pages/accueil/FlexItFAQ.vue";
import FlexItTeam from "../pages/accueil/FlexItTeam.vue";
import BlogSingle from "../pages/accueil/BlogSingle.vue";
import PortfolioSingle from "../pages/accueil/PortfolioSingle.vue";
import ServiceSingle from "../pages/accueil/ServiceSingle.vue";
import TeamMember from "../pages/accueil/TeamMember.vue";
import NotFound from "../pages/accueil/NotFound.vue";
import Home1 from "../pages/accueil/Home1.vue";
import Home2 from "../pages/accueil/Home2.vue";
import Home3 from "../pages/accueil/Home3.vue";
import Home4 from "../pages/accueil/Home4.vue";
import Home6 from "../pages/accueil/Home6.vue";

// Initialisation du routeur
Vue.use(Router);

const router = new Router({

    linkExactActiveClass: "active",
    scrollBehavior: () => ({ y: 0 }),
    mode: "history",

    routes: [

        {
            path: "/",
            component: FlexItLayout,
            children: [
                { path: "", name: "landing", component: FlexItAccueil },
                { path: "accueil", name: "accueil", component: Accueil },
                { path: "home-1", name: "home-1", component: Home1 },
                { path: "home-2", name: "home-2", component: Home2 },
                { path: "home-3", name: "home-3", component: Home3 },
                { path: "home-4", name: "home-4", component: Home4 },
                { path: "home-5", name: "home-5", component: FlexItAccueil },
                { path: "home-6", name: "home-6", component: Home6 },
                { path: "about-us", name: "about-us", component: FlexItAbout },
                { path: "services", name: "services", component: FlexItServices },
                { path: "portfolio", name: "portfolio", component: FlexItPortfolio },
                { path: "blog", name: "blog", component: FlexItBlog },
                { path: "contact-us", name: "contact-us", component: FlexItContact },
                { path: "pricing", name: "pricing", component: FlexItPricing },
                { path: "faq", name: "faq", component: FlexItFAQ },
                { path: "our-team", name: "our-team", component: FlexItTeam },
                { path: "blog/:slug", name: "blog-single", component: BlogSingle },
                { path: "portfolio/:slug", name: "portfolio-single", component: PortfolioSingle },
                { path: "services/:slug", name: "service-single", component: ServiceSingle },
                { path: "our-team/:slug", name: "team-member", component: TeamMember },
                { path: "404", name: "not-found", component: NotFound }
            ]
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
        "/home-1",
        "/home-2",
        "/home-3",
        "/home-4",
        "/home-5",
        "/home-6",
        "/about-us",
        "/services",
        "/portfolio",
        "/blog",
        "/contact-us",
        "/pricing",
        "/faq",
        "/our-team",
        "/404",
        "/auth-pages/login",
        "/auth-pages/register",
        "/auth-pages/forget-password",
        "/auth-pages/reset",
        "/auth-pages/forget-password-confirm",
    ];

    // Vérification intelligente : soit correspondance exacte, soit le début du chemin (ex: /our-team/member)
    const isPublicPage = publicPages.some(page => {
        if (page === "/") return to.path === "/";
        return to.path === page || to.path.startsWith(page + "/");
    });

    // LOG de navigation pour débugger la redirection
    console.log(`Navigation: ${from.path} -> ${to.path} | LoggedIn: ${loggedIn} | PublicPage: ${isPublicPage}`);

    // 1. Rediriger les utilisateurs connectés qui tentent d'accéder aux pages d'auth uniquement (login/register)
    const authOnlyPages = ["/auth-pages/login", "/auth-pages/register"];
    if (loggedIn && authOnlyPages.includes(to.path)) {
        console.log("Redirecting logged user from auth page to /home");
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
