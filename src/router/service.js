import serviceLayout from "../pages/module-medicalServices/layout/index";

export default [

{
    path: "/medical-services",
    component: serviceLayout,
    children: [{
        path: "urgences",
        name: "urgences",
        component: () =>
        import ("@/pages/module-medicalServices/urgences"),
    }, ],
},

{
    path: "/medical-services",
    component: serviceLayout,
    children: [{
        path: "infirmerie",
        name: "infirmerie",
        component: () =>
        import ("@/pages/module-medicalServices/infirmerie"),
    }, ],
},


{
    path: "/medical-services",
    component: serviceLayout,
    children: [{
        path: "maternite",
        name: "maternite",
        component: () =>
        import ("@/pages/module-medicalServices/maternite"),
    }, ],
},


{
    path: "/medical-services",
    component: serviceLayout,
    children: [{
        path: "chirurgie",
        name: "chirurgie",
        component: () =>
        import ("@/pages/module-medicalServices/chirurgie"),
    }, ],
},


{
    path: "/medical-services",
    component: serviceLayout,
    children: [{
        path: "laboratoire",
        name: "laboratoire",
        component: () =>
        import ("@/pages/module-medicalServices/laboratoire"),
    }, ],
},


{
    path: "/medical-services",
    component: serviceLayout,
    children: [{
        path: "imagerie",
        name: "imagerie",
        component: () =>
        import ("@/pages/module-medicalServices/imagerie"),
    }, ],
},


{
    path: "/medical-services",
    component: serviceLayout,
    children: [{
        path: "consultation",
        name: "consultation",
        component: () =>
        import ("@/pages/module-medicalServices/consultation"),
    }, ],
},

{
    path: "/medical-services",
    component: serviceLayout,
    children: [{
        path: "pediatrie",
        name: "pediatrie",
        component: () =>
        import ("@/pages/module-medicalServices/pediatrie"),
    }, ],
},



{
    path: "/medical-services",
    component: serviceLayout,
    children: [{
        path: "treatement/:movment_id",
        name: "treatement",
        component: () =>
        import ("@/pages/module-medicalServices/treatment"),
        props: true,
    }, ],
},

{
    path: "/actes-medicaux",
    component: serviceLayout,
    children: [{
        path: "create-list/:services_id(\\d+)",
        name: "medical-services.actes.create-list",
        component: () =>
        import ("@/pages/module-medicalServices/create"),
        props: true,
    }, ],
},


]
