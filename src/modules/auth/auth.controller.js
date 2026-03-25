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
  console.log("Login request:", req.body);
  const result = await authService.login(req.body.email, req.body.password);

  // Example: result should contain token
  const { token, user } = result;

  // Set cookie
  res.cookie("token", token, { httpOnly: true });

  res.json({
    success: true,
    ...result,
  });
});

const logout = asyncHandler(async (req,res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,     // same as login
    sameSite: "lax",   // same as login
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
})

module.exports = {
  register,
  login,
  logout
};
