const populateUser = require("../../hooks/populate-user");

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [populateUser()],
    get: [populateUser()],
    create: [populateUser()],
    update: [populateUser()],
    patch: [populateUser()],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
