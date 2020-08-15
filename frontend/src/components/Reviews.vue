<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Admin Portal</el-breadcrumb-item>
      <el-breadcrumb-item>Reviews Management</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="groupedReviews" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="Reviewee" width="120">
        <template slot-scope="scope">
          {{ scope.row.reviewee.name }}
        </template>
      </el-table-column>
      <el-table-column label="Reviewers">
        <template slot-scope="scope">
          <el-tag
            v-for="reviewer in scope.row.reviewers"
            :key="reviewer._id"
            type="success"
          >
            {{ reviewer.name }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import ReviewsService from "@/services/ReviewsService";
import groupBy from "lodash.groupby";

export default {
  name: "Reviews",

  data() {
    return {
      reviews: []
    };
  },

  computed: {
    groupedReviews() {
      let result = [];
      const groupByReviewee = groupBy(this.reviews, "reviewee_id");
      Object.keys(groupByReviewee).forEach(reviewee_id => {
        result.push({
          reviewee: groupByReviewee[reviewee_id][0]?.reviewee,
          reviewers: groupByReviewee[reviewee_id].map(review => review.reviewer)
        });
      });
      return result;
    }
  },

  async created() {
    try {
      const response = await ReviewsService.getReviews();
      this.reviews = response?.data;
    } catch (error) {
      this.$message.error("Failed to load reviews. Please try again.");
    }
  }
};
</script>

<style scoped>
.el-tag {
  margin-right: 15px;
}
</style>
