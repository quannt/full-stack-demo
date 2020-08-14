const { Service } = require('feathers-nedb');

exports.Users = class Users extends Service {
  create (data, params) {
    // This is the information we want from the user signup data
    const { name, is_admin = false } = data;
    const created = new Date();
    const last_updated = new Date();
    const is_active = true;
    // The complete user
    const userData = {
      name,
      created,
      last_updated,
      is_admin,
      is_active
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }
  update (id, data, params) {
    data.last_updated = new Date();
    return super.update(data, params);
  }
  remove (id) {
    return super.patch(id, {
      is_active: false
    });
  }
};
