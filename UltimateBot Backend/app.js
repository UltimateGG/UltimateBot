const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
const request = require('request');
const bcrypt = require('bcryptjs');
const paypal = require('paypal-rest-sdk');
const crypto = require("crypto");
require('dotenv').config();
var fs = require('fs');

const botPrice = "9.99";

const UBversion = fs.readFileSync(require('path').join(__dirname, 'update/version.txt'), 'utf8').toString();
console.log('V'+UBversion);
console.log('$'+botPrice);

const discordBot = require('./discord.js');


function getTime() {
  //Get time func, return date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  var todaydatef = new Date();
  var time = todaydatef.getHours() + ":" + todaydatef.getMinutes() + ":" + todaydatef.getSeconds();
  return today+' @ '+time;
}

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;

//Check connection
db.once('open', function(){
  console.log('Connected to DataBase');

  //Initial check
  checkDate();

  //Check if first of month
  setInterval(checkDate, 24*60*60*1000);

  function checkDate() {
    var date = new Date();

    if (date.getDate() == 1) {
        console.log('It is the first of the month, setting all HWID resets to 3.');
        resetHwidCounters();
    }
  }
});

//Check for db errors
db.on('error', function(err){
  console.log(err);
});


const pruneDatabase = (cb) => {
  var pruned = 0;
  var bought = -1;
  User.find({}, (err, users) => {
      if (err) throw err;
      users.forEach(user => {
        if (user.key == null) {
          user.delete();
          pruned++;
        } else {
          bought++;
        }
      });
  });
  setTimeout(function() {
    var info = "Pruned "+pruned+" users. "+bought+" users have purchased the bot.";

    cb(info);
  }, 500);
};

exports.pruneDatabase = pruneDatabase;

function resetHwidCounters() {
  User.find({}, (err, users) => {
      if (err) throw err;
      users.forEach(user => {
        user.hwidResets = "3";
        user.save(function(err) {});
      });
  });
}

const app = express();
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')));

//Bring in models
let User = require('./models/user');

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body parser middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session middleware
app.use(session({
  secret: 'keyboard dab',
  resave: true,
  saveUninitialized: true
}));

//Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Passport config
require('./config/passport')(passport);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

//Home Route
app.get('/', function(req, res){
  res.render('index', {
    price: botPrice
  });
});

//Cloudflare proxy
app.set('trust proxy', true);

//Check users key and hwid requests from app
app.get('/check/:key/:hwid', function(req, res) {
  var fs = require('fs');
  var alertTxt = '';
  try {
    alertTxt = fs.readFileSync('alerts.txt', 'utf8').toString();
  } catch (e) {
    console.log(e);
  }
  var key = req.params.key;
  var hwid = req.params.hwid;

  //console.log("Requesting verification -- key: "+key+" hwid: "+hwid);
  try {
    var verifications = fs.readFileSync('verificationLog.txt', 'utf8').toString();
    //Only logs once
    if (!verifications.includes(key.toString())) {
         fs.appendFile('verificationLog.txt', "Requesting verification | Key: "+key+" HWID: "+hwid+"\n", function (err) {
           if (err) throw err;
         });
    }
    //Logs every time - spam log.
    /* fs.appendFile('allVerification.txt', getTime()+" Requesting verification || Key: "+key+" HWID: "+hwid+"\n", function (err) {
        if (err) throw err;
     });*/
  } catch (e) {
	  console.log(e);
  }

  let query = {key: key};
  User.findOne(query, function(err, user){
    if (err) {console.log(err); return;}
    if (user) {
      if (user.key == null || user.discord == null) {
       var rJson = {
          "k": false,
          "h": true
        };
        res.send(rJson);
        return;
      }
      if (user.key+'' == key+'') {
        //key was valid, now check HWID
        if (user.hwid == null) {
          //they dont have a hwid, so this is their first run, update hwid and return true
          user.hwid = hwid;
          user.save(function(err) {
            if (err) {
              console.log(err);
            } else {
              var rJson = {
                "k": true,
                "h": true,
                "alert": alertTxt
              };
              //No updates because they legit just downloaded it
              res.send(rJson);
              return;
            }
          });

        } else if (user.hwid+'' == hwid+'') {
          var rJson = {
            "k": true,
            "h": true,
            "alert": alertTxt,
            "version": UBversion
          };

          res.send(rJson);
          return;
        } else {
          var rJson = {
            "k": false,
            "h": false,
            "alert": alertTxt,
            "version": UBversion
          };
          res.send(rJson);
          return;
        }
      } else {
        var rJson = {
          "k": false,
          "h": true
        };
        res.send(rJson);
        return;
      }
    } else {
      var rJson = {
        "k": false,
        "h": true
		  };
      res.send(rJson);
      return;
    }
  });

});

//Download bot page, ensure user has key else redirect
app.get('/download/:key/:type', ensureAuthenticated, (req, res) => {
  //find that key
  if (req.user.key == null) {
    req.flash('You do not have a license!');
    return res.redirect('/dashboard');
  }

  let query = {key: req.params.key};
  User.findOne(query, function(err, user){
    if (err) {console.log(err);}

    try {
    	if (user.key == null) {}
    } catch (e) {
    	req.flash('You do not have a license!');
     	return res.redirect('/dashboard');
    }

    if (user.key == null) {
      req.flash('You do not have a license!');
      return res.redirect('/dashboard');
    }
    if (user) {
      //download that type
      var type = req.params.type;
      if (type+'' == 'c') {
        var file = `${__dirname}/views/download/UltimateBot.zip`;
        return res.download(file);
      } else if (type+'' == 'l') {
        var file = `${__dirname}/views/download/Ultimatebot - Linux_Mac.tar`;
        return res.download(file);
      }
    } else {
      req.flash('You do not have a license!');
      return res.redirect('/dashboard');
    }
  });
});

