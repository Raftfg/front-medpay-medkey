import movmentLayout from "../pages/module-movment/layout/index";

import layoutPatient from "../pages/module-patient/layout/index-patient";

export default[

    {   path: "/movments",
    component: movmentLayout,
    children: [
    {
        path: "list",
        name: "movements.list",
        component: () =>
        import ("@/pages/module-movment/index"),
    },
    ],
},

{
    path: "/movments",
    component: movmentLayout,
    children: [{
        path: "all",
        name: "movements.all",
        component: () =>
        import ("@/pages/module-movment/all"),
    }, ],
},

{
    path: "/movments",
    component: movmentLayout,
    children: [    {
        path: "show/:id",
        name: "movements.show",
        component: () =>
        import ("@/pages/module-movment/show"),
        props: true,
    }, ],
},

{
    path: "/movments",
    component: movmentLayout,
    children: [{
        path: "out/:movment_id",
        name: "movements.out",
        component: () =>
        import ("@/pages/module-movment/out"),
        props: true,
    }, ],
},

{
    path: "/movments",
    component: movmentLayout,
    children: [{
        path: "finish/:movment_id",
        name: "movements.finish",
        component: () =>
        import ("@/pages/module-movment/finish"),
        props: true,
    }, ],
},

{
    path: "/movments",
    component: movmentLayout,
    children: [{
        path: "switcher/:movment_id",
        name: "movements.switcher",
        component: () =>
        import ("@/pages/module-movment/switcher"),
        props: true,
    }, ],
},

{
    path: "/movments",
    component: movmentLayout,
    children: [{
        path: "history/:patients_id",
        name: "movements.history",
        component: () =>
        import ("@/pages/module-movment/history"),
        props: true,
    }, ],
},

{
    path: "/movments",
    component: movmentLayout,
    children: [{
        path: "create",
        name: "movements.create",
        component: () =>
        import ("@/pages/module-movment/create"),
    }, ],

},






]
