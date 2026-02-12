
import layoutPayment from "../pages/module-payment/layout/index-payment";
import layoutConfiguration from "../pages/configuration/layout/index-configuration";
import layoutCaisse from "../pages/module-caisse/layout/index-caisse";
import { productSpecificationService } from "@/_services";


export default[

    {
        path: "/service",
        component: layoutPayment,
        children: [{
            path: "facturation",
            name: "service.facturation",
            component: () =>
            import ("@/pages/module-payment/payment/facturation"),
        }, ],
    },


    {

        path: "/payement",
        component: () =>
        import ("@/pages/module-payment/payment/select-cash-register"),
        children: [{
            path: "cash-register",
            name: "payment.cash.register",
            component: () =>
            import ("@/pages/module-payment/payment/select-cash-register"),
        }, ],
    },


    {
        path: "/payement",
        component: layoutPayment,
        children: [{
            path: "create",
            name: "payment.create",
            component: () =>
            import ("@/pages/module-payment/payment/create"),
        }, ],
    },

    {
        path: "/payement",
        component: layoutPayment,
        children: [{
            path: "list",
            name: "payment.list",
            component: () =>
            import ("@/pages/module-payment/payment/index"),
        }, ],
    },



    {

        path: "/payement",
        component: layoutPayment,
        children: [{
            path: "caisse",
            name: "payment.caisse",
            component: () =>
            import ("@/pages/module-payment/payment/caisse"),
        }, ],
    },


    {
        path: "/caisse",
        component: layoutCaisse,
        children: [{
            path: "payement",
            name: "caisse.payement",
            component: () =>
            import ("@/pages/module-caisse/caisse/payement"),
        }, ],
    },



    {
        path: "/caisse",
        component: layoutCaisse,
        children: [{
            path: "bills",
            name: "caisse.bills",
            component: () =>
            import ("@/pages/module-caisse/caisse/bills"),
        }, ],
    },

       {
        path: "/caisse",
        component: layoutCaisse,
        children: [{
            path: "caisse",
            name: "caisse.index",
            component: () =>
            import ("@/pages/module-caisse/caisse/caisse"),
        }, ],
    },


    {
        path: "/caisse",
        component: layoutConfiguration,
        children: [{
            path: "list",
            name: "caisse.list",
            component: () =>
            import ("@/pages/module-caisse/caisse/index"),
        }, ],
    
    },
    {
        path: "/caisse",
        component: layoutConfiguration,
        children: [{
            path: "planning-caisse",
            name: "caisse.planning",
            component: () =>
            import ("@/pages/module-caisse/caisse/planning-caisse"),
        }, ],
    },


    {
        path: "/facture/details/:reference",
        name: "billing.facture.details",
        component: () =>
        import ("@/pages/module-payment/payment/details-facture"),
        props: true,
    },

    {
        path: "/caisse",
        component: layoutCaisse,
        children: [{
            path: "create",
            name: "caisse.create",
            component: () =>
            import ("@/pages/module-caisse/caisse/create"),
        }, ],
    },




    {
        path: "/caisse",
        component: layoutCaisse,
        children: [{
            path: "bordereaux-transfert",
            name: "caisse.bordereaux.transfert",
            component: () =>
            import ("@/pages/module-caisse/caisse/bordereaux-tranfert"),
        }, ],
    },

    {
        path: "/caisse",
        component: layoutCaisse,
        children: [{
            path: "rapport",
            name: "caisse.rapport",
            component: () =>
            import ("@/pages/module-caisse/caisse/rapport"),
        }, ],
    },


 


    {
        path: "/payement",
        component: layoutPayment,
        children: [{
            path: "rapport",
            name: "payment.rapport",
            component: () =>
            import ("@/pages/module-payment/payment/rapport"),
        }, ],
    },


    {
        path: "/payement",
        component: layoutConfiguration,
        children: [{
            path: "configuration",
            name: "payment.configuration",
            component: () =>
            import ("@/pages/module-payment/payment/configuration"),
        }, ],
    },

    {
        path: "/payement",
        component: layoutPayment,
        children: [{
            path: "dashboard",
            name: "payment.dashboard",
            component: () =>
            import ("@/pages/module-payment/payment/dashboard"),
        }, ],
    },





        // {
        //   path: "/facture/details/:id(\\d+)",
        //   name: "FactureDetails",
        //   component: () => import("@/pages/paiement/details-facture"),
        //   props: true,
        // },









]
