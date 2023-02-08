const Model = require("./UserModel");

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

const findUserById = async (id) => {
  const result = await Model.User.findById(id);
  return result;
};

const findUserByEmail = async (email) => {
  return await Model.User.findOne({ email });
};

const findUsersByAny = async (user) => {
  const { limit, page } = user;

  const userRgx = await regExQuery(user);

  const result = await Model.User.find(userRgx)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Model.User.countDocuments();

  return {
    result: result,
    count: count,
  };
};

// UPDATE

const updateAnyUserValues = async (id, values) => {
  const result = await Model.User.updateOne(
    { _id: id },
    {
      $set: values,
    }
  );

  return result;
};

const deleteUserById = (id) => {
  const result = Model.User.deleteOne({ _id: id });
  return result;
};

module.exports = {
  findUserById,
  findUsersByAny,
  findUserByEmail,
  updateAnyUserValues,
  deleteUserById,
};
