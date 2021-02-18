const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fetch = require('isomorphic-fetch');
const request = require('request');
const fs = require('fs');
var updateFiles = require('path').join(__dirname, '../update/');
const UBversion = fs.readFileSync(require('path').join(__dirname, '../update/version.txt'), 'utf8').toString();

//Bring in User model
let User = require('../models/user');

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

/**
 * Release Note:
 * This basically just returns all the code for the bots files in a json object
 * I didnt know about databuffers nor res.download, weird but it works somehow.
 */
router.get('/download/:key/:hwid', function(req, res, next) {
	var key = req.params.key;
	var hwid = req.params.hwid;

	 fs.appendFile(require('path').join(__dirname, '../')+'updaterLog.txt', getTime()+" Requesting update || Key: "+key+" HWID: "+hwid+"\n", function (err) {
        if (err) throw err;
     });
	
    let query = {key:key};
    User.findOne(query, function(err, user){
      if(err) throw err;
	  
      if (!user) {
        var rJson = {
			"v": false
		  };
        res.send(rJson);
        return;
      } else {
		  
	  if (user.key+'' == key+'' && user.hwid+'' == hwid+'')  {
		  
		//Send updated files 
		var _b = fs.readFileSync(updateFiles+'/b.js', 'utf8').toString();
		var _d = fs.readFileSync(updateFiles+'d.js', 'utf8').toString();
		var _a1 = fs.readFileSync(updateFiles+'a1.js', 'utf8').toString();
		var _a2 = fs.readFileSync(updateFiles+'a2.js', 'utf8').toString();
		var _a3 = fs.readFileSync(updateFiles+'a3.js', 'utf8').toString();
		var _a4 = fs.readFileSync(updateFiles+'a4.js', 'utf8').toString();
		var _env = fs.readFileSync(updateFiles+'.env', 'utf8').toString();
		var _settings = JSON.parse(fs.readFileSync(updateFiles+'settings.json', 'utf8').toString());
		var _changes = fs.readFileSync(updateFiles+'changeLog.txt', 'utf8').toString();
		var _clientjs = fs.readFileSync(updateFiles+'chat.js', 'utf8').toString();
		
		var rJson = {
			"v": true,
			"b": _b,
			"d": _d,
			"a1": _a1,
			"a2": _a2,
			"a3": _a3,
			"a4": _a4,
			"env": _env,
			"settings": _settings,
			"changeLog": _changes,
			"ver": UBversion+"",
			"modules": [
				{
					"path": "node_modules/mineflayer/lib/plugins/chat.js",
					"content": _clientjs
				}
			]
		};
        res.send(rJson);
        return;  
	  } else {
		var rJson = {
			"v": false
		};
        res.send(rJson);
        return;  
	  }
	  }
    });
});

module.exports = router;
