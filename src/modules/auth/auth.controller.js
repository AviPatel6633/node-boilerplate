const authService = require("./auth.service");
const asyncHandler = require("../../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(
    req.body.email,
    req.body.password
  );

  res.json({
    success: true,
    ...result,
  });
});

module.exports = {
  register,
  login,
};