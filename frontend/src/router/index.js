import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "Admin" } },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "admin-layout" */ "../layouts/Main.vue"),
    children: [
      {
        path: "reviews",
        component: () =>
          import(
            /* webpackChunkName: "admin-layout" */ "../components/Reviews.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
