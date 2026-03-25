const permissionService = require("./permission.service");
const asyncHandler = require("../../utils/asyncHandler");

const createPermission = asyncHandler(async (req, res) => {
  const permission = await permissionService.createPermission(req.body);

  res.status(201).json({
    success: true,
    data: permission,
  });
});

const getPermissions = asyncHandler(async (req, res) => {
  const permissions = await permissionService.getAllPermissions();

  res.json({
    success: true,
    data: permissions,
  });
});

module.exports = {
  createPermission,
  getPermissions,
};