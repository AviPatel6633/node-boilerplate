const User = require("./user.model");

/*CREATE*/ 
// create single user
const createUser = async (data) => {
    return User.create(data);
}

// create multiple users at same time
const createManyUsers = async (dataArray) => {
    return User.insertMany(dataArray);
    //Eg: createManyUsers([
    //  { name: "John Doe", userName: "john", email: "john@example", password: "123456", role: "admin", permissions: "read,write", deniedPermissions: "delete" },
    //  { name: "Jane Doe", userName: "jane", email: "jane@example", password: "123456", role: "user", permissions: "read", deniedPermissions: "write,delete" },
    //])
}

/*Read*/ 
//get All Users
const getUsers = async () => {
    return User.find().lean();
}

const getUsersWithPermissions = async () => {
    return User.find()
                .populate("role")
                .populate("permissions")
                .populate("deniedPermissions").lean();
}

// get users with filter by columns like role, permissions, deniedPermissions
const filterUsers = async (filter) => {
    return User.find(filter);
    // Eg: filterUsers({ role: "admin" })
    // Eg: filterUsers({ permissions: "read" })
    // Eg: filterUsers({ deniedPermissions: "delete" })
}

// get user by id
const getUserById = async (id) => {
    return User.findById(id);
}

// get specific user 
const findUserByParams = async (params) => {
    return User.findOne(params);
    // Eg: findUserByParams({ email: "john@example.com" })
    // Eg: findUserByParams({ userName: "john" })
    // Eg: findUserByParams({ name: "John Doe" })
}

/* UPDATE */
// update user by id
const updateUserById = async (id, data) => {
    return User.updateOne({ _id: id }, data);
}

const updateManyUsers = async (filter, data) => {
    return User.updateMany(filter, data);
    // Eg: updateManyUsers({ role: "user" }, { role: "admin" })
    // Eg: updateManyUsers({ permissions: "read" }, { permissions: "read,write" })
    // Eg: updateManyUsers({ deniedPermissions: "delete" }, { deniedPermissions: "delete,write" })
}

/* DELETE */
// delete user by username
const deleteUserByUsername = async (username) => {
    return User.deleteOne({ username: username });
}

// delete user by id
const deleteUserAndReturn = async (id) => {
    return User.findByIdAndDelete(id);
}

// delete multiple users by filter
const deleteManyUsers = async (filter) => {
    return User.deleteMany(filter); 
    // Eg: deleteManyUsers({ role: "user" })
    // Eg: deleteManyUsers({ permissions: "read" })
    // Eg: deleteManyUsers({ deniedPermissions: "delete" })
}


/* COUNT */
const countUsers = async () => {
    return User.countDocuments();
}

/* CHECK EXISTENCE */
const checkUserExists = async (email) => {
    return User.exists({ email });
}


module.exports  = {
    createUser,
    createManyUsers,
    getUsers,
    getUsersWithPermissions,
    filterUsers,
    getUserById,
    findUserByParams,
    updateUserById,
    updateManyUsers,
    deleteUserByUsername,
    deleteUserAndReturn,
    deleteManyUsers,
    countUsers,
    checkUserExists,
}


