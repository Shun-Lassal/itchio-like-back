
const mongoose = require("mongoose");

require("dotenv").config();
const port = 3000

var express = require('express');
var app = express()
var bodyParser = require('body-parser');

// app.use(express.static(__dirname + '/public'));

app.use(express.json())

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

// anything beginning with "/api" will go into this
app.use('/user', require('./src/User/UserController'));
app.use('/roles', require('./src/Roles/RolesController'));

// ROUTING

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// const findTest = async () => {
//   console.log('"mlzkjmlqkj')
//   const result = await customer.find({ name: 'Le Protecteur'}).exec();
//   console.log(result ,' srmlrkjmlkj')
//   return result

// }
// findTest()

// deleteUserByEmail('jojo@hardjojo.com')
// deleteUserByEmail('jojo@simplejojo.com')

// const post1 = createAdmin(sampleAdmin)
// const post2 = createUser(sampleUser)
// console.log(post1,'post1', post2,'post2')
// findAllUser()
// findAdmins()
// findUsers()

// updateAnyUserValues("63c55f39c4a4742044f31017" , {name:'tajin',role:666})

// findAllUser()
// findAdmins()
// findUsers()

mongoose.connect('mongodb://127.0.0.1:27017/web_group')
  .then(() => console.log('Connected!'));