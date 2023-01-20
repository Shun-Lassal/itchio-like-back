const bcrypt = require("bcrypt")
const {User, userSchema} = require('../schemas/userSchema')
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

const connexion = async (email, password) => {
  console.log(email, password, 'connexion var')
  const result = findUsersByAny(email)
  console.log(result, 'result')
  bcrypt.compare(password, result.password, function(err, res) {
    if (err){
      // handle error
      console.log(err, 'error')
    }
    if (res) {
      // Send JWT
      console.log("validated")
    } else {
      // response is OutgoingMessage object that server response http request
      return {success: false, message: 'passwords do not match'}
    }
  });
}

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

const findAllUser = async () => {
  const result = await User.find().exec();
  console.log(result ,' findAllUser')
  
  return result
}

const findAllAdmins = async () => {
const result = await User.find({role:1}).exec();
console.log(result ,' findAllAdmins')

return result
}

const findAllCommonUsers = async () => {
  const result = await User.find({role: 0}).exec();
  console.log(result ,' findUsers')
  
return result
}

const suggestResult = async (guess) => {

}

const regExQuery = async (schema,value) => {

  let query = {};
  let schemaType = ''

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      let element = value[key];
      console.log(key, ': ',element, 'result forinloop')
      console.log(typeof(element), 'typeofelement')
      console.log(schema[key], 'schemakey')

      // const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      // element = rgx(element)

      // if(key == 'role'){
        // query[key] =   parseInt(element)
      console.log(element , typeof(String), 'dfthfh')
      if(element === typeof(String)){
        query[key] =  { $regex: element, $options: "i" } 
      }
      else{
        console.log(element, key, 'mlk')
        query[key] =  element 
      }

     
      // else if (schemaType === typeof(Int))
          // query[key] =  { $regex: rgx(parseInt(element)), $options: "i" } 
      // }
      console.log(query, 'query final')
    }
  };
  return query
}

const findUsersByAny = async (user) => {
  
  // const rgx = (pattern) => new RegExp(`.*${pattern}.*`);

  // créer une fonction pour role et name if(user.name.length != 'undefined')

  
  console.log(user)

  // let userQuery = { ...user  }

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

  const User = mongoose.model('user', User);
  console.log(values, "values")
  const result = await User.updateOne({_id: values.id}, {
  $set:
    values
  });

  console.log(result, "update result")
  return result
}

// DELETE

const deleteUserByEmail = (email_adress) => {
  const User = mongoose.model('user', User);
  User.remove({ email: email_adress }).then(function(){
    console.log(`All the users with email: ${email_adress} have been deleted`); // Success
  }).catch(function(error){
    console.log(error); // Failure
  });
}

module.exports =
 {
  passwordBCrypt,
  createAdmin,
  createUser,
  connexion,
  findAllUser,
  findAllAdmins,
  findAllCommonUsers,
  findUsersByAny,
  updateAnyUserValues,
  deleteUserByEmail
}

