<template>
  <el-container>
    <el-header>Baymax Portal</el-header>
    <el-container>
      <el-aside>
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-star-on"></i>{{ title }}</template
            >
            <el-menu-item-group>
              <router-link
                v-for="(menu, index) in menus"
                :key="index"
                :to="{ name: menu.name }"
              >
                <el-menu-item>
                  {{ menu.title }}
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <router-view />
    </el-container>
  </el-container>
</template>

<script>
import { Roles } from "@/constants/roles";
export default {
  name: "MainLayout",

  props: {
    roles: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  computed: {
    title() {
      return this.isAdmin ? "Admin Portal" : "Employee Portal";
    },
    menus() {
      return [
        {
          name: "ReviewsManagement",
          title: "Reviews Management"
        },
        {
          name: "EmployeesManagement",
          title: "Employees Management"
        }
      ];
    },
    isAdmin() {
      return this.roles.includes(Roles.Admin);
    }
  }
};
</script>

<style>
.el-aside {
  border-right: solid 1px #e6e6e6;
}
</style>
