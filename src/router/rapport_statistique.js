import layoutRapport_statistique from "../pages/module-rapport_statistique/layout/index-rapport_statistique";

export default [{
        path: "/rapport_statistique",
        component: layoutRapport_statistique,
        children: [{
            path: "list",
            name: "rapport.list",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/index"),
        }, ],
    },
    {
        path: "/rapport_statistique",
        component: layoutRapport_statistique,
        children: [{
            path: "caisse",
            name: "rapport.caisse",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/caisse"),
        }, ],
    },
    {
        path: "/rapport_statistique",
        component: layoutRapport_statistique,
        children: [{
            path: "stock",
            name: "rapport.stock",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock"),
        }, ],
    },


    {
        path: "/rapport_statistique",
        component: layoutRapport_statistique,
        children: [{
            path: "destock",
            name: "rapport.destock",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/destock"),
        }, ],
    },

    

    {
        path: "/rapport_statistique",
        component: layoutRapport_statistique,
        children: [{
            path: "recouvrement",
            name: "rapport.recouvrement",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/recouvrement"),
        }, ],
    },

   

    {
        path: "/medicaments/disponible",
        component: layoutRapport_statistique,
        children: [{
            path: "en-stock",
            name: "available.drugs",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/available_drugs"),
        }, ],
    },
    {
        path: "/medicaments/disponible",
        component: layoutRapport_statistique,
        children: [{
            path: ":uuid/details",
            name: "available.drugs.details",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/details_available_drugs"),
            props: true,
        }, ],
    },
    {
        path: "/medicaments",
        component: layoutRapport_statistique,
        children: [{
            path: "en-rupture-de-stock",
            name: "unavailable.drugs",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/out_of_stock_drugs"),
        }, ],
    },
    {
        path: "/medicaments",
        component: layoutRapport_statistique,
        children: [{
            path: "perimes",
            name: "expired.drugs",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/expired_drugs"),
        }, ],
    },
    {
        path: "/medicaments/perimes",
        component: layoutRapport_statistique,
        children: [{
            path: ":uuid/details",
            name: "expired.drugs.details",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/details_expired_drugs"),
            props: true,
        }, ],
    },
    {
        path: "/consommables/disponible",
        component: layoutRapport_statistique,
        children: [{
            path: "en-stock",
            name: "available.consumables",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/available_consumables"),
        }, ],
    },
    {
        path: "/consommables/disponible",
        component: layoutRapport_statistique,
        children: [{
            path: ":uuid/details",
            name: "available.consumables.details",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/details_available_consumables"),
            props: true,
        }, ],
    },
    {
        path: "/consommables",
        component: layoutRapport_statistique,
        children: [{
            path: "en-rupture-de-stock",
            name: "unavailable.consumables",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/out_of_stock_consumables"),
        }, ],
    },
    {
        path: "/carnets/disponible",
        component: layoutRapport_statistique,
        children: [{
            path: "en-stock",
            name: "available.notebooks",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/available_notebooks"),
        }, ],
    },
    {
        path: "/carnets/disponible",
        component: layoutRapport_statistique,
        children: [{
            path: ":uuid/details",
            name: "available.notebooks.details",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/details_available_notebooks"),
            props: true,
        }, ],
    },
    {
        path: "/carnets",
        component: layoutRapport_statistique,
        children: [{
            path: "en-rupture-de-stock",
            name: "unavailable.notebooks",
            component: () =>
                import ("@/pages/module-rapport_statistique/rapport_statistique/stock/out_of_stock_notebooks"),
        }, ],
    },
]