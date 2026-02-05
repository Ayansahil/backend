const mongoose = require("mongoose");
const { use } = require("react");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("users", userSchema, "day9_JWT");
module.exports = userModel;
