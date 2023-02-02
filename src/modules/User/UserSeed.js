const Model = require("./UserModel");

const userSeed = [
  {
    name: "HARDJOJO",
    password: "admin",
    email: "HARDJOJO@HARDJOJO.com",
    phone: "0606060606",
    picture: "https://avatars.githubusercontent.com/u/109036313?v=4",
    superAdmin: 1,
  },
  {
    name: "HARDTOTO",
    password: "admin",
    email: "HARDTOTO@HARDTOTO.com",
    phone: "0606060606",
    picture: "https://avatars.githubusercontent.com/u/109036313?v=4",
    superAdmin: 1,
  },
  {
    name: "HARDSHUNITO",
    password: "admin",
    email: "HARDSHUNITO@HARDSHUNITO.com",
    phone: "0606060606",
    picture: "https://avatars.githubusercontent.com/u/109036313?v=4",
    superAdmin: 1,
  },
];

const inject = async () => {
  await Model.User.deleteMany();
  await Model.User.insertMany(userSeed);
};

module.exports = { inject };
