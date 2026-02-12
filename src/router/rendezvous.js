import rendezvousLayout from "../pages/module-rendezvous/layout/index";

export default [
  {
    path: "/rendezvous",
    component: rendezvousLayout,
    children: [
      {
        path: "planning",
        name: "rendezvous.planning",
        component: () => import("@/pages/module-rendezvous/index"),
      },
    ],
  },
];

