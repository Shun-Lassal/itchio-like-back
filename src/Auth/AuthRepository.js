
let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {findUsersByAny} = require("../User/UserRepository")

// const bcryptCompare = async (passwords) => {
//   bcrypt.compare(passwords[0], passwords[1], (err, res) => {
//     console.log("we're in")
//     if (err){
//       // handle error
//       console.log(err, 'error')
//       return err
//     }
//     if (res) {
//       // Send JWT
//       console.log("validated")
//       const token = jwt.sign({_id: result._id}, 'jwtPrivateKey');
//       return [result, token, 'validated']
//     } else {
//       // response is OutgoingMessage object that server response http request
//       return {success: false, message: 'passwords do not match'}
//     }
//   });
// }

const signIn = async (user) => {
  // comparer mdp etc
  console.log(user.email, user.password, 'connexion var')
  let test = {...user}
  test.email = {'email': test.email}
  const result = await findUsersByAny(test.email) // voir avec thomas
  console.log(result, 'result')
  console.log(user.password, result[0].password, "passwordcompare")
  
  const comparePassword = (password, hashedPassword) => bcrypt.compare(user.password, result[0].password);

  console.log('------');
  console.log(comparePassword());
  console.log('------');

  // const testBcyptCompare = bcrypt.compare(user.password, result[0].password, (err, res) => {
  //   console.log('where in')
  //   if (err){
  //     // handle error
  //     console.log(err, 'error')
  //     return err
  //   }
  //   if (res) {
  //     // Send JWT
  //     console.log("validated")
  //     const token = jwt.sign({_id: result._id}, 'jwtPrivateKey');
  //     return [result, token, 'validated']
  //   } else {
  //     // response is OutgoingMessage object that server response http request
  //     return {success: false, message: 'passwords do not match'}
  //   }
  //   console.log("proute")
  // });
  // console.log(testBcyptCompare,'result testBcyptCompare')
  return 'wesh alors'
}

const decodeToken = async () => {

  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secret';
  opts.issuer = 'jahhhhjjj@totop.fr';
  // opts.audience = 'yoursite.net';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
            return done(err, false);
          }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
  }));
}

module.exports = {
  signIn,
  decodeToken,
}