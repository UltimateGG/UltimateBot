const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fetch = require('isomorphic-fetch');
const request = require('request');
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

//Bring in User model
let User = require('../models/user');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});

//Register Account
router.post('/register', function(req, res){
  const email = req.body.email.toString().trim();
  var password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('email', 'Username is required.').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password must be at least 7 characters.').isLength({ min: 7});
  req.checkBody('password2', 'Passwords do not match.').equals(req.body.password);


  let errors = req.validationErrors();

  //Check captcha
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
   {
     req.flash('danger', 'Please fill out the captcha correctly!');
     return res.redirect('/users/register');
   }
   const secretKey = process.env.gkey;

   const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

   request(verificationURL,function(error,response,body) {
     body = JSON.parse(body);

     if(body.success !== undefined && !body.success) {
      req.flash('danger', 'Please fill out the captcha correctly!');
      return res.redirect('/users/register');
     }
   });

  let query = {email:email};
  User.findOne(query, function(err, user){
    if(err) throw err;
    if (user) {
      //user does exist
      password = '3';
      req.checkBody(password, 'Username is already registered, try logging in.').isLength({ min: 7});
      let errors = req.validationErrors();
      res.render('register', {
        errors:errors
      });
      return;
    } else {
      //user does not exist so create
      if (errors) {
        res.render('register', {
          errors:errors
        });
      } else {
        if (password.length > 30 || email.length > 40) {
          password = '3';
          req.checkBody(password, 'Username/Password can not be over 30 characters!').isLength({ min: 7});
          let errors = req.validationErrors();
          res.render('register', {
            errors:errors
          });
          return;
        } else if (email.toString().includes(';') || email.toString().includes('<') || email.toString().includes('>') || email.toString().toLowerCase().includes('select') || email.toString().toLowerCase().includes('\'') || email.toString().toLowerCase().includes('"')) {
          password = '3';
          req.checkBody(password, 'Sorry, you cannot use those characters in the username.').isLength({ min: 7});
          let errors = req.validationErrors();
          res.render('register', {
            errors:errors
          });
          return;
        }

        let newUser = new User({
          email:email,
          password:password,
          key: null,
          hwid: null,
          paypalEmail: null,
          hwidResets: "3",
          discord: null
        });

        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(newUser.password, salt, function(err, hash){
            if (err) {
              console.log(err);
            } else {
              newUser.password = hash;
              newUser.save(function(err){
                if (err) {
                  console.log(err);
                  return;
                } else {
                  req.flash('success','You are now registered and can log in.');
                  res.redirect('/users/login');
                }
              });
            }
          });
        });
      }
    }
  });
});

//Login form
router.get('/login', function(req, res){
  res.render('login');
});

//Login process
router.post('/login', function(req, res, next){
  //Check captcha
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
   {
     req.flash('danger', 'Please fill out the captcha correctly!');
     return res.redirect('/users/login');
   }
   const secretKey = process.env.gkey;

   const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

   request(verificationURL,function(error,response,body) {
     body = JSON.parse(body);

     if(body.success !== undefined && !body.success) {
      req.flash('danger', 'Please fill out the captcha correctly!');
      return res.redirect('/users/login');
     }
   });

  passport.authenticate('local', {
    successRedirect:'/dashboard',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

//Reset password
router.get('/reset/:token', function(req, res){
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/users/forgotpass');
    }
    res.render('reset', {token: req.params.token});
  });
});

//Reset password form submitted ---------------------------
//Forgot password (Removed because email exposed backend ip not through cloudflare)
/*router.post('/reset/:token', function(req, res){
  var rpassword = req.body.rpassword;
  var rpassword2 = req.body.rpassword2;

  req.checkBody('rpassword', 'Password is required.').notEmpty();
  req.checkBody('rpassword2', 'Confirm Password is required.').notEmpty();
  req.checkBody('rpassword2', 'Passwords do not match.').equals(req.body.rpassword);
  req.checkBody('rpassword', 'Password must be at least 7 characters.').isLength({ min: 7});

  let errors = req.validationErrors();

  if (errors) {
    res.render('reset', {
      errors:errors,
      token:req.params.token
    });
  } else {

  let query = {resetPasswordToken:req.params.token};
  User.findOne(query, function(err, user){
    if(err) throw err;
    if (user) {
      //user does exist

      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(req.body.rpassword, salt, function(err, hash){
          if (err) {
            console.log(err);
          } else {
            user.update({password: hash}, function(err) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                  req.logIn(user, function(err) {
                    return res.redirect('/dashboard');
                  });
                });
              });
          }
        });
      });
    } else {
      //user does not exist
      return res.redirect('/users/forgotpass');
    }
  });
}
});
*/
//Forgot password
/*router.post('/forgotpass', function(req, res, next){
  const email = req.body.email;

  req.checkBody('email', 'Email is required.').notEmpty();
  let errors = req.validationErrors();

  //Check captcha
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
   {
     req.flash('danger', 'Please fill out the captcha correctly!');
     return res.redirect('/users/forgotpass');
   }
   const secretKey = process.env.gkey;

   const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

   request(verificationURL,function(error,response,body) {
    try {
     body = JSON.parse(body);
    } catch (e) {
      console.log(e);
      return;
    }

     if(body.success !== undefined && !body.success) {
      req.flash('danger', 'Please fill out the captcha correctly!');
      return res.redirect('/users/forgotpass');
     }
   });

  let query = {email:email};
  User.findOne(query, function(err, user){
    if(err) throw err;
    if (user) {
      //user does exist
    } else {
      //user does not exist
      req.flash('danger', 'That account does not exist.');
      return res.redirect('/users/forgotpass');
    }
  });
  //All is good, email the user
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          try {
          req.flash('danger', 'No account with that email address exists.');
          return res.redirect('/users/forgotpass');
          } catch (e) {
            return;
          }
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
     var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'noreply.ultimatebot@gmail.com',
          pass: process.env.gpass
        },
        tls:{
          rejectUnauthorized:false
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'noreply.ultimatebot@gmail.com',
        subject: 'UltimateBot Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        if (err) {
          console.log(err);
          req.flash('danger', 'Something went wrong, please try again later.');
          done(err, 'done');
        } else {
        req.flash('success', 'An email has been sent to ' + user.email + ' with further instructions. Please check your spam folder if you do not see it.');
        done(err, 'done');
        }
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/users/forgotpass');
  });
});*/

router.post('/resethwid', function(req, res) {
  var userKey = req.body.uskey;

  let query = {key: userKey};
  User.findOne(query, function(err, user){
    if (err) {console.log(err); return;}
    if (user) {
      if (Number(user.hwidResets)-1 >= 0) {
        user.hwidResets = Number(user.hwidResets)-1;
        user.hwid = null;
        user.save(function(err) {
          req.flash('success', 'Your HWID has been reset.');
          return res.redirect('/dashboard');
        });
      } else {
        req.flash('danger', 'Error: You are out of HWID resets.');
        return res.redirect('/dashboard');
      }
    } else {
      req.flash('danger', 'Something went wrong, please try again.');
      return res.redirect('/dashboard');
    }
  });

});

router.get('/config', ensureAuthenticated, function(req, res) {
  res.render('config');
});

//Logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are now logged out.');
  res.redirect('/users/login');
});

//Forgot pass page route
router.get('/forgotpass', function(req, res){
  res.render('forgotpass');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'You must be logged in to do that!');
    res.redirect('/users/login');
  }
}

module.exports = router;
