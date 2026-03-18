const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../user/user.model");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const register = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email })
    .populate("role")
    .populate("permissions")
    .populate("deniedPermissions");

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user);

  return { user, token };
};

module.exports = {
  register,
  login,
};