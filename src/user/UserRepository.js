const bcrypt = require("bcrypt")
const {User, userSchema} = require('./userModel')

const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
// const flatted = require('flatted/cjs');

 
// const sampleAdmin = {
//   name:'HARDJOJO',
//   password: "Admin@password",
//   email: 'jojo@hardjojo.com',
//   phone: '0666161666',
//   picture: 'https://lh3.googleusercontent.com/a/AEdFTp4WdJ1XVdyuBQqiN9sZFDDzTfFvoEIcPgFPsQyk=s96-c-rg-br100',
//   role: 1
// }

// const sampleUser = {
//   name:'Jojjoooo',
//   password: "user@password",
//   email: 'jojo@simplejojo.com',
//   phone: '0699199696',
//   picture: 'https://static.jojowiki.com/images/thumb/6/69/latest/20201130220440/Jotaro_SC_Infobox_Manga.png/400px-Jotaro_SC_Infobox_Manga.png',
//   role: 0
// }

// UTILITY

// const connexion = async (email, password) => {
//   console.log(email, password, 'connexion var')
//   const result = findUsersByAny(email)
//   console.log(result, 'result')
//   bcrypt.compare(password, result.password, function(err, res) {
//     if (err){
//       // handle error
//       console.log(err, 'error')
//     }
//     if (res) {
//       // Send JWT
//       console.log("validated")
//     } else {
//       // response is OutgoingMessage object that server response http request
//       return {success: false, message: 'passwords do not match'}
//     }
//   });
// }

const emailAlreadyExist = async (email_adress) => {

  const result = await User.find({email: email_adress})

  if(result.length > 0)
    return true 
  else
    return false
}

const passwordBCrypt = async (password) => {
  console.log("a1", typeof(10))
  const salt = await bcrypt.genSalt(10)
  console.log("a2", salt, typeof(salt))
  
  const hashedPassword = await bcrypt.hash(password, salt)
  console.log("a3")

  console.log(hashedPassword, 'hashedPassword')

  return hashedPassword
}

// POST

const createAdmin = async (user) => {

  let hash = await passwordBCrypt("toto")

  let tempAdmin = { ...user }
  tempAdmin.password = hash
  tempAdmin.role = 666 // edit field


  const doc = new User(tempAdmin);
  
  const result = await emailAlreadyExist(user.email)

  if(!result){
    let result = await doc.save(); 
    return [['201', "Compte Utilisateur créer avec succès"], result]
  }
  else {
    console.log('lkjhslkjh')
    return ['403', "email déjà utilisé"]
  }

}

 const createUser = async (user) => {

  let hash = await passwordBCrypt("toto")

  let tempUser = { ...user }
  tempUser.password = hash
  tempUser.role = 100


  const doc = new User(tempUser);
  console.log(doc,'doc')
  const resultEmail = await emailAlreadyExist(user.email)

  if(!resultEmail){
    const result = await doc.save(); 
    return [['201', "Compte Utilisateur créer avec succès"], result]
  }
  else {
    return ['403', "email déjà utilisé"]
  }
} 

// GET

const regExQuery = async (schema,value) => {

  let query = {};
  console.log(value,'schemaoption')

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      let element = value[key];
   
      // const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      // element = rgx(element)
      console.log(key,'key---------')
      if(typeof element === "string"){
        console.log(element,'qzùmd--------')
        query[key] =  { $regex: element, $options: "i" } 
      }
      else{
        console.log(element, key, 'mlk')
        query[key] =  element 
      }
      console.log(query, 'query final')
    }
  };
  return query
}

const findUsersById = async (id) => {

  const result = await User.findById(id) 
  return result 
}

const findUsersByAny = async (user) => {

  userRgx = await regExQuery(userSchema,user)
  
  console.log(userRgx,'user plpol')
  const result = await User.find(
      userRgx
    )

    console.log(result, 'final result')

  return result
}

// UPDATE

const updateAnyUserValues = async (values) => {

  console.log(values, "values")
  const result = await User.updateOne({_id: values.id}, {
  $set:
    values
  });

  console.log(result, "update result")
  return result
}

// DELETE

// const deleteUserByEmail = (email_adress) => {
//   User.remove({ email: email_adress }).then(function(){
//     console.log(`All the users with email: ${email_adress} have been deleted`); // Success
//   }).catch(function(error){
//     console.log(error); // Failure
//   });
// }
const deleteUserById = (id) => {
  const result = User.deleteOne(id)
  return result
}

module.exports =
 {
  passwordBCrypt,
  createAdmin,
  createUser,
  // connexion,
  findUsersById,
  findUsersByAny,
  updateAnyUserValues,
  // deleteUserByEmail,
  deleteUserById
}

