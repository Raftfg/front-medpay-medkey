import layout from "../layout";
import layoutConfiguration from "../pages/configuration/layout/index-configuration";
export default [
    {
        path: "/user",
        component: layoutConfiguration,
        children: [{
            path: "role/permissions",
            name: "role-permissions",
            component: () =>
            import ("@/pages/user/permissions/index"),
        }, ],
    },
    {
        path: "/user",
        component: layoutConfiguration,
        children: [{
            path: "role/update/:id(\\d+)",
            name: "user.role.update",
            component: () =>
                import("@/pages/user/role/update"),
            props: true,
        },],
    },
    {
        path: "/user",
        component: layoutConfiguration,
        children: [{
            path: "create",
            name: "users.create",
            component: () =>
                import("@/pages/user/create"),
        },],
    },

    {
        path: "/user",
        component: layoutConfiguration,
        children: [{
            path: "list",
            name: "users.list",
            component: () =>
                import("@/pages/user/index"),
        },],
    },
    {
        path: "/user",
        component: layoutConfiguration,
        children: [{
            path: "role/create",
            name: "user.role.create",
            component: () =>
                import("@/pages/user/role/create"),
        },],
    },

    {
        path: "/user",
        component: layoutConfiguration,
        children: [{
            path: "role/list",
            name: "user.role.list",
            component: () =>
                import("@/pages/user/role/index"),
        },],
    },
    {
        path: "/user",
        component: layoutConfiguration,
        children: [{
            path: "update/:uuid",
            name: "user.update",
            component: () =>
                import("@/pages/user/update"),
            props: true,
        },],
    },

    // profile
        {
            path: "/profile",
            component: layout,
            children: [{
                path: "profileedit/:uuid",
                name: "profile-update",
                component: () =>
                import ("@/pages/profile/profileedit"),
                props: true,
            }, ],
        },
    
        {
            path: "/profile",
            component: layout,
            children: [{
                path: "create",
                name: "profile-create",
                component: () =>
                import ("@/pages/profile/profilepasswordedit"),
            }, ],
        },
    
        {
            path: "/profile",
            component: layout,
            children: [{
                path: "list",
                name: "profile-list",
                component: () =>
                import ("@/pages/profile/profileshow"),
            }, ],
        },
    
    



]
