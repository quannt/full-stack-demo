<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Admin Portal</el-breadcrumb-item>
      <el-breadcrumb-item>Employees Management</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :inline="true" class="table-actions">
      <el-form-item>
        <el-input
          v-model="newEmployeeName"
          style="width: 300px;"
          placeholder="Type new employee's name here..."
          v-on:keyup.enter.native="handleAdd"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          v-loading="isCreating"
          :disable="isCreating"
          icon="el-icon-plus"
          @click="handleAdd"
          >Add</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="employees"
      style="width: 100%"
      empty-text="There's no data"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="Name" width="120">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Active">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_active" type="success">Active</el-tag>
          <el-tag v-else type="warning">Deactivated</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Created">
        <template slot-scope="scope">
          {{ format(new Date(scope.row.created)) }}
        </template>
      </el-table-column>
      <el-table-column label="Updated">
        <template slot-scope="scope">
          {{ format(new Date(scope.row.last_updated)) }}
        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <el-button size="mini" disabled>Edit</el-button>
        <el-button size="mini" disabled type="danger">Remove</el-button>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import UsersService from "@/services/UsersService";
import { format } from "@/utils/date";

export default {
  name: "Employees",

  data() {
    return {
      employees: [],
      loading: false,
      isCreating: false,
      newEmployeeName: null
    };
  },

  async created() {
    this.loading = true;
    try {
      const response = await UsersService.getUsers();
      this.employees = response?.data;
    } catch (error) {
      this.$message.error("Failed to load employees. Please try again.");
    }
    this.loading = false;
  },

  methods: {
    format,
    async handleAdd() {
      // TODO: use vuelidate if the business logic for name becomes more complicated
      if (!this.newEmployeeName) {
        this.$message.error("Please type in employee's name.");
        return;
      }

      this.isCreating = true;
      try {
        const response = await UsersService.createUser({
          name: this.newEmployeeName
        });
        const addedUser = response?.data ?? [];
        this.newEmployeeName = null;
        this.employees.push(addedUser);
        this.$message.success("Employee has been created successfully.");
      } catch (error) {
        // TODO: log the error somewhere
        this.$message.error("Failed to create employee. Please try again.");
      }
      this.isCreating = false;
    }
  }
};
</script>

<style scoped>
.el-tag {
  margin-right: 15px;
  margin-bottom: 10px;
}
.table-actions {
  margin-top: 20px;
}
</style>
