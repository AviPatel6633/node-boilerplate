const asyncHandler = require("../../utils/asyncHandler")
const service = require("./user.service");

const getUsers = asyncHandler(async (req,res) => {
    const users = await service.getUsers();
    res.status(200).json(users);
})

const createUser = asyncHandler(async (req,res) => {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
})

module.exports = {
    getUsers,
    createUser,
}