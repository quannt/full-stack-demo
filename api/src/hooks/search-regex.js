module.exports = function () {
  return function (hook) {
    const query = hook.params.query;
    for (let field in query) {
      if (query[field].$search && field.indexOf("$") == -1) {
        query[field] = { $regex: new RegExp(query[field].$search, "i") };
      }
    }
    hook.params.query = query;
    return hook;
  };
};
