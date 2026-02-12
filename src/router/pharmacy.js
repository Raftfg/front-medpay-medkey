import layoutPharmacy from "../pages/module-pharmacy/layout/index-pharmacy";

export default [
  //---------------------------------------Start Pharmacy Routes---------------------------------------
  {
    path: "/sale",
    component: layoutPharmacy,
    children: [
      {
        path: "create",
        name: "sale.create",
        component: () => import("@/pages/module-pharmacy/sale/create"),
      },
    ],
  },

  {
    path: "/sale",
    component: layoutPharmacy,
    children: [
      {
        path: "list",
        name: "sale.list",
        component: () => import("@/pages/module-pharmacy/sale/index"),
      },
    ],
  },

  {
    path: "/caisse",
    component: layoutPharmacy,
    children: [
      {
        path: "state",
        name: "pharmacy.caisse.state",
        component: () => import("@/pages/module-pharmacy/caisse/state"),
      },
    ],
  },

  {
    path: "/caisse/bills",
    component: layoutPharmacy,
    children: [
      {
        path: "list",
        name: "pharmacy.caisse.bills",
        component: () => import("@/pages/module-pharmacy/caisse/bills"),
      },
    ],
  },

 
  

  {
    path: "/pharmacy",
    component: layoutPharmacy,
    children: [
      {
        path: "sale",
        name: "pharmacy.sale",
        component: () => import("@/pages/module-pharmacy/sale/payement"),
      },
    ],
  },

  {
    path: "/destock",
    component: layoutPharmacy,
    children: [
      {
        path: "create",
        name: "pharmacy.destock.create",
        component: () => import("@/pages/module-pharmacy/destock/create"),
      },
    ],
  },

  {
    path: "/destock",
    component: layoutPharmacy,
    children: [
      {
        path: "list",
        name: "pharmacy.destock.list",
        component: () => import("@/pages/module-pharmacy/destock/index"),
      },
    ],
  },

  //---------------------------------------End Pharmacy Routes---------------------------------------
];
