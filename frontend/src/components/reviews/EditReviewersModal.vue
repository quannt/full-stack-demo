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
          @select="handleSelectEmployee"
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
      <el-button type="primary" @click="handleSave">Save</el-button>
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
      newReviews: [],
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
      return [...this.selectedReviews, ...this.newReviews];
    },
    reviewersIds() {
      return this.reviews.map(r => r?.reviewer?._id) ?? [];
    }
  },

  methods: {
    get,
    async querySearch(queryString, cb) {
      try {
        const searchResponse = await UsersService.getUsers([
          {
            key: "name",
            value: queryString
          }
        ]);
        const result = searchResponse?.data ?? [];
        cb(result);
      } catch (error) {
        console.log(error);
      }
    },
    handleSelectEmployee(newReviewer) {
      if (newReviewer._id === this.reviewee._id) {
        this.$message.error("Sorry, users cannot review themselves.");
        return;
      }

      if (this.reviewersIds.includes(newReviewer._id)) {
        this.$message.error("Sorry, user has already been chosen as reviewer.");
        return;
      }
      this.newReviews.push({
        _id: null,
        reviewer: newReviewer,
        status: "not_started"
      });
    },
    handleSave() {
      this.$emit("update:visible", false);
      this.$emit(
        "submit",
        this.newReviews.map(review => ({
          reviewee_id: this.reviewee._id,
          reviewer_id: review.reviewer._id
        }))
      );
    }
  }
};
</script>

<style scoped>
.employee-autocomplete {
  width: 100%;
}
</style>
