const { User } = require('../modules/User/UserModel')
const Model = require('../User/UserModel')
const Repository = require('../User/UserRepository')



const userSeeds = [
  {
    "name": "HARDJOJO",
    "password" : "admin",
    "email" : "HARDJOJO@HARDJOJO.com",
    "phone" : "0606060606",
    "picture": "https://avatars.githubusercontent.com/u/109036313?v=4",
    "superAdmin" : 1,
  },
  {
    "name": "HARDTOTO",
    "password" : "admin",
    "email" : "HARDTOTO@HARDTOTO.com",
    "phone" : "0606060606",
    "picture": "https://avatars.githubusercontent.com/u/109036313?v=4",
    "superAdmin" : 1,
  },
  {
    "name": "HARDSHUNITO",
    "password" : "admin",
    "email" : "HARDSHUNITO@HARDSHUNITO.com",
    "phone" : "0606060606",
    "picture": "https://avatars.githubusercontent.com/u/109036313?v=4",
    "superAdmin" : 1,
  }
]

try {
  User.deleteMany({})
} catch (error) {
  
}

try {
  User.insertMany(userSeeds);
  
} catch (error) {
  console.log(error)
}
