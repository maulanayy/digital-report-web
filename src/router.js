import Vue from "vue";
import Router from "vue-router";
// import auth from '@/auth/authService'
import store from "./store/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
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
      path: "/setting/ewon/:id/graph",
      name: "parameter-graph",
      component: () => import("./pages/setting/parameter-graph"),
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
      path: "/setting/form/parameter",
      name: "parameter",
      component: () => import("./pages/setting/parameter-data"),
      meta: {
        requireAuth: true,
      },
    },
    
    {
      path: "/setting/form/parameter/add",
      name: "parameter-add",
      component: () => import("./pages/setting/parameter-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/parameter/edit/:id",
      name: "parameter-edit",
      component: () => import("./pages/setting/parameter-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/parameter-value",
      name: "parameter",
      component: () => import("./pages/setting/parameter-value-data"),
      meta: {
        requireAuth: true,
      },
    },
    
    {
      path: "/setting/form/parameter-value/add",
      name: "parameter-add",
      component: () => import("./pages/setting/parameter-value-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/parameter-value/edit/:id",
      name: "parameter-edit",
      component: () => import("./pages/setting/parameter-value-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/master",
      name: "setting-form",
      component: () => import("./pages/setting/master-form-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/master/add",
      name: "setting-form-add",
      component: () => import("./pages/setting/master-form-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/master/edit/:id",
      name: "setting-form-edit",
      component: () => import("./pages/setting/master-form-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/qc",
      name: "setting-form",
      component: () => import("./pages/setting/form-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/qc/add",
      name: "setting-form-add",
      component: () => import("./pages/setting/form-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/qc/edit/:id",
      name: "setting-form-edit",
      component: () => import("./pages/setting/form-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/user/shift",
      name: "setting-user-shift",
      component: () => import("./pages/setting/shift-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/user/shift/add",
      name: "setting-shift-add",
      component: () => import("./pages/setting/shift-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/user/shift/edit/:id",
      name: "setting-shift-add",
      component: () => import("./pages/setting/shift-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/user/password",
      name: "setting-user-shift",
      component: () => import("./pages/setting/password-data"),
      meta: {
        requireAuth: true,
      },
    },
    
    {
      path: "/setting/form/okp",
      name: "setting-type-okp",
      component: () => import("./pages/setting/type-okp-data"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/okp/add",
      name: "setting-type-okp-add",
      component: () => import("./pages/setting/type-okp-add"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/setting/form/okp/edit/:id",
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
