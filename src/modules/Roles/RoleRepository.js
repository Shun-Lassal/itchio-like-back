// const {Roles, rolesSchema} = require('./RoleModel')

const Model = require("./RoleModel");

// UTILITY

const roleAlreadyExist = async (role) => {
  const result = await Model.Role.find({ name: role });

  if (result.length > 0) return true;
  else return false;
};

// POST

const createRole = async (role) => {
  const resultRoleName = await roleAlreadyExist(role.name);
  let test = { ...role };
  const doc = new Model.Role(test);
  if (!resultRoleName) {
    const result = await doc.save();

    return [["201", "Nouveau role créer avec succès"], result];
  } else {
    return ["403", "Role déjà utilisé"];
  }
};

// GET

const regExQuery = async (value) => {
  let query = {};

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      let element = value[key];

      if (typeof element === "string") {
        query[key] = { $regex: element, $options: "i" };
      } else {
        query[key] = element;
      }
    }
  }
  return query;
};

const findRoleById = async (id) => {
  const result = await Model.Role.findById(id);

  return result;
};

const findRolesByAny = async (role) => {
  const { limit, page } = role;

  const roleRgx = await regExQuery(role);

  const result = await Model.Role.find(roleRgx)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Model.Role.countDocuments();

  return {
    users: result,
    count: count,
  };
};

// UPDATE

const updateAnyRoleValues = async (id, values) => {
  const result = await Model.Role.updateOne(
    { _id: id },
    {
      $set: values,
    }
  );

  return [result, values];
};

const deleteRoleById = (id) => {
  Model.Role.deleteOne(id);
  return {};
};

module.exports = {
  createRole,
  findRoleById,
  findRolesByAny,
  updateAnyRoleValues,
  deleteRoleById,
};
