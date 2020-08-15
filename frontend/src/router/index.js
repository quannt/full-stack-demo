import Vue from "vue";
import VueRouter from "vue-router";
import { Roles } from "@/constants/roles";
import MainLayout from "@/layouts/Main";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { name: "Admin" } },
  {
    path: "/admin",
    name: "Admin",
    props: {
      // We don't have an authentication system so we are hard-coding the role here
      roles: [Roles.Admin]
    },
    component: MainLayout,
    children: [
      {
        path: "reviews",
        name: "ReviewsManagement",
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
