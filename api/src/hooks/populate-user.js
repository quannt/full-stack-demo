module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { app, method, result } = context;
    const addUsers = async review => {
      const reviewer = await app.service('users').get(review.reviewer_id);
      const reviewee = await app.service('users').get(review.reviewee_id);

      return {
        ...review,
        reviewer,
        reviewee
      };
    };

    if (method === 'find') {
      // find returns result in a list, need to use map to iterate through
      context.result = await Promise.all(result.map(addUsers));
    } else {
      // Otherwise just update the single result
      context.result = await addUsers(result);
    }
    return context;
  };
};
