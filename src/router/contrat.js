import layoutGRH from "../pages/module-GRH/layout/index-grh";

export default [
  {
    path: "/contrat",
    component: layoutGRH,
    children: [
      {
        path: "list",
        name: "contrat.list",
        component: () =>
          import("@/pages/module-GRH/contrat/index"),
      },
    ],
  },
  {
    path: "/contrat",
    component: layoutGRH,
    children: [
      {
        path: "create",
        name: "contrat.create",
        component: () =>
          import("@/pages/module-GRH/contrat/create"),
      },
    ],
  },
  {
    path: "/contrat",
    component: layoutGRH,
    children: [
      {
        path: "update/:uuid",
        name: "contrat.update",
        component: () =>
          import("@/pages/module-GRH/contrat/update"),
        props: true,
      },
    ],
  },
];

