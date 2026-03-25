const Permission = require("./permission.model");

const createPermission = async (data) => {
  return Permission.create(data);
};

const getAllPermissions = async () => {
  return Permission.find();
};

module.exports = {
  createPermission,
  getAllPermissions,
};