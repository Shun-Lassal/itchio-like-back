const bcrypt = require("bcrypt")

class UserServices {

  constructor(name,password,email,phone,picture,role,sampleAdmin, sampleUser){

    this.name = name
    this.password = password
    this.email = email
    this.phone = phone
    this.picture = picture
    this.role = role
  }
 
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

  async emailAlreadyExist(email_adress) {
    const userModel = mongoose.model('user', userSchema);
    const result = await userModel.find({email: email_adress})
  
    if(result.length > 0)
      return true 
    else
      return false
  }


  async  passwordBCrypt (saltRounds, password) {

    const salt = await bcrypt.genSalt(saltRounds)

    const hashedPassword = await bcrypt.hash(password, salt)
  
    console.log(hashedPassword, 'hashedPassword')

    return hashedPassword
  }
  



  // POST

  async createAdmin(sampleAdmin) {
    const saltRounds = 10
    sampleAdmin.password  = await passwordBCrypt(saltRounds,sampleAdmin.password)

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

  async createUser(sampleUser) {
  
    const saltRounds = 10;
    sampleUser.password = await passwordBCrypt(saltRounds,sampleUser.password)
    
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

  async findAllUser () {
    const userModel = mongoose.model('user', userSchema);
    const result = await userModel.find().exec();
    console.log(result ,' findAllUser')
    
    return result
  }

  async findAdmins () {
  const userModel = mongoose.model('user', userSchema);
  const result = await userModel.find({role:1}).exec();
  console.log(result ,' findAdmins')
  
  return result
  }

  async findUsers () {
    const userModel = mongoose.model('user', userSchema);
    const result = await userModel.find({role: 0}).exec();
    console.log(result ,' findUsers')
    
  return result
  }

// UPDATE

  async updateAnyUserValues(id, values) {

    const userModel = mongoose.model('user', userSchema);
  
    console.log(typeof(id), id, 'idtypoeiof')

    const result = await userModel.update({_id: id}, {
    $set:
      values
    });
  }

// DELETE

  async deleteUserByEmail(email_adress) {
    const userModel = mongoose.model('user', userSchema);
    userModel.remove({ email: email_adress }).then(function(){
      console.log(`All the users with email: ${email_adress} have been deleted`); // Success
    }).catch(function(error){
      console.log(error); // Failure
    });
  }

}