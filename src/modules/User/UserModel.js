const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const userSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  password: String,
  email: String,
  phone: String,
  picture: String,
  role_fk: { type: mongoose.ObjectId, ref: 'Roles' },
  superAdmin: Boolean
  // mettre super admin
});

const User = mongoose.model("Users", userSchema);

const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    phone:  Joi.string() // check it
      .min(0)
      .max(12),
    picture: Joi.string()
      .min(5)
      .max(500),
    role_fk: Joi.string()
    .min(2)
    .max(50)
    .required(),
    superAdmin: Joi.boolean()
})



exports.User = User;
exports.userSchema = schema;

