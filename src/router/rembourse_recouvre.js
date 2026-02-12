import layoutRembourse_recouvre from "../pages/module-rembourse_recouvre/layout/index-rembourse_recouvre";

export default [
    // {
    //     path: "/patients",
    //     component: layoutPatient,
    //     children: [{
    //         path: "create",
    //         name: "create",
    //         component: () =>
    //             import("@/pages/module-patient/patients/create"),
    //     },],
    // },

    {
        path: "/rembourse_recouvre",
        component: layoutRembourse_recouvre,
        children: [{
            path: "recouvrement_patient",
            name: "recouvrement_patient",
            component: () =>
                import("@/pages/module-rembourse_recouvre/rembourse_recouvre/recouvrement_patient"),
        },],
    },
    {
        path: "/rembourse_recouvre",
        component: layoutRembourse_recouvre,
        children: [{
            path: "remboursement_patient_acte",
            name: "remboursement_patient_acte",
            component: () =>
                import("@/pages/module-rembourse_recouvre/rembourse_recouvre/remboursement_patient_acte"),
        },],
    },
     {
        path: "/rembourse_recouvre",
        component: layoutRembourse_recouvre,
        children: [{
            path: "remboursement_patient",
            name: "remboursement_patient",
            component: () =>
                import("@/pages/module-rembourse_recouvre/rembourse_recouvre/remboursement_patient"),
        },],
    },


    {
        path: "/rembourse_recouvre",
        component: layoutRembourse_recouvre,
        children: [{
            path: "recouvrement",
            name: "recouvrement",
            component: () =>
                import("@/pages/module-rembourse_recouvre/rembourse_recouvre/recouvrement"),
        },],
    },

    {
        path: "/rembourse_recouvre",
        component: layoutRembourse_recouvre,
        children: [{
            path: "remboursement_acte",
            name: "remboursement_acte",
            component: () =>
                import("@/pages/module-rembourse_recouvre/rembourse_recouvre/remboursement_acte"),
        },],
    },

    {
        path: "/rembourse_recouvre",
        component: layoutRembourse_recouvre,
        children: [{
            path: "remboursement",
            name: "remboursement",
            component: () =>
                import("@/pages/module-rembourse_recouvre/rembourse_recouvre/remboursement"),
        },],
    },

    {
        path: "/rembourse_recouvre",
        component: layoutRembourse_recouvre,
        children: [{
            path: "detail/:id",
            name: "rembourse_recouvre.detail",
            component: () =>
                import("@/pages/module-rembourse_recouvre/rembourse_recouvre/detail"),
            props: true,
        },],
    },

    // {
    //     path: "/patients",
    //     component: layoutPatient,
    //     children: [{
    //         // path: "update/:id(\\d+)",
    //         path: "detail/:uuid",
    //         name: "detail",
    //         component: () =>
    //             import("@/pages/module-patient/patients/detail"),
    //         props: true,
    //     },],
    // },

    // {
    //     path: "/patients",
    //     component: layoutPatient,
    //     children: [{
    //         // path: "update/:id(\\d+)",
    //         path: "update/:uuid",
    //         name: "update",
    //         component: () =>
    //             import("@/pages/module-patient/patients/update"),
    //         props: true,
    //     },],
    // },




]
