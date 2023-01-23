const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");


const rolesSchema = new Schema({
  owner_fk: { type: mongoose.ObjectId, ref: 'Users' },
  name: String  
});

const Roles = mongoose.model("Roles", rolesSchema);

const schema = Joi.object({
    owner_fk: Joi.string()
    .min(2)
    .max(30)
    .required(),
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
   
})



exports.Roles = Roles;
exports.rolesSchema = schema;