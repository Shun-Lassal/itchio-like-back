
const {User, userSchema} = require('../User/userModel')
const UserRepository = require('../User/UserRepository')

require('dotenv').config()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (user) => {
  let credentials = { email: user.email, password: user.password }
  let hashedPassword = await passwordBCrypt(credentials.password)  

  const defaultRole = "63cd45b1012bd0bc67e13ae6"

  const userDocument = new User({ email: credentials.email, password: hashedPassword, role_fk: defaultRole, superAdmin: false });
  const resultEmail = await UserRepository.findUsersByAny({email:credentials.email})
  
  if (resultEmail.length == 0) {
    const result = await userDocument.save(); 
    return { status: 201, message: 'Compte Utilisateur créer avec succès', result }
  }
  else {
    return { status: 403, message: 'email déjà utilisé', result : {} }
  }
}

const login = async (user) => {

  let credentials = { email: user.email, password: user.password }

  let [{_id,email,role_fk, password}]= await UserRepository.findUsersByAny({ email: credentials.email });

  if (await bcrypt.compare(credentials.password, password)) {
    const token = jwt.sign({id: _id, email: email, role:role_fk }, process.env.PRIVATE_KEY); // name: ,email, role, superAdmin:
    return { status: 200, message: 'Compte Utilisateur créer avec succès', result: token }
  } else {
    return { status: 403, message: 'Unauthorized', result: {} }
  }
}

const passwordBCrypt = async (password) => {
  const saltRounds = 10;

   const hashPassword = await bcrypt.hash(password, saltRounds)

   return hashPassword
}

module.exports = {
  register,
  login,
  passwordBCrypt,
}