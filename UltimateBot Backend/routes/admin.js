const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fetch = require('isomorphic-fetch');
const request = require('request');
var appjs = require('../app.js');

//Bring in User model
let User = require('../models/user');

// ultimatebot.pw/admin/x because this is already handling /admin/
router.post('/s', function(req, res, next) {
  var findby = req.body.findtype;
  var finduser = req.body.userinput;
  var action = req.body.action;
  var actioninput = req.body.setinput;
  const password = req.body.password;

  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
   {
     req.flash('danger', 'Please fill out the captcha correctly!');
     return res.redirect('/dashboard');
   }
   const secretKey = process.env.gkey;

   const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

   request(verificationURL,function(error,response,body) {
     body = JSON.parse(body);

     if(body.success !== undefined && !body.success) {
      req.flash('danger', 'Please fill out the captcha correctly!');
      return res.redirect('/dashboard');
     }
   });

  //Check any entry errors
  req.checkBody('userinput', 'User is required.').notEmpty();
  req.checkBody('setinput', '(Action) Input is required.').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    req.flash('danger', 'Something was not input correctly!');
    return res.redirect('/dashboard');
  } else {
    //Auth
    let adminEmail = process.env.adminEmail;
    let query = {email: adminEmail}; //admin email acc
    User.findOne(query, function(err, user){
      if(err) throw err;
      if (!user) {
        req.flash('danger', 'Unauthorized! (Email)');
        return res.redirect('/dashboard');
      }

      //Match password
      bcrypt.compare(password, user.password, function(err, isMatch){
        if (err) throw err;
        if (isMatch) {
          //Auth passed
          if (findby+'' == '4' && action+'' == '4') {
            //Prune database
            appjs.pruneDatabase(function(info) {
              try {
                req.flash('success', 'UltimateBot Database Pruned! '+info);
                return res.redirect('/dashboard');
              } catch (e) {}
            });
          } else {
            var query;
            if (findby+'' == '1') { //Find by email
              query = {email:finduser};
            } else if (findby+'' == '2') { // Find by id
              query = {_id:finduser};
            } else if (findby+'' == '3') { // Find by key
              query = {key:finduser};
            } else if (findby+'' == '5') { //Find by paypal email
              query = {paypalEmail:finduser};
            }
            User.findOne(query, function(err, user){
              if(err) throw err;
              if (!user) {
                req.flash('danger', 'User not found!');
                return res.redirect('/dashboard');
              } else {
                //User was found, now execute the action with the input on them
                if (action+'' == '3') { //Delete user
                  user.delete();
                  req.flash('success', 'User deleted! - '+finduser);
                  return res.redirect('/dashboard');
                } else if (action+'' == '1') { //HWID
                  if (actioninput+'' == 'null') {
                    user.hwid = null;
                    user.save(function(err) {
                      if (err) {
                        req.flash('danger', 'Something went wrong! '+err);
                        return res.redirect('/dashboard');
                      }
                      req.flash('success', 'User HWID updated! - HWID: (Reset)');
                      return res.redirect('/dashboard');
                    });
                  } else {
                  user.hwid = actioninput+'';
                  user.save(function(err) {
                    if (err) {
                      req.flash('danger', 'Something went wrong! '+err);
                      return res.redirect('/dashboard');
                    }
                    req.flash('success', 'User HWID updated! - HWID:'+actioninput);
                    return res.redirect('/dashboard');
                  });
                }
                } else if (action+'' == '4') { //Pass
                  if (actioninput+'' == 'null') {
                    user.password = null;
                    user.save(function(err) {
                      if (err) {
                        req.flash('danger', 'Something went wrong! '+err);
                        return res.redirect('/dashboard');
                      }
                      req.flash('success', 'User Password updated! - Password: (Reset)');
                      return res.redirect('/dashboard');
                    });
                  } else {
                    bcrypt.genSalt(10, function(err, salt){
                              bcrypt.hash(actioninput, salt, function(err, hash){
                                if (err) {
                                  console.log(err);
                                } else {
                                  user.password = hash;
                                  user.save(function(err){
                                    if (err) {
                                      console.log(err);
                                      return;
                                    } else {
                                      req.flash('success','User password updated.');
                                      res.redirect('/dashboard');
                                    }
                                  });
                                }
                              });
                    });
                }
                } else if (action+'' == '2') { //Key
                  if (actioninput+'' == 'null') {
                    user.key = null;
                    user.save(function(err) {
                      if (err) {
                        req.flash('danger', 'Something went wrong! '+err);
                        return res.redirect('/dashboard');
                      }
                      req.flash('success', 'User key updated! - Key: (Revoked)');
                      return res.redirect('/dashboard');
                    });
                  } else {
                  user.key = actioninput+'';
                  user.save(function(err) {
                    if (err) {
                      req.flash('danger', 'Something went wrong! '+err);
                      return res.redirect('/dashboard');
                    }
                    req.flash('success', 'User key updated! - Key:'+actioninput);
                    return res.redirect('/dashboard');
                  });
                }
              } else if (action+'' == '5') { //Set hwid amount counter
                  user.hwidResets = actioninput+'';
                  user.save(function(err) {
                    if (err) {
                      req.flash('danger', 'Something went wrong! '+err);
                      return res.redirect('/dashboard');
                    }
                    req.flash('success', 'User HWID resets set! - Amount:'+actioninput);
                    return res.redirect('/dashboard');
                  });
                } else if (action+'' == '6') { //Get user info in db
                  req.flash('success', 'Username: '+user.email+' Key: '+user.key+' HWID: '+user.hwid+' Paypal: '+user.paypalEmail+' HwidResets: '+user.hwidResets+' Discord: '+user.discord);
                  return res.redirect('/dashboard');
                } else if (action+'' == '7') { //Set Discord
                  if (actioninput == 'null') {
                    user.discord = null;
                  } else {
                    user.discord = actioninput+'';
                  }
                  
                  user.save(function(err) {
                    if (err) {
                      req.flash('danger', 'Something went wrong! '+err);
                      return res.redirect('/dashboard');
                    }
                    req.flash('success', 'User discord set! - ID:'+actioninput);
                    return res.redirect('/dashboard');
                  });
                }
              }
            });
          }
        } else {
          req.flash('danger', 'Unauthorized!');
          return res.redirect('/dashboard');
        }
      });
    });
  }

});

module.exports = router;
