const Role = require("./role.model");

const createRole = async (data) => {
  return Role.create(data);
};

const getRoles = async () => {
  return Role.find().populate("permissions");
};

module.exports = {
  createRole,
  getRoles,
};