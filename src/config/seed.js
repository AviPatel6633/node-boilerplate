const Permission = require("../modules/permission/permission.model");
const Role = require("../modules/role/role.model");
const User = require("../modules/user/user.model");
const bcrypt = require("bcryptjs");

const seed = async () => {
  console.log("🌱 Seeding started...");

  // 1. Permissions
  const permissionsList = [
    "user:create",
    "user:read",
    "role:create",
    "role:read",
    "permission:create",
    "permission:read",
  ];

  const permissions = [];

  for (let name of permissionsList) {
    let perm = await Permission.findOne({ name });
    if (!perm) {
      perm = await Permission.create({ name });
    }
    permissions.push(perm);
  }

  // 2. Admin Role
  let adminRole = await Role.findOne({ name: "admin" });

  if (!adminRole) {
    adminRole = await Role.create({
      name: "admin",
      permissions: permissions.map((p) => p._id),
    });
  }

  // 3. Admin User
  let adminUser = await User.findOne({ email: process.env.DEMO_EMAIL });

  if (!adminUser) {
    const hashed = await bcrypt.hash(process.env.DEMO_PASSWORD, 10);

    await User.create({
      name: process.env.DEMO_USER,
      email: process.env.DEMO_EMAIL,
      password: hashed,
      role: adminRole._id,
    });
  }

  console.log("✅ Seeding done");
};

module.exports = seed;