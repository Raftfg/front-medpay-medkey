import layout from "../layout";
import layoutConfiguration from "../pages/configuration/layout/index-configuration";
import layoutStock from "../pages/module-stock/layout/index-stock";

export default [
    {
        path: "/assurance",
        component: layoutConfiguration,
        children: [{
            path: "list",
            name: "assurance-list",
            component: () =>
                import("@/pages/assurance/index"),
        },],
    },
    {
        path: "/assurance",
        component: layoutConfiguration,
        children: [{
            path: "detail/:uuid",
            name: "assurance.detail",
            component: () =>
                import("@/pages/assurance/detail"),
            props: true,
        },],
    },
    {
        path: "/assurance",
        component: layoutConfiguration,
        children: [{
            path: "create/:uuid",
            name: "assurance.create",
            component: () =>
                import("@/pages/assurance/create"),
            props: true,
        },],
    },
    {
        path: "/priseencharge",
        component: layout,
        children: [{
            path: "update/:uuid",
            name: "priseencharge.update",
            component: () =>
                import("@/pages/priseencharge/update"),
            props: true,
        },],
    },
 
    {
        path: "/priseencharge",
        component: layout,
        children: [{
            path: "create/:uuid",
            name: "priseencharge.create",
            component: () =>
                import("@/pages/priseencharge/create"),
                props: true,
        },],
    },

    {
        path: "/priseencharge",
        component: layout,
        children: [{
            path: "detail/:uuid",
            name: "priseencharge.detail",
            component: () =>
                import("@/pages/priseencharge/detail"),
                props: true,
        },],
    },
    {
        path: "/priseencharge",
        component: layout,
        children: [{
            path: "list",
            name: "priseencharge.list",
            component: () =>
                import("@/pages/priseencharge/index"),
        },],

    },




]
