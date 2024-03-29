<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Admin Portal</el-breadcrumb-item>
      <el-breadcrumb-item>Reviews Management</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="table-actions">
      <el-button icon="el-icon-plus" @click="handleAdd">Add</el-button>
    </div>

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
      :visible.sync="showEditModal"
      :reviewee="selectedReviewee"
      :selected-reviews="selectedReviews"
      :create-mode="createMode"
      @update:reviewee="handleSelectedReviewee"
      @submit="handleNewReviewsAdded"
      @close="handleResetReviewerModal"
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
      showEditModal: false,
      createMode: false,
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
      this.showEditModal = true;
      this.createMode = false;
      this.selectedReviewee = item.reviewee;
      this.selectedReviews = item.reviews;
    },
    async handleNewReviewsAdded(newReviews) {
      try {
        const response = await ReviewsService.createReview(newReviews);
        const addedReviews = response?.data ?? [];
        this.reviews = [...this.reviews, ...addedReviews];
        this.$message.success("Reviewer has been assigned successfully.");
      } catch (error) {
        this.$message.error("Failed to create reviews. Please try again.");
      }
    },
    handleAdd() {
      this.showEditModal = true;
      this.createMode = true;
    },
    handleSelectedReviewee(user) {
      this.selectedReviewee = user;
    },
    handleResetReviewerModal() {
      this.selectedReviewee = null;
      this.selectedReviews = [];
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
