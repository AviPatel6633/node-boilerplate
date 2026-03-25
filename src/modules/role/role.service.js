const Role = require("./role.model");
const Permission = require("../permission/permission.model");

const createRole = async (data) => {
  return Role.create(data);
};

const getRoles = async () => {
  return Role.find().populate("permissions");
};

const updateRole = async (roleId, data) => {
  const { name, permissions } = data;

  const role = await Role.findById(roleId);
  if (!role) throw new Error("Role not found");

  if (name) role.name = name;

  if (permissions) {
    const permissionDocs = await Permission.find({
      name: { $in: permissions },
    });

    role.permissions = permissionDocs.map((p) => p._id);
  }

  await role.save();

  return await role.populate("permissions", "name");
};

module.exports = {
  createRole,
  getRoles,
  updateRole
};