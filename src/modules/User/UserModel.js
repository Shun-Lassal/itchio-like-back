const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  phone: String,
  picture: String,
  role_fk: { type: mongoose.ObjectId, ref: "Roles" },
  superAdmin: Boolean,
});

const User = mongoose.model("Users", userSchema);

const schema = Joi.object({
  name: Joi.string().min(2).max(50),
  password: Joi.string().min(5).max(255).required(),
  email: Joi.string().min(5).max(255).required().email(),
  phone: Joi.string().min(0).max(12),
  picture: Joi.string().min(5).max(500),
  role_fk: Joi.string().min(2).max(50),
  superAdmin: Joi.boolean(),
});

exports.User = User;
exports.userSchema = schema;
