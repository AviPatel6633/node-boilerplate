const roleService = require("./role.service");
const asyncHandler = require("../../utils/asyncHandler");

const createRole = asyncHandler(async (req, res) => {
  // console.log("BODY:", req.body)
  const role = await roleService.createRole(req.body);

  res.status(201).json({
    success: true,
    data: role,
  });
});

const getRoles = asyncHandler(async (req, res) => {
  const roles = await roleService.getRoles();

  res.json({
    success: true,
    data: roles,
  });
});

const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedRole = await roleService.updateRole(id, req.body);

  res.json({
    success: true,
    data: updatedRole,
  });
});

module.exports = {
  createRole,
  getRoles,
  updateRole
};