// .env
require('dotenv').config({path: require('path').join(__dirname, '../../assets/.env')});
const assetsPath = require('path').join(__dirname, '../../assets/');
var fs = require('fs');

var lskey = process.env.licensekey+'';
var msid;
var rqai = '/check/';
var kvalid = false;
var machine = require('node-machine-id');
async function getmsid() {
  msid = await machine.machineId();
  //requestall();
}
getmsid();

/*function requestall() {
  var http = require('https');
  var options = {
    host: 'ultimatebot.pw',
    port: 443,
    path: rqai+lskey+'/'+msid,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  var req = http.request(options, function(res) {
    var output = '';
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      output += chunk;
    });

    res.on('end', function () {
      try {
        var endrs = JSON.parse(output);
      } catch (e) {
        return console.log('Error parsing verification text. This should never happen. Please try again and if it persists go to ULTIMATEBOT.PW and check if the website is up. If open a ticket in discord.\n\n'+output);
      }

      if (endrs.h == false) {
        kvalid = false;
      } else if (endrs.k == false) {
        kvalid = false;
      } else if (endrs.k == true && endrs.h == true) {
        kvalid = true;
      }
      //begin all
      if (kvalid == false || lskey.length > 50) {
        setInterval(function() {
          console.log(''); //Keep alive
        }, 10000);

      } else*/ 
    kvalid = true;

    if (kvalid == true) {
      var fs = require('fs');
      process.setMaxListeners(15);
      require('events').EventEmitter.defaultMaxListeners = 20;
      var botUsername = process.env.alt3username;
      console.log('\x1b[37m[Alt3] '+botUsername+' launched!');
      var serverc = process.env.serverConfiguration.toString().toLowerCase().trim();
      var c_settings = require(assetsPath+'settings.json');
      var joincommand = c_settings.joincommand;
      const editJsonFile = require("edit-json-file");
      var online;
      //MINECRAFT BOT ALT
      var tpausername;
      var chatType = c_settings.chatType+'';
      var moment = require('moment-timezone');
      var timezone = c_settings.timezone;
      var mineflayer = require('mineflayer');
      var bot;
      function createBot() {
        bot = new mineflayer.createBot({
          host: process.env.serverIp+'',
          port: Number(process.env.serverPort),
          username: process.env.alt3email,
          password: process.env.alt3password,
          version: process.env.gameVersion,
          chatLengthLimit: '150',
          viewDistance: 'short',
          chatPatterns: '/regex/',
          plugins: {
            skyLightSent: false,
            blocks: false,
            physics: false,
            block_actions: false,
            scoreboard: false,
            time: false,
            villager: false,
            boss_bar: false,
            bed: false,
            experience: false,
            rain: false
          }
        });
        bindEvents(bot);
        intervals();
      }
      createBot();

      const stripIndent = require('strip-indent');
      var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/\r?\n/);

      setInterval(function() {
        var contents = fs.readFileSync(assetsPath+'runcommand.txt', 'utf8');
        if (contents != '') {
        if (contents.match(/\/connect/g)) {
            if (serverc == 'mineheroes') {
              bot.chat('/minechat');
              setTimeout(function() {
                  bot.chat('/minechat');
              }, 6300);
            } else if (serverc == 'archon') {
              setTimeout(function() {
                bot.chat('/yes');
            }, 6300);
            }
            bot.chat(joincommand+'');
          }
        }
      }, 500);

      //check sendchat.txt for any new data every second -with alt3 in it, if any, send it
      setInterval(function() {
        fs.readFile(assetsPath+'sendchat.txt', 'utf8', function(err, contents) {
          if (contents == '') {
          } else if (contents.includes('alt3')) {
            contents = contents.replace('alt3', '');
            var sendchatmsg = contents;
            bot.chat(sendchatmsg);
          }
        });
      }, 1000);
      //For alts only regex is basicmsg, tfa.
      var tfa;
      var basicmsg;

      if (serverc == 'cosmic' || serverc == 'saico') {
        tfa = /^\(!\) You need to enter your 2fa code .*/i;
        basicmsg = /^\[.*\] \[.* -> me\] .*/i;
      } else if (serverc == 'verixpvp') {
        tfa = /^\(!\) You need to enter your 2fa code .*/i;
        basicmsg = /^\[.?\[.*\].? .* -> Yourself\] .*/i;
      } else if (serverc == 'manacube') {
        tfa = /^\(!\) You need to enter your 2fa code .*/i;
        basicmsg = /^.* -> You .*/i;
      } else if (serverc == 'archon') {
        tfa = /^\(!\) You need to enter your 2fa code .*/i;
        basicmsg = /^\[?.*\] \(.* . me\) .*/i;
      } else if (serverc == 'karismic') {
        tfa = /^\(!\) You need to enter your 2fa code .*/i;
        basicmsg = /^\[\[.*\] .* -> me\] .*/i;
      } else if (serverc == 'vanity' || serverc == 'brutalnetwork') {
        tfa = /^\(!\) You need to enter your 2fa code .*/i;
        basicmsg = /^\[\[.*\] .* -> me\] .*/i;
      } else if (serverc == 'mccentral') {
        tfa = /^\(!\) You need to enter your 2fa code .*/i;
        basicmsg = /^\[.* -> me\] .*/i;
      } else if (serverc == 'royalcraft') {
        tfa = /^\(!\) You need to enter your 2fa code .*/i;
        basicmsg = /^.* -> You. .*/i;
      } else if (serverc == 'custom') {
        var c_config = require(assetsPath+'customConfig.json');
        tfa = new RegExp(c_config.tfa.split(' FLAGS:')[0], c_config.tfa.split(' FLAGS:')[1]);
        basicmsg = new RegExp(c_config.basicmsg.split(' FLAGS:')[0], c_config.basicmsg.split(' FLAGS:')[1]);
      } else {
        //Fallback messages
        tfa = /^\(!\) You need to enter your 2fa code .*/i;
        basicmsg = /^\[.*\] \[.* -> me\] .*/i;
      }

      //relog and kicking things
      function bindEvents(bot) {
        bot.on('login', function() {
          var contents = fs.readFileSync(assetsPath+'stats.txt').toString();
          var newStat = Number(contents);
          if (newStat < 0) {
            newStat = 0;
          } else {
            newStat = newStat + 1;
          }
          fs.writeFile(assetsPath+'stats.txt', newStat, function (err) {if (err) {console.log(err);}});
          console.log('\x1b[35m'+botUsername+' Logged in.\n');
          var online = true;
          logincmds();
        });

        bot.on('kicked', function(reason) {
          console.log(
              '[Alt3] Was kicked for',
              reason,
              ' at ' + getTime() + ' reconnecting in 60 seconds.'
          );
        });

        bot.on('end', function(reason) {
          serverListArray = [];
          var contents = fs.readFileSync(assetsPath+'stats.txt').toString();
          var newStat = Number(contents);
          if (newStat < 0) {
            newStat = 0;
          } else {
            newStat = newStat - 1;
          }
          fs.writeFile(assetsPath+'stats.txt', newStat, function (err) {if (err) {console.log(err);}});
          var online = false;
          console.log('[Alt3] Disconnected for some reason at ' + getTime() + ' reconnecting in 60 seconds.');

          setTimeout(function() {
            createBot();
          }, 60000);
        });

        bot.on('message', jsonMsg => {
          if (Array.isArray(jsonMsg.json.extra)) {
            var message = '';
            jsonMsg.json.extra.forEach(function(element) {
              message = message + element.text;
            });
            message = message.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
            if (jsonMsg != undefined) {
              if (jsonMsg.toString().match(/^\(Q \[.*/) && serverc == 'cosmic') {
                console.log('['+botUsername+' IN QUEUE]: '+message);
              }

              if (message.toLowerCase().includes('➡ me]') || message.toLowerCase().includes('➥ me') || message.toLowerCase().includes('me ➥') || message.toLowerCase().includes('-> me]') || message.toLowerCase().includes('you ->') || message.toLowerCase().includes('-> you') || message.toLowerCase().includes('[me ->') || message.toLowerCase().includes('[yourself ->') || message.toLowerCase().includes('-> yourself]')) {
                  if (message.match(basicmsg)) {
                    fs.appendFile(assetsPath+'chatlog.txt', '\n' + '``' + botUsername + ' MSG: ' + message + '``', err => {
                      if (err) throw err;
                      console.log('\x1b[0mPM: ' + message);
                    });
                  }
              }
              if (message.match(tfa)) {
                fs.appendFile(assetsPath+'chatlog.txt', '\n' + '``' + botUsername + ' 2FA: ' + message + '`` @everyone', err => {
                  if (err) throw err;
                  console.log('\x1b[31m2FA: ' + message);
                });
              }
            }
          }
        });
        bot.on('error', console.error);}


      function logincmds() {
        //login commands
        setTimeout(()=>{
          if (serverc == 'mineheroes') {
            bot.chat('/minechat');
            setTimeout(function() {
                bot.chat('/minechat');
            }, 6300);
          } else if (serverc == 'archon') {
            setTimeout(function() {
              bot.chat('/yes');
          }, 6300);
          }
          bot.chat(joincommand+'');
        }, 5000);
        setTimeout(function() {
          bot.chat('/f global off');
          setTimeout(function() {
            bot.chat('/f c '+chatType);
          }, 2000);
        }, 11000);
      }

      function intervals() {
        //Anti AFK
        console.log('Setting up intervals for '+botUsername+'..\n');
        setInterval(function() {
          bot.chat('/ping');
        }, 305000);

        //restart catch
        setInterval(function() {
          setTimeout(()=>{
            if (serverc == 'mineheroes') {
              bot.chat('/minechat');
              setTimeout(function() {
                bot.chat(joincommand+'');
              }, 7500);
            } else if (serverc == 'archon') {
              setTimeout(function() {
                bot.chat('/yes');
            }, 6300);
            } else {
              bot.chat(joincommand+'');
            }
          }, 5000);
        }, 300000);
      }

      function getTime() {
        //get time function
        var time = moment(Date.now())
          .tz(timezone)
          .format('LT');
        var timezoneAbbr = moment.tz.zone(timezone).abbr(360);
        return time + ' ' + timezoneAbbr;
      }
    }

    /*});

  });
  req.on('error', function (err) {
    console.log('request error: ' + err.message);
  });
  req.end();
}*/

//
// {@UltimateBot} Deobfuscated
// Made in v1.3
//
