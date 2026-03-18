const jwt = require("jsonwebtoken");
const User = require("../modules/user/user.model");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id)
    .populate("role")
    .populate("permissions")
    .populate("deniedPermissions");

  req.user = user;
  next();
};

module.exports = authenticate;