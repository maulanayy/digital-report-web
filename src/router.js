import Vue from "vue";
import Router from "vue-router";
// import auth from '@/auth/authService'
import store from './store/store'

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
      name: "dashboard",
      component: () => import("./pages/home/Dashboard"),
    },
    {
      path : "/login",
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
      component: () => import("./pages/home/report"),
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
      meta : {
        requireAuth: true
      }
    },
    {
      path: "/user/add",
      name: "user-add",
      component: () => import("./pages/user/add"),
    },
    {
      path: "/user/edit/:id",
      name: "user-edit",
      component: () => import("./pages/user/add"),
    },
    {
      path: "/lab",
      name: "lab",
      component: () => import("./pages/lab/data"),
    },
    {
      path: "/lab/add",
      name: "lab-add",
      component: () => import("./pages/lab/add"),
    },
    {
      path: "/lab/edit/:id",
      name: "lab-edit",
      component: () => import("./pages/lab/add"),
    },
    {
      path: "/area",
      name: "area",
      component: () => import("./pages/area/data"),
    },
    {
      path: "/area/add",
      name: "area-add",
      component: () => import("./pages/area/add"),
    },
    {
      path: "/area/edit/:id",
      name: "area-edit",
      component: () => import("./pages/area/add"),
    },
    {
      path: "/control_point",
      name: "control_point",
      component: () => import("./pages/control-point/data"),
    },
    {
      path: "/control_point/add",
      name: "control_point-add",
      component: () => import("./pages/control-point/add"),
    },
    {
      path: "/control_point/edit/:id",
      name: "control_point-edit",
      component: () => import("./pages/control-point/add"),
    },
    {
      path: "/setting/role",
      name: "role",
      component: () => import("./pages/setting/role-data"),
    },
    {
      path: "/setting/role/add",
      name: "role-add",
      component: () => import("./pages/setting/role-add"),
    },
    {
      path: "/setting/role/edit/:id",
      name: "role-edit",
      component: () => import("./pages/setting/role-add"),
    },
    {
      path: "/setting/ewon",
      name: "ewon",
      component: () => import("./pages/setting/ewon-data"),
    },
    {
      path: "/setting/ewon/add",
      name: "ewon-add",
      component: () => import("./pages/setting/ewon-add"),
    },
    {
      path: "/setting/ewon/edit/:id",
      name: "ewon-edit",
      component: () => import("./pages/setting/ewon-add"),
    },
    {
      path: "/setting/oracle",
      name: "oracle",
      component: () => import("./pages/setting/oracle-data"),
    },
    {
      path: "/setting/oracle/add",
      name: "oracle-add",
      component: () => import("./pages/setting/oracle-add"),
    },
    {
      path: "/setting/oracle/edit/:id",
      name: "oracle-edit",
      component: () => import("./pages/setting/oracle-add"),
    },
    {
      path: "/setting/parameter",
      name: "parameter",
      component: () => import("./pages/setting/parameter-data"),
    },
    {
      path: "/setting/parameter/add",
      name: "parameter-add",
      component: () => import("./pages/setting/parameter-add"),
    },
    {
      path: "/setting/parameter/edit/:id",
      name: "parameter-edit",
      component: () => import("./pages/setting/parameter-add"),
    },
    {
      path: "/setting/form",
      name: "setting-form",
      component: () => import("./pages/setting/form-data"),
    },
    {
      path: "/setting/form/add",
      name: "setting-form-add",
      component: () => import("./pages/setting/form-add"),
    },
    {
      path: "/form",
      name: "form",
      component: () => import("./pages/form/data"),
    },
    {
      path: "/form/add",
      name: "form-add",
      component: () => import("./pages/form/add"),
    },
    {
      path: "/tutorial/form-element",
      name: "form-element",
      component: () => import("./pages/Form-elements"),
    },
    {
      path: "/ui/modal-notification",
      name:"modal-notification",
      component : () => import("./pages/UI-modal-notification")
    }
  ],
});

router.beforeEach((to,from,next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
    if (store.state.userdata == null) {
			next('/')
		}
	} 
  next()

})


export default router;
