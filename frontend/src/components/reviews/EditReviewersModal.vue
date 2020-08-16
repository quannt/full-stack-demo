<template>
  <el-dialog
    :title="`${get(reviewee, 'name')}'s Review Details`"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
  >
    <el-form>
      <el-form-item>
        <el-autocomplete
          v-model="employeeQuery"
          prefix-icon="el-icon-search"
          :fetch-suggestions="querySearch"
          placeholder="Search for employee to set as reviewer"
          class="employee-autocomplete"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="value">{{ item.name }}</div>
          </template></el-autocomplete
        >
      </el-form-item>
    </el-form>

    <el-table :data="reviews" style="width: 100%" empty-text="There's no data">
      <el-table-column type="index" width="50"> </el-table-column>

      <el-table-column label="Reviewer">
        <template slot-scope="scope">
          {{ scope.row.reviewer.name }}
        </template>
      </el-table-column>
      <el-table-column label="Status">
        <template slot-scope="scope">
          <el-tag size="small" :type="StatusLabels[scope.row.status].tagType">{{
            StatusLabels[scope.row.status].label
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <el-button size="mini" type="danger" disabled>Remove</el-button>
      </el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">Cancel</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)"
        >Save</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import get from "lodash.get";
import UsersService from "@/services/UsersService";

export default {
  name: "EditReviewersModal",

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    reviewee: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    selectedReviews: {
      type: Array,
      require: false,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      employeeQuery: null,
      form: {},
      StatusLabels: {
        not_started: {
          label: "Not Started",
          tagType: "warning"
        },
        in_progress: {
          label: "In Progress",
          tagType: "info"
        },
        submitted: {
          label: "Submitted",
          tagType: "success"
        }
      }
    };
  },

  computed: {
    reviews() {
      return this.selectedReviews;
    }
  },

  methods: {
    get,
    async querySearch(queryString, cb) {
      const searchResponse = await UsersService.getUsers([
        {
          key: "name",
          value: queryString
        }
      ]);
      const result = searchResponse?.data ?? [];
      cb(result);
    },
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>

<style scoped>
.employee-autocomplete {
  width: 100%;
}
</style>
