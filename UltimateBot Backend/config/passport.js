const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const request = require('request');

module.exports = function(passport){
  //Local Strategy
  passport.use( new LocalStrategy(
          { usernameField: 'email',      //"username" is the default name for html form input
          passwordField: 'password' },             //in my html name for password input has is equal to "pass1" instead of the default "password"
          (email, password, done) => {
    //Match username
    let query = {email:email};
    User.findOne(query, function(err, user){
      if(err) throw err;
      if (!user) {
        return done(null, false, {message: 'Incorrect username or password.'});
      }

      //Match password
      bcrypt.compare(password, user.password, function(err, isMatch){
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect username or password.'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
