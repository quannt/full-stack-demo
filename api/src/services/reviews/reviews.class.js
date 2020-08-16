const { Service } = require("feathers-nedb");

const ReviewStatus = {
  NotStarted: "not_started",
  InProgress: "in_progress",
  Submitted: "submitted",
};
exports.Reviews = class Reviews extends Service {
  create(data, params) {
    const { reviewer_id, reviewee_id, content } = data;
    const created = new Date();
    const last_updated = new Date();
    // The complete review
    const reviewData = {
      reviewer_id,
      reviewee_id,
      content,
      status: ReviewStatus.NotStarted,
      created,
      last_updated,
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(reviewData, params);
  }
  update(id, data, params) {
    data.last_updated = new Date();
    return super.patch(id, data, params);
  }
};
