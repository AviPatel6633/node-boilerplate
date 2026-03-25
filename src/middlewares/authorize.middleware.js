module.exports = (requiredPermission) => {
  return (req, res, next) => {
    const user = req.user;

    const rolePermissions = user.role?.permissions?.map((p) => p.name) || [];

    const userPermissions = user.permissions?.map((p) => p.name) || [];

    const deniedPermissions = user.deniedPermissions?.map((p) => p.name) || [];
    // console.log(user, rolePermissions, userPermissions);

    const finalPermissions = new Set([...rolePermissions, ...userPermissions]);

    deniedPermissions.forEach((p) => finalPermissions.delete(p));

    if (!finalPermissions.has(requiredPermission)) {
      return res.status(403).json({
        message: "You Don't have permission to perform this action",
      });
    }

    next();
  };
};
