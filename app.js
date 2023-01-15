
const express = require('express')
const mongoose = require("mongoose");
require("dotenv").config();
const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// const findTest = async () => {
//   console.log('"mlzkjmlqkj')
//   const customer = mongoose.model('customer');
//   const result = await customer.find({ name: 'Le Protecteur'}).exec();
//   console.log(result ,' srmlrkjmlkj')
//   return result

// }
// findTest()


const { Schema } = mongoose;

const userSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  email: String,
  phone:   String,
  picture: String,
  role: Number
});


// POST



const sampleAdmin = {
  name:'HARDJOJO',
  email: 'jojo@hardjojo.com',
  phone: '0666161666',
  picture: 'https://lh3.googleusercontent.com/a/AEdFTp4WdJ1XVdyuBQqiN9sZFDDzTfFvoEIcPgFPsQyk=s96-c-rg-br100',
  role: 1
}

const sampleUser = {
  name:'Jojjoooo',
  email: 'jojo@simplejojo.com',
  phone: '0699199696',
  picture: 'https://static.jojowiki.com/images/thumb/6/69/latest/20201130220440/Jotaro_SC_Infobox_Manga.png/400px-Jotaro_SC_Infobox_Manga.png',
  role: 0
}

const emailAlreadyExist = async (email_adress) => {
  const userModel = mongoose.model('user', userSchema);
  const result = await userModel.find({email: email_adress})
  if(result.length > 0)
    return true 
  else
    return false

}

const createAdmin = async (sampleAdmin) => {
  const userModel = mongoose.model('user', userSchema);
  const doc = new userModel(sampleAdmin);

  const result = await emailAlreadyExist(sampleAdmin.email)

  if(!result){
    await doc.save();
    return ['201', "Compte Admin créer avec succès"]
  }
  else {
    return ['403', "email déjà utilisé"]
  }

}


const createUser = async (sampleUser) => {
  const userModel = mongoose.model('user', userSchema);
  const doc = new userModel(sampleUser);

  const result = await emailAlreadyExist(sampleUser.email)

  if(!result){
    await doc.save();
    return ['201', "Compte Utilisateur créer avec succès"]
  }
  else {
    return ['403', "email déjà utilisé"]
  }
}

// GET

const findAllUser = async () => {
  const userModel = mongoose.model('user', userSchema);
  const result = await userModel.find().exec();
  console.log(result ,' findAllUser')
  return result

}

const findAdmins = async () => {
  const userModel = mongoose.model('user', userSchema);
  const result = await userModel.find({role:1}).exec();
  console.log(result ,' findAdmins')
  return result

}

const findUsers = async () => {
  const userModel = mongoose.model('user', userSchema);
  const result = await userModel.find({role: 0}).exec();
  console.log(result ,' findUsers')
  return result

}

// delete 

const deleteUserByEmail = (email_adress) => {
  const userModel = mongoose.model('user', userSchema);
  userModel.remove({ email: email_adress }).then(function(){
    console.log(`All the users with email: ${email_adress} have been deleted`); // Success
  }).catch(function(error){
    console.log(error); // Failure
  });
}


// deleteUserByEmail('jojo@hardjojo.com')
// deleteUserByEmail('jojo@simplejojo.com')

const post1 = createAdmin(sampleAdmin)
const post2 = createUser(sampleUser)
console.log(post1,'post1', post2,'post2')
findAllUser()
findAdmins()
findUsers()
mongoose.connect('mongodb://127.0.0.1:27017/web_group')
  .then(() => console.log('Connected!'));