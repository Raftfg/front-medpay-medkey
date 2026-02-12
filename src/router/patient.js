import layoutPatient from "../pages/module-patient/layout/index-patient";

export default [
    {
        path: "/patients",
        component: layoutPatient,
        children: [{
            path: "dme-index",
            name: "patients.dme-index",
            component: () =>
                import("@/pages/module-patient/patients/DmeSearch"),
        },],
    },

    {
        path: "/patients",
        component: layoutPatient,
        children: [{
            path: "create",
            name: "patients.create",
            component: () =>
                import("@/pages/module-patient/patients/create"),
        },],
    },

    {
        path: "/patients",
        component: layoutPatient,
        children: [{
            path: "list",
            name: "patients.list",
            component: () =>
                import("@/pages/module-patient/patients/index"),
        },],
    },

    {
        path: "/patients",
        component: layoutPatient,
        children: [{
            // path: "update/:id(\\d+)",
            path: "detail/:uuid",
            name: "patients.detail",
            component: () =>
                import("@/pages/module-patient/patients/detail"),
            props: true,
        },],
    },

    {
        path: "/patients",
        component: layoutPatient,
        children: [{
            path: "update/:uuid",
            name: "patients.update",
            component: () =>
                import("@/pages/module-patient/patients/update"),
            props: true,
        },],
    },

    {
        path: "/patients",
        component: layoutPatient,
        children: [{
            path: "admit/:uuid",
            name: "patients.admit",
            component: () =>
                import("@/pages/module-patient/patients/Admission"),
            props: true,
        },],
    },

    {
        path: "/patients",
        component: layoutPatient,
        children: [{
            path: "transfer/:movment_uuid",
            name: "patients.transfer",
            component: () =>
                import("@/pages/module-patient/patients/Transfer"),
            props: true,
        },],
    },

    {
        path: "/patients",
        component: layoutPatient,
        children: [{
            path: "release/:movment_uuid",
            name: "patients.release",
            component: () =>
                import("@/pages/module-patient/patients/Release"),
            props: true,
        },],
    },

    {
        path: "/patients",
        component: layoutPatient,
        children: [{
            path: "dme/:uuid",
            name: "patients.dme",
            component: () =>
                import("@/pages/module-patient/patients/Dme"),
            props: true,
        },],
    },
]
