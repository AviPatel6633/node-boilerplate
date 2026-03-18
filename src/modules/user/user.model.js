const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },

    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],

    deniedPermissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);