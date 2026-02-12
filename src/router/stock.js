import layoutConfiguration from "../pages/configuration/layout/index-configuration";
import layoutStock from "../pages/module-stock/layout/index-stock";


export default [
    //-------------------------Store-------------------------
    {
        path: "/configuration/store",
        component: layoutConfiguration,
        children: [{
            path: "list",
            name: "configuration.store.list",
            component: () =>
                import ("@/pages/configuration/stock/store/index"),
        }, ],
    },
    //-------------------------Stock-------------------------
    {
        path: "/configuration/stock",
        component: layoutConfiguration,
        children: [{
            path: "list",
            name: "stock.list",
            component: () =>
                import ("@/pages/configuration/stock/stock/index"),
        }, ],
    },
    //-------------------------Category-------------------------
    {
        path: "/configuration/category",
        component: layoutConfiguration,
        children: [{
            path: "list",
            name: "category.list",
            component: () =>
                import ("@/pages/configuration/stock/category/index"),
        }, ],
    },
    //-------------------------Supplier-------------------------
    {
        path: "/configuration/supplier",
        component: layoutConfiguration,
        children: [{
            path: "list",
            name: "supplier.list",
            component: () =>
                import ("@/pages/configuration/stock/supplier/index"),
        }, ],
    },
    //-------------------------Store Stocks-------------------------
    {
        path: "/magasin-stocks",
        component: layoutStock,
        children: [{
            path: "list",
            name: "magasin-stocks.list",
            component: () =>
                import ("@/pages/module-stock/store-stock/index"),
        }, ],
    },

    {
        path: "/magasin-stocks",
        component: layoutStock,
        children: [{
            path: ":uuid/details",
            name: "magasin-stocks.movements",
            component: () =>
            import ("@/pages/module-stock/store-stock/movements"),
            props: true,
        }, ],
    },
    {
        path: "/magasin-stocks",
        component: layoutStock,
        children: [{
            path: ":uuid/",
            name: "magasin-stocks.details",
            component: () =>
                import ("@/pages/module-stock/store-stock/details"),
            props: true,
        }, ],
    },
    //-------------------------Drugs-------------------------

    {
        path: "/medicaments",
        component: layoutStock,
        children: [{
            path: "create",
            name: "medicaments.create",
            component: () =>
                import ("@/pages/module-stock/medicaments/create"),
        }, ],
    },

    {
        path: "/medicaments",
        component: layoutStock,
        children: [{
            path: "list",
            name: "medicaments.list",
            component: () =>
                import ("@/pages/module-stock/medicaments/index"),
        }, ],
    },

    {
        path: "/medicaments",
        component: layoutStock,
        children: [{
            path: "update/:uuid",
            name: "medicaments.update",
            component: () =>
                import ("@/pages/module-stock/medicaments/update"),
            props: true,
        }, ],
    },
    {
        path: "/medicaments",
        component: layoutStock,
        children: [{
            path: ":uuid/movements",
            name: "medicaments.movements",
            component: () =>
                import ("@/pages/module-stock/medicaments/movements"),
            props: true,
        }, ],
    },
    {
        path: "/medicament",
        component: layoutStock,
        children: [{
            path: ":uuid/approvisionnements",
            name: "medicaments.approvisionnements",
            component: () =>
                import ("@/pages/module-stock/medicaments/entries"),
            props: true,
        }, ],
    },
    {
        path: "/medicaments",
        component: layoutStock,
        children: [{
            path: ":uuid/details",
            name: "medicaments.details",
            component: () =>
                import ("@/pages/module-stock/medicaments/details"),
            props: true,
        }, ],
    },

    //-------------------------Notebooks and cards-------------------------
    {
        path: "/carnets-cartes",
        component: layoutStock,
        children: [{
            path: "create",
            name: "carnets_cartes.create",
            component: () =>
                import ("@/pages/module-stock/carnets-cartes/create"),
        }, ],
    },

    {
        path: "/carnets-cartes",
        component: layoutStock,
        children: [{
            path: "list",
            name: "carnets_cartes.list",
            component: () =>
                import ("@/pages/module-stock/carnets-cartes/index"),
        }, ],
    },

    {
        path: "/carnets-cartes",
        component: layoutStock,
        children: [{
            path: "update/:uuid",
            name: "carnets_cartes.update",
            component: () =>
                import ("@/pages/module-stock/carnets-cartes/update"),
            props: true,
        }, ],
    },
    {
        path: "/carnets-cartes",
        component: layoutStock,
        children: [{
            path: ":uuid/details",
            name: "carnets-cartes.details",
            component: () =>
                import ("@/pages/module-stock/carnets-cartes/details"),
            props: true,
        }, ],
    },

    //-------------------------Consumables-------------------------
    {
        path: "/consommables",
        component: layoutStock,
        children: [{
            path: "create",
            name: "consommables.create",
            component: () =>
                import ("@/pages/module-stock/consommables/create"),
        }, ],
    },

    {
        path: "/consommables",
        component: layoutStock,
        children: [{
            path: "list",
            name: "consommables.list",
            component: () =>
                import ("@/pages/module-stock/consommables/index"),
        }, ],
    },

    {
        path: "/consommables",
        component: layoutStock,
        children: [{
            path: "update/:uuid",
            name: "consommables.update",
            component: () =>
                import ("@/pages/module-stock/consommables/update"),
            props: true,
        }, ],
    },


    {
        path: "/consommables",
        component: layoutStock,
        children: [{
            path: ":uuid/details",
            name: "consommables.details",
            component: () =>
                import ("@/pages/module-stock/consommables/details"),
            props: true,
        }, ],
    },

    //-------------------------ProductSpecification-------------------------
    {
        path: "/product-specification",
        component: layoutStock,
        children: [{
            path: "create",
            name: "product_specification.create",
            component: () =>
                import ("@/pages/module-stock/productspecification/create"),
        }, ],
    },

    {
        path: "/product-specification",
        component: layoutStock,
        children: [{
            path: "list",
            name: "product_specification.list",
            component: () =>
                import ("@/pages/module-stock/productspecification/index"),
        }, ],
    },

    {
        path: "/product-specification",
        component: layoutStock,
        children: [{
            path: "update/:uuid",
            name: "product_specification.update",
            component: () =>
                import ("@/pages/module-stock/productspecification/update"),
            props: true,
        }, ],
    },

    //-------------------------Supply-------------------------

    {
        path: "/supply",
        component: layoutStock,
        children: [{
            path: "create",
            name: "supply.create",
            component: () =>
                import ("@/pages/module-stock/supply/create"),
        }, ],
    },

    {
        path: "/supply",
        component: layoutStock,
        children: [{
            path: "list",
            name: "supply.list",
            component: () =>
                import ("@/pages/module-stock/supply/index"),
        }, ],
    },

    {
        path: "/supply",
        component: layoutStock,
        children: [{
            path: ":uuid/products",
            name: "supply.details",
            component: () =>
                import ("@/pages/module-stock/supply/details"),
            props: true,
        }, ],
    },

    //-------------------------Transert-------------------------
    {
        path: "/transfert",
        component: layoutStock,
        children: [{
            path: "create",
            name: "transfert.create",
            component: () =>
                import ("@/pages/module-stock/transfert/create"),
        }, ],
    },

    {
        path: "/transfert",
        component: layoutStock,
        children: [{
            path: "list",
            name: "transfert.list",
            component: () =>
                import ("@/pages/module-stock/transfert/index"),
        }, ],
    },

    {
        path: "/transfert",
        component: layoutStock,
        children: [{
            path: ":uuid/products",
            name: "transfert.details",
            component: () =>
                import ("@/pages/module-stock/transfert/details"),
            props: true,
        }, ],
    },

    //-------------------------Stocks-------------------------
    {
        path: "/consulter/produits",
        component: layoutStock,
        children: [{
            path: "stock",
            name: "stocks.list",
            component: () =>
                import ("@/pages/module-stock/stocks/create"),
        }, ],
    },
]