//Payments
paypal.configure({
  'mode': 'live',
  'client_id':
  process.env.clientid,
  'client_secret':
  process.env.clientsecret
});

//Purchase button clicked
app.post('/pay/:usid', (req, res) => {
	req.flash('Payments are disabled.');
    res.redirect('/dashboard');
/*  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "https://ultimatebot.pw/success/"+req.params.usid,
        "cancel_url": "https://ultimatebot.pw/dashboard"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "UltimateBot License Key",
                "sku": "001",
                "price": botPrice,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": botPrice
        },
        "description": "Lifetime UltimateBot license key."
    }]
};
paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            res.redirect(payment.links[i].href);
          }
        }
    }
});*/
});

//Payment went through
app.get('/success/:usid', (req, res) => {
  console.log("success/usid get request happened.");
  try {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const userId = req.params.usid.replace('usid=', '');

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": botPrice
      }
    }]
  };

  function complete() {
    //Force discord id.
    res.redirect('/discord');
  }

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      const userEmail = payment.payer.payer_info.email || payment.payer.payer_info.first_name+' '+payment.payer.payer_info.last_name;

      //Log payment
      var fs = require('fs');

      //Payment went through, find user, give user a key, then redirect to dashboard

      let query = {_id: userId};
      User.findOne(query, function(err, user){
        if(err) throw err;
        if (user) {
          crypto.randomBytes(25, function(err, buf) {
            var newKey = buf.toString('hex');
            user.key = newKey;
            user.paypalEmail = userEmail;
            user.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                complete();
              }
            });
          });
        } else {
          console.log('USER NOT FOUND AFTER PURCHASE COMPLETED! id:'+userId);
        }
    });
    }
  });
  } catch (e) {console.log(e);}
});

//Documentation page route
app.get('/documentation', function(req, res){
  res.render('documentation');
});

//TOS page route
app.get('/tos', function(req, res){
  res.render('tos');
});

//Support page route
app.get('/support', function(req, res){
  res.render('support');
});

//Dashboard page route
//Access control !
app.get('/dashboard', ensureAuthenticated, function(req, res){
  //Make sure user was linked to discord.
  if (req.user.key != null) {
    if (req.user.discord == null || req.user.discord == undefined) {
      res.render('discord', {
        key: req.user.key
      });
    } else {
      res.render('dashboard', {
        version: UBversion,
        price: botPrice
      });
    }
  } else {
    res.render('dashboard', {
      version: UBversion,
      price: botPrice
    });
  }
});

//Discord registry 
app.get('/discord', ensureAuthenticated, function(req, res) {
  if (req.user.discord != null || req.user.discord != undefined) {
    req.flash('danger', 'You are already linked to discord');
    res.render('dashboard', {
      version: UBversion,
      price: botPrice
    });
  } else if (req.user.key != null) {
    res.render('discord', {
      key: req.user.key
    });
  } else {
    req.flash('danger', 'You must have a license key to do that');
    res.redirect('/dashboard');
  }
});

app.post('/discord', function(req, res) {
  if(req.isAuthenticated() && req.user && req.user.key != null && req.user.discord == null) {
    let inputId = Number(req.body.discordId);

    if (isNaN(inputId)) {
      res.render('discord', {
        errors: {
          error: {
            msg: 'Not a valid discord ID.'
          }
        },
        key: req.user.key
      });
    } else {
      //Check from discord bot if was in discord.
      if (discordBot.isValidId(req.body.discordId)) {
        //Valid id in discord, add to user db entry and redirect 
        function completed() {
          req.flash('success', 'Linked to discord.');
          return res.redirect('/dashboard');
        }

        let query = {key:req.body.key};
        User.findOne(query, function(err, user){
          if(err) throw err;
          if (user) {
            //user does exist set discord 
            user.discord = req.body.discordId;

            user.save(err => {
              if (err) {
                return res.render('discord', {
                  errors: {
                    error: {
                      msg: 'D: Something went wrong please try again.'
                    }
                  },
                  key: req.user.key
                });
              } else {
                //Add roles 
                discordBot.addRoles(req.body.discordId);
                completed();
              }
            });
          } else {
            //user does not exist
            res.render('discord', {
              errors: {
                error: {
                  msg: 'Something went wrong please try again.'
                }
              },
              key: req.user.key
            });
          }
        });
      } else {
        res.render('discord', {
          errors: {
            error: {
              msg: 'You were not found in the UltimateBot discord, please join. https://ultimatebot.pw/support'
            }
          },
          key: req.user.key
        });
      }
    }
  } else {
    req.flash('danger', 'You are not authorized to do that');
    res.redirect('/users/login');
  }
});

//Route files
let users = require('./routes/users');
app.use('/users', users);

let admin = require('./routes/admin');
app.use('/admin', admin);

let updatep = require('./routes/update');
app.use('/mupdater', updatep);

//Access control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'You must be logged in to do that!');
    res.redirect('/users/login');
  }
}

//404 page
app.get('*', function(req, res){
  res.status(404).send('404 - Page not found/does not exist.');
});

//Start server
app.listen(5000, function(){
  console.log('Server started on port 5000 (Redir to 80)!');
});