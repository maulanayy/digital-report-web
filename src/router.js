import Vue from "vue";
import Router from "vue-router";
// import auth from '@/auth/authService'
import store from "./store/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./pages/Dashboard-v1"),
    },
    {
      path: "/icon",
      name: "icon",
      component: () => import("./pages/UI-icons"),
    },
    {
      path: "/",
      name: "dashboard",
      component: () => import("./pages/home/Dashboard"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("./pages/home/Dashboard"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/auth/login"),
    },
    {
      path: "/report",
      name: "report",
      component: () => import("./pages/home/report"),
    },
    {
      path: "/report/:id",
      name: "report detail",
      component: () => import("./pages/home/detail_report"),
    },
    {
      path: "/dashboard/graph/:id",
      name: "dashboard-graph",
      component: () => import("./pages/home/dashboard_graph"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("./pages/user/data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/reset-password",
      name: "user",
      component: () => import("./pages/user/reset-password"),
    },
    {
      path: "/user/add",
      name: "user-add",
      component: () => import("./pages/user/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/user/edit/:id",
      name: "user-edit",
      component: () => import("./pages/user/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/lab",
      name: "lab",
      component: () => import("./pages/lab/data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/lab/add",
      name: "lab-add",
      component: () => import("./pages/lab/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/lab/edit/:id",
      name: "lab-edit",
      component: () => import("./pages/lab/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/area",
      name: "area",
      component: () => import("./pages/area/data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/area/add",
      name: "area-add",
      component: () => import("./pages/area/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/area/edit/:id",
      name: "area-edit",
      component: () => import("./pages/area/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/control_point",
      name: "control_point",
      component: () => import("./pages/control-point/data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/control_point/add",
      name: "control_point-add",
      component: () => import("./pages/control-point/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/control_point/edit/:id",
      name: "control_point-edit",
      component: () => import("./pages/control-point/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/product",
      name: "product",
      component: () => import("./pages/product/data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/product/add",
      name: "product-add",
      component: () => import("./pages/product/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/product/edit/:id",
      name: "product-edit",
      component: () => import("./pages/product/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/ewon",
      name: "ewon",
      component: () => import("./pages/setting/ewon-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/ewon/add",
      name: "ewon-add",
      component: () => import("./pages/setting/ewon-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/ewon/edit/:id",
      name: "ewon-edit",
      component: () => import("./pages/setting/ewon-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/oracle",
      name: "oracle",
      component: () => import("./pages/setting/oracle-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/oracle/add",
      name: "oracle-add",
      component: () => import("./pages/setting/oracle-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/oracle/edit/:id",
      name: "oracle-edit",
      component: () => import("./pages/setting/oracle-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/parameter",
      name: "parameter",
      component: () => import("./pages/setting/parameter-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/parameter/:id/graph",
      name: "parameter-graph",
      component: () => import("./pages/setting/parameter-graph"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/parameter/add",
      name: "parameter-add",
      component: () => import("./pages/setting/parameter-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/parameter/edit/:id",
      name: "parameter-edit",
      component: () => import("./pages/setting/parameter-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/master-form",
      name: "setting-form",
      component: () => import("./pages/setting/master-form-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/master-form/add",
      name: "setting-form-add",
      component: () => import("./pages/setting/master-form-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/master-form/edit/:id",
      name: "setting-form-edit",
      component: () => import("./pages/setting/master-form-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form",
      name: "setting-form",
      component: () => import("./pages/setting/form-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/add",
      name: "setting-form-add",
      component: () => import("./pages/setting/form-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/edit/:id",
      name: "setting-form-edit",
      component: () => import("./pages/setting/form-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/shift",
      name: "setting-shift",
      component: () => import("./pages/setting/shift-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/shift/add",
      name: "setting-shift-add",
      component: () => import("./pages/setting/shift-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/shift/edit/:id",
      name: "setting-shift-add",
      component: () => import("./pages/setting/shift-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/batch-type",
      name: "setting-batch-type",
      component: () => import("./pages/setting/batch-type-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/batch-type/add",
      name: "setting-okp-add",
      component: () => import("./pages/setting/batch-type-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/batch-type/edit/:id",
      name: "setting-shift-add",
      component: () => import("./pages/setting/batch-type-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/type-okp",
      name: "setting-type-okp",
      component: () => import("./pages/setting/type-okp-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/type-okp/add",
      name: "setting-type-okp-add",
      component: () => import("./pages/setting/type-okp-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/type-okp/edit/:id",
      name: "setting-type-okp-add",
      component: () => import("./pages/setting/type-okp-add"),
      meta: {
        requireAuth: true,
      },
    },
    
    {
      path: "/history",
      name: "history",
      componenet: () => import("./pages/history/data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/form",
      name: "form",
      component: () => import("./pages/form/data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/form/add",
      name: "form-add",
      component: () => import("./pages/form/add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/form/edit/:id",
      name: "form-add",
      component: () => import("./pages/form/add"),
      meta: {
        requireAuth: true,
      },
    },
    
    {
      path: "/tutorial/form-element",
      name: "form-element",
      component: () => import("./pages/Form-elements"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/ui/modal-notification",
      name: "modal-notification",
      component: () => import("./pages/UI-modal-notification"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.userdata == null) {
      next("/");
    }
  }
  next();
});

export default router;
