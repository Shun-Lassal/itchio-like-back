const {User, userSchema} = require('./userModel')

const regExQuery = async (schema,value) => {

  let query = {};

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      let element = value[key];
   
      if(typeof element === "string"){
        query[key] =  { $regex: element, $options: "i" } 
      }
      else{
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

const findUserByEmail = async  (email) => {
  return await User.findOne({ email })
}

const findUsersByAny = async (user) => {

  userRgx = await regExQuery(userSchema,user)
  
  const result = await User.find(
      userRgx
    )


  return result
}

// UPDATE

const updateAnyUserValues = async (id,values) => {

  const result = await User.updateOne({_id: id}, {
  $set:
    values
  });

  return result
}

const deleteUserById = (id) => {
  const result = User.deleteOne(id)
  return result
}

module.exports =
 {
  findUsersById,
  findUsersByAny,
  findUserByEmail,
  updateAnyUserValues,
  deleteUserById
}

