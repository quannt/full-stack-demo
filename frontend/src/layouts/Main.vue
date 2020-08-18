<template>
  <el-container>
    <el-header class="header">Baymax Portal</el-header>
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
          name: "EmployeesManagement",
          title: "Employees Management"
        },
        {
          name: "ReviewsManagement",
          title: "Reviews Management"
        }
      ];
    },
    isAdmin() {
      return this.roles.includes(Roles.Admin);
    }
  }
};
</script>

<style scoped>
.el-aside {
  border-right: solid 1px #e6e6e6;
}
.header {
  background: #f24f4f;
  color: #ffffff;
  font-size: 30px;
  font-weight: 500;
  display: flex;
  align-items: center;
}
</style>
