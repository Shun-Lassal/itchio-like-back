const {Roles, rolesSchema} = require('./RolesModel')

// UTILITY

const roleAlreadyExist = async (role) => {

  const result = await Roles.find({name: role})

  if(result.length > 0)
    return true 
  else
    return false
}

// POST

const createRole = async (role) => {

  const resultRoleName = await roleAlreadyExist(role.name)
  let test = {...role}
  const doc = new Roles(test)
  if(!resultRoleName){
    const
     result = await doc.save(); 

    return [['201', "Nouveau role créer avec succès"], result]
  }
  else {
    return ['403', "Role déjà utilisé"]
  }
} 

// GET

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

const findRoleById = async (id) => {

  const result = await Roles.findById(id) 
  
  return result 
}

const findRolesByAny = async (role) => {
  
  roleRgx = await regExQuery(rolesSchema,role)
  
  console.log(roleRgx,'role plpol')
  const result = await Roles.find(
      roleRgx
    )

    console.log(result, 'final result')

  return result
}

// UPDATE

const updateAnyRoleValues = async (values) => {

  const result = await Roles.updateOne({_id: values.id}, {
  $set:
    values
  });

  console.log(result, "update result")
  return [result, values]
}

const deleteRoleById = (id) => {
  const result = Roles.deleteOne(id)
  return result
}

module.exports =
 {
  createRole,
  findRoleById,
  findRolesByAny,
  updateAnyRoleValues,
  deleteRoleById
}

