const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const encryption = require('../util/encryption');

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  // console.log(username);
  // console.log(password);
  // console.log(req.body);
  const user = {
    username: username.trim(),
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
  }
  user.salt = encryption.generateSalt();
  user.hashedPass = encryption.generateHashedPassword(user.salt, password);
  user.roles = ['User'];
  user.favorites = [];
  User.create(user)
  .then(() => {
    return done(null);
  })
  .catch(err=>{
    if(err.code === 11000){
      const error = new Error(`The username "${username}" already exists. Please choose another one.`);
      error.username = `DuplicateUsername`;
      return done(error);
    }
    return done(err);
  })
})
