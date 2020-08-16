<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Admin Portal</el-breadcrumb-item>
      <el-breadcrumb-item>Reviews Management</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      v-loading="loading"
      :data="groupedReviews"
      style="width: 100%"
      empty-text="There's no data"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="Reviewee" width="120">
        <template slot-scope="scope">
          {{ scope.row.reviewee.name }}
        </template>
      </el-table-column>
      <el-table-column label="Reviewers">
        <template slot-scope="scope">
          <el-tag
            v-for="review in scope.row.reviews"
            :key="review._id"
            type="success"
          >
            {{ review.reviewer.name }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Form -->
    <EditReviewersModal
      :visible.sync="dialogFormVisible"
      :reviewee="selectedReviewee"
      :selected-reviews="selectedReviews"
    />
  </el-main>
</template>

<script>
import ReviewsService from "@/services/ReviewsService";
import EditReviewersModal from "@/components/reviews/EditReviewersModal";
import groupBy from "lodash.groupby";

export default {
  name: "Reviews",

  components: {
    EditReviewersModal
  },

  data() {
    return {
      reviews: [],
      selectedReviewee: null,
      selectedReviews: [],
      dialogFormVisible: false,
      loading: false
    };
  },

  computed: {
    groupedReviews() {
      let result = [];
      const groupByReviewee = groupBy(this.reviews, "reviewee_id");
      Object.keys(groupByReviewee).forEach(reviewee_id => {
        result.push({
          reviewee: groupByReviewee[reviewee_id][0]?.reviewee,
          reviews: groupByReviewee[reviewee_id].map(review => {
            return {
              reviewer: review.reviewer,
              status: review.status,
              _id: review._id
            };
          })
        });
      });
      return result;
    }
  },

  async created() {
    this.loading = true;
    try {
      const response = await ReviewsService.getReviews();
      this.reviews = response?.data;
    } catch (error) {
      this.$message.error("Failed to load reviews. Please try again.");
    }
    this.loading = false;
  },

  methods: {
    handleEdit(item) {
      this.dialogFormVisible = true;
      this.selectedReviewee = item.reviewee;
      this.selectedReviews = item.reviews;
    }
  }
};
</script>

<style scoped>
.el-tag {
  margin-right: 15px;
}
</style>
