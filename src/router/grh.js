import layout from "../layout";
import layoutGRH from "../pages/module-GRH/layout/index-grh";
export default [
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "list",
            name: "grh.list",
            component: () =>
            import ("@/pages/module-GRH/grh/index"),
        }, ],
    },
  
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "update/:uuid",
            name: "grh.update",
            component: () =>
            import ("@/pages/module-GRH/grh/update"),
            props: true,
        }, ],
    },
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "detail/:uuid",
            name: "grh.detail",
            component: () =>
            import ("@/pages/module-GRH/grh/detail"),
            props: true,
        }, ],
    },
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "create",
            name: "grh.create",
            component: () =>
            import ("@/pages/module-GRH/grh/create"),
        }, ],
    },
    // Plannings
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "plannings",
            name: "grh.plannings",
            component: () =>
            import ("@/pages/module-GRH/plannings/index"),
        }, ],
    },
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "plannings/create",
            name: "grh.plannings.create",
            component: () =>
            import ("@/pages/module-GRH/plannings/create"),
        }, ],
    },
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "plannings/:uuid",
            name: "grh.plannings.detail",
            component: () =>
            import ("@/pages/module-GRH/plannings/detail"),
            props: true,
        }, ],
    },
    // Congés
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "vacations",
            name: "grh.vacations",
            component: () =>
            import ("@/pages/module-GRH/vacations/index"),
        }, ],
    },
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "vacations/create",
            name: "grh.vacations.create",
            component: () =>
            import ("@/pages/module-GRH/vacations/create"),
        }, ],
    },
    // Formations
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "formations",
            name: "grh.formations",
            component: () =>
            import ("@/pages/module-GRH/formations/index"),
        }, ],
    },
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "formations/create",
            name: "grh.formations.create",
            component: () =>
            import ("@/pages/module-GRH/formations/create"),
        }, ],
    },
    // Performance (placeholder UI)
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "performance",
            name: "grh.performance",
            component: () =>
            import ("@/pages/module-GRH/performance/index"),
        }, ],
    },
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "performance/create",
            name: "grh.performance.create",
            component: () =>
            import ("@/pages/module-GRH/performance/create"),
        }, ],
    },
    {
        path: "/grh",
        component: layoutGRH,
        children: [{
            path: "performance/:uuid",
            name: "grh.performance.detail",
            component: () =>
            import ("@/pages/module-GRH/performance/detail"),
            props: true,
        }, ],
    },
]
