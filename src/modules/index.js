const Auth = require("./Auth/AuthModule");
const Role = require("./Roles/RoleModule");
const User = require("./User/UserModule");

const core = [Auth, Role, User];

module.exports = {
  core,
};
