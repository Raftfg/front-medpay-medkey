import layoutHospitalization from "../pages/hospitalization/layout/index-hospitalization";

export default [
    //-------------------------Bed-------------------------
    {
        path: "/hospitalization/bed",
        component: layoutHospitalization,
        children: [{
            path: "list",
            name: "hospitalization.bed.list",
            component: () =>
                import ("@/pages/hospitalization/bed/index"),
        }, ],
    },
    //-------------------------Room-------------------------
    {
        path: "/hospitalization/room",
        component: layoutHospitalization,
        children: [{
            path: "list",
            name: "hospitalization.room.list",
            component: () =>
                import ("@/pages/hospitalization/room/index"),
        }, ],
    },
    //-------------------------History-------------------------
    {
        path: "/hospitalization/history",
        component: layoutHospitalization,
        children: [{
            path: "list",
            name: "hospitalization.history.list",
            component: () =>
                import ("@/pages/hospitalization/history/index"),
        }, ],
    },
    //-------------------------History-------------------------
    {
        path: "/hospitalization/history",
        component: layoutHospitalization,
        children: [{
            path: ":uuid/details",
            name: "hospitalization.history.details",
            component: () =>
                import ("@/pages/hospitalization/history/details"),
            props: true,
        }, ],
    },
]