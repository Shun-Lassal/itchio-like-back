// const {Model, Repository} = require('../User/UserModule')
const Model = require("../User/UserModel");
const Repository = require("../User/UserRepository");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (user) => {
  let credentials = { email: user.email, password: user.password };
  let hashedPassword = await passwordBCrypt(credentials.password);

  const userDocument = new Model.User({
    email: credentials.email,
    password: hashedPassword,
    superAdmin: false,
  });
  const resultEmail = await Repository.findUsersByAny({
    email: credentials.email,
  });

  if (resultEmail.users.length == 0) {
    const result = await userDocument.save();
    return {
      status: 201,
      message: "Compte Utilisateur créer avec succès",
      result,
    };
  } else {
    return { status: 403, message: "email déjà utilisé", result: {} };
  }
};

const login = async (user) => {
  let credentials = { email: user.email, password: user.password };
  let { users: results } = await Repository.findUsersByAny({
    email: credentials.email,
  });

  if (await bcrypt.compare(credentials.password, results[0].password)) {
    const token = jwt.sign(
      { id: results[0]._id, email: results[0].email },
      process.env.PRIVATE_KEY
    );
    const payload = results[0]._id;
    return {
      status: 200,
      message: "Connexion établie",
      result: {
        token: token,
        id: payload,
      },
    };
  } else {
    return {
      status: 403,
      message: "Les identifiants ne correspondent pas",
      result: {},
    };
  }
};

const passwordBCrypt = async (password) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  return hashPassword;
};

const changePassword = async (values) => {
  let user = await Repository.findUserById(values.id);

  let resultBcrypt = bcrypt.compareSync(values.previousPassword, user.password);
  if (resultBcrypt) {
    user.password = await passwordBCrypt(values.newPassword);
    await Repository.updateAnyUserValues(user.id, user);

    return true;
  } else {
    return false;
  }
};

module.exports = {
  register,
  login,
  passwordBCrypt,
  changePassword,
};
