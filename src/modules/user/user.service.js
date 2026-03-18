const User = require("./user.model");

const createUser = async (data) => {
  return User.create(data);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email })
    .populate("role")
    .populate("permissions")
    .populate("deniedPermissions");
};

module.exports = {
  createUser,
  getUserByEmail,
};