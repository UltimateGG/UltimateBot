// .env
require('dotenv').config({path: require('path').join(__dirname, '../../assets/.env')});
const assetsPath = require('path').join(__dirname, '../../assets/');
var fs = require('fs');

var lskey = process.env.licensekey+'';
var msid;
var rqai = '/check/';
var fstream_enabled = true;
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
        return console.log('Error parsing verification text. This should never happen. Please try again and if it persists go to ULTIMATEBOT.PW and check if the website is up. If not open a support ticket.\n\n'+output);
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
          //alt scripts
          if (!process.env.alt1email == undefined || !process.env.alt1email == '') {
              require('./alt1.js');
          }
          if (!process.env.alt2email == undefined || !process.env.alt2email == '') {
              require('./alt2.js');
          }
          if (!process.env.alt3email == undefined || !process.env.alt3email == '') {
              require('./alt3.js');
          }
          if (!process.env.alt4email == undefined || !process.env.alt4email == '') {
              require('./alt4.js');
          }
          const mcscript = require('./bot.js');
          const Discord = require('discord.js');
          const bot = new Discord.Client();
          var moment = require('moment-timezone');
          var fs = require('fs');
          const stripIndent = require('strip-indent');
          //const ioStream = require('ioStream');
          var nodemon = require('nodemon');
          var c_settings = require(assetsPath+'settings.json');

          const settingsFile = require('data-store')({ path: assetsPath+'settings.json'});
          const coresFile = require('data-store')({ path: assetsPath+'coreChunks.json'});
          const depositsFile = require('data-store')({ path: assetsPath+'deposits.json'});
          const playtimeFile = require('data-store')({ path: assetsPath+'playtime.json'});
          const channelsFile = require('data-store')({ path: assetsPath+'channels.json'});

          var rebootcheck = false;
          var bufferrebootcheck = false;
          var winterval;
          var wiinterval;
          function reloadSettings() {
            fs.readFile(assetsPath+'settings.json', 'utf8', function(err, contents) {
                if (err) {console.log(err)}
                try {
                  var tjson = JSON.parse(contents);
                  c_settings = tjson;
                } catch (e) {}
            });
             require('dotenv').config({path: require('path').join(__dirname, '../../assets/.env')});
             mcscript.reloadBotSettings();

             mainSettings = c_settings;
             prefix = c_settings.prefix;
             token = process.env.TOKEN;
             outposta = c_settings.outposts;
             thisguildid = process.env.yourGuildId;
             server = process.env.serverConfiguration.toString().toLowerCase();
             alerttype = c_settings.alerttype;
             wall_checking_enabled = c_settings.wallchecks;
             buffer_checking_enabled = c_settings.bufferchecks;
             playertracking = c_settings.playertracking;
             autoftop = c_settings.autoftop;
             autofwealth = c_settings.autofwealth;
             alertmessage = c_settings.alertmessage;
             mcalertmessage = c_settings.mcalertmessage;
             afinterval = c_settings.afinterval;
             game = c_settings.game;
             adminRoleN = process.env.adminRole;
             trustedRoleN = process.env.trustedRole;
             useRoleN = process.env.useRole;
             bankRoleN = process.env.bankRole;
             rotateRoleN = process.env.rotateRole;
             timezone = c_settings.timezone;
             joincommand = c_settings.joincommand;
             tpsalert = c_settings.tpsalert;
             raidevent = c_settings.raidevents;
             tpsalertt = c_settings.tpsalerts;
             wallinterval = c_settings.interval;
             bufferinterval = c_settings.bufferinterval;
          }

          var prefix = c_settings.prefix;
          var token = process.env.TOKEN;
          var botCommands;
          var outpostc;
          var outposta = c_settings.outposts;
          var ingamechat;
          var thisguild = process.env.yourGuildId;
          var thisguildid = process.env.yourGuildId;
          var logsc;
          var findchn;
          var wallintervalspam;
          var bufferintervalspam;
          var server = process.env.serverConfiguration.toString().toLowerCase();
          var economyc;
          var check_time;
          var awaychannel;
          var lastRequestedChannel = "";
          var currentAwayForms = [];
          var ftopchannel;
          var fwealthchannel;
          var bcheck_time;
          var lastcheck = c_settings.lastcheck/1000;
          var lastbuffercheck = c_settings.lastbuffercheck/1000;
          var wallchecking;
          var bufferchecking;
          var alerttype = c_settings.alerttype;
          var wall_checking_enabled = c_settings.wallchecks;
          var buffer_checking_enabled = c_settings.bufferchecks;
          var playertracking = c_settings.playertracking;
          var autoftop = c_settings.autoftop;
          var autofwealth = c_settings.autofwealth;
          var tpsc;
          var openApplications = [];
          var alertmessage = c_settings.alertmessage;
          var mcalertmessage = c_settings.mcalertmessage;
          var afinterval = c_settings.afinterval;
          var game = c_settings.game;
          var botstatus = 'online'; //status of the bot account ('dnd' 'online' 'idle' 'invisible')
          var coreChunkChan;


          var adminRoleN = process.env.adminRole;
          var trustedRoleN = process.env.trustedRole;
          var useRoleN = process.env.useRole;
          var bankRoleN = process.env.bankRole;
          var rotateRoleN = process.env.rotateRole;

          var timezone = c_settings.timezone;
          var joincommand = c_settings.joincommand;
          var tpsalert = c_settings.tpsalert;
          //dont change
          var c_config;
          try {
            c_config = require(assetsPath+'customConfig.json');
          } catch (e) {
            c_config = {
              "tpa": "^(.*) has requested (?:to teleport to you|that you teleport to them)\\. FLAGS:g",

              "checkedmsg": "^\\[?.*\\] \\((.*) . me\\) \\\/?checked FLAGS:i",

              "wallscheckedmsg": "^\\[?.*\\] \\((.*) . me\\) \\\/?walls FLAGS:i",

              "bufferscheckedmsg": "^\\[?.*\\] \\((.*) . me\\) \\\/?buffers FLAGS:i",

              "weewoomsg": "^\\[?.*\\] \\((.*) . me\\) \\\/?weewoo FLAGS:i",

              "safemsg": "^\\[?.*\\] \\((.*) . me\\) \\\/?safe FLAGS:i",

              "paidmsg": "^\\$[0-9]*.?[0-9]* has been received from .* FLAGS:",

              "moneysent": "^\\$[0-9]*.?[0-9]* has been sent to .*",

              "link": "^\\[?.*\\] \\(.* . me\\) link .* FLAGS:i",

              "linkusername": "^\\[?.*\\] \\((.*) . me\\) link .* FLAGS:i",

              "linkkey": "^\\[?.*\\] \\(.* . me\\) link (.*) FLAGS:i",

              "tfa": "^\\(!\\) You need to enter your 2fa code .* FLAGS:i",

              "raideventwarn": "^\\*\\*\\* RAID EVENT STARTING IN (.*) FLAGS:gim",

              "basicmsg": "^\\[?.*\\] \\(.* . me\\) .* FLAGS:i",

              "usernameIndex": 1,
              "msgIndex": 4,
              "usernameMoneySentIndex": 5,
              "usernameMoneyReceivedIndex": 5,
              "actualMoneyIndex": 0,

              "ftopCommand": "/f top",
              "fListCommand": "/f list %page%",
              "payCommand": "/pay %username% %amount%",
              "payCommandRequiresConfirmation": false,
              "outpostCommand": "/outpost",
              "outpostCheckIntervalMs": 15000,
              "fwhoCommand": "/f f %faction%",
              "fKickCommand": "/f kick %user%",
              "fInviteCommand": "/f invite %user%",

              "fTopPlace": "#[0-9][0-9]? - (.*) - (.*)",

              "ftopStartIncludes": "Faction Worth | Hover",
              "noFtopStartLine": true,
              "ftopPlaceIncludes": [
                "-",
                "$"
              ],

              "flistStartIncludes": "online factions",
              "noFlistStartLine": false,
              "flistIncludes": [
                "/",
                "Power"
              ],

              "fWhoIncludes": [
                "_____.[",
                "description:",
                "leader:",
                "created:",
                "land |",
                "allies (",
                "truces (",
                "members online (",
                "members offline (",
                "alts online (",
                "alts offline (",
                "shield active",
                "strikes:"
              ],

              "outpostOpensAsGUI": true,
              "windowTitleIncludes": "TheArchon Outpost",

              "outpostItem1Slot": 31,

              "outpost1LoreLines": [
                  0,
                  1,
                  2,
                  3,
                  4,
                  6,
                  7,
                  8,
                  9,
                  10
              ],

              "outpostHasItem2": false,
              "outpost2LoreLines": [
                  0,
                  1,
                  2,
                  3,
                  4,
                  6,
                  7,
                  8,
                  9,
                  10
              ],

              "tpsCommand": "/tps",
              "tpsRegex": "TPS: (.*) FLAGS:i",

              "graceCommand": "/grace",
              "graceInfoIncludes": "grace period",

              "debug": false
            };
          }
          var debug = c_config.debug;
          var interval;
          var weewoocmd = 0;
          var raidevent = c_settings.raidevents;
          var tpsalertt = c_settings.tpsalerts;
          var autofindinterval;
          var weewooChannel;
          var strongholdChannel;
          var mainSettings = c_settings;
          var taskChannel;

          function dedupe(str) {
              var array = str.split(/\r?\n/).filter(function(elem, pos) {
                  return str.split(/\r?\n/).indexOf(elem) == pos;
              });
              return array;
          }

          function getC(name) {
            return bot.channels.find(channel => channel.id === channelsFile.get(name));
          }

          function setC(name, id) {
            channelsFile.set(name, id);
          }

          bot.login(token).catch(() => {
            console.log("\x1b[31m\x1b[43mERROR: Discord bot token was incorrect. Please check .env TOKEN= and make sure you copy and pasted the discord bots TOKEN, NOT client id with NO quotes.\x1b[0m");
          });

          function msToNice(duration) {
            var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
            days = Math.floor((duration / (86400000))),

            days  = (days < 10) ? days : days;
            hours = (hours < 10) ? hours : hours;
            minutes = (minutes < 10) ? minutes : minutes;
            seconds = (seconds < 10) ? seconds : seconds;

            days += " days ";
            hours += " hours ";
            minutes += " minutes ";
            seconds += " seconds ";

            if (days == "0 days ") {
              days = "";
            }
            if (hours == "0 hours ") {
              hours = "";
            }
            if (minutes == "0 minutes ") {
              minutes = "";
            }
            if (seconds == "0 seconds ") {
              seconds = "";
            }

            return days + hours + minutes + seconds;
          }

          var afintmin = afinterval / 60000;
          var wallinterval = c_settings.interval;
          var bufferinterval = c_settings.bufferinterval;
          wallintervalmin = wallinterval / 60000;
          var bufferintervalmin = bufferinterval / 60000;
          var botIsSetup = c_settings.setup;
          bot.on('ready', message => {
              thisguild = bot.guilds.get(thisguild);
      			  if (thisguild === undefined || !thisguild) {
      				  return console.log('Fatal error. Bot could not find guild id which was entered in .env. This means either you have entered the guild id wrong, or the bot is not in that guild.<br>Your wifi connection may have timed out, if so ignore this.');
      			  }

              if (!thisguild.channels.find(channel => channel.name === 'bot-commands') && !getC('botCommands')) {
                cantFindChannel("bot-commands");
                if (!botIsSetup) {
                  console.log('Seems like this is your first time running the bot, please run /setup! Using #logs channel for all channels. Use "/c" to set custom channel names after setup.');
                }
              }
              if (!thisguild.channels.find(channel => channel.name === 'away') && !getC('away')) {
                cantFindChannel("away");
              }
              if (!thisguild.channels.find(channel => channel.name === 'ftop') && !getC('ftop')) {
                cantFindChannel("ftop");
              }
              if (!thisguild.channels.find(channel => channel.name === 'ingame-chat') && !getC('ingameChat')) {
                cantFindChannel("ingame-chat");
              }
              if (!thisguild.channels.find(channel => channel.name === 'economy') && !getC('economy')) {
                cantFindChannel("economy");
              }

              if (!thisguild.channels.find(channel => channel.name === process.env.wallsChannel) && !getC('wallChecking')) {
                cantFindChannel('wallChecking');
              }
              if (process.env.bufferCheck.toString().toLowerCase() == 'true') {
                //Buffers aswell as walls enabled
                if (!thisguild.channels.find(channel => channel.name === process.env.buffersChannel) && !getC('bufferChecking')) {
                  cantFindChannel('bufferChecking');
                }
              }

              if (server == 'cosmic') {
                if (!thisguild.channels.find(channel => channel.name === 'find-channel') && !getC('find') && server == 'cosmic') {
                  cantFindChannel("find-channel");
                }
                if (!thisguild.channels.find(channel => channel.name === 'fwealth') && !getC('fwealth') && server == 'cosmic') {
                  cantFindChannel("fwealth");
                }
                if (!thisguild.channels.find(channel => channel.name === 'stronghold') && !getC('stronghold') && server == 'cosmic') {
                  cantFindChannel("stronghold");
                }
                if (!thisguild.channels.find(channel => channel.name === process.env.coreChunkChannel) && server == 'cosmic' && !getC('coreChunk')) {
                  cantFindChannel('coreChunk');
                }
              }

              if (server != 'manacube' && server != 'battleclash' && server != 'saico' && server != 'convict' && server != 'battleclash') {
                if (!thisguild.channels.find(channel => channel.name === 'outpost') && !getC('outpost')) {
                  cantFindChannel("outpost");
                }
              }

              if (server != 'archon' && server != 'royalcraft' && server != 'battleclash' && server != 'vanity' && server != 'mccentral' && server != 'saico' && server != 'convict') {
                if (!thisguild.channels.find(channel => channel.name === 'tps') && !getC('tps')) {
                  cantFindChannel("tps");
                }
              }

              if (!thisguild.channels.find(channel => channel.name === c_settings.taskChannelName+'') && c_settings.taskChannelName.toString() != "" && !getC('task')) {
                console.log('Could not find automated tasks channel! Set with /c task<br>Using #logs channel for now.');
              }

              function cantFindChannel(name) {
                if (botIsSetup) {
                  console.log('\x1b[31mERROR: Could not find a channel ('+name+' Channel). Use /c <name> <#channel> to set custom channels!');
                }
              }

              if (!thisguild.channels.find(channel => channel.name === 'logs') && !getC('logs')) {
                thisguild.createChannel("logs", "text");
                console.log('Created logs channel since I could not find a custom id or one named #logs. This is a backup channel so the bot does not crash.');
              }

              logsc = getC('logs') || bot.channels.find(channel => channel.name === 'logs');

              botCommands = getC('botCommands') || thisguild.channels.find(channel => channel.name === 'bot-commands') || logsc;
              outpostc = getC('outpost') || thisguild.channels.find(channel => channel.name === 'outpost') || logsc;
              ingamechat = getC('ingameChat') || thisguild.channels.find(channel => channel.name === 'ingame-chat') || logsc;
              wallchecking = getC('wallChecking') || thisguild.channels.find(channel => channel.name === process.env.wallsChannel) || logsc;
              bufferchecking = getC('bufferChecking') || thisguild.channels.find(channel => channel.name === process.env.buffersChannel) || logsc;
              tpsc = getC('tps') || thisguild.channels.find(channel => channel.name === 'tps') || logsc;
              economyc = getC('economy') || thisguild.channels.find(channel => channel.name === 'economy') || logsc;
              ftopchannel = getC('ftop') || thisguild.channels.find(channel => channel.name === 'ftop') || logsc;
              fwealthchannel = getC('fwealth') || thisguild.channels.find(channel => channel.name === 'fwealth') || logsc;
              findchn = getC('find') || thisguild.channels.find(channel => channel.name === 'find-channel') || logsc;
              strongholdChannel = getC('stronghold') || thisguild.channels.find(channel => channel.name === 'stronghold') || logsc;
              coreChunkChan = getC('coreChunk') || thisguild.channels.find(channel => channel.name === process.env.coreChunkChannel) || logsc;
              awaychannel = getC('away') || thisguild.channels.find(channel => channel.name === 'away') || logsc;
              taskChannel = getC('task') || thisguild.channels.find(channel => channel.name === c_settings.taskChannelName) || logsc;

              const reboot = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTitle('**' + bot.user.username + '**')
                .setDescription('Successfully rebooted at: **' + getTime() + '**' + '\n\n ``Auto Find:``** ' + autofindString + '**'+ '\n\n ``Auto Find Interval:``** ' + afintmin + ' minutes**'+ '\n\n ``Join Cmd:``** ' + joincommand + '**'+ '\n\n ``Prefix:``** ' + prefix + '**\n\n ``TPS Alert Threshold:``** ' + tpsalert + '**' + '\n\n ``TPS Alerts:``** ' + tpsalertt + '**' + '\n\n ``Raid Event Alerts:``** ' + raidevent + '**'+ '\n\n ``Outpost Alerts:``** ' + outposta + '**'+ '\n\n ``Player Tracking:`` **' + playertracking + '**'+ '\n\n**Wall Settings:**\n\n ``Wall Checking:``** ' + wall_checking_enabled + '**'+ '\n\n ``Wall Check Interval:``** ' + Math.round(wallintervalmin) + ' minutes**'+ '\n\n ``Buffer Checking:``** '+buffer_checking_enabled+'**'+ '\n\n ``Buffer Check Interval:``** ' + Math.round(bufferintervalmin) + ' minutes**')
                .setThumbnail(bot.user.avatarURL)
                .setTimestamp()
                .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png');

              try {
                logsc.send(reboot).catch((e) => {});
              } catch (e) {}

              console.log('\x1b[32mDiscord ready!');
              bot.user.setStatus(botstatus);
              bot.user.setActivity(game);

              //reset up wall checking
              wallinterval = c_settings.interval;
              var wallintervalsec = wallinterval/1000;
              var rebootcheck = false;
              setInterval(function() {
                  if (rebootcheck) {return;} else {
                      if (Number(Date.now() / 1000) - Number(lastcheck) <= wallintervalsec) { } else {
                          clearInterval(wallintervalspam);
                          wallintervalspam = setInterval(wallalert, Number(c_settings.notificationDelay));
                          rebootcheck = true;
                      }
                  }
              }, 30000);
              //reset up buffer checking (delay so its not spam interfearing with walls )
              setTimeout(function() {
                bufferinterval = c_settings.bufferinterval;
                var bufferintervalsec = bufferinterval/1000;
                var bufferrebootcheck = false;
                setInterval(function() {
                    if (bufferrebootcheck) {return;} else {
                        if (Number(Date.now() / 1000) - Number(lastbuffercheck) <= bufferintervalsec) { } else {
                            clearInterval(bufferintervalspam);
                            bufferintervalspam = setInterval(bufferalert, Number(c_settings.notificationDelay));
                            bufferrebootcheck = true;
                        }
                    }
                }, 30000);
              }, 6000);

              //Setup auto ftop posts
              if (autoftop) {
                var time = c_settings.ftopinterval;
                setInterval(function() {
                  console.log('Auto posting ftop.');
                  fs.writeFile(assetsPath+'runcommand.txt', '/f top:a', err => {
                      if (err) throw err;
                  });
                }, Number(time));
              }
              //Setup auto fwealth posts
              setTimeout(function() {
                if (autofwealth) {
                  var time = c_settings.fwealthinterval;
                  setInterval(function() {
                    console.log('Auto posting fwealth.');
                    fs.writeFile(assetsPath+'runcommand.txt', '/fwealth:a', err => {
                        if (err) throw err;
                    });
                  }, Number(time));
                }
              }, 12000);

              //Setup automated tasks
              if (c_settings.tasks.length != 0) {
                console.log('Setting up automated tasks...<br>');
                c_settings.tasks.forEach(task => {
                  var taskInterval = Number(task.split(' ')[0]);
                  var returnsOutput = true;
                  if (task.split(' ')[1].toString().toLowerCase().trim() == 'false') {
                    returnsOutput = false;
                  }
                  var execCommand = task.replace(task.split(' ')[0]+' '+task.split(' ')[1]+' ', '');
                  console.log('Setting up task: '+task+'<br>');

                  setInterval(function() {
                    if (!returnsOutput) {
                      //No output so run through sendchat
                      fs.writeFile(assetsPath+'sendchat.txt', execCommand+' alt0', err => {
                          if (err) throw err;
                          console.log('Executing task '+task+'<br>');
                      });
                    } else {
                      fs.writeFile(assetsPath+'runcommand.txt', execCommand+' %task%', err => {
                          if (err) throw err;
                          console.log('Executing task '+task+'<br>');
                      });
                    }
                  }, taskInterval*60*1000);
                });
              }

              //Setup core chunk checks
              if (c_settings.coreChunks) {
                setInterval(function() {
                    getCoreData(function(json) {
                      var cooldownFactions = json;

                      cooldownFactions.forEach(Cfaction => {
                        async function checkCoreFaction(Cfaction) {
                          var breachedTime = Number(Cfaction.split(':')[1]);
                          var facRaided = Cfaction.split(':')[0];

                          //Alert if at 30m till off cd
                          var cooldownAlertTime = c_settings.coreAlertTime;

                          if (Number(Date.now() - breachedTime) >= (8*60*60*1000) - cooldownAlertTime*60*1000) {
                            //Remove from data
                            var tempArray = [];
                            json.forEach(core => {
                              if (core != Cfaction) {
                                tempArray.push(core);
                              }
                            });

                            coresFile.set("coreData", tempArray);
                            //Send to discord
                            try {
                              const coreEmbed = new Discord.RichEmbed()
                                  .setColor('#E25141')
                                  .setTitle('**'+facRaided+' Cooldown**')
                                  .setDescription('('+getTime()+') **'+facRaided+' has '+cooldownAlertTime+' minutes until they can be raided again!**')
                                  .setTimestamp();
                              try {
                                var adminN = thisguild.roles.find(role => role.name === adminRoleN);
                                var trustedN = thisguild.roles.find(role => role.name === trustedRoleN);
                                var memberN = thisguild.roles.find(role => role.name === useRoleN);

                                coreChunkChan.send(adminN+" "+trustedN+" "+memberN, coreEmbed).catch((e) => {});
                              } catch (e) {
                                coreChunkChan.send("@everyone", coreEmbed).catch((e) => {});
                              }
                            } catch (e) {console.log('Error warning corechunk cooldown: '+e);}
                          }

                          await new Promise(done => setTimeout(() => done(), 2000));
                        }
                        checkCoreFaction(Cfaction);
                      });
                    });
                }, 3*60*1000);
              }

              //Setup shield messages interval
              if (c_settings.shieldEnabled) {
                setInterval(function() {
                  isExactShieldStartTime(function(isShield) {
                    if (isShield) {
                      const shield = new Discord.RichEmbed()
                          .setColor('#00E575')
                          .setTitle(':shield: SHIELD ENABLED')
                          .setDescription('Shield has been enabled, buffer and wall checks are now disabled until **'+c_settings.shield.split('-')[1]+'**.')
                          .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png')
                          .setTimestamp();
                      wallchecking = getC('wallChecking') || bot.channels.find(channel => channel.name === process.env.wallsChannel+'') || logsc;
                      bufferchecking = getC('bufferChecking') || bot.channels.find(channel => channel.name === process.env.buffersChannel+'') || logsc;
                      wallchecking.send(shield).catch((e) => {});
                      bufferchecking.send(shield).catch((e) => {});
                      wall_checking_enabled = false;
                      buffer_checking_enabled = false;
                    }
                  });
                  isExactShieldEndTime(function(isShield) {
                    if (isShield) {
                      const shield = new Discord.RichEmbed()
                          .setColor('#00E575')
                          .setTitle(':x: SHIELD DISABLED')
                          .setDescription('Shield has been **disabled**, buffer and wall checks are now enabled until **'+c_settings.shield.split('-')[0]+'**.')
                          .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png')
                          .setTimestamp();
                      wallchecking = getC('wallChecking') || bot.channels.find(channel => channel.name === process.env.wallsChannel+'') || logsc;
                      bufferchecking = getC('bufferChecking') || bot.channels.find(channel => channel.name === process.env.buffersChannel+'') || logsc;
                      wallchecking.send(shield).catch((e) => {});
                      bufferchecking.send(shield).catch((e) => {});
                      wall_checking_enabled = c_settings.wallchecks;
                      buffer_checking_enabled = c_settings.bufferchecks;
                    }
                  });
                }, 60000);
              } else {
                setTimeout(function() {
                  console.log('Shield was disabled. Will not disable walls or buffers during shield times now. Change with '+prefix+'shield toggle!');
                }, 4000);
              }

              /*ioStream.getStreams(function(stream) {
                  if (!stream) {
                    //fstream_enabled = false;
                  }
              });*/
          });

          //join message
          bot.on("guildMemberAdd", (member) => {
              const welcome = new Discord.RichEmbed()
                  .setColor('#0099ff')
                  .setTitle(member.guild.name)
                  .setThumbnail(member.guild.iconURL)
                  .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png')
                  .setTimestamp();
              var welcomeMsg = mainSettings.discordjoinmsg;
              if (welcomeMsg.toString().toLowerCase().includes('{user}')) welcomeMsg = welcomeMsg.toString().replace('{user}', member);
              if (welcomeMsg.toString().toLowerCase().includes('{tag}')) welcomeMsg = welcomeMsg.toString().replace('{tag}', member.user.tag);
              welcome.setDescription(welcomeMsg);

              if (mainSettings.discordjoinmsg.toString().toLowerCase().trim() == 'none') {} else {
                  try {
                      let welcomeChannel = bot.channels.get(thisguild.systemChannelID);
                      welcomeChannel.send(welcome).catch((e) => {});
                      /*ioStream.getStreams(function(stream) {
                          if (stream) {} else {
                              //process.exit(1);
                              //fstream_enabled = false;
                          }
                      });*/
                  } catch (e) {
                      console.log('No welcome channel found. Could not send welcome message, try opening server overview and set system messages channel. '+e);
                  }
              }
          });

          function getCoreData(cb) {
            cb(coresFile.get("coreData"));
          }

          //leave message
          bot.on("guildMemberRemove", (member) => {
              const welcome = new Discord.RichEmbed()
                  .setColor('#E25141')
                  .setTitle(member.guild.name)
                  .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png')
                  .setTimestamp();

              var welcomeMsg = mainSettings.discordleavemsg;
              if (welcomeMsg.toString().toLowerCase().includes('{user}')) welcomeMsg = welcomeMsg.toString().replace('{user}', member);
              if (welcomeMsg.toString().toLowerCase().includes('{tag}')) welcomeMsg = welcomeMsg.toString().replace('{tag}', member.user.tag);
              welcome.setDescription(welcomeMsg);
              if (mainSettings.discordleavemsg.toString().toLowerCase().trim() == 'none') {} else {
                  try {
                      let welcomeChannel = bot.channels.get(thisguild.systemChannelID);
                      welcomeChannel.send(welcome).catch((e) => {});
                      /*ioStream.getStreams(function(stream) {
                          if (stream) {} else {
                            //process.exit(1);
                          }
                      });*/
                  } catch (e) {
                      console.log('No welcome channel found. Could not send welcome message, try opening server overview and set system messages channel. '+e);
                  }
              }
          });

          const noaccess = new Discord.RichEmbed() //no access embed
              .setColor('#E25141')
              .setTitle('No Access')
              .setDescription('I\'m sorry, but you do not have permission to perform this command. Please contact the server administrator if you believe that this is an error. View permissions for this command on ~~https://ultimatebot.pw/documentation~~ (UltimateBot has shut down, support no longer provided :( )')
              .setTimestamp()
              .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png');

          function readLines(input, func) {
              var remaining = '';
              input.on('data', function(data) {
                  remaining += data;
                  var index = remaining.indexOf('\n');
                  var last = 0;
                  while (index > -1) {
                      var line = remaining.substring(last, index);
                      last = index + 1;
                      func(line);
                      index = remaining.indexOf('\n', last);
                  }
                  remaining = remaining.substring(last);
              });
              input.on('end', function() {
                  if (remaining.length > 0) {
                      func(remaining);
                  }
              });
          }

          var autofindString = settingsFile.get("autofind");
          //check settings.json if auto find is on, if so then set the interval
          if (autofindString == true){
              autofindinterval = setInterval(autofind, afinterval);
          } else {
              clearInterval(autofindinterval);
          }

          async function autofind(){
              console.log('\x1b[36mChecking autofind list');
              var arr = fs.readFileSync(assetsPath+'find.txt', 'utf8').split(/\r?\n/);
              for (i = 0; i < arr.length; i++) {
                  var item = i;
                  var name = arr[item];
                  if (name != 'none' && name != '' && name != undefined) {
                      await new Promise(done => setTimeout(() => done(), 4500)); // timeout - NOT ASYNC
                      fs.writeFile(assetsPath+'runcommand.txt', '/find '+name, err => {
                          if (err) throw err;
                      });
                  }
              }
          }

          function toggleautofind() {
              if (autofindString = false) {
                  clearInterval(autofindinterval);
              }
          }

          var taskActive = false;
          setInterval(() => {
              taskActive = false;
              var contents = fs.readFileSync(assetsPath+'output.txt', 'utf8');
              var tps = fs.readFileSync(assetsPath+'tps.txt', 'utf8');

              if (contents.includes('%task%') || tps.includes('%task%')) {
                taskActive = true;
              }
              contents = contents.replace('%task%', '');

              if (tps != '') {
                  var contentt = '';
                  dedupe(fs.readFileSync(assetsPath+'tps.txt', 'utf8')).forEach(element => {
                      if (element != '') {
                          contentt = contentt+'\n'+element
                      }
                  });
                  if (contentt.includes('.') || contentt.includes('20')) {
                      var color;
                      if ( (contentt.includes('18.') || contentt.includes('17.') || contentt.includes('16.')||contentt.includes('15.') || contentt.includes('14.') || contentt.includes('13.') || contentt.includes('12.') || contentt.includes('11.') || contentt.includes('10.') || contentt.includes('9.') || contentt.includes('8.') || contentt.includes('7.') || contentt.includes('6.') || contentt.includes('5.') || contentt.includes('4.') || contentt.includes('3.') || contentt.includes('2.') || contentt.includes('1.'))) {
                          color ='#F6C52D';
                      }
                      if (contentt.includes('19.') || contentt.includes('20')) {
                          color='#4AAB4E';
                      }

                      const tpss = new Discord.RichEmbed()
                          .setColor(color)
                          .setDescription(contentt)
                          .setTitle('**TPS**')
                          .setTimestamp();
                      var nonembed = 'Error!';
                      var flattps = contentt;
                      try {
                          var adminN = thisguild.roles.find(role => role.name === adminRoleN);
                          var trustedN = thisguild.roles.find(role => role.name === trustedRoleN);
                          var memberN = thisguild.roles.find(role => role.name === useRoleN);
                          if (flattps < tpsalert) {
                              nonembed = '**[TPS Alert]** '+ adminN + ' ' + trustedN + ' ' + memberN +' - The server has gone below the tps threshold, investigate!';
                          } else {nonembed =':white_check_mark:';}
                      } catch (e) {
                          console.log(e);
                          if (flattps < tpsalert) {
                              nonembed = '**[TPS Alert]** @everyone - The server has gone below the tps threshold, investigate!';
                          } else {nonembed =':white_check_mark:';}
                      }
                      if (tpsalertt == true) {
                        if (taskActive) {
                          taskChannel.send(nonembed, tpss).catch((e) => {});
                        } else {
                          tpsc.send(nonembed, tpss).catch((e) => {});
                        }
                      }
                      contents = '';
                  }
              }
              if (contents != '') {
                  var content = '';
                  dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                      if (element != '') {
                          content = content+'\n'+element
                      }
                  });

                  if ((contents.toLowerCase().includes('\'s balance') || contents.toLowerCase().includes('balance of')  || contents.toLowerCase().includes('balance:') || contents.toLowerCase().includes('locally online') || contents.toLowerCase().includes('not online')) && !(contents.toLowerCase().includes('description:'))) {
                        var color = (contents.toLowerCase().includes('locally online') || contents.toLowerCase().includes('not online')) ? '#E25141' : '#00E575';
                        const balcmd = new Discord.RichEmbed()
                            .setColor(color)
                            .setDescription('**' + contents.replace(/undefined/g, '') + '**')
                            .setTitle('**Balance**')
                            .setTimestamp();

                        if (taskActive) {
                          taskChannel.send(balcmd).catch((e) => {});
                        } else {
                          lastRequestedChannel.send(balcmd).catch((e) => {});
                        }
                  } else if (contents.toLowerCase().includes('description') || contents.toLowerCase().includes('faction not found') || (contents.toLowerCase().includes(c_config.fWhoIncludes[0].toString().toLowerCase() && server == 'custom'))) {
                      var content = '';
                      dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                          if (element != '') {
                              content = content+'\n'+element
                          }
                      });
                      content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                      var color = content.toLowerCase().includes('faction not found') ? '#E25141' : '#0099ff';
                      content = content.toLowerCase().includes('faction not found') ? '**Faction not found**' : '```\n' + content + '\n```';
                      const facembed = new Discord.RichEmbed()
                          .setColor(color)
                          .setDescription(content)
                          .setTitle('**Faction Info**')
                          .setTimestamp();

                        if (taskActive) {
                          taskChannel.send(facembed).catch((e) => {});
                        } else {
                          lastRequestedChannel.send(facembed).catch((e) => {});
                        }
                  } else if (contents.toLowerCase().includes(c_config.ftopStartIncludes.toString().toLowerCase()) || contents.toLowerCase().includes('faction top') || contents.toLowerCase().includes('factions top') || contents.toLowerCase().includes('top wealth') || contents.toLowerCase().includes('top faction') || contents.toLowerCase().includes('total:') || contents.toLowerCase().includes('faction wealth') || contents.toLowerCase().includes('top factions list') || contents.toLowerCase().includes('faction worth')) {
                      var content = '';
                      dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                          if (element != '') {
                              content = content+'\n'+element
                          }
                      });
                      content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                      content = content.toLowerCase().includes('faction not found') ? '**Faction not found**' : '\n```' + content + '\n```';
                      content = content.replace(/%auto%/g, '');
                      var title = (content.toLowerCase().includes('$')) ? '**Faction Wealth**' : '**Top Factions**';
                      var facembed;
                      if (server == 'cosmic') {
                        if (c_settings.fancyFtop.toString().toLowerCase()+'' == 'true') {
                          try {
                          content = content.replace(/`/g, '');
                          facembed = new Discord.RichEmbed()
                            .setColor('#00E575')
                            .setTitle(title)
                            .setTimestamp();
                            var lines = content.split('\n');
                            var ftopArray = [];
                            lines.forEach(line => {
                              if (line.toString().trim() != '' && line.toString().trim() != ' ' && line.toString().toLowerCase().includes('top factions') != true) {
                                var temp = [];
                                temp.push(line.split(' - ')[0].replace(/..?\. /i, ''));
                                temp.push(line.split(' - ')[1]);
                                ftopArray.push(temp);
                              }
                            });
                            var facIndex = 0;
                            var factions = "";
                            var values = "";

                            ftopArray.forEach(array => {
                              facIndex++;
                              factions += '**'+facIndex+'.** '+array[0]+"\n";
                              values += array[1]+"\n";
                            });
                            var fieldtitle = "Points";
                            if (title.toLowerCase().includes('faction wealth')) {
                              fieldtitle = "Wealth";
                            }
                            facembed.addField('Faction', factions, true);
                            facembed.addField(fieldtitle, values, true);
                          } catch (e) {
                            facembed = new Discord.RichEmbed()
                              .setColor('#00E575')
                              .setDescription(content)
                              .setTitle(title)
                              .setTimestamp();
                          }
                        } else {
                          facembed = new Discord.RichEmbed()
                            .setColor('#00E575')
                            .setDescription(content)
                            .setTitle(title)
                            .setTimestamp();
                        }
                      } else {
                        if (c_settings.fancyFtop.toString().toLowerCase()+'' == 'true') {
                          try {
                          content = content.replace(/`/g, '');
                          facembed = new Discord.RichEmbed()
                            .setColor('#00E575')
                            .setTitle(title)
                            .setTimestamp();
                            var lines = content.split('\n');
                            var ftopArray = [];
                            lines.forEach(line => {
                              if (line.toString().toLowerCase().includes(c_config.ftopStartIncludes.toString().toLowerCase()) != true && line.toString().trim() != '' && line.toString().trim() != ' ' && line.toString().toLowerCase().includes('___.[') != true && line.toString().toLowerCase().includes('server value:') != true && line.toString().toLowerCase().includes('top faction') != true && line.toString().toLowerCase().includes('faction worth') != true && line.toString().toLowerCase().includes('factions top') != true && line.toString().toLowerCase().includes('faction top') != true && line.toString().toLowerCase().includes('top wealth') != true && line.toString().toLowerCase().includes('-----[') != true) {
                                //Needs to be [["fac", "value"]]
                                var tempArray = [];
                                if (server == 'verixpvp' || server == 'royalcraft' || server == 'maplecraft') {
                                  tempArray.push(line.toString().trim().split('Total: ')[0].replace(/.*\./, ''));
                                  tempArray.push(line.toString().trim().match(/.* (\$.*) [0-9].*/)[1]);
                                } else if (server == 'manacube') {
                                  tempArray.push(line.toString().trim().split(':')[0].replace(/.*\./, ''));
                                  tempArray.push(line.toString().trim().match(/.* (\$.*)/)[1]);
                                } else if (server == 'archon') {
                                  tempArray.push(line.toString().trim().split('-')[1]);
                                  tempArray.push(line.toString().trim().match(/.* (\$.*)/)[1]);
                                } else if (server == 'desteria') {
                                  tempArray.push(line.toString().trim().split('-')[0].replace(/#[0-9][0-9]? /, '').replace(/..?\. /, ''));
                                  tempArray.push(line.toString().trim().match(/.* (\$.*)/)[1]);
                                } else if (server == 'karismic') {
                                  tempArray.push(line.toString().trim().split('-')[1].replace(/ \$.*/, ''));
                                  tempArray.push(line.toString().trim().match(/.* (\$.*) \(.*/)[1]);
                                } else if (server == 'vanity') {
                                  tempArray.push(line.toString().trim().split(' ')[1].replace(/ \$.*/, ''));
                                  tempArray.push(line.toString().trim().match(/.* (\$.*)/)[1]);
                                } else if (server == 'mccentral') {
                                  tempArray.push(line.toString().trim().split('-')[0].replace(/..?\. /, ''));
                                  tempArray.push(line.toString().trim().match(/.* (\$.*) \(.*/)[1]);
                                } else if (server == 'saico') {
                                  tempArray.push(line.toString().trim().split('-')[0].replace(/\* #..? /, ''));
                                  tempArray.push(line.toString().trim().match(/.* (\$.*) \[.*/)[1]);
                                } else if (server == 'custom') {
                                  var ftopRegex = new RegExp(c_config.fTopPlace.split(' FLAGS:')[0], c_config.fTopPlace.split(' FLAGS:')[1]);
                                  if (debug) console.log('Ftop line received on discord end. Regex for ftop is '+ftopRegex+' line was \n'+line);
                                  //Faction
                                  tempArray.push(line.toString().match(ftopRegex)[1]);
                                  //Value
                                  tempArray.push(line.toString().match(ftopRegex)[2]);
                                  if (debug) console.log('Regex matched as follows. Faction will be matched as index 1 and value as index 2');
                                  if (debug) console.log(line.toString().match(ftopRegex));
                                } else if (server == 'mineheroes') {
                                  tempArray.push(line.toString().trim().split(' ')[1].replace(/ \$.*/, ''));
                                  tempArray.push(line.toString().trim().match(/.* (\$.*) -.*/)[1]);
                                  tempArray.push(line.toString().trim().match(/.* - \((.*) Points\)/)[1]);
                                } else if (server == 'fantasycloud') {
                                  tempArray.push(line.toString().trim().split('-')[0].replace(/ \$.*/, '').replace(/[0-9][0-9]?\. /, ''));
                                  tempArray.push(line.toString().trim().match(/.* (\$.*)/)[1]);
                                } else if (server == 'convict' || server == 'battleclash') {
                                    tempArray.push(line.toString().trim().split(' ')[1]);
                                    tempArray.push(line.toString().trim().split(' ')[2]);
                                } else if (server == 'glacial') {
                                    tempArray.push(line.toString().trim().split(' ')[2]);
                                    tempArray.push(line.toString().trim().split(' ')[3]);
                                } else if (server == 'glacial') {
                                    tempArray.push(line.toString().trim().split(' ')[2]);
                                    tempArray.push(line.toString().trim().split(' ')[3]);
                                } else if (server == 'predator') {
                                  tempArray.push(line.toString().trim().split(' ')[1]);
                                  tempArray.push(line.toString().trim().split(' ')[3]);
                               } else if (server == 'treasurewars') {
                                  tempArray.push(line.toString().trim().split(' ')[2]);
                                  tempArray.push(line.toString().trim().split(' ')[4]);
                               } else {
                                  tempArray.push(line.toString().trim().split(' ')[1].replace(/ \$.*/, ''));
                                  tempArray.push(line.toString().trim().match(/.* (\$.*)/)[1]);
                                }

                                ftopArray.push(tempArray);
                              }
                            });
                            var facIndex = 0;
                            var factions = "";
                            var values = "";
                            var mhvalues = "";

                            if (server == 'mineheroes') {
                              ftopArray.forEach(array => {
                                facIndex++;
                                factions += '**'+facIndex+'.** '+array[0]+"\n";
                                values += array[1]+"\n";
                                mhvalues += array[2]+"\n";
                              });
                            } else {
                              ftopArray.forEach(array => {
                                facIndex++;
                                factions += '**'+facIndex+'.** '+array[0]+"\n";
                                values += array[1]+"\n";
                              });
                            }

                            var fieldtitle = "Points";
                            if (title.toLowerCase().includes('faction wealth')) {
                              fieldtitle = "Wealth";
                            }
                            facembed.addField('Faction', factions, true);
                            facembed.addField(fieldtitle, values, true);
                            if (server == 'mineheroes') {
                              facembed.addField('Points', mhvalues, true);
                            }

                          } catch (e) {
                            if (debug) console.log('Error while formatting ftop:' + e);
                            facembed = new Discord.RichEmbed()
                              .setColor('#00E575')
                              .setDescription(content)
                              .setTitle(title)
                              .setTimestamp();
                          }
                        } else {
                          facembed = new Discord.RichEmbed()
                            .setColor('#00E575')
                            .setDescription(content)
                            .setTitle(title)
                            .setTimestamp();
                        }
                      }

                      if (contents.includes('%auto%')) {
                        //Auto ftop post
                        if (server == 'cosmic') {
                          if (title.toLowerCase().includes('faction wealth')) {
                            fwealthchannel.send(facembed).catch((e) => {});
                          } else {
                            ftopchannel.send(facembed).catch((e) => {});
                          }
                        } else {
                          ftopchannel.send(facembed).catch((e) => {});
                        }
                      } else {
                        lastRequestedChannel.send(facembed).catch((e) => {});
                      }
                  } else if (contents.toLowerCase().includes('is in your game') || contents.toLowerCase().includes('is on the server') || contents.toLowerCase().includes('online player found') || contents.toLowerCase().includes('is currently disabled')) {
                      var content = '';
                      dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                          if (element != '') {
                              content = content+'\n'+element
                          }
                      });
                      content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                      var nonEmbed = content.toLowerCase().includes('cannonplanet') ? ':x: @everyone' : ':white_check_mark:';
                      var color = content.toLowerCase().includes('online player found') ? '#E25141' : '#03A4EE';
                      const facembed = new Discord.RichEmbed()
                          .setColor(color)
                          .setDescription('``'+content.replace(/\r?\n|\r/g, "").replace("(!) ", "")+'``')
                          .setTitle('Find')
                          .setTimestamp();
                      if (taskActive) {
                        taskChannel.send(nonEmbed,facembed).catch((e) => {});
                      } else {
                        findchn.send(nonEmbed,facembed).catch((e) => {});
                      }
                  } else if (contents.toLowerCase().match(/.*\/[0-9]/gi) && contents.toLowerCase().includes('online') && contents.toLowerCase().includes('members online (') != true && server != 'verixpvp') {
                      var content = '';
                      dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                          if (element != '') {
                              content = content+'\n'+element
                          }
                      });
                      content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                      const facembed = new Discord.RichEmbed()
                          .setColor('#0099ff')
                          .setDescription('```\n'+content+'```')
                          .setTitle('**Faction List**')
                          .setTimestamp();

                        if (taskActive) {
                          taskChannel.send(facembed).catch((e) => {});
                        } else {
                          lastRequestedChannel.send(facembed).catch((e) => {});
                        }
                  } else if (contents.toLowerCase().includes('online') && contents.toLowerCase().includes('members online (') != true && server == 'verixpvp') {
                      var content = '';
                      dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                          if (element != '') {
                              content = content+'\n'+element
                          }
                      });
                      content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                      const facembed = new Discord.RichEmbed()
                          .setColor('#0099ff')
                          .setDescription('```\n'+content+'```')
                          .setTitle('**Faction List**')
                          .setTimestamp();

                          if (taskActive) {
                            taskChannel.send(facembed).catch((e) => {});
                          } else {
                            lastRequestedChannel.send(facembed).catch((e) => {});
                          }
                  } else if (contents.toLowerCase().includes(c_config.flistStartIncludes.toString().toLowerCase()) && server == 'custom') {
                    var content = '';
                    dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                        if (element != '') {
                            content = content+'\n'+element
                        }
                    });
                    content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                    const facembed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setDescription('```\n'+content+'```')
                        .setTitle('**Faction List**')
                        .setTimestamp();

                        if (taskActive) {
                          taskChannel.send(facembed).catch((e) => {});
                        } else {
                          lastRequestedChannel.send(facembed).catch((e) => {});
                        }
                  } else if (contents.toLowerCase().includes('*') && contents.toLowerCase().includes('players:')) {
                      var content = '';
                      dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                          if (element != '') {
                              content = content+'\n'+element
                          }
                      });
                      content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                      const facembed = new Discord.RichEmbed()
                          .setColor('#0099ff')
                          .setDescription(content)
                          .setTitle('**Players List**')
                          .setTimestamp();

                        if (taskActive) {
                          taskChannel.send(facembed).catch((e) => {});
                        } else {
                          lastRequestedChannel.send(facembed).catch((e) => {});
                        }
                  } else if (contents.toLowerCase().includes('raid event') && contents.toLowerCase().includes('map:') && server != 'archon') {
                      var content = '';
                      dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                          if (element != '') {
                              content = content+'\n'+element
                          }
                      });
                      content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                      content = content.replace('Raid Event:', '');
                      var color = content.toLowerCase().includes('phase: open') ? '#00E575' : '#0099ff';
                      const facembed = new Discord.RichEmbed()
                          .setColor(color)
                          .setDescription(content)
                          .setTitle('**Raid Event**')
                          .setTimestamp();
                        if (taskActive) {
                          taskChannel.send(facembed).catch((e) => {});
                        } else {
                          lastRequestedChannel.send(facembed).catch((e) => {});
                        }
                  } else if (contents.toLowerCase().includes('saturdays at 4:00') || contents.toLowerCase().includes('raid event is currently active') && server == 'archon') {
                    var content = '';
                    dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                      if (element != '') {
                        content = content+'\n'+element
                      }
                    });

                    if (content.toLowerCase().includes('raid event is currently active')) {
                      var timeP = content.replace('Raid event is currently active!', '');

                      const facembed = new Discord.RichEmbed()
                        .setColor('#00E575')
                        .setDescription('A raid event is currently active. \nTime elapsed: **'+timeP+'**')
                        .setTitle('**Active Raid Event**')
                        .setTimestamp();
                      if (taskActive) {
                        taskChannel.send(facembed).catch((e) => {});
                      } else {
                        lastRequestedChannel.send(facembed).catch((e) => {});
                      }
                    } else {
                    content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                    var nextEvent = content.match(/.*\?/);

                    var eventInfo = content.toString().replace(nextEvent, '');
                    eventInfo = eventInfo.replace(/\*/g, '');

                    nextEvent = nextEvent.toString().replace(/:/g, ' ');
                    nextEvent = nextEvent.replace('?', '');
                    nextEvent = nextEvent.replace('h', ' hour(s)');
                    nextEvent = nextEvent.replace('m', ' minute(s)');
                    nextEvent = nextEvent.replace('d', ' day(s)');

                    const facembed = new Discord.RichEmbed()
                      .setColor('#0099ff')
                      .addField('Next Raid Event', '**'+nextEvent+'**')
                      .addField('Raid Events Happen On:', eventInfo)
                      .setTitle('**Raid Event Info**')
                      .setTimestamp();
                      if (taskActive) {
                        taskChannel.send(facembed).catch((e) => {});
                      } else {
                        lastRequestedChannel.send(facembed).catch((e) => {});
                      }
                   }
                  } else if (contents.toLowerCase().includes('cap %:') && server == 'cosmic') {
                      var content = '';
                      dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                          if (element != '') {
                              content = content+'\n'+element
                          }
                      });
                      var vanilla = contents.match(/^Vanilla: \nStatus:.*\nAttacking:.*\n.*\nCap %: .*%$/m);
                      var trainee = contents.match(/^Trainee: \nStatus:.*\nAttacking:.*\n.*\nCap %: .*%$/m);
                      var hero = contents.match(/^Hero: \nStatus:.*\nAttacking:.*\n.*\nCap %: .*%$/m);
                      var cosmonaut = contents.match(/^Cosmonaut: \nStatus:.*\nAttacking:.*\n.*\nCap %: .*%$/m);
                      const facembed = new Discord.RichEmbed()
                          .setTitle('**Outpost**')
                          .setColor('#0099ff')
                          .addField('**Vanilla:**', '```'+vanilla+'```')
                          .addField('**Trainee:**', '```'+trainee+'```')
                          .addField('**Hero:**', '```'+hero+'```')
                          .addField('**Cosmonaut:**', '```'+cosmonaut+'```')
                          .setTimestamp();

                        if (taskActive) {
                          taskChannel.send(facembed).catch((e) => {});
                        } else {
                          lastRequestedChannel.send(facembed).catch((e) => {});
                        }
                  } else if (contents.toLowerCase().includes('raid event starting in') && raidevent == true) {
                      if (contents.toLowerCase().includes('seconds')) {} else {
                          var content = '';
                          dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                              if (element != '') {
                                  content = content+'\n'+element
                              }
                          });
                          content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                          content = content.replace('*', '');
                          content = content.replace('*', '');
                          content = content.replace('*', '');
                          content = content.replace('*', '');
                          content = content.replace('*', '');
                          content = content.replace('*', '');
                          content = content.toLowerCase();
                          var nonembed;
                          try {
                              var adminN = thisguild.roles.find(role => role.name === adminRoleN);
                              var trustedN = thisguild.roles.find(role => role.name === trustedRoleN);
                              var memberN = thisguild.roles.find(role => role.name === useRoleN);
                              nonembed = ':warning: **Raid Event** ' + adminN + ' ' + trustedN + ' ' + memberN;
                          } catch (e) {
                              nonembed = ':warning: **Raid Event** @everyone';
                          }
                          const facembed = new Discord.RichEmbed()
                              .setColor('#F64235')
                              .setDescription(content)
                              .setTitle('**Raid Event Alert**')
                              .setTimestamp();

                          outpostc.send(nonembed, facembed).catch((e) => {});
                      }
                  } else if (contents.toLowerCase().includes('grace period') || contents.toLowerCase().includes(c_config.graceInfoIncludes.toString().toLowerCase())) {
                      var content = '';
                      dedupe(fs.readFileSync(assetsPath+'output.txt', 'utf8')).forEach(element => {
                        if (element != '') {
                          content = content+'\n'+element
                        }
                      });
                      content = content.replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''); // remove formatting codes
                      var color = (content.toLowerCase().includes('is over')) ? '#E25141' : '#0099ff';
                      content = content.replace('\n', '');
                      if (server == 'archon') {
                        if (content.toLowerCase().includes('will end in')) {
                          content = content.replace('Grace Period will end in ', '');
                          content = 'Grace Period will end in **'+content+'**';
                        } else {
                          content = '**Grace Period is over!** TNT, Creepers, and Spawner Mining Costs are enabled!';
                        }
                      }

                      const facembed = new Discord.RichEmbed()
                        .setColor(color)
                        .setDescription(content)
                        .setTitle('**Grace Period**')
                        .setTimestamp();

                        if (taskActive) {
                          taskChannel.send(facembed).catch((e) => {});
                        } else {
                          lastRequestedChannel.send(facembed).catch((e) => {});
                        }
                    } else if (contents.toLowerCase().includes('outpost is under attack, go save it!')) {
                      var nonembed;
                      try {
                          var adminN = thisguild.roles.find(role => role.name === adminRoleN);
                          var trustedN = thisguild.roles.find(role => role.name === trustedRoleN);
                          var memberN = thisguild.roles.find(role => role.name === useRoleN);
                          nonembed = ':warning: **Outpost** ' + adminN + ' ' + trustedN + ' ' + memberN;
                      } catch (e) {
                          nonembed = ':warning: **Outpost** @everyone';
                      }
                      const warnembed = new Discord.RichEmbed()
                          .setColor('#F64235')
                          .setDescription('**'+content+'**')
                          .setTitle('**Outpost Under Attack**')
                          .setTimestamp();
                      outpostc.send(nonembed, warnembed).catch((e) => {});
                  } else if (contents.includes('Outpost is no longer under attack.')) {
                    const safeembed = new Discord.RichEmbed()
                        .setColor('#16C60C')
                        .setDescription('**'+content+'**')
                        .setTitle('**Outpost**')
                        .setTimestamp();

                    outpostc.send(safeembed).catch((e) => {});
                  } else if (contents.toLowerCase().match(/^\[outpost\] .*/) || contents.toLowerCase().includes('outpost:')) {
                    content = content.replace(/outpost:/g, '');
                    content = content.replace('[Outpost] » Opening outpost menu...', '');
                    const voutpost = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setDescription('```'+content+'```')
                        .setTitle('**Outpost**')
                        .setTimestamp();

                    if (contents.toLowerCase().match(/^\[outpost\] .*/)) {
                      if (server != 'karismic') {
                        if (taskActive) {
                          taskChannel.send(voutpost).catch((e) => {});
                        } else {
                          lastRequestedChannel.send(voutpost).catch((e) => {});
                        }
                      }
                    } else {
                      if (taskActive) {
                        taskChannel.send(voutpost).catch((e) => {});
                      } else {
                        lastRequestedChannel.send(voutpost).catch((e) => {});
                      }
                    }

                  }
              }
              fs.writeFile(assetsPath+'output.txt', '', err => {
                  if (err) throw err;
              });
              fs.writeFile(assetsPath+'tps.txt', '', function() {
              });
          }, 200);

          function getTime() {
              //get time function
              var time = moment(Date.now())
                  .tz(timezone)
                  .format('LT');
              var timezoneAbbr = moment.tz.zone(timezone).abbr(360);
              return time + ' ' + timezoneAbbr;
          }

          function checktimediff(cb) {
              check_time = Date.now() / 1000;
              check_time = check_time - lastcheck;
              check_time = check_time / 60;
              check_time = Math.round(check_time);
              if (typeof cb === "function") {
                cb(check_time);
              }

              return check_time;
          }

          function buffchecktimediff(cb) {
              bcheck_time = Date.now() / 1000;
              bcheck_time = bcheck_time - lastbuffercheck;
              bcheck_time = bcheck_time / 60;
              bcheck_time = Math.round(bcheck_time);
              if (typeof cb === "function") {
                cb(bcheck_time);
              }

              return bcheck_time;
          }

          var shieldRequest = false;
          function isNowShieldTime(callback) {
            var shield = c_settings.shield; //CST 24 HRS TIME

            var shieldStartHour = Number(shield.split(':')[0]);
            var shieldStartMinutes = Number(shield.split(':')[1].replace(/-.*/i, ''));

            var shieldEndHour = Number(shield.split('-')[1].split(':')[0]);
            var shieldEndMinutes = Number(shield.split('-')[1].split(':')[1]);

            var date = new Date();
            var current_hours = date.getHours();
            var current_minutes = date.getMinutes();
            if (shieldRequest) console.log('IF: '+current_hours+' is greater than or equal to '+shieldStartHour+' AND '+current_minutes+' is greater than or equal to '+shieldStartMinutes+' THEN IF '+current_hours+' is less than or equal to '+shieldEndHour+' AND '+current_minutes+' is less than or equal to '+shieldEndMinutes);
            if (current_hours >= shieldStartHour && current_minutes >= shieldStartMinutes) {
              if (current_hours <= shieldEndHour && current_minutes <= shieldEndMinutes) {
                callback(true);
              } else {
                callback(false);
              }
            } else {
              callback(false);
            }
          }

          function isExactShieldStartTime(callback) {
            var shield = c_settings.shield; //CST 24 HRS TIME

            var shieldStartHour = Number(shield.split(':')[0]);
            var shieldStartMinutes = Number(shield.split(':')[1].replace(/-.*/i, ''));

            var date = new Date();
            var current_hours = date.getHours();
            var current_minutes = date.getMinutes();

            if (current_hours == shieldStartHour && current_minutes == shieldStartMinutes) {
              callback(true);
            } else {
              callback(false);
            }
          }

          function isExactShieldEndTime(callback) {
            var shield = c_settings.shield; //CST 24 HRS TIME

            var shieldEndHour = Number(shield.split('-')[1].split(':')[0]);
            var shieldEndMinutes = Number(shield.split('-')[1].split(':')[1]);

            var date = new Date();
            var current_hours = date.getHours();
            var current_minutes = date.getMinutes();

            if (current_hours == shieldEndHour && current_minutes == shieldEndMinutes) {
              callback(true);
            } else {
              callback(false);
            }
          }

          var onlinecooldown = false;
          var bonlinecooldown = false;
          function setonlinecooldown() {
            onlinecooldown = true;
            setTimeout(function() {onlinecooldown = false;}, 120000);
          }
          function setbonlinecooldown() {
            bonlinecooldown = true;
            setTimeout(function() {bonlinecooldown = false;}, 120000);
          }
          function wallalert() {

              //No if shield is on
              if (c_settings.shieldEnabled) {
                isNowShieldTime(function(shieldOn) {
                  if (!shieldOn) {
                    wcont();
                  }
                });
              } else {
                wcont();
              }
              function wcont() {
                var alertmention;
                if (wall_checking_enabled) {
                    try {
                        thisguild = bot.guilds.get(thisguildid);
                        var adminN = thisguild.roles.find(role => role.name === adminRoleN);
                        var trustedN = thisguild.roles.find(role => role.name === trustedRoleN);
                        var memberN = thisguild.roles.find(role => role.name === useRoleN);
                        alertmessage = c_settings.alertmessage;
                        mcalertmessage = c_settings.mcalertmessage;
                        alertmessage = alertmessage.replace('{prefix}', prefix);
                        checktimediff(function(minuncheckedd) {
                          alertmessage = alertmessage.split('{time}');
                          alertmessage = alertmessage[0]+minuncheckedd+alertmessage[1];
                        });

                        if (alerttype.includes('@roles')) {
                            alertmention = adminN + ' ' + trustedN + ' ' + memberN+' ';
                        } else if (alerttype.includes('@everyone')) {
                            alertmention = '@everyone';
                        } else {alertmention='`Error in config/.env! alerttype must either be \'\@everyone\' or \'@roles\'`'}
                            //fetch last wall check msg and delete
                        if (c_settings.deleteAlerts+'' == 'true') {
                            wallchecking.fetchMessages({
                                limit: 3,
                            }).then((messages) => {
                                messages.forEach(message => {
                                    if (message.content.includes(c_settings.alertmessage.toString().split('{time}')[0])) {
                                        try {
                                            message.delete().catch((e) => {});
                                        } catch (e) {}
                                    }
                                });
                            }).catch(err => {});
                        }

                        checktimediff(function(minuncheckedd) {
                          var offset = Number(Number(wallintervalmin) + Number(c_settings.discordNotificationOffset));
                          if (minuncheckedd >= offset) {
                            wallchecking.send(':red_square: ' + alertmention + alertmessage).catch((e) => {});
                          }
                        });
                        mcalertmessage = mcalertmessage.replace('{botname}', process.env.MUSERNAME);
                        checktimediff(function(minuncheckedd) {
                          mcalertmessage = mcalertmessage.split('{time}');
                          mcalertmessage = mcalertmessage[0]+minuncheckedd+mcalertmessage[1];
                        });
                        if (mcalertmessage == 'none') { } else {
                            fs.writeFile(assetsPath+'sendchat.txt', mcalertmessage+' alt0', err => {
                                if (err) throw err;
                            });
                        }
                        //If walls over a certain time, send embed of who should be online checking
                        checktimediff(function(minuncheckedd) {
                          if (Number(minuncheckedd) > Number(c_settings.notifyOnlineAfterWallsPass)) {
                            if (onlinecooldown) {return} else {
                              setonlinecooldown();
                            }
                            mcscript.getOnline(function(onlinearray) {
                              const online = new Discord.RichEmbed()
                                  .setColor('#00E575')
                                  .setTitle('Players Online - '+getTime())
                                  .setTimestamp();

                              var onlinedesc = '';
                              var mentions = 'The following players should be checking: ';
                              var playersOnline = 0;
                              onlinearray.forEach(player => {
                                playersOnline++;
                                var theirid;
                                function getcheck(match) {
                                    theirid = match.match(/(.*):.*:.*:.*/i)[1];
                                    return match;
                                }
                                var user_regex =  new RegExp(".*:"+player+":.*:.*", "i");
                                var roptions = {
                                    files: assetsPath+'users.txt',
                                    from: user_regex,
                                    to: (match) => getcheck(match)
                                };
                                const replace = require('replace-in-file');
                                replace.sync(roptions);
                                if (theirid != undefined) {
                                  onlinedesc += '\n'+player+' (<@'+theirid+'>)';
                                  mentions += '<@'+theirid+'> ';
                                } else {
                                  onlinedesc += '\n'+player+' (?)';
                                }
                              });
                              setTimeout(function() {
                                var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').toString();
                                var whitelistCount = Math.round(whitelist.split(':').length / 3);
                                var totalOffline = whitelistCount - playersOnline;
                                if (onlinedesc.toString().trim() == '' || onlinedesc.toString().trim() == ' ') {onlinedesc = ':warning: Nobody is online!'}
                                online.setDescription(onlinedesc+'\n\nTotal Players Online: **'+playersOnline+'**\nTotal Players Offline: **'+totalOffline+'**');
                                wallchecking.send(mentions, online).catch((e) => {});
                              }, 300);
                            });
                          }
                        });
                    } catch (e) {
                        console.log(e);
                        alertmessage = c_settings.alertmessage;
                        mcalertmessage = c_settings.mcalertmessage;
                        alertmessage = alertmessage.replace('{prefix}', prefix);
                        checktimediff(function(minuncheckedd) {
                          alertmessage = alertmessage.split('{time}');
                          alertmessage = alertmessage[0]+minuncheckedd+alertmessage[1];
                        });
                        wallchecking.send(':red_square: @everyone ' + alertmessage).catch((e) => {});
                        mcalertmessage = mcalertmessage.replace('{botname}', process.env.MUSERNAME);
                        checktimediff(function(minuncheckedd) {
                          mcalertmessage = mcalertmessage.split('{time}');
                          mcalertmessage = mcalertmessage[0]+minuncheckedd+mcalertmessage[1];
                        });
                        if (mcalertmessage == 'none') { } else {
                            fs.writeFile(assetsPath+'sendchat.txt', mcalertmessage+' alt0', err => {
                                if (err) throw err;
                            });
                        }
                    }
                }
              }
          }

          function bufferalert() {

              //No if shield is on
              if (c_settings.shieldEnabled) {
                isNowShieldTime(function(shieldOn) {
                  if (!shieldOn) {
                    wcont();
                  }
                });
              } else {
                wcont();
              }

              function wcont() {
                var alertmention;
                if (buffer_checking_enabled) {
                    try {
                        thisguild = bot.guilds.get(thisguildid);
                        var adminN = thisguild.roles.find(role => role.name === adminRoleN);
                        var trustedN = thisguild.roles.find(role => role.name === trustedRoleN);
                        var memberN = thisguild.roles.find(role => role.name === useRoleN);
                        alertmessage = c_settings.bufferalertmessage;
                        mcalertmessage = c_settings.mcbufferalertmessage;
                        alertmessage = alertmessage.replace('{prefix}', prefix);
                        buffchecktimediff(function(minuncheckedd) {
                          alertmessage = alertmessage.split('{time}');
                          alertmessage = alertmessage[0]+minuncheckedd+alertmessage[1];
                        });

                        if (alerttype.includes('@roles')) {
                            alertmention = adminN + ' ' + trustedN + ' ' + memberN+' ';
                        } else if (alerttype.includes('@everyone')) {
                            alertmention = '@everyone';
                        } else {alertmention='`Error in config/.env! alerttype must either be \'\@everyone\' or \'@roles\'`'}
                            //fetch last wall check msg and delete
                        if (c_settings.deleteAlerts+'' == 'true') {
                            bufferchecking.fetchMessages({
                                limit: 3,
                            }).then((messages) => {
                                messages.forEach(message => {
                                    if (message.content.includes(c_settings.bufferalertmessage.toString().split('{time}')[0])) {
                                        try {
                                            message.delete().catch((e) => {});
                                        } catch (e) {}
                                    }
                                });
                            }).catch(err => {});
                        }
                        buffchecktimediff(function(minuncheckedd) {
                          var offset = Number(Number(bufferintervalmin) + Number(c_settings.discordNotificationOffset));
                          if (minuncheckedd >= offset) {
                            bufferchecking.send(':red_square: ' + alertmention + alertmessage).catch((e) => {});
                          }
                        });
                        mcalertmessage = mcalertmessage.replace('{botname}', process.env.MUSERNAME);
                        buffchecktimediff(function(minuncheckedd) {
                          mcalertmessage = mcalertmessage.split('{time}');
                          mcalertmessage = mcalertmessage[0]+minuncheckedd+mcalertmessage[1];
                        });
                        if (mcalertmessage == 'none') { } else {
                            fs.writeFile(assetsPath+'sendchat.txt', mcalertmessage+' alt0', err => {
                                if (err) throw err;
                            });
                        }
                        buffchecktimediff(function(minuncheckedd) {
                          if (Number(minuncheckedd) > Number(c_settings.notifyOnlineAfterBuffersPass)) {
                            if (bonlinecooldown) {return} else {
                              setbonlinecooldown();
                            }
                            mcscript.getOnline(function(onlinearray) {
                              const online = new Discord.RichEmbed()
                                  .setColor('#00E575')
                                  .setTitle('Players Online - '+getTime())
                                  .setTimestamp();

                              var onlinedesc = '';
                              var mentions = 'The following players should be checking: ';
                              var playersOnline = 0;
                              onlinearray.forEach(player => {
                                playersOnline++;
                                var theirid;
                                function getcheck(match) {
                                    theirid = match.match(/(.*):.*:.*:.*/i)[1];
                                    return match;
                                }
                                var user_regex =  new RegExp(".*:"+player+":.*:.*", "i");
                                var roptions = {
                                    files: assetsPath+'users.txt',
                                    from: user_regex,
                                    to: (match) => getcheck(match)
                                };
                                const replace = require('replace-in-file');
                                replace.sync(roptions);
                                if (theirid != undefined) {
                                  onlinedesc += '\n'+player+' (<@'+theirid+'>)';
                                  mentions += '<@'+theirid+'> ';
                                } else {
                                  onlinedesc += '\n'+player+' (?)';
                                }
                              });
                              setTimeout(function() {
                                var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').toString();
                                var whitelistCount = Math.round(whitelist.split(':').length / 3);
                                var totalOffline = whitelistCount - playersOnline;
                                if (onlinedesc.toString().trim() == '' || onlinedesc.toString().trim() == ' ') {onlinedesc = ':warning: Nobody is online!'}
                                online.setDescription(onlinedesc+'\n\nTotal Players Online: **'+playersOnline+'**\nTotal Players Offline: **'+totalOffline+'**');
                                bufferchecking.send(mentions, online).catch((e) => {});
                              }, 300);
                            });
                          }
                        });
                    } catch (e) {
                        alertmessage = c_settings.bufferalertmessage;
                        mcalertmessage = c_settings.mcbufferalertmessage;
                        alertmessage = alertmessage.replace('{prefix}', prefix);
                        buffchecktimediff(function(minuncheckedd) {
                          alertmessage = alertmessage.split('{time}');
                          alertmessage = alertmessage[0]+minuncheckedd+alertmessage[1];
                        });
                        bufferchecking.send(':red_square: @everyone ' + alertmessage).catch((e) => {});
                        mcalertmessage = mcalertmessage.replace('{botname}', process.env.MUSERNAME);
                        buffchecktimediff(function(minuncheckedd) {
                          mcalertmessage = mcalertmessage.split('{time}');
                          mcalertmessage = mcalertmessage[0]+minuncheckedd+mcalertmessage[1];
                        });
                        if (mcalertmessage == 'none') { } else {
                            fs.writeFile(assetsPath+'sendchat.txt', mcalertmessage+' alt0', err => {
                                if (err) throw err;
                            });
                        }
                    }
                }
              }
          }

          function removeApplication(removedItem) {
            var cache = openApplications;
            openApplications = [];
            cache.forEach(item => {
              if (item != removedItem) {
                openApplications.push(item);
              }
            });
            cache = [];
          }

          function addQuestionNumber(addedItem) {
            var cache = openApplications;
            openApplications = [];
            cache.forEach(item => {
              if (item == addedItem) {
                var userId = item.split(':')[0];
                var question = Number(item.split(':')[1]);
                var newItem = userId+':'+Number(question + 1);
                openApplications.push(newItem);
              } else {
                openApplications.push(item);
              }
            });
            cache = [];
          }

          var applycooldown = false;
          function setapplycooldown() {
            applycooldown = true;
            setTimeout(function() {
              applycooldown = false;
            }, 1500);
          }

          var userApps = []; //After restart this will be cleared, but if the bot restarts in the middle of an application... L

          function addQuetionDataToUser(questionNumber, question, answer, userId) {
            if(!userApps.some(user => user.id === userId+'')) {
              //User didnt extist in json, create them.
              var userJson = {
                "id": userId
              }
              userApps.push(userJson);
              next();
            } else {
              next();
            }

            function next() {
              userApps.forEach(app => {
                if (app.id+'' == userId) {
                  //We have their existing app so add q data.
                  app[questionNumber+"@*@"+question] = answer+"";
                }
              });
            }
          }

          function removeApplicationData(userId) {
            userApps.forEach(app => {
              if (app.id+'' == userId+'') {
                //Delete user app data
                delete userApps[userApps.indexOf(app)];
              }
            });
          }

          function toggleSetting(setting, cb) {
            var state = (settingsFile.get(setting) == true) ? false : true;
            settingsFile.set(setting, state);
            reloadSettings();
            cb(state);
          }

          function setSetting(setting, string, cb) {
            settingsFile.set(setting, string);
            reloadSettings();
            cb();
          }

          bot.on('raw', packet => {
            if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
            const channel = bot.channels.get(packet.d.channel_id);
            if (channel.messages.has(packet.d.message_id)) return;
            channel.fetchMessage(packet.d.message_id).then(message => {
                const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
                const reaction = message.reactions.get(emoji);
                try {
                  if (reaction) reaction.users.set(packet.d.user_id, bot.users.get(packet.d.user_id));
                  if (packet.t === 'MESSAGE_REACTION_ADD') {
                      bot.emit('messageReactionAdd', reaction, bot.users.get(packet.d.user_id));
                  }
                  if (packet.t === 'MESSAGE_REACTION_REMOVE') {
                      bot.emit('messageReactionRemove', reaction, bot.users.get(packet.d.user_id));
                  }
                } catch (e) {}
            });
          });

          bot.on('messageReactionAdd', (reaction, user) => {
            try {
              if (user.bot) {return}
              if (!thisguild) {return}
              var appsChannel = thisguild.channels.find(channel => channel.name === process.env.applicationChannel+'');
              if (!reaction.emoji) return;

              if (reaction.emoji == '✅') { //❌ ✅
                if (reaction.message.embeds[0] != undefined) {
                  if (!reaction.message.embeds[0].footer.text) return;

                  if (reaction.message.embeds[0].footer.text.toString().includes('Application by')) {
                    var appId = reaction.message.embeds[0].footer.text.toString().match(/\(([0-9]*)\)/)[1];
                    const app = require(assetsPath+'applicationquestions.json');
                    bot.fetchUser(appId+'', false).then(auser => {
                      const appAccepted = new Discord.RichEmbed()
                        .setTitle(app.applicationAccepted.embedTitle+'')
                        .setThumbnail(app.applicationAccepted.thumbnailURL+'')
                        .setColor(app.applicationAccepted.embedHexColor+'')
                        .setDescription(app.applicationAccepted.description+'');
                        if (app.applicationAccepted.timestampSet) {appAccepted.setTimestamp()}
                      auser.send(appAccepted).catch((e) => {});
                      //Add the role to user..
                      if (c_settings.acceptedRole != '' && c_settings.acceptedRole != ' ') {
                        thisguild.members.forEach(member => {
                          if (member.id+'' == appId+'') {
                            try {
                              c_settings.acceptedRole.toString().split('-').forEach(role => {
                                if (role != undefined && role != "") {
                                  var acceptedRole = thisguild.roles.find(r => r.id === role);
                                  member.addRole(acceptedRole);
                                }
                              });
                              c_settings.acceptedRemovedRoles.toString().split('-').forEach(role => {
                                if (role != undefined && role != "") {
                                  var acceptedRole = thisguild.roles.find(r => r.id === role);
                                  member.removeRole(acceptedRole);
                                }
                              });
                            } catch (e) {}
                          }
                        });
                      }
                      reaction.message.reactions.forEach(re => {re.remove()});
                      appsChannel.send('[:white_check_mark:] '+user.tag+' accepted '+reaction.message.embeds[0].footer.text.toString().match(/Application by (.*) \(/)[1]+' ('+getTime()+')').catch((e) => {console.log(e)});
                    });
                  }
                }
              } else if (reaction.emoji == '❌') {
                if (reaction.message.embeds[0] != undefined) {
                  if (reaction.message.embeds[0].footer.text.toString().includes('Application by')) {
                    var appId = reaction.message.embeds[0].footer.text.toString().match(/\(([0-9]*)\)/)[1];
                    const app = require(assetsPath+'applicationquestions.json');
                    bot.fetchUser(appId+'', false).then(auser => {
                      const appDenied = new Discord.RichEmbed()
                        .setTitle(app.applicationDenied.embedTitle+'')
                        .setThumbnail(app.applicationDenied.thumbnailURL+'')
                        .setColor(app.applicationDenied.embedHexColor+'')
                        .setDescription(app.applicationDenied.description+'');
                        if (app.applicationDenied.timestampSet) {appDenied.setTimestamp()}
                      auser.send(appDenied).catch((e) => {});

                      appsChannel.send('[:x:] '+user.tag+' denied '+reaction.message.embeds[0].footer.text.toString().match(/Application by (.*) \(/)[1]+' ('+getTime()+')').catch((e) => {});
                      if (c_settings.deleteDeniedApps+'' == 'true' && reaction.emoji == '❌') {
                        try {
                          reaction.message.delete().catch((e) => {});
                        } catch (e) {}
                      } else {
                        reaction.message.reactions.forEach(reactionz => {reactionz.remove();});reaction.message.reactions.forEach(reactionz => {reactionz.remove();});
                      }
                    });
                  }
                }
              }
            } catch (e) {}
          });

          bot.on('message', message => {
              if (!fstream_enabled) {return}
              if (message.channel.type == "dm") {
                currentAwayForms.forEach(id => {
                  if (id+'' == message.author.id+'') {
                    //User had an away form open
                    if (message.content.toString().toLowerCase().trim() == 'cancel') {
                      currentAwayForms.forEach(id => {
                        currentAwayForms = [];
                        if (id+'' != message.author.id+'') {
                          currentAwayForms.push(id);
                        }
                      });
                      message.channel.send(':ok_hand: Cancelled your away form.').catch((e) => {});
                    } else {
                      //Some message sent, assume its for the form and send to away channel.
                      if (message.content.length > 700) {
                        return message.channel.send(':x: That message is too big, please try with a smaller message.').catch((e) => {});
                      }
                      const awayform = new Discord.RichEmbed()
                          .setColor('#ede61a')
                          .setTitle('Away Form - '+message.author.tag)
                          .setDescription('Away form received from '+message.author.tag+' ('+message.author.id+')\n\n```\n'+message.content+'```')
                          .setTimestamp();
                      awaychannel.send(awayform).then(msg => {
                        currentAwayForms.forEach(id => {
                          currentAwayForms = [];
                          if (id+'' != message.author.id+'') {
                            currentAwayForms.push(id);
                          }
                        });
                        message.channel.send(':white_check_mark: Sent your away form to the #away channel.').catch((e) => {});
                      }).catch((e) => {console.log(e)
                        message.channel.send(':x: Error: ``'+e+'``').catch((e) => {});
                      });

                    }
                  }
                });

                //APPLICATIONS
                openApplications.forEach(item => {
                  var userId = item.split(':')[0];
                  var question = Number(item.split(':')[1]);

                  if (message.author.id+'' == userId+'') {
                    if (message.content.toString().toLowerCase().trim() == 'cancel') {
                      removeApplication(item);
                      removeApplicationData(message.author.id+"");
                      return message.channel.send(':ok_hand: Cancelled your application.').catch((e) => {});
                    } else {
                      //We got a reply to a question, and we have the question number.
                      var answer = message.content.toString();

                      //Make sure it wasnt spam
                      if (answer.length > 800) {
                        return message.channel.send(':astonished: Please limit your answers to less than 800 characters each.').catch((e) => {});
                        //Once they sand again question should handle and send next q
                      }
                      const app = require(assetsPath+'applicationquestions.json');
                      //Answer was good, log it somehow and then below this moves on to next question
                      //Save answer for that users app...
                      addQuetionDataToUser(question, app.questions[question-1].question+'', answer, message.author.id+'');

                      //Send next question.
                      var totalQuestions = 0;
                      app.questions.forEach(question => {
                        totalQuestions++;
                      });

                      if (question >= totalQuestions) {
                        //Finished last question
                        const appFinishedEmbed = new Discord.RichEmbed()
                          .setTitle(app.applicationFinished.embedTitle+'')
                          .setThumbnail(app.applicationFinished.thumbnailURL+'')
                          .setColor(app.applicationFinished.embedHexColor+'')
                          .setDescription(app.applicationFinished.description+'');
                          if (app.applicationFinished.timestampSet) {appFinishedEmbed.setTimestamp()}
                        //Submit app.

                        var appsChannel = thisguild.channels.find(channel => channel.name === process.env.applicationChannel+'');

                        if (!appsChannel) {
                          message.channel.send(':x: Sorry, your app was not submitted, the application channel was not found. Please contact an admin on the server, they need a text channel specifically named "'+process.env.applicationChannel+'"!').catch((e) => {});
                        } else {

                          const application = new Discord.RichEmbed()
                            .setTitle(message.author.tag+'\'s Application. '+getTime())
                            .setColor(app.applicationSent.color+'')
                            .setTimestamp();

                          userApps.forEach(app => {
                            if (app.id+'' == message.author.id+'') {
                              //We have their app object.

                              Object.keys(app).forEach(function(key) {
                                  var question = key;
                                  var answer = app[key];

                                  if (question.replace(/..?@\*@/, '').toString() != 'id') {
                                    if (answer.toString().trim() == '' || answer.toString().trim() == ' ') {
                                      answer = '(Blank character was used, or attachment uploaded)';
                                    }
                                    application.addField(question.replace(/.@\*@/, ''), answer);
                                  }
                              });

                              application.setFooter('Application by '+message.author.tag+' ('+message.author.id+')')
                            }
                          });

                          //Send in apps channel
                          appsChannel.send(application).then(msg => {
                            msg.react('✅').then(r => {
                              msg.react('❌');
                            });
                            message.author.send(appFinishedEmbed).then(msg => {
                            }).catch((e) => {});
                          }).catch((e) => {
                            message.author.send(':x: Something went wrong, please contact an admin on the server. ``'+e+'``').then(msg => {
                            }).catch((e) => {});
                          });
                          //Remove user from current apps
                          removeApplication(item);
                          //Remove user json..
                          removeApplicationData(message.author.id+"");
                        }
                      } else {
                        const appQuestion = new Discord.RichEmbed()
                          .setTitle(app.questions[question].question+'')
                          .setColor(app.questions[question].color+'')
                          if (app.questions[question].timestampSet) {appQuestion.setTimestamp()}
                        message.author.send(appQuestion).then(msg => {
                          addQuestionNumber(item);
                        }).catch(() => {
                          removeApplication(item);
                        });
                      }
                    }
                  }
                });

              } else {
                  if (message.content.toString().toLowerCase().trim() == '<@'+bot.user.id+'> help' || message.content.toString().toLowerCase().trim() == '<@'+bot.user.id+'>' || message.content.toString().toLowerCase().trim() == '<@'+bot.user.id+'> prefix' || message.content.toString().toLowerCase().trim() == '<@!'+bot.user.id+'> help' || message.content.toString().toLowerCase().trim() == '<@!'+bot.user.id+'>' || message.content.toString().toLowerCase().trim() == '<@!'+bot.user.id+'> prefix') {
                    if (message.guild.id+'' == thisguildid+'') {
                      message.reply('Hello, my prefix is ``'+prefix+'`` use ``'+prefix+'help`` for a list of commands.');
                    } else {
                      message.reply(':exclamation: This guild id and the one set in .env guildId= do not match! Please change to ``'+message.guild.id+'``! Prefix is : ``'+prefix+'``');
                    }
                  }

                  if (message.guild.id+'' == thisguildid+'') {
                      //COMMANDS

                      if (message.content == prefix + 'restart') {
                          //restart command
                          message.delete().catch((e) => {console.log(e)});

                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              message.reply('Restarting...').then(() => {
                                  console.log('Restarting (Requested from discord by '+message.author.tag+')...');
                                  fs.writeFile(assetsPath+'restart.txt', '.', function() {});
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }
                      //safe command
                      if (message.content == prefix + 'safe') {
                          if (weewoocmd == 0) {
                              message.reply('No weewoo is ocurring.');
                          } else {
                              if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                                  weewoocmd = 0;
                                  wall_checking_enabled = c_settings.wallchecks;
                                  buffer_checking_enabled = c_settings.bufferchecks;

                                  message.delete().catch((e) => {});
                                  clearInterval(winterval);
                                  clearInterval(wiinterval);
                                  message.channel.send('Raid declared safe by '+message.author).catch((e) => {});
                              } else if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                                  wall_checking_enabled = c_settings.wallchecks;
                                  buffer_checking_enabled = c_settings.bufferchecks;
                                  clearInterval(winterval);
                                  clearInterval(wiinterval);
                                  message.delete().catch((e) => {});
                                  weewoocmd = 0;
                                  message.channel.send('Raid declared safe by '+message.author).catch((e) => {});
                              } else {
                                  message.channel.send(noaccess).catch((e) => {});
                              }
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'weewoo') {
                          let userVar = message.author;
                          //weewoo command
                          message.delete().catch((e) => {});
                          if (weewoocmd == 1) {
                              message.reply('Weewoo is already ocurring!');
                          } else if (message.member.roles.find(role => role.name === adminRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              weewoocmd = 1;
                              wall_checking_enabled = false;
                              buffer_checking_enabled = false;
                              weewooChannel = bot.channels.find(channel => channel.name === process.env.weewooChannel+'');
                              try {
                                logsc = getC('logs') || bot.channels.find(channel => channel.name === 'logs');
                                logsc.send('Weewoo broadcast was enabled by ' + userVar).catch((e) => {console.log(e)});
                              } catch (e) {
                                    console.log(getTime()+' Could not post weewoo message in #logs for some reason. Weewoo was enabled by: '+message.author.id+' '+message.member.user.tag);
                              }

                              if (message.content.replace(message.content.split(' ')[0]+' ', '').length > 130) {
                                  return message.reply(':x: That weewoo message is too long!');
                              }

                              let mcweewoomsg = message.content.replace(message.content.split(' ')[0]+' ', '').length > 10 ? message.content.replace(message.content.split(' ')[0]+' ', '') : c_settings.mcweewoomsg;

                              mcweewoomsg = mcweewoomsg.replace('{botname}', process.env.MUSERNAME+'');
                              wiinterval = setInterval(function() {
                                if (mcweewoomsg.toString().toLowerCase().trim() != 'none' && mcweewoomsg.toString().trim() != ' ') {
                                  fs.writeFile(assetsPath+'sendchat.txt', mcweewoomsg+' alt0', err => {
                                      if (err) throw err;
                                  });
                                }
                              }, c_settings.minecraftweewoointerval);

                              winterval = setInterval(function() {
                                  try {
                                      var adminN = message.guild.roles.find(role => role.name === adminRoleN);
                                      var trustedN = message.guild.roles.find(role => role.name === trustedRoleN);
                                      var memberN = message.guild.roles.find(role => role.name === useRoleN);
                                      var discordweewoomsg = c_settings.weewoomsg;
                                      discordweewoomsg = message.content.replace(message.content.split(' ')[0]+' ', '').length > 10 ? message.content.replace(message.content.split(' ')[0]+' ', '') : discordweewoomsg.replace('{prefix}', prefix);
                                      weewooChannel.send(':rotating_light: ' + adminN + ' ' + trustedN + ' ' + memberN + ' | '+discordweewoomsg).catch((e) => {console.log(e)});
                                  } catch (e) {
                                      weewooChannel.send(':rotating_light: @everyone | Get on we are being raided!').catch((e) => {console.log(e)});
                                  }
                              }, c_settings.weewoointerval);
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix+'rotate') {
                         message.delete().catch((e) => {});
                         if (message.member.roles.find(role => role.name === rotateRoleN)) {
                         if (message.content.toLowerCase().split(' ')[1] === undefined || message.content.toLowerCase().split(' ')[2] === undefined) {
                           return message.reply(':x: Incorrect arguments, ``'+prefix+'rotate <@user> <@user>`` Users must be whitelisted. First user gets kicked, second invited. ``'+prefix+'whitelist``.');
                         } else {
                           if (message.mentions.members.first()) {
                             try {
                               var kickedUser = message.mentions.members.first().id+'';
                               var rotatedUser = message.content.toLowerCase().split(' ')[2].match(/<@!?(.*)>/);
                               rotatedUser = rotatedUser[1];

                               var kickedUserIgn;
                               var rotatedUserIgn;

                               if (bot.users.get(rotatedUser)) {
                                 message.reply(':white_check_mark: Attempting to rotate the users.');
                                 var whitelistusers = fs.readFileSync(assetsPath+'users.txt', 'utf8');
                                 if (whitelistusers.toString().includes(kickedUser) && whitelistusers.toString().includes(rotatedUser)) {

                                   function getUsername(discordId) {
                                     var replace = require('replace-in-file');
                                     var returnIgn;

                                     function getuser(match) {
                                       returnIgn = match.match(/.*:(.*):.*:.*/i);
                                       returnIgn = returnIgn[1];
                                       return match;
                                     }
                                     var user_regex =  new RegExp(discordId+":.*:.*:.*", "i");
                                     var roptions = {
                                       files: assetsPath+'users.txt',
                                       from: user_regex,
                                       to: (match) => getuser(match)
                                     };
                                     replace.sync(roptions);

                                     return returnIgn+'';
                                   }

                                   kickedUserIgn = getUsername(kickedUser);
                                   rotatedUserIgn = getUsername(rotatedUser);

                                   var kickCommand = '/f kick '+kickedUserIgn+' alt0';
                                   var inviteCommand = '/f invite '+rotatedUserIgn+' alt0';

                                   if (server == 'custom') {
                                     kickCommand = c_config.fKickCommand.toString().replace('%user%', kickedUserIgn)+' alt0';
                                     inviteCommand = c_config.fInviteCommand.toString().replace('%user%', rotatedUserIgn)+' alt0';
                                   }

                                   fs.appendFile(assetsPath+'sendchat.txt', '/f kick '+kickedUserIgn+' alt0', err => {
                                     if (err) throw err;
                                     setTimeout(function() {
                                       fs.appendFile(assetsPath+'sendchat.txt', '/f invite '+rotatedUserIgn+' alt0', err => {
                                         if (err) throw err;
                                         const rotateU = new Discord.RichEmbed()
                                           .setColor('#f052f2')
                                           .setTitle('Rotation')
                                           .addField('User Kicked:', message.mentions.members.first()+' - ``'+kickedUserIgn+'``')
                                           .addField('User Rotated In:', '<@'+rotatedUser+'> - ``'+rotatedUserIgn+'``')
                                           .addField('Rotated By', message.author+'')
                                           .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png')
                                           .setTimestamp();
                                         message.channel.send(rotateU).catch((e) => {console.log(e)});
                                         try {
                                           logsc = getC('logs') || thisguild.channels.find(channel => channel.name === 'logs');
                                           logsc.send(rotateU).catch((e) => {console.log(e)});
                                         } catch (e) {return console.log('ERROR! Logs channel not found!');}
                                       });
                                   }, 800);
                                   });
                                 } else {
                                   return message.reply(':x: One of the users mentioned was not whitelisted/linked to discord!');
                                 }
                               } else {
                                 return message.reply(':x: Incorrect arguments, ``'+prefix+'rotate <@user> <@user>`` Users must be whitelisted. First user gets kicked, second invited. ``'+prefix+'whitelist``.');
                               }
                             } catch (e) {
                               message.reply(':x: Error: ``'+e+'``');
                             }
                           }
                         }
                       } else {
                         message.channel.send(noaccess).catch((e) => {});
                       }
                       }

                       if (message.content.toLowerCase().split(' ')[0] == prefix+'shield') {
                         message.delete().catch((e) => {});
                         if (message.member.roles.find(role => role.name === adminRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === useRoleN)) {
                           var arg = message.content.toLowerCase().trim().split(' ')[1];
                           if (arg === undefined) {
                             //Get shield info
                             message.channel.send('Tip: Use '+prefix+'shield help for more info on the shield command.');
                             shieldRequest = true;
                             setTimeout(function() {
                               shieldRequest = false;
                             }, 1000);
                             isNowShieldTime(function(shieldOn) {
                               if (shieldOn) {
                                 message.channel.send(':shield: Our shield is currently on. Shield times are: '+c_settings.shield.split('-')[0]+' to '+c_settings.shield.split('-')[1]+'.');
                               } else {
                                 message.channel.send(':x: Our shield is currently disabled! Shield times are: '+c_settings.shield.split('-')[0]+' to '+c_settings.shield.split('-')[1]+'.');
                               }
                               if (!c_settings.shieldEnabled) {
                                 message.channel.send(':warning: Please note that shield toggle is set to false. Walls/buffers will NOT disable during shield times unless this is changed.');
                               }
                             });
                           } else if (arg == 'set') {
                             if (message.member.roles.find(role => role.name === adminRoleN)) {
                               var time = message.content.toLowerCase().trim().split(' ')[2];
                               if (time === undefined) {
                                 message.reply('Invalid args: ``'+prefix+'shield set <24Hrtime>-<24Hrtime> | shield toggle\nExample: ``'+prefix+'shield set 20:30-10:30 (10:30PM-10:30AM)\n:warning: Timezone must be the host PC\'s system time!');
                               } else {
                                 // 00:00AM-00:00PM
                                 if (time.match(/[0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9]/i)) {
                                   setSetting('shield', time, function() {
                                     message.reply(':white_check_mark: Shield times have been set to ``'+time+'``. Wall & buffer checks will be disabled during this time. Taking affect next restart!');
                                   });
                                 } else {
                                   message.reply('Invalid args: ``'+prefix+'shield set <24Hrtime>-<24Hrtime> | shield toggle\nExample: ``'+prefix+'shield set 20:30-10:30 (10:30PM-10:30AM)\n:warning: Timezone must be the host PC\'s system time!');
                                 }
                               }
                             } else {
                               message.channel.send(noaccess).catch((e) => {});
                             }
                           } else if (arg == 'toggle') {
                             if (message.member.roles.find(role => role.name === adminRoleN)) {
                               toggleSetting('shieldEnabled', function(state) {
                                 message.reply(':white_check_mark: Disabling walls/buffers during shield time is now **'+state+'**! This may require a restart to take affect.');
                               });
                             } else {
                               message.channel.send(noaccess).catch((e) => {});
                             }
                           } else {
                             message.reply('Invalid args: ``'+prefix+'shield set <timeAM/PM>-<timeAM/PM> | shield toggle\nExample: ``'+prefix+'shield set 10:30PM-10:30AM`` \n:warning: Timezone must be the host PC\'s system time!');
                           }
                         } else {
                           message.channel.send(noaccess).catch((e) => {});
                         }
                       }

                      if (message.content == prefix + 'help') {
                          //Help command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              const help = new Discord.RichEmbed()
                                  .setColor('#5E34B0')
                                  .setTitle(bot.user.username+' - Help Page #1')
                                  .setThumbnail(bot.user.avatarURL)
                                  .setTimestamp()

                                  help.addField(prefix + '**settings**', 'List of commands for **' + adminRoleN + "** only")

                                  help.addField(prefix + 'restart', 'Restarts the whole bot - ' + '**' + adminRoleN + '**' + ' only. Fixes most errors. ')

                                  help.addField(prefix + 'bal *username*', 'Gets current balance of a player.')

                                  if (server == 'cosmic') {
                                    help.addField(prefix + 'ftop', 'Gets current top 10 factions point value.')
                                    help.addField(prefix + 'fwealth', 'Gets current top 10 factions wealth value.')
                                    help.addField(prefix + 'autoftop <minutes>', 'Posts f-top every set minutes.')
                                    help.addField(prefix + 'autofwealth <minutes>', 'Posts f-wealth every set minutes.')
                                  } else {
                                    help.addField(prefix + 'ftop', 'Gets current top 10 factions on f-top.')
                                    help.addField(prefix + 'autoftop <minutes>', 'Posts f-top every set minutes.')
                                  }

                                  help.addField(prefix + 'fwho *faction*', 'Gets /f who info on a faction.')

                                  help.addField(prefix + 'weewoo [message]', 'Spams @ ' + '**' + useRoleN + '**' + ', @ ' + '**' + adminRoleN + '**' + ', and @ ' + '**' + trustedRoleN + '**' + ' that we are getting raided. -- ' + '**' + trustedRoleN + '**' + ' and ' + '**' + adminRoleN + '**' + ' only.')

                                  help.addField(prefix + 'safe', 'Stops the spam from the weewoo command, ' + '**' + trustedRoleN + '**' + ' and ' + '**' + adminRoleN + '**' + ' only.')

                                  help.addField(prefix + 'sendchat *message*', 'Makes the bot or an alt run any command. **' + adminRoleN +'** only.')

                                  help.addField(prefix + 'whitelist self | whitelist remove IGN | whitelist add @user IGN | whitelist list | whitelist clear | whitelist prune','Adds/removes user to/from the ingame whitelist for wall checks, ' + '**' + trustedRoleN + '**' + ' and ' + '**' + adminRoleN + '**' + ' only. Use '+prefix+'whitelist self to send yourself a key. Whitelist prune will remove all users on the whitelist that are not in the discord.')

                                  if (server == 'cosmic') {
                                    help.addField(prefix + 'find [username]', 'Finds what server a player is on. -Finds the bot username if none is set.')

                                    help.addField(prefix + 'autofind <add/remove> <username>, autofind [list], autofind [toggle]', 'Auto Finds what server a player is on (On cosmic) every 10m and posts to find channel. **CASE SENSITIVE**')
                                  }

                                  help.addField(prefix + 'connect', 'Forces the bot to run ``'+joincommand+'``')

                                  help.addField(prefix +'flist [page]', 'Shows faction online list.')

                                  if (server == 'cosmic') {
                                    help.addField(prefix +'list', 'Shows online player count')
                                  }

                                  if (server == 'cosmic' || server == 'archon') {
                                    help.addField(prefix +'raid', 'Shows the /raid menu for automatic raid events. Also ``'+prefix+'raid toggle``, to toggle alerts')
                                  }

                                  if (server == 'cosmic') {
                                    help.addField(prefix +'outpost', 'Shows outpost info. **OR outpost toggle** to turn off attack alerts!')

                                    help.addField(prefix +'sh/stronghold', 'Shows stronghold info, or '+prefix+'sh set <faction> to monitor stronghold for that faction, '+prefix+'sh toggle to toggle stronghold monitoring.')
                                  }

                                  if (server != 'cosmic') {
                                    help.addField(prefix +'outpost', 'Shows outpost info. **OR outpost toggle** to turn off attack alerts!')
                                  }

                                  help.addField(prefix +'broadcast <@role> <message>', 'Broadcasts the message you set by private messaging every user that has the role specified. **'+adminRoleN+'** only.')

                                  help.addField(prefix + 'purge <amount>', 'Delete the set amount of messages. **' + adminRoleN + "** only")

                                  help.addField(prefix + 'mute/unmute <@user>', 'Mute the specified user on every channel.')

                                  help.addField(prefix + 'say <#channel> <message>', 'Bot repeats the message in the mentioned channel. **' + adminRoleN + '** only.')

                                  help.addField(prefix + 'checked', 'Marks the walls or buffers as checked, depending on if in the buffers or walls channel.')

                              const help2 = new Discord.RichEmbed()
                                  .setColor('#5E34B0')
                                  .setTitle(bot.user.username+' - Help Page #2')
                                  .setTimestamp()

                                  help2.addField(prefix + '<wall/buffer>checks set @user #', 'Sets a users wall check count. **'+adminRoleN+'** only.')

                                  help2.addField(prefix + 'reset', 'Resets all wall check stats to 0, all deposits, and all playtime.' + '**' + adminRoleN + '**' + ' only.')

                                  help2.addField(prefix + 'leaderboard <walls/buffers/deposits/playtime> [page]', 'Shows top check stats or top money deposits or playtimes.')

                                  help2.addField(prefix + 'view @user', 'Shows user information like wall/buffer checks, username, deposits.')

                                  help2.addField(prefix + 'pay IGN Amount', 'Ingame bot pays the user, **'+bankRoleN+'** only.')

                                  help2.addField(prefix + 'tracker add IGN or tracker remove IGN or tracker list or tracker toggle','Adds/removes user to/from the player tracker (join & leave messages | Works on cosmic), ' + '**' + trustedRoleN + '**' + ' and ' + '**' + adminRoleN + '**' + ' only. Messages go in #ingame-chat channel.')

                                  help2.addField(prefix + 'away', 'Sends you an away form to fill out. Will be posted in the #away channel.')

                                  help2.addField(prefix + 'online', 'Gets how many whitelisted users are online or offline.')

                                  help2.addField(prefix + 'apply', 'Creates an application for you to fill out in DMs.')

                                  help2.addField(prefix + 'appq <add> <question> | appq remove <questionNumber> | appq set <questionNumber> <newQuestion> | appq list', 'Add, remove, and edit application questions. **'+adminRoleN+'** only.')

                                  help2.addField(prefix + 'deposits reset | deposits set <@user> <amount>', 'Reset all deposit data, or set a users amount deposited.')

                                  help2.addField(prefix + 'rotate <@user> <@user>', 'Kicks the first set user and invites the second set user to the facion if they are both whitelisted. **' + rotateRoleN + '**' + ' only.')

                                  if (server != 'cosmic' && server != 'manacube') {
                                    help2.addField(prefix + 'grace', 'Gets how long until the grace period is over, if it is enabled and your server has a command for it.')
                                  }

                                  help2.addField(prefix + 'shield | shield <set> <00:00-00:00> | shield toggle', 'Check if shield is on, or set your shield times (24 hr timezone must be the host PC\'s system time!). Toggle if buffers/walls disable on shield enable with shield toggle. **' + adminRoleN + '**' + ' only. ('+useRoleN+' and up can use '+prefix+'shield command to check shield time) http://ultimatebot.pw/documentation#shield')

                                  help2.addField(prefix + 'task list | task <remove> <id> | task <add> <interval> <returnsOutput> <command>', 'Manage automated tasks. **' + adminRoleN + '**' + ' only.')

                                  help2.addField(prefix+'reactions <messageLink>', 'Gets a list of whitelisted users that didnt react to the set message.')

                                  help2.addField(prefix+'c <name> <#channel>', 'Sets a custom channel for the bot. **'+adminRoleN+'** only.')

                                  help2.setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png');

                              message.channel.send(help).catch((e) => {});
                              message.channel.send(help2).catch((e) => {});
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix+'reactions') {
                        // /reactions <messageLink> 
                        message.delete().catch((e) => {});
                        if (message.member.roles.find(role => role.name === adminRoleN) || message.member.roles.find(role => role.name === trustedRoleN)) {
                          let msgLink = message.content.toString().trim().split(' ')[1];

                          if (!msgLink) {
                            message.reply(':x: Invalid args. `'+prefix+'reactions <messageLink>` Get message link by hovering over the message, click the 3 dots on the left and click Copy Message Link.');
                          } else {
                            if (msgLink.toString().match(/.*\.com\/channels\/.*\/.*/i)) {
                              let channelId = msgLink.split('/')[5];
                              let messageId = msgLink.split('/')[6];

                              let reactionChannel = bot.channels.get(channelId);

                              if (!reactionChannel) {
                                return message.reply(':x: That channel id was not found. Make sure the bot has permissions to view it.');
                              }

                              reactionChannel.fetchMessage(messageId).then(targetMsg => {
                                if (!targetMsg) {
                                  message.reply(':x: That message was not found. It may have been deleted.');
                                } else {
                                  let reacted = [];
                                  targetMsg.reactions.forEach(reaction => {
                                    reaction.fetchUsers().then(users => {
                                      users.forEach(user => {
                                        if (!(reacted.includes(user.id))) {
                                          reacted.push(user.id);
                                        }
                                      });
                                    });
                                  });

                                  setTimeout(function() {
                                    //Now have an array with each user id that reacted.
                                    let whitelistIds = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/(.*):.*:.*:.*\r?\n/);
                                    let notReacted = [];

                                    whitelistIds.forEach(id => {
                                      if (id.length > 2) {
                                        if (!reacted.includes(id)) {
                                          notReacted.push(id);
                                        }
                                      }
                                    });

                                    let didntReact = '';

                                    notReacted.forEach(user => {
                                      didntReact += '<@'+user+'>\n';
                                    });

                                    //Now have an array list of ids that DIDNT react and ARE whitelisted 
                                    const notReactedEmbed = new Discord.RichEmbed()
                                      .setTitle('Didn\'t React:')
                                      .setColor('#de2a2a')
                                      .setDescription('The following **whitelisted** users didn\'t react to the set message:\n'+didntReact);

                                    message.channel.send(notReactedEmbed).catch((e) => {});
                                  }, 500);
                                }
                              });
                            } else {
                              message.reply(':x: That is an invalid message link. Get message link by hovering over the message, click the 3 dots on the left and click Copy Message Link.');
                            }
                          }
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix+'autoftop') {
                        if (message.member.roles.find(role => role.name === adminRoleN) || message.member.roles.find(role => role.name === trustedRoleN)) {
                          if (message.content.split(' ')[1] === undefined || isNaN(message.content.split(' ')[1]) || message.content.split(' ')[1].toString().includes('/') || message.content.split(' ')[1].toString().includes('.') || message.content.split(' ')[1].toString().includes('*') || message.content.split(' ')[1].toString().includes('+')) {
                            message.reply(':x: Please use autoftop to set the interval in minutes which ftop is posted. ``'+prefix+'autoftop <minutes>`` and ``'+prefix+'toggle ftop`` to toggle it.');
                          } else {
                            var time = Number(message.content.split(' ')[1]);
                            if (time < 10) {
                              message.reply('Time should be greater than or equal to 10 minutes at minumum.');
                            } else if (time > 2540) {
                              message.reply('That time is too large.');
                            } else {
                              setSetting("ftopinterval", time*60*1000, function() {
                                message.reply(':white_check_mark: Ftop will now be posted every '+time+' minutes. Taking affect after next '+prefix+'restart');
                              });
                            }
                          }
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix+'autofwealth' && server == 'cosmic') {
                        if (message.member.roles.find(role => role.name === adminRoleN) || message.member.roles.find(role => role.name === trustedRoleN)) {
                          if (message.content.split(' ')[1] === undefined || isNaN(message.content.split(' ')[1]) || message.content.split(' ')[1].toString().includes('/') || message.content.split(' ')[1].toString().includes('.') || message.content.split(' ')[1].toString().includes('*') || message.content.split(' ')[1].toString().includes('+')) {
                            message.reply(':x: Please use autofwealth to set the interval in minutes which fwealth is posted. ``'+prefix+'autofwealth <minutes>`` and ``'+prefix+'toggle fwealth`` to toggle it.');
                          } else {
                            var time = Number(message.content.split(' ')[1]);
                            if (time < 10) {
                              message.reply('Time should be greater than or equal to 10 minutes at minumum.');
                            } else if (time > 2540) {
                              message.reply('That time is too large.');
                            } else {
                              setSetting("fwealthinterval", time*60*1000, function() {
                                message.reply(':white_check_mark: Fwealth will now be posted every '+time+' minutes. Taking affect after next '+prefix+'restart');
                              });
                            }
                          }
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix+'viewsettings') {
                        if (message.member.roles.find(role => role.name === adminRoleN) || message.member.roles.find(role => role.name === trustedRoleN)) {
                          message.delete().catch((e) => {});
                          var page = Number(message.content.split(' ')[1]) || 1;

                          var settingview = new Discord.RichEmbed()
                            .setTitle(bot.user.username+' - Current Settings Page '+page)
                            .setDescription('These are the current settings the bot registers. Please restart for any updates to take affect here. There are 5 pages. viewsettings <page>. Please note that some of these you cannot modify and the bot uses as storage.');

                          var settingIndex = 0;
                          for (var key of Object.keys(c_settings)) {
                              settingIndex++;
                              if (page == 1) {
                                if (settingIndex < 16) {
                                  var desc = c_settings[key];
                                  if (desc === undefined || desc.toString().trim() == '' || desc.toString().trim() == ' ') {
                                    desc = "none";
                                  }
                                  settingview.addField(key, desc, true);
                                }
                              }
                              if (page == 2) {
                                if (settingIndex >= 16 && settingIndex < 32) {
                                  var desc = c_settings[key];
                                  if (desc === undefined || desc.toString().trim() == '' || desc.toString().trim() == ' ') {
                                    desc = "none";
                                  }
                                  settingview.addField(key, desc, true);
                                }
                              }
                              if (page == 3) {
                                if (settingIndex >= 32 && settingIndex < 47) {
                                  var desc = c_settings[key];
                                  if (desc === undefined || desc.toString().trim() == '' || desc.toString().trim() == ' ') {
                                    desc = "none";
                                  }
                                  settingview.addField(key, desc, true);
                                }
                              }
                              if (page == 4) {
                                if (settingIndex >= 47 && settingIndex <= 61) {
                                  var desc = c_settings[key];
                                  if (desc === undefined || desc.toString().trim() == '' || desc.toString().trim() == ' ') {
                                    desc = "none";
                                  }
                                  settingview.addField(key, desc, true);
                                }
                              }
                          }
                          if (page == 5) {
                            settingview.addField('Guild Lock ID', thisguildid, true);
                            settingview.addField('This Guild ID', message.guild.id+'', true);
                            settingview.addField('adminRole', adminRoleN, true);
                            settingview.addField('trustedRole', trustedRoleN, true);
                            settingview.addField('useRole', useRoleN, true);
                            settingview.addField('bankRole', bankRoleN, true);
                            settingview.addField('Server Configuration', server, true);
                            settingview.addField('Buffer Channel', process.env.bufferCheck, true);
                            settingview.addField('Walls Channel', process.env.wallsChannel, true);
                            settingview.addField('Buffers Channel', process.env.buffersChannel, true);
                            settingview.addField('Weewoo Channel', process.env.weewooChannel, true);
                            settingview.addField('BlackMarket Channel', process.env.blackmarketChannel, true);
                            settingview.addField('Black Market Alerts', process.env.bmEnabled, true);
                            settingview.addField('Application Channel', process.env.applicationChannel, true);
                            settingview.addField('Server IP & Server Port', process.env.serverIp+':'+process.env.serverPort, true);
                          }
                          if (page > 5) {
                            message.reply(':x: There are only 5 pages of settings.');
                          } else {
                            message.channel.send(settingview).catch((e) => {});
                          }
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'autofind' && server == 'cosmic') {
                          //autofind  add/remove username | toggle
                          message.delete().catch((e) => {});
                          if (message.content.toLowerCase() == prefix + 'autofind') {
                              message.reply('Please provide the required arguments. ``'+prefix + 'autofind add/remove *username*, autofind list, autofind toggle``');
                          } else {
                              fs.access(assetsPath+'find.txt', fs.constants.F_OK, (err) => {
                                  if (err) {
                                      console.log('find.txt does not exist');
                                      message.reply(':exclamation: **find.txt does not exist**');
                                  } else {
                                      if (message.member.roles.find(role => role.name === adminRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                                          var commandSplit = message.content.split(' ');
                                          var command = commandSplit[0];
                                          var addRemove = commandSplit[1];
                                          var username = commandSplit[2];
                                          //add
                                          if (addRemove.toLowerCase() == 'add') {
                                              if (username != undefined) {
                                                  // username given, add to users.txt
                                                  var content = '';
                                                  dedupe(fs.readFileSync(assetsPath+'find.txt', 'utf8')+'\n'+username).forEach(element => {
                                                      if (element != '' && element != 'none') {
                                                          content = content+'\n'+element;
                                                      }
                                                  });
                                                  fs.writeFile(assetsPath+'find.txt', content, err => {
                                                      if (err) throw err;
                                                      if (!err) {
                                                          console.log('Added ' + username + ' to auto find! Make sure to restart the bot now!');
                                                          message.reply('Added ' + username + ' to auto find! Make sure to restart the bot now!');
                                                      } else {
                                                          message.reply('Something went wrong. Retry or make sure all files are correct.');
                                                      }
                                                  });
                                              } else {
                                                  // username not given
                                                  message.reply('Please specify the username.');
                                              }
                                          } else if (addRemove == 'remove') {
                                              // remove
                                              if (username != undefined) {
                                                  // username given, remove username from users.txt
                                                  const replace = require('replace-in-file');
                                                  const options = {
                                                      files: assetsPath+'find.txt',
                                                      from: '\n' + username,
                                                      to: ''
                                                  };
                                                  try {
                                                      const results = replace.sync(options);
                                                      console.log('Removed ' + username + ' from auto find! Make sure to restart the bot now!');
                                                      message.reply('Removed ' + username + ' from auto find! Make sure to restart the bot now!');
                                                  } catch (error) {
                                                      console.error('Error occurred:', error);
                                                      message.reply('An error has occurred.\n`' + error + '`');
                                                  }
                                              } else {
                                                  // username not given
                                                  message.reply('Please specify the username.');
                                              }
                                          } else if (addRemove.toLowerCase() == 'list') {
                                              fs.readFile(assetsPath+'find.txt', 'utf8', function(err, contents) {
                                                  message.reply('**Auto Find Usernames:**\n```' + contents + '```');
                                              });
                                          } else if (addRemove.toLowerCase() == 'toggle') {
                                              toggleSetting('autofind', function(state) {
                                                message.reply('AutoFind is now ' + state + '\n :warning: Make sure you restart the bot now! (``'+prefix+'restart``)');
                                                if (state == true) {
                                                    setInterval(autofind, afinterval);
                                                } else {
                                                    clearInterval(autofind);
                                                }
                                              });
                                              toggleautofind();
                                          } else {
                                              message.reply('Invalid args: ``'+prefix+'autofind [add, remove] IGN``');
                                          }
                                      } else {
                                          message.channel.send(noaccess).catch((e) => {});
                                      }
                                  }
                              });
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'whitelist') {
                          //whitelist add | remove @user ign
                          message.delete().catch((e) => {});
                          if (message.content.toLowerCase() == prefix + 'whitelist') {
                              message.reply('Invalid args: ``'+prefix+'whitelist self | whitelist add @user IGN | whitelist remove IGN | whitelist list | whitelist clear | whitelist prune``');
                          } else {
                              if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                                  var commandSplit = message.content.split(' ');
                                  var command = commandSplit[0];
                                  var addRemove = commandSplit[1];
                                  var discorduser = commandSplit[2];
                                  var username = commandSplit[3];

                                  if (addRemove.toLowerCase() == 'list') {
                                      fs.readFile(assetsPath+'users.txt', 'utf8', function(err, contents) {
                                          if (contents == undefined || contents == null || contents == '') {
                                              contents = 'none';
                                          }

                                          let chunks = [];
                                          for (var i = 0, charsLength = contents.length; i < charsLength; i += 1500) {
                                              chunks.push(contents.substring(i, i + 1500));
                                          }

                                          chunks.forEach(async (chunk, i) => {
                                            message.channel.send('**Users (Page '+Number(i + 1)+'):**\n```' + chunk + '```');
                                            await new Promise(done => setTimeout(() => done(), 500));
                                          });
                                      });
                                      return;
                                  } else if (addRemove.toLowerCase() == 'remove') {
                                      // remove
                                      if (message.member.roles.find(role => role.name === adminRoleN)) {
                                        var username = commandSplit[2];
                                        if (username != undefined) {
                                            // username given, remove user from users.txt
                                            const replace = require('replace-in-file');
                                            var user_regex =  new RegExp(".*" + username + ".*:.*\r?\n", "gm");
                                            const options = {
                                                files: assetsPath+'users.txt',
                                                from: user_regex,
                                                to: ''
                                            };
                                            try {
                                                const results = replace.sync(options);
                                                console.log('Removed ' + username + ' from the whitelist!');
                                                message.reply('Removed ' + username + ' from the whitelist!');
                                            } catch (error) {
                                                console.error('Error occurred:', error);
                                                message.reply('An error has occurred.\n`' + error + '`');
                                            }
                                        } else {
                                            // username not given
                                            message.reply('Please specify the username.');
                                        }
                                        return;
                                      } else {
                                        message.channel.send(noaccess).catch((e) => {});
                                      }
                                  } else if (addRemove.toLowerCase() == 'clear') {
                                      if (message.member.roles.find(role => role.name === adminRoleN)) {
                                          fs.writeFile(assetsPath+'users.txt', '', err => {
                                              if (err) throw err;
                                              message.reply(':white_check_mark: Cleared the whitelist.');
                                          });
                                      } else {
                                          message.channel.send(noaccess).catch((e) => {});
                                      }
                                      return;
                                  } else if (addRemove.toLowerCase() == 'prune') {
                                      if (message.member.roles.find(role => role.name === adminRoleN)) {
                                          //get all ids
                                          var prunedUsers = "";
                                          var prunedAmount = 0;
                                          var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/(.*):.*:.*:.*/);

                                          var newWhitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').toString();
                                          whitelist.forEach(discordId => {
                                            if (!thisguild.members.get(discordId+'')) {
                                              if (discordId.toString().trim() != '' && discordId.toString().trim() != ' ' && discordId.toString().trim() != '\n') {
                                                var username = discordId;
                                                if (username != undefined) {
                                                    // username given, remove user from users.txt
                                                    var user_regex = new RegExp(username+".*:.*:.*\r?\n", "gm");
                                                    try {
                                                        newWhitelist = newWhitelist.replace(user_regex, '');
                                                        prunedUsers += username+'\n';
                                                        prunedAmount++;
                                                    } catch (error) {
                                                        console.error('Error occurred:', error);
                                                        message.reply('An error has occurred.\n`' + error + '`');
                                                    }
                                                }
                                              }
                                            }
                                          });
                                          //Write new whitelist
                                          fs.writeFile(assetsPath+'users.txt', newWhitelist, err => {
                                            if (err) return console.log(e);
                                            try {
                                              message.channel.send(':white_check_mark: Pruned '+prunedAmount+' user(s) from the whitelist. \n**Pruned IDs:**\n```\n'+prunedUsers+'```');
                                              logsc = getC('logs') || bot.channels.find(channel => channel.name === 'logs');
                                              logsc.send(':warning: '+message.author.tag+' ('+message.author.id+') Pruned the whitelist at '+getTime()+' - '+prunedAmount+' user(s): ```\n'+prunedUsers+'```').catch((e) => {});
                                            } catch (e) {}
                                          });
                                      } else {
                                          message.channel.send(noaccess).catch((e) => {});
                                      }
                                      return;
                                  }

                                  if (addRemove === undefined) {
                                      message.reply('Invalid args: ``'+prefix+'whitelist self | whitelist add @user IGN | whitelist remove IGN | whitelist list | whitelist clear | whitelist prune``');
                                      return;
                                  }

                                  if (addRemove.toLowerCase() == 'self') {
                                    //User adding a key to themself or whatever
                                    fs.readFile(assetsPath+'users.txt', 'utf8', function(err, contents) {
                                      if (contents.includes(message.author.id+'')) {
                                        return message.reply(':x: You are already added to the whitelist.');
                                      } else {
                                        function makeid(length) {
                                           var result           = '';
                                           var characters       = '0123456789';
                                           var charactersLength = characters.length;
                                           for ( var i = 0; i < length; i++ ) {
                                              result += characters.charAt(Math.floor(Math.random() * charactersLength));
                                           }
                                           return result;
                                         }
                                         var key = makeid(20);
                                         //Try a few times if a *** word is in it
                                         if (key.includes('cum')) {
                                           key = makeid(20);
                                           if (key.includes('cum')) {
                                             key = makeid(20);
                                           }
                                         }
                                         const info = new Discord.RichEmbed()
                                             .setColor('#636363')
                                             .setTitle('Whitelist User')
                                             .setDescription('Hello, '+message.author+'. Please log onto '+process.env.serverIp+':'+process.env.serverPort+'\nThen do the following command:\n`/msg '+process.env.MUSERNAME+' link '+key+'`\nYou then will be added to the whitelist. This key will expire in 10 minutes unless you use it.')
                                             .setTimestamp();

                                         message.author.send(info).then(msg => {
                                           message.channel.send(':white_check_mark: '+message.author+' has been sent a key.').catch((e) => {console.log(e)});
                                           mcscript.addValidKey(key+':'+message.author.id.toString());
                                         }).catch(() => {
                                           return message.channel.send(':x: '+message.author+' Please update your privacy settings so that I can DM you!');
                                         });
                                      }
                                    });
                                  } else {
                                    if (!message.mentions.members.first()) {
                                      return message.reply('Invalid args: ``'+prefix+'whitelist self | whitelist add @user IGN | whitelist remove IGN | whitelist list | whitelist clear | whitelist prune``');
                                    }

                                    if (addRemove.toLowerCase() == 'add') {
                                      // add
                                      if (message.member.roles.find(role => role.name === adminRoleN)) {
                                        if (username != undefined && discorduser != undefined) {
                                          // username and mention given, add user to users.txt
                                          fs.appendFile(assetsPath+'users.txt', message.mentions.members.first().id+':'+username+':0:0\n', err => {
                                            if (err) throw err;
                                            console.log('Added '+message.mentions.members.first().id+':'+ username + ' to the whitelist!');
                                            message.reply(':white_check_mark: Added '+message.mentions.members.first().id+':'+ username + ' to the whitelist!');
                                          });
                                        } else {
                                          // username not given
                                          message.reply('Please specify the username and discord user.');
                                        }
                                      } else {
                                        message.channel.send(noaccess).catch((e) => {});
                                      }
                                    }
                                  }
                              } else {
                                  message.channel.send(noaccess).catch((e) => {});
                              }
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix+'appq') {
                        message.delete().catch((e) => {});
                        if (message.member.roles.find(role => role.name === adminRoleN)) {
                          var arg = message.content.toLowerCase().split(' ')[1];
                          if (arg === undefined) {
                            message.reply('Invalid args: ``'+prefix+'appq <add> <question> | appq remove <questionNumber> | appq set <questionNumber> <newQuestion> | appq list``');
                          } else if (arg == 'list') {
                            var appquestionsz = fs.readFileSync(assetsPath+'applicationquestions.json', 'utf8');
                            appquestionsz = JSON.parse(appquestionsz);
                            var questionsList = "";
                            appquestionsz.questions.forEach(question => {
                              questionsList += question.question+' [NUMBER: '+question.number+']\n';
                            });
                            const appquestions = new Discord.RichEmbed()
                                .setColor('#00E575')
                                .setTitle('Application Questions')
                                .setDescription('```\n'+questionsList+'```\nUse '+prefix+'appq add <question> to add an application question, or '+prefix+'appq set <questionNumber> <newQuestion>')
                                .setTimestamp();
                            message.channel.send(appquestions).catch((e) => {});
                          } else if (arg == 'add') {
                            var question = message.content.toLowerCase().split(prefix+'appq add ')[1];
                            if (question === undefined) return message.reply(':x: Please specify a question to add, you can modify the color if needed later in applicationquestions.json.');
                            fs.readFile(assetsPath+'applicationquestions.json', 'utf8', function(err, contents) {
                              if (err) return console.log(err);
                              var json = JSON.parse(contents);
                              var qnumber = json.questions.length;
                              var newQuestion = {
                                "number": qnumber+1,
                                "question": question+"",
                                "color": "#ffa617",
                                "timestampSet": false
                              };
                              json.questions.push(newQuestion);
                              json = JSON.stringify(json, undefined, 4);
                              fs.writeFile(assetsPath+'applicationquestions.json', json, err => {
                                  if (err) throw err;
                                  message.reply('App question has been added! You may edit its color in applicationquestions.json (assets folder).');
                              });
                            });
                          } else if (arg == 'set') {
                            var questionNumber = message.content.toLowerCase().split(' ')[2];
                            var newQuestion = message.content.split(prefix+'appq set '+questionNumber+' ')[1];

                            if (questionNumber === undefined || newQuestion === undefined || isNaN(questionNumber)) {
                              message.reply('Invalid args: ``'+prefix+'appq set <questionNumber> <newQuestion>``');
                            } else {
                              fs.readFile(assetsPath+'applicationquestions.json', 'utf8', function(err, contents) {
                                if (err) return console.log(err);
                                var json = JSON.parse(contents);

                                json.questions.forEach(question => {
                                  if (question.number == questionNumber) {
                                    question.question = newQuestion.toString()+"";
                                  }
                                });

                                json = JSON.stringify(json, undefined, 4);
                                fs.writeFile(assetsPath+'applicationquestions.json', json, err => {
                                    if (err) throw err;
                                    message.reply('App question has been updated!');
                                });
                              });
                            }
                          } else if (arg == 'remove') {
                            var questionNumber = message.content.toLowerCase().split(' ')[2];
                            if (questionNumber === undefined || isNaN(questionNumber)) {
                              message.reply('Invalid args: ``'+prefix+'appq <add> <question> | appq remove <questionNumber> | appq set <questionNumber> <newQuestion> | appq list``');
                            } else {
                              fs.readFile(assetsPath+'applicationquestions.json', 'utf8', function(err, contents) {
                                if (err) return console.log(err);
                                var json = JSON.parse(contents);

                                json.questions.forEach(question => {
                                  if (question.number == questionNumber) {
                                    json.questions.splice(questionNumber - 1);
                                  }
                                });

                                json = JSON.stringify(json, undefined, 4);
                                fs.writeFile(assetsPath+'applicationquestions.json', json, err => {
                                    if (err) throw err;
                                    message.reply('App question has been removed!');
                                });
                              });
                            }
                          } else {
                            message.reply('Invalid args: ``'+prefix+'appq <add> <question> | appq remove <questionNumber> | appq set <questionNumber> <newQuestion> | appq list``');
                          }
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix+'deposits') {
                        message.delete().catch((e) => {});
                        if (message.member.roles.find(role => role.name === adminRoleN)) {
                          var arg = message.content.toLowerCase().trim().split(' ')[1];
                          if (arg === undefined) {
                            message.reply(':x: Invalid args: ``'+prefix+'deposits reset | deposits set <@user> <amount>``');
                          } else if (arg == 'reset') {
                            fs.writeFile(assetsPath+'deposits.json', '{"deposits": []}', err => {
                                if (err) throw err;
                                message.reply('All user deposit data has been removed!');
                            });
                          } else if (arg == 'set') {
                            if (!message.mentions.members.first() || message.content.toLowerCase().trim().split(' ')[2] === undefined || message.content.trim().split(' ')[3] === undefined || isNaN(Number(message.content.trim().split(' ')[3])) || message.content.trim().split(' ')[3].toString().includes('-') || message.content.trim().split(' ')[3].toString().includes('+') || message.content.trim().split(' ')[3].toString().includes('*') || message.content.trim().split(' ')[3].toString().includes('/')) {
                              message.reply(':x: Invalid args: ``'+prefix+'deposits reset | deposits set <@user> <amount>``');
                            } else {
                              var muser = message.mentions.members.first().id;
                              var newAmount = Number(message.content.trim().split(' ')[3]);
                              if (newAmount > 99999999999999) {
                                return message.reply(':exclamation: That number is too high!');
                              }
                              //Find their name
                              let dset = false;
                              var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/(.*:.*):.*:.*/);
                              whitelist.forEach(user => {
                                if (user != undefined && user != '' && user != ' ' && user.toString().trim() != '' && user.toString().trim != ' ') {
                                  if (user.split(':')[0]+'' == muser+'') {
                                    var username = user.split(':')[1].toString().toLowerCase().trim();

                                    var depositsJson = depositsFile.get("deposits");
                                    depositsJson.forEach(user => {
                                      if (user.name.toString().toLowerCase().trim() == username.toString().toLowerCase().trim()) {
                                        //Set users total
                                        var oldTotal = user.total;
                                        user.total = newAmount;
                                        depositsFile.set("deposits", depositsJson);
                                        dset = true;
                                        message.reply(':white_check_mark: '+user.name.toString()+'\'s total has been updated from ``$'+oldTotal+'`` to ``$'+newAmount+'``!');
                                      }
                                    });
                                  }
                                }
                              });
                              if (!dset) {
                                message.reply(':x: That user was not found on the whilelist, or has not paid the bot at least $1 yet.');
                              }
                            }
                          }
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message == prefix+'online') {
                        message.delete().catch((e) => {});
                        if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                          //Get all online whitelisted usernames list command.
                          message.reply('Getting all whitelisted users that are online...');
                          mcscript.getOnline(function(onlinearray) {
                            const online = new Discord.RichEmbed()
                                .setColor('#00E575')
                                .setTitle('Players Online')
                                .setTimestamp();

                            var onlinedesc = '';
                            var playersOnline = 0;
                            onlinearray.forEach(player => {
                              playersOnline++;
                              var theirid;
                              function getcheck(match) {
                                  theirid = match.match(/(.*):.*:.*:.*/i)[1];
                                  return match;
                              }
                              var user_regex =  new RegExp(".*:"+player+":.*:.*", "i");
                              var roptions = {
                                  files: assetsPath+'users.txt',
                                  from: user_regex,
                                  to: (match) => getcheck(match)
                              };
                              const replace = require('replace-in-file');
                              replace.sync(roptions);
                              if (theirid != undefined) {
                                onlinedesc += '\n'+player+' (<@'+theirid+'>)';
                              } else {
                                onlinedesc += '\n'+player+' (?)';
                              }
                            });
                            setTimeout(function() {
                              var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').toString();
                              var whitelistCount = Math.round(whitelist.split(':').length / 3);
                              var totalOffline = whitelistCount - playersOnline;
                              if (onlinedesc.toString().trim() == '' || onlinedesc.toString().trim() == ' ') {onlinedesc = ':warning: Nobody is online!'}
                              online.setDescription(onlinedesc+'\n\nTotal Players Online: **'+playersOnline+'**\nTotal Players Offline: **'+totalOffline+'**');
                              message.channel.send(online).catch((e) => {});
                            }, 300);
                          });
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'tracker') {
                          //tracker  add | remove ign  tracker toggle  tracker list
                          message.delete().catch((e) => {});
                          if (message.content.toLowerCase() == prefix + 'tracker') {
                              message.reply('Invalid args: ``'+prefix+'tracker add IGN | tracker remove IGN | tracker list | tracker toggle``');
                          } else {
                              if (message.member.roles.find(role => role.name === adminRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                                  var commandSplit = message.content.split(' ');
                                  var command = commandSplit[0];
                                  var addRemove = commandSplit[1];
                                  var username = commandSplit[2];

                                  if (addRemove.toLowerCase() == 'list') {
                                      fs.readFile(assetsPath+'track.txt', 'utf8', function(err, contents) {
                                          if (contents == undefined || contents == null || contents == '') {
                                              contents = 'none';
                                          }
                                          message.reply('**Tracking Players:**\n```' + contents + '```');
                                      });
                                      return;
                                  } else if (addRemove.toLowerCase() == 'remove') {
                                      // remove
                                      var username = commandSplit[2];
                                      if (username != undefined) {
                                          // username given, remove user from users.txt
                                          const replace = require('replace-in-file');
                                          const options = {
                                              files: assetsPath+'track.txt',
                                              from: username.toLowerCase()+'\n',
                                              to: ''
                                          };
                                          try {
                                              const results = replace.sync(options);
                                              console.log('Removed ' + username + ' from the tracker!');
                                              message.reply('Removed ' + username + ' from the tracker!');
                                          } catch (error) {
                                              console.error('Error occurred:', error);
                                              message.reply('An error has occurred.\n`' + error + '`');
                                          }
                                      } else {
                                          // username not given
                                          message.reply('Please specify the username.');
                                      }
                                      return;
                                  } else if (addRemove.toLowerCase() == 'toggle') {
                                      //tracker toggle command
                                      toggleSetting('playertracking', function(state) {
                                        message.reply(':white_check_mark: Tracking players is now ' + state + ', taking affect next restart!');
                                      });
                                      return;
                                  }

                                  if (addRemove == undefined || username == undefined) {
                                      message.reply('Invalid args: ``'+prefix+'tracker add IGN | tracker remove IGN | tracker list | tracker toggle``');
                                      return;
                                  } else {

                                      if (addRemove.toLowerCase() == 'add') {
                                          // add
                                          if (username != undefined) {
                                              // username and mention given, add user to users.txt
                                              fs.appendFile(assetsPath+'track.txt', username.toLowerCase()+'\n', err => {
                                                  if (err) throw err;
                                                  console.log('Added '+ username + ' to the tracker!');
                                                  message.reply('Added '+ username + ' to the tracker, logins/logouts will now show in the #ingame-chat channel.');
                                              });
                                          } else {
                                              // username not given
                                              message.reply('Please specify the username.');
                                          }
                                      } else {
                                          message.reply('Invalid args: ``'+prefix+'tracker add IGN | tracker remove IGN | tracker list | tracker toggle``');
                                      }
                                  }
                              } else {
                                  message.channel.send(noaccess).catch((e) => {});
                              }
                          }
                      }

                      if (message.content.split(' ')[0] == prefix + 'bal') {
                          //bal command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              var commandSplit = message.content.split(' ');
                              var balcommand = commandSplit[0];
                              var usernameBal = commandSplit[1];

                              if (usernameBal == undefined) {
                                  usernameBal = process.env.MUSERNAME;
                              } else if (server == 'mccentral') {
                                usernameBal = process.env.MUSERNAME;
                                message.reply('Sorry, MCC only allows you to check your own balance with a command. Getting bot balance..');
                              }
                              message.reply('Getting balance of player **' + usernameBal + '**');
                              lastRequestedChannel = message.channel;
                              fs.writeFile(assetsPath+'runcommand.txt', '/bal ' + usernameBal, err => {
                                  if (err) throw err;
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.split(' ')[0] == prefix + 'fwho') {
                          //fwho command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              var commandSplit = message.content.split(' ');
                              var fwhocommand = commandSplit[0];
                              var factionFwho = commandSplit[1];

                              if (factionFwho != undefined) {
                                  message.reply('Getting f who info on faction **' + factionFwho + '**');
                                  lastRequestedChannel = message.channel;
                                  if (server == 'manacube' || server == 'desteria' || server == 'mineheroes' || server == 'fantasycloud' || server == 'glacial') {
                                    fs.writeFile(assetsPath+'runcommand.txt', '/f who ' + factionFwho, err => {
                                        if (err) throw err;
                                    });
                                  } else if (server == 'custom') {
                                    fs.writeFile(assetsPath+'runcommand.txt', c_config.fwhoCommand.toString().replace('%faction%', factionFwho), err => {
                                        if (err) throw err;
                                    });
                                  } else {
                                    fs.writeFile(assetsPath+'runcommand.txt', '/f f ' + factionFwho, err => {
                                        if (err) throw err;
                                    });
                                  }
                              } else {
                                  message.reply('Please specify a faction!');
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.split(' ')[0] == prefix + 'find' && server == 'cosmic') {
                          //find command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              var commandSplit = message.content.split(' ');
                              var findCommand = commandSplit[0];
                              var findUsername = commandSplit[1];

                              if (findUsername != undefined) {
                                  message.reply('Finding **' + findUsername + '**');
                                  fs.writeFile(assetsPath+'runcommand.txt', '/find ' + findUsername, err => {
                                      if (err) throw err;
                                  });
                              } else {
                                  message.reply('Finding **' + process.env.MUSERNAME + '**');
                                  fs.writeFile(assetsPath+'runcommand.txt', '/find ' + process.env.MUSERNAME, err => {
                                      if (err) throw err;
                                  });
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (c_settings.clearCheckChannels) {
                        wallchecking = getC('wallChecking') || bot.channels.find(channel => channel.name === process.env.wallsChannel+'') || logsc;
                        bufferchecking = getC('bufferChecking') || bot.channels.find(channel => channel.name === process.env.buffersChannel+'') || logsc;
                        try {
                          if (message.channel.id+'' == wallchecking.id+'' || message.channel.id+'' == bufferchecking.id+'') {
                              if (message.author.id == bot.user.id) {return;}
                              try {
                                  message.delete().catch((e) => {});
                              } catch (e) {}
                          }
                       } catch (e) {}
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'wallchecks') {
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              var commandsplit = message.content.split(' ');
                              var set = commandsplit[1];
                              var setuser = commandsplit[2];
                              var checknumber = commandsplit[3];

                              if (set == undefined || setuser == undefined || !message.mentions.members.first() || checknumber == undefined || checknumber.includes('-') || checknumber.includes('+') || checknumber.includes('.') || checknumber.includes('/') || checknumber.includes('*') || isNaN(checknumber)) {
                                  message.reply(':x: Incorrect use, ``'+prefix+'wallchecks set @user #``');
                              } else if (checknumber > 1000000) { message.reply('Pretty sure you dont have over 1 million checks.'); } else {
                                  var replace = require('replace-in-file');
                                  var user_regex =  new RegExp(message.mentions.members.first().id+":.*:.*", "i"); // discordid:username:checks
                                  var checkregex =  /.*:.*:(.*)/i;
                                  function setcheck(match) {
                                    //we have--discordid:username:checks:bufchecks as the match var
                                    var currentcheck = match.match(/.*:.*:(.*):.*/i);
                                    var newmatch = match.match(/.*:.*:/i);
                                    var newcheck = checknumber;
                                    var opt = match.split(':');
                                    //id:username:wcheck:bcheck
                                    var output = opt[0]+':'+opt[1]+':'+newcheck+':'+opt[3];
                                    return output;
                                  }
                                  var roptions = {
                                      files: assetsPath+'users.txt',
                                      from: user_regex,
                                      to: (match) => setcheck(match)
                                  };
                                  var newchecks = replace.sync(roptions);
                                  message.reply(':white_check_mark: Set '+message.mentions.members.first()+'\'s wall checks to '+checknumber+' checks!');
                                  console.log('\x1b[33m'+message.author.tag+' set '+message.mentions.members.first().user.tag+'\'s wall checks to '+checknumber+' at '+getTime())
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'bufferchecks') {
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              var commandsplit = message.content.split(' ');
                              var set = commandsplit[1];
                              var setuser = commandsplit[2];
                              var checknumber = commandsplit[3];

                              if (set == undefined || setuser == undefined || !message.mentions.members.first() || checknumber == undefined || checknumber.includes('-') || checknumber.includes('+') || checknumber.includes('.') || checknumber.includes('/') || checknumber.includes('*') || isNaN(checknumber)) {
                                  message.reply(':x: Incorrect use, ``'+prefix+'bufferchecks set @user #``');
                              } else if (checknumber > 1000000) { message.reply('Pretty sure you dont have over 1 million checks.'); } else {
                                  var replace = require('replace-in-file');
                                  var user_regex =  new RegExp(message.mentions.members.first().id+":.*:.*", "i"); // discordid:username:checks
                                  var checkregex =  /.*:.*:.*:(.*)/i;
                                  function setcheck(match) {
                                      var currentcheck = match.match(/.*:.*:.*:(.*)/i);
                                      var newmatch = match.match(/.*:.*:.*:/i);
                                      var newcheck = checknumber;
                                      var output = currentcheck[1].replace(currentcheck[1], newmatch+newcheck)
                                      return output;
                                  }
                                  var roptions = {
                                      files: assetsPath+'users.txt',
                                      from: user_regex,
                                      to: (match) => setcheck(match)
                                  };
                                  var newchecks = replace.sync(roptions);
                                  message.reply(':white_check_mark: Set '+message.mentions.members.first()+'\'s buffer checks to '+checknumber+' checks!');
                                  console.log('\x1b[33m'+message.author.tag+' set '+message.mentions.members.first().user.tag+'\'s buffer checks to '+checknumber+' at '+getTime())
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix+'leaderboard') {
                        message.reply(':x: Leaderboard has been updated, please use either '+prefix+'leaderboard walls, or '+prefix+'leaderboard buffers, or '+prefix+'leaderboard deposits, or '+prefix+'leaderboard playtime.');
                      }

                      if (message.content.toLowerCase().split(' ')[0]+' '+message.content.toLowerCase().split(' ')[1] == prefix+'leaderboard walls') {
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              message.delete().catch((e) => {});

                              let page = Math.floor(Number(message.content.split(' ')[2])) || 1;

                              if (page <= 0) page = 1;

                              var whitelistusers = fs.readFileSync(assetsPath+'users.txt', 'utf8');
                              const third_r = s => s.split(':')[2];
                              var array = whitelistusers.split('\n');
                              array.pop();
                              array.forEach(rank => {
                                if (rank === undefined || rank == '' || rank == ' ') {
                                  array.splice(array.indexOf(rank));
                                }
                              });
                              array.sort((a, b) => third_r(b) - third_r(a));

                              let jsonArray = [];

                              array.forEach((user, index) => {
                                const jsonUser = {
                                  id: array[index].split(':')[0],
                                  data: array[index].split(':')[2]
                                };
                                jsonArray.push(jsonUser);
                              });

                              let maxPages = Math.ceil(jsonArray.length / 10);
                              if (page >= maxPages) page = maxPages;

                              let place = 1;
                              const leaderboard = new Discord.RichEmbed()
                                .setColor('#0099ff')
                                .setTitle('Top Wall Checks (Page #'+page+'/'+maxPages+'):');

                              let pages = [];

                              while (jsonArray.length > 0) {
                                pages.push(jsonArray.splice(0, 10));
                              }
                              
                              if (pages[page-1]) {
                                pages[page-1].forEach((place, i) => {
                                  let placeNumber = Number((i + ((page - 1)*10)) + 1);
                                  let emoji = '';
                                  if (placeNumber === 1) emoji = ':medal: ';
                                  if (placeNumber === 2) emoji = ':second_place: ';
                                  if (placeNumber === 3) emoji = ':third_place: ';
                                  leaderboard.addField(emoji+placeNumber+':', `<@${place.id}> - **${place.data}** wall checks`);
                                });
                              }

                              if (leaderboard.fields.length === 0) {
                                leaderboard.addField('None', 'There is nobody on the whitelist.');
                              }

                              message.channel.send(leaderboard).catch((e) => {});
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0]+' '+message.content.toLowerCase().split(' ')[1] == prefix+'leaderboard buffers') {
                        if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                            message.delete().catch((e) => {});

                            let page = Math.floor(Number(message.content.split(' ')[2])) || 1;

                            if (page <= 0) page = 1;

                            var whitelistusers = fs.readFileSync(assetsPath+'users.txt', 'utf8');
                            const third_r = s => s.split(':')[2];
                            var array = whitelistusers.split('\n');
                            array.pop();
                            array.forEach(rank => {
                              if (rank === undefined || rank == '' || rank == ' ') {
                                array.splice(array.indexOf(rank));
                              }
                            });
                            array.sort((a, b) => third_r(b) - third_r(a));

                            let jsonArray = [];

                            array.forEach((user, index) => {
                              const jsonUser = {
                                id: array[index].split(':')[0],
                                data: array[index].split(':')[3]
                              };
                              jsonArray.push(jsonUser);
                            });

                            let maxPages = Math.ceil(jsonArray.length / 10);
                            if (page >= maxPages) page = maxPages;

                            let place = 1;
                            const leaderboard = new Discord.RichEmbed()
                              .setColor('#0099ff')
                              .setTitle('Top Buffer Checks (Page #'+page+'/'+maxPages+'):');

                            let pages = [];

                            while (jsonArray.length > 0) {
                              pages.push(jsonArray.splice(0, 10));
                            }
                            
                            if (pages[page-1]) {
                              pages[page-1].forEach((place, i) => {
                                let placeNumber = Number((i + ((page - 1)*10)) + 1);
                                let emoji = '';
                                if (placeNumber === 1) emoji = ':medal: ';
                                if (placeNumber === 2) emoji = ':second_place: ';
                                if (placeNumber === 3) emoji = ':third_place: ';
                                leaderboard.addField(emoji+placeNumber+':', `<@${place.id}> - **${place.data}** buffer checks`);
                              });
                            }

                            if (leaderboard.fields.length === 0) {
                              leaderboard.addField('None', 'There is nobody on the whitelist.');
                            }

                            message.channel.send(leaderboard).catch((e) => {});
                        } else {
                            message.channel.send(noaccess).catch((e) => {});
                        }
                    }

                      if (message.content.toLowerCase().split(' ')[0]+' '+message.content.toLowerCase().split(' ')[1] == prefix+'leaderboard deposits') {
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              message.delete().catch((e) => {});

                              let page = Math.floor(Number(message.content.split(' ')[2])) || 1;

                              if (page <= 0) page = 1;

                              var whitelistusers = JSON.parse(fs.readFileSync(assetsPath+'deposits.json', 'utf8')).deposits;
                              const third_r = s => s.split(':')[1];
                              var array = [];
                              whitelistusers.forEach(user => {array.push(user.name+':'+user.total)});
                              array.forEach(rank => {
                                if (rank === undefined || rank == '' || rank == ' ') {
                                  array.splice(array.indexOf(rank));
                                }
                              });
                              array.sort((a, b) => third_r(b) - third_r(a));

                              let jsonArray = [];

                            array.forEach((user, index) => {
                              const jsonUser = {
                                id: array[index].split(':')[0],
                                data: array[index].split(':')[1]
                              };
                              jsonArray.push(jsonUser);
                            });

                            let maxPages = Math.ceil(jsonArray.length / 10);
                            if (page >= maxPages) page = maxPages;

                            let place = 1;
                            const leaderboard = new Discord.RichEmbed()
                              .setColor('#0099ff')
                              .setTitle('Top Deposits (Page #'+page+'/'+maxPages+'):');

                            let pages = [];

                            while (jsonArray.length > 0) {
                              pages.push(jsonArray.splice(0, 10));
                            }
                          
                            if (pages[page-1]) {
                              pages[page-1].forEach((place, i) => {
                                let placeNumber = Number((i + ((page - 1)*10)) + 1);
                                let emoji = '';
                                if (placeNumber === 1) emoji = ':medal: ';
                                if (placeNumber === 2) emoji = ':second_place: ';
                                if (placeNumber === 3) emoji = ':third_place: ';
                                leaderboard.addField(emoji+placeNumber+':', `${place.id} - **$${place.data}** deposited`);
                              });
                            }

                            if (leaderboard.fields.length === 0) {
                              leaderboard.addField('None', 'There is nobody on the whitelist, or nobody has deposited any money.');
                            }

                              message.channel.send(leaderboard).catch((e) => {});
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0]+' '+message.content.toLowerCase().split(' ')[1] == prefix+'leaderboard playtime') {
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              message.delete().catch((e) => {});

                              let page = Math.floor(Number(message.content.split(' ')[2])) || 1;

                              if (page <= 0) page = 1;

                              var whitelistusers = JSON.parse(fs.readFileSync(assetsPath+'playtime.json', 'utf8')).playtime;

                              const third_r = s => s.split(':')[1];
                              var array = [];
                              whitelistusers.forEach(user => {array.push(user.name+':'+user.total)});
                              array.forEach(rank => {
                                if (rank === undefined || rank == '' || rank == ' ') {
                                  array.splice(array.indexOf(rank));
                                }
                              });
                              array.sort((a, b) => third_r(b) - third_r(a));

                              let jsonArray = [];

                            array.forEach((user, index) => {
                              const jsonUser = {
                                id: array[index].split(':')[0],
                                data: msToNice(array[index].split(':')[1])
                              };
                              jsonArray.push(jsonUser);
                            });

                            let maxPages = Math.ceil(jsonArray.length / 10);
                            if (page >= maxPages) page = maxPages;

                            let place = 1;
                            const leaderboard = new Discord.RichEmbed()
                              .setColor('#0099ff')
                              .setTitle('Top Playtime (Page #'+page+'/'+maxPages+'):');

                            let pages = [];

                            while (jsonArray.length > 0) {
                              pages.push(jsonArray.splice(0, 10));
                            }
                            
                            if (pages[page-1]) {
                              pages[page-1].forEach((place, i) => {
                                let placeNumber = Number((i + ((page - 1)*10)) + 1);
                                let emoji = '';
                                if (placeNumber === 1) emoji = ':medal: ';
                                if (placeNumber === 2) emoji = ':second_place: ';
                                if (placeNumber === 3) emoji = ':third_place: ';
                                leaderboard.addField(emoji+placeNumber+':', `${place.id} - **${place.data}**`);
                              });
                            }

                            if (leaderboard.fields.length === 0) {
                              leaderboard.addField('None', 'There is nobody on the whitelist or nobody has playtime data.');
                            }

                            message.channel.send(leaderboard).catch((e) => {});
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix+'reset') {
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              message.delete().catch((e) => {});
                              var replace = require('replace-in-file');
                              function resetall() {
                                  var whitelistusers = fs.readFileSync(assetsPath+'users.txt', 'utf8');
                                  var wregex = /^([^:]+:[^:]+:)\S?\S?\S?\S?\S?\S?\S$/gm;
                                  const str = whitelistusers;
                                  const subst = `$10`;
                                  const result = str.replace(wregex, subst+':0');
                                  fs.writeFile(assetsPath+'users.txt', result, err => {
                                      if (err) throw err;
                                      fs.writeFile(assetsPath+'deposits.json', '{"deposits":[]}', err => {
                                          if (err) throw err;
                                          fs.writeFile(assetsPath+'playtime.json', '{"playtime":[]}', err => {
                                              if (err) throw err;
                                              message.reply(':white_check_mark: Reset all player checks, deposits, & playtime.');
                                          });
                                      });
                                  });
                              }
                              resetall();
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'view') {
                          //view user command
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              message.delete().catch((e) => {});
                              if (!message.mentions.members.first()) {
                                  message.reply(':x: Invalid use, ``'+prefix+'view @user``');
                                  return;
                              } else {
                                  var replace = require('replace-in-file');
                                  var viewchecks = '(Not whitelisted)';
                                  var viewbufferchecks = '(Not whitelisted)';
                                  var viewusername = '(Not whitelisted)';
                                  var depositTotal = "$0";
                                  var totalPlaytime = "No playtime data";
                                  function getcheck(match) {
                                      var currentcheck = match.match(/.*:.*:(.*):/i);
                                      viewchecks = currentcheck[1];
                                      if (viewchecks == 1) {
                                          viewchecks = '**'+viewchecks + '** check';
                                      } else {
                                          viewchecks = '**'+viewchecks+'** checks';
                                      }
                                      return match;
                                  }
                                  var user_regex =  new RegExp(message.mentions.members.first().id+":.*:.*", "i");
                                  var roptions = {
                                      files: assetsPath+'users.txt',
                                      from: user_regex,
                                      to: (match) => getcheck(match)
                                  };
                                  var newchecks = replace.sync(roptions);
                                  //GET USERNAME =====================================================
                                  function getuser(match) {
                                      var ucurrentcheck = match.match(/.*:(.*):.*:.*/i);
                                      viewusername = ucurrentcheck[1];
                                      return match;
                                  }
                                  var user_regex =  new RegExp(message.mentions.members.first().id+":.*:.*", "i");
                                  var roptions = {
                                      files: assetsPath+'users.txt',
                                      from: user_regex,
                                      to: (match) => getuser(match)
                                  };
                                  var newchecks = replace.sync(roptions);
                                  var userpay = false;
                                  if (message.mentions.members.first().roles.find(role => role.name === bankRoleN)) {
                                      userpay = true;
                                  }
                                  //Get users buffer checks
                                  function getbcheck(match) {
                                      var currentbcheck = match.match(/.*:.*:.*:(.*)/i);
                                      viewbufferchecks = currentbcheck[1];
                                      if (viewbufferchecks == 1) {
                                          viewbufferchecks = '**'+viewbufferchecks + '** check';
                                      } else {
                                          viewbufferchecks = '**'+viewbufferchecks+'** checks';
                                      }
                                      return match;
                                  }
                                  var user_regex =  new RegExp(message.mentions.members.first().id+":.*:.*", "i");
                                  var rboptions = {
                                      files: assetsPath+'users.txt',
                                      from: user_regex,
                                      to: (match) => getbcheck(match)
                                  };
                                  replace.sync(rboptions);

                                  var muser = message.mentions.members.first().id;
                                  //Find their name
                                  var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/(.*:.*):.*:.*/);
                                  whitelist.forEach(user => {
                                    if (user != undefined && user != '' && user != ' ' && user.toString().trim() != '' && user.toString().trim != ' ') {
                                      if (user.split(':')[0]+'' == muser+'') {
                                        var username = user.split(':')[1].toString().toLowerCase().trim();
                                        var payments = depositsFile.get("deposits");
                                        var playtime = playtimeFile.get("playtime");

                                        if (!payments) return;

                                        if (payments.some(user => user.name.toString().toLowerCase().trim() === username.toString().toLowerCase().trim())) {
                                            var depositsJson = depositsFile.get("deposits");
                                            depositsJson.forEach(user => {
                                              if (user.name.toString().toLowerCase().trim() == username.toString().toLowerCase().trim()) {
                                                depositTotal = '$'+user.total.toString();
                                              }
                                            });
                                        }
                                        if (playtime.some(user => user.name.toString().toLowerCase().trim() === username.toString().toLowerCase().trim())) {
                                            playtimeJson = playtimeFile.get("playtime");

                                            playtimeJson.forEach(user => {
                                              if (user.name.toString().toLowerCase().trim() == username.toString().toLowerCase().trim()) {
                                                totalPlaytime = msToNice(user.total);
                                              }
                                            });
                                        }
                                      }
                                    }
                                  });

                                  setTimeout(function() {
                                  const viewuser = new Discord.RichEmbed()
                                      .setColor('#0099ff')
                                      .setTitle('User Info')
                                      .setThumbnail(message.mentions.members.first().user.avatarURL)
                                      .addField('Discord:', message.mentions.members.first())
                                      .addField('Username:', '``'+viewusername+'``')
                                      .addField('Wall Checks:', viewchecks)
                                      .addField('Buffer Checks:', viewbufferchecks)
                                      .addField(prefix+'pay Permissions:', '``'+userpay+'``')
                                      .addField('Total Money Deposited', depositTotal)
                                      .addField('Total Playtime', totalPlaytime)
                                      .setTimestamp();
                                  message.channel.send(viewuser).catch((e) => {});
                                }, 600);
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'checked') {
                          //checked command
                          wallchecking = getC('wallChecking') || bot.channels.find(channel => channel.name === process.env.wallsChannel+'') || logsc;
                          bufferchecking = getC('bufferChecking') || bot.channels.find(channel => channel.name === process.env.buffersChannel+'') || logsc;
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                            if (message.channel.id == wallchecking.id) {
                                  clearInterval(wallintervalspam);
                                  check_time = Date.now() / 1000;
                                  check_time = check_time - lastcheck;
                                  check_time = check_time / 60;
                                  check_time = Math.round(check_time);
                                  wallinterval = c_settings.interval;
                                  var wallintervalsec = wallinterval/1000;
                                  if (Number(Date.now() / 1000) - Number(lastcheck) <= wallintervalsec) {
                                      var timeleft;
                                      var altcheck_rk = Date.now()/1000 - lastcheck;
                                      altcheck_rk = altcheck_rk/60;
                                      timeleft = altcheck_rk - wallintervalmin;
                                      timeleft = Math.round(timeleft);
                                      timeleft = timeleft.toString().replace('-', '');
                                      var maybe_s = '';
                                      if (timeleft != '1') {
                                          maybe_s = 's';
                                      }
                                      message.channel.send(':warning: '+message.author+' You can not check the walls for another **'+timeleft+'** minute'+maybe_s+' (aprox)').catch((e) => {});
                                      return;
                                  } else {
                                      //add WALL check to user
                                      var replace = require('replace-in-file');
                                      var user_regex =  new RegExp(message.author.id+":.*:.*", "i"); // discordid:username:checks
                                      var checkregex =  /.*:.*:(.*):.*/i;
                                      if (wall_checking_enabled) {
                                          function addcheck(match) {
                                              //we have--discordid:username:checks:bufchecks as the match var
                                              var currentcheck = match.match(/.*:.*:(.*):.*/i);
                                              var newmatch = match.match(/.*:.*:/i);
                                              var newcheck = Number(currentcheck[1]) + 1;
                                              var opt = match.split(':');
                                              //id:username:wcheck:bcheck
                                              var output = opt[0]+':'+opt[1]+':'+newcheck+':'+opt[3];
                                              return output;
                                          }
                                          var roptions = {
                                              files: assetsPath+'users.txt',
                                              from: user_regex,
                                              to: (match) => addcheck(match)
                                          };
                                          var newchecks = replace.sync(roptions);
                                      } else {
                                          wallchecking.send('Wall checks are off, you will not receive a check stat for this.').catch((e) => {console.log(e)});
                                      }
                                      var replace = require('replace-in-file');
                                      var authorchecks = '(Not whitelisted)';
                                      function getcheck(match) {
                                          //we have--discordid:username:checks as the match var
                                          var currentcheck = match.match(/.*:.*:(.*):/i);
                                          authorchecks = currentcheck[1];
                                          if (authorchecks == 1) {
                                              authorchecks = authorchecks + ' wall check';
                                          } else {
                                              authorchecks = authorchecks+' wall checks';
                                          }
                                          return match;
                                      }
                                      var user_regex =  new RegExp(message.author.id+":.*:.*", "i");
                                      var roptions = {
                                          files: assetsPath+'users.txt',
                                          from: user_regex,
                                          to: (match) => getcheck(match)
                                      };
                                      var newchecks = replace.sync(roptions);
                                      if (c_settings.deleteAlerts+'' == 'true') {
                                          wallchecking.fetchMessages({
                                              limit: 3,
                                          }).then((messages) => {
                                              messages.forEach(message => {
                                                  if (message.content.includes(c_settings.alertmessage)) {
                                                      try {
                                                          message.delete().catch((e) => {});
                                                      } catch (e) {}
                                                  }
                                              });
                                          }).catch(err => {});
                                      }
                                      if (c_settings.checkedType+''.toLowerCase() == 'embed') {
                                          const checkedEmbed = new Discord.RichEmbed()
                                              .setColor('#00E575')
                                              .setTitle('Walls Checked')
                                              .setThumbnail(message.author.avatarURL)
                                              .addField('Checked By:', message.author+' ['+authorchecks+']', true)
                                              .addField('Time Checked:', getTime()+'', true)
                                              .addField('Time Taken:', '**'+check_time+'** minutes', true)
                                              .addField('Type:', 'Discord', true)
                                              .setTimestamp();
                                          wallchecking.send(checkedEmbed).catch((e) => {console.log(e)});

                                          //Topic messages
                                          if (c_settings.wallsTopicMsg) {
                                            wallchecking.setTopic("Last checked by: "+message.author+' ['+authorchecks+'] at '+getTime()).catch((e) => {});
                                          }

                                      } else {
                                          wallchecking.send(':green_square: The walls have been checked by '+message.author+' ['+authorchecks+'] after **'+check_time+' minutes**! ('+getTime()+')').catch((e) => {console.log(e)});
                                      }

                                      console.log('\x1b[33m'+message.author.tag+' checked the walls from discord after '+check_time+' minutes at '+getTime()+' | Wall checks are '+wall_checking_enabled);
                                      fs.writeFile(assetsPath+'sendchat.txt', 'The walls have been checked (from discord) after '+check_time+' minutes! alt0', err => {
                                          if (err) throw err;
                                      });
                                      rebootcheck = true;
                                      lastcheck = Date.now()/1000; //ms to seconds
                                      setTimeout(function() {
                                          clearInterval(wallintervalspam);
                                          wallintervalspam = setInterval(wallalert, Number(c_settings.notificationDelay));
                                      }, wallintervalmin*60000);

                                      //log last check time incase of downtime
                                      setSetting("lastcheck", Date.now(), function() {});
                                  }
                              } else if (message.channel.id == bufferchecking.id) {
                                /*
                                BUFFER CHECKED ===========================================================
                                ==========================================================================
                                ==========================================================================
                                */
                                clearInterval(bufferintervalspam);
                                bcheck_time = Date.now() / 1000;
                                bcheck_time = bcheck_time - lastbuffercheck;
                                bcheck_time = bcheck_time / 60;
                                bcheck_time = Math.round(bcheck_time);
                                bufferinterval = c_settings.bufferinterval;
                                var bufferintervalsec = bufferinterval/1000;
                                if (Number(Date.now() / 1000) - Number(lastbuffercheck) <= bufferintervalsec) {
                                    var timeleft;
                                    var altcheck_rk = Date.now()/1000 - lastbuffercheck;
                                    altcheck_rk = altcheck_rk/60;
                                    timeleft = altcheck_rk - bufferintervalmin;
                                    timeleft = Math.round(timeleft);
                                    timeleft = timeleft.toString().replace('-', '');
                                    var maybe_s;
                                    if (timeleft != '1') {
                                        maybe_s = 's';
                                    } else {maybe_s = '';}
                                    message.channel.send(':warning: '+message.author+' You can not check the buffers for another **'+timeleft+'** minute'+maybe_s+' (aprox)').catch((e) => {});
                                    return;
                                } else {
                                    //add BUFFER check to user
                                    var replace = require('replace-in-file');
                                    var user_regex =  new RegExp(message.author.id+":.*:.*", "i"); // discordid:username:wallchecks:bufferchecks
                                    var checkregex =  /.*:.*:.*:(.*)/i;
                                    if (buffer_checking_enabled) {
                                        function addcheck(match) {
                                            //we have--discordid:username:checks as the match var
                                            var currentcheck = match.match(/.*:.*:.*:(.*)/i);
                                            var newmatch = match.match(/.*:.*:/i);
                                            var newcheck = Number(currentcheck[1]) + 1;
                                            var output = currentcheck[1].replace(currentcheck[1], newmatch+newcheck)
                                            return output;
                                        }
                                        var roptions = {
                                            files: assetsPath+'users.txt',
                                            from: user_regex,
                                            to: (match) => addcheck(match)
                                        };
                                        var newchecks = replace.sync(roptions);
                                    } else {
                                        wallchecking.send('Buffer checks are off, you will not receive a check stat for this.').catch((e) => {console.log(e)});
                                    }
                                    var replace = require('replace-in-file');
                                    var authorchecks = '(Not whitelisted)';
                                    function getcheck(match) {
                                        //we have--discordid:username:checks as the match var
                                        var currentcheck = match.match(/.*:.*:.*:(.*)/i);
                                        authorchecks = currentcheck[1];
                                        if (authorchecks == 1) {
                                            authorchecks = authorchecks + ' buffer check';
                                        } else {
                                            authorchecks = authorchecks+' buffer checks';
                                        }
                                        return match;
                                    }
                                    var user_regex =  new RegExp(message.author.id+":.*:.*", "i");
                                    var roptions = {
                                        files: assetsPath+'users.txt',
                                        from: user_regex,
                                        to: (match) => getcheck(match)
                                    };
                                    var newchecks = replace.sync(roptions);
                                    if (c_settings.deleteAlerts+'' == 'true') {
                                        wallchecking.fetchMessages({
                                            limit: 3,
                                        }).then((messages) => {
                                            messages.forEach(message => {
                                                if (message.content.includes(c_settings.alertmessage)) {
                                                    try {
                                                        message.delete().catch((e) => {});
                                                    } catch (e) {}
                                                }
                                            });
                                        }).catch(err => {});
                                    }
                                    if (c_settings.checkedType+''.toLowerCase() == 'embed') {
                                        const checkedEmbed = new Discord.RichEmbed()
                                            .setColor('#00E575')
                                            .setTitle('Buffers Checked')
                                            .setThumbnail(message.author.avatarURL)
                                            .addField('Checked By:', message.author+' ['+authorchecks+']', true)
                                            .addField('Time Checked:', getTime()+'', true)
                                            .addField('Time Taken:', '**'+bcheck_time+'** minutes', true)
                                            .addField('Type:', 'Discord', true)
                                            .setTimestamp();
                                        bufferchecking.send(checkedEmbed).catch((e) => {console.log(e)});

                                        //Topic messages
                                        if (c_settings.buffersTopicMsg) {
                                          bufferchecking.setTopic("Last checked by: "+message.author+' ['+authorchecks+'] at '+getTime()).catch((e) => {});
                                        }

                                    } else {
                                        bufferchecking.send(':green_square: The buffers have been checked by '+message.author+' ['+authorchecks+'] after **'+check_time+' minutes**! ('+getTime()+')').catch((e) => {console.log(e)});
                                    }

                                    console.log('\x1b[33m'+message.author.tag+' checked the buffers from discord after '+bcheck_time+' minutes at '+getTime()+' | Wall checks are '+wall_checking_enabled);
                                    fs.writeFile(assetsPath+'sendchat.txt', 'The buffers have been checked (from discord) after '+bcheck_time+' minutes! alt0', err => {
                                        if (err) throw err;
                                    });
                                    bufferrebootcheck = true;
                                    lastbuffercheck = Date.now()/1000; //ms to seconds
                                    setTimeout(function() {
                                        clearInterval(bufferintervalspam);
                                        bufferintervalspam = setInterval(bufferalert, Number(c_settings.notificationDelay));
                                    }, bufferintervalmin*60000);

                                    //log last check time incase of downtime
                                    setSetting("lastbuffercheck", Date.now(), function() {});
                                }
                              } else {
                                message.reply(':x: That action can not be performed in this channel! Please contact a senior faction member if you think this is an error.');
                              }
                          } else {
                            message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'ftop' || message == prefix + 'f top') {
                          //ftop command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              message.reply('Getting faction top info...');
                              lastRequestedChannel = message.channel;
                              if (server == 'custom') {
                                fs.writeFile(assetsPath+'runcommand.txt', c_config.ftopCommand, err => {
                                    if (err) throw err;
                                });
                              } else {
                                fs.writeFile(assetsPath+'runcommand.txt', '/f top ', err => {
                                    if (err) throw err;
                                });
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.split(' ')[0] == prefix+'sh' || message.content.split(' ')[0] == prefix+'stronghold') {
                        if (server == 'cosmic') {
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              if (message.content.trim().split(' ')[1] != undefined) {
                                if (message.member.roles.find(role => role.name === adminRoleN) || message.member.roles.find(role => role.name === trustedRoleN)) {
                                  var arg = message.content.toLowerCase().trim().split(' ')[1].toString();
                                  if (arg == 'set') {
                                    if (message.content.trim().split(' ')[2] != undefined) {
                                      setSetting('strongholdfac', message.content.trim().split(' ')[2], function() {
                                        message.reply(':white_check_mark: Now monitoring stronghold for faction ``'+message.content.trim().split(' ')[2]+'``. Taking affect next restart!');
                                      });
                                    } else {
                                      message.reply(':x: Invalid args: ``'+prefix+'sh/stronghold set <faction>``');
                                    }
                                  } else if (arg == 'toggle') {
                                    if (message.member.roles.find(role => role.name === adminRoleN)) {
                                      toggleSetting('stronghold', function(state) {
                                        message.reply(':white_check_mark: Stronghold monitoring is now '+state+'. Taking affect next restart!\n\n:warning: **Stronghold on cosmic can get your bot banned for reading off of GUIs. Use at your own risk. This feature is not supported.**');
                                      });
                                    } else {
                                      message.channel.send(noaccess).catch((e) => {});
                                    }
                                  } else {
                                    message.reply(':x: Invalid args: ``'+prefix+'sh/stronghold | sh set <faction> | sh toggle``');
                                  }
                                } else {
                                  message.channel.send(noaccess).catch((e) => {});
                                }
                              } else {
                                message.reply('Getting stronghold info...');
                                lastRequestedChannel = message.channel;
                                fs.writeFile(assetsPath+'runcommand.txt', '/sh ', err => {
                                    if (err) throw err;
                                });
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                        }
                      }

                      if ((message == prefix + 'fwealth' && server == 'cosmic') || (message == prefix + 'f wealth' && server == 'cosmic')) {
                          //fwealth command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              message.reply('Getting faction wealth info...');
                              lastRequestedChannel = message.channel;
                              fs.writeFile(assetsPath+'runcommand.txt', '/f wealth ', err => {
                                  if (err) throw err;
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.split(' ')[0] == prefix + 'sendchat') {
                          //sendchat command
                          message.delete().catch((e) => {});
                          var commandSplit = message.content.split(' ');
                          var sendChatCommand = commandSplit[0];
                          var commandSplitMSG = message.content.split(prefix + 'sendchat ')[1];
                          var sendChatMsg = commandSplitMSG;
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              if (sendChatMsg == undefined) {
                                  message.reply('Please specify a command or message to send! \n \n :warning: **-------------------** \n```Add alt0 for: '+process.env.MUSERNAME+' \nAdd alt1 for: '+process.env.alt1username+' \nAdd alt2 for: '+process.env.alt2username+' \nAdd alt3 for: '+process.env.alt3username+' \nAdd alt4 for: '+process.env.alt4username+'```\n:exclamation: Otherwise your message will not be sent! Example: ``'+prefix+'sendchat /home afk alt1``');
                              } else {

                                  if (sendChatMsg.split(' ')[0].toString().toLowerCase().includes('pay')) {
                                    return message.reply(':x: You cannot use that command from sendchat! Use /pay instead.');
                                  }

                                  if (sendChatMsg.includes('alt0') || sendChatMsg.includes('alt1') || sendChatMsg.includes('alt2') || sendChatMsg.includes('alt3') || sendChatMsg.includes('alt4')) {
                                      message.reply('Sending the command or message: ' + sendChatMsg);
                                      fs.writeFile(assetsPath+'sendchat.txt', sendChatMsg, err => {
                                          if (err) throw err;
                                      });
                                  } else {
                                      message.reply(' \n \n :warning: **You did not specify which alt should run the message or command.** \n```Add alt0 for: '+process.env.MUSERNAME+' \nAdd alt1 for: '+process.env.alt1username+' \nAdd alt2 for: '+process.env.alt2username+' \nAdd alt3 for: '+process.env.alt3username+' \nAdd alt4 for: '+process.env.alt4username+'```\n:exclamation: Otherwise your message will not be sent! Example: ``'+prefix+'sendchat /home afk alt1``');
                                      return;
                                  }
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix+'pay') {
                          if (message.member.roles.find(role => role.name === bankRoleN)) {
                              message.delete().catch((e) => {});
                              var commandsplit = message.content.split(' ');
                              var username;
                              var amount;
                              try {
                                  var username = commandsplit[1];
                                  var amount = commandsplit[2];
                              } catch (e) {}
                              if (username == undefined || amount == undefined || amount.includes('.') || amount.includes('-') || amount.includes('+') || amount.includes('*') || amount.includes('/') || isNaN(amount)) {
                                  message.reply(':x: Incorrect use, ``'+prefix+'pay IGN Amount`` Amount can not contain a decimal.');
                                  return;
                              } else {
                                  if (server == 'custom') {
                                    if (c_config.payCommandRequiresConfirmation) {
                                      fs.writeFile(assetsPath+'sendchat.txt', c_config.payCommand.toString().replace('%username%', username).replace('%amount%', amount)+' alt0', err => {
                                          if (err) throw err;
                                          message.reply('Attempting to pay ``'+username+'`` ``$'+amount+'`` (Results in economy channel) **Player must be online**');
                                          setTimeout(function() {
                                            fs.writeFile(assetsPath+'sendchat.txt', c_config.payCommand.toString().replace('%username%', username).replace('%amount%', amount)+' alt0', err => {});
                                          }, 1550);
                                      });
                                    } else {
                                      fs.writeFile(assetsPath+'sendchat.txt', c_config.payCommand.toString().replace('%username%', username).replace('%amount%', amount)+' alt0', err => {
                                          if (err) throw err;
                                      });
                                    }
                                  } else {
                                    if (server == 'manacube' || server == 'mccentral' || server == 'mineheroes' || server == 'fantasycloud' || server == 'royalcraft') {
                                      fs.writeFile(assetsPath+'sendchat.txt', '/pay '+username+' '+amount+' alt0', err => {
                                          if (err) throw err;
                                          message.reply('Attempting to pay ``'+username+'`` ``$'+amount+'`` (Results in economy channel) **Player must be online**');
                                          setTimeout(function() {
                                            fs.writeFile(assetsPath+'sendchat.txt', '/pay '+username+' '+amount+' alt0', err => {});
                                          }, 1550);
                                      });
                                    } else {
                                      fs.writeFile(assetsPath+'sendchat.txt', '/pay '+username+' '+amount+' alt0', err => {
                                          if (err) throw err;
                                          message.reply('Attempting to pay ``'+username+'`` ``$'+amount+'`` (Results in economy channel) **Player must be online**');
                                      });
                                    }
                                  }
                              }
                          } else {
                              message.channel.send('You must have **'+bankRoleN+'** role to do this.').catch((e) => {});
                          }
                      }

                      if (message == prefix+'away') {
                        if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {

                            if (currentAwayForms.includes(message.author.id+'')) {
                              return message.channel.send(':x: '+message.author+' You already have an away form open in DMs!').catch((e) => {});
                            }

                            const awayform1 = new Discord.RichEmbed()
                                .setColor('#ede61a')
                                .setTitle('Away Form')
                                .setDescription('You are filling out this form to notify senior faction members of your absence. Please answer all of the questions correctly. This form will close in 5 minutes unless you complete it. Type \'cancel\' any time to cancel.\n\n1. What is your IGN?\n2. How long will you be gone?\n3. Why will you be gone? \n**Please send these all in one message or it will not all be sent.**')
                                .setTimestamp();

                            message.author.send(awayform1).then(msg => {
                              message.channel.send(':white_check_mark: '+message.author+' Check your DMs for an away form.');
                              currentAwayForms.push(message.author.id+'');
                              //Set 5 min to expire.
                              setTimeout(function() {
                                //If they had answered the away form, their id wouldnt be in the list.
                                //If they didnt reply after 5 min their name is still in the list which we can find here
                                if (currentAwayForms.includes(message.author.id+'')) {
                                  try {
                                    currentAwayForms.forEach(id => {
                                      currentAwayForms = [];
                                      if (id+'' != message.author.id+'') {
                                        currentAwayForms.push(id);
                                      }
                                    });
                                    message.author.send('Since you did not reply for over 5 minutes, this away form has been closed. You may open another one by using '+prefix+'away in the server.');
                                  } catch (e) {}
                                }
                              }, 5 * 60 * 1000);
                            }).catch(() => {
                              return message.channel.send(':x: '+message.author+' Please update your privacy settings so that I can DM you!');
                            });
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      //SETTINGS COMMAND -ADMIN ONLY FOR ALL
                      if (message.content == prefix + 'settings') {
                          //SETTINGS command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              const help = new Discord.RichEmbed()
                                  .setColor('#5E34B0')
                                  .setTitle(bot.user.username+' - Settings Page')
                                  .setThumbnail(bot.user.avatarURL)
                                  .setTimestamp()

                                  help.addField(prefix + 'set', '**IMPORTANT** Set different messages like the wall check messages, discord game, discord join and leave messages, etc. Run the command for more info.')

                                  help.addField(prefix + 'setup', 'Sets up the channels for the bot. (Make sure you change their permissions, you may order them any way you like the name just must be the same!)')

                                  help.addField(prefix + 'viewsettings <page>', 'View every setting of the bot. There is 5 pages. Only **'+trustedRoleN+'** and **'+adminRoleN+'** can use this command.')

                                  help.addField(prefix + 'prefix **prefix**', 'Sets the command prefix')

                                  help.addField(prefix + '<wall/buffer>interval *interval in minutes*', 'Sets the wall or buffer checking alert time. **'+adminRoleN+'** only.')

                                  help.addField(prefix + 'toggle <walls/buffers/ftop/fwealth>', 'Toggles walls, buffers, autoftop, or autofwealth. Requires restart to take affect! **'+adminRoleN+'** only.')

                                  if (server == 'cosmic') {
                                    help.addField(prefix + 'afinterval **interval**', 'Sets how often the bot checks the list of autofind users, **IN MINUTES**')

                                    help.addField(prefix + 'faction **Faction name**', 'Set faction to monitor outposts for.')
                                  }

                                  if (server != 'archon' && server != 'desteria') {
                                      help.addField(prefix + 'tps set **#** or tps **toggle**', 'Sets the value at when an alert is sent for the tps.. example: ``'+prefix+'tps set 18.22``, alerts when the tps is less than 18.22')
                                  }

                                  if (server == 'verixpvp' || server == 'desteria') {
                                    help.addField(prefix + 'faction **Faction name**', 'Set faction to monitor outposts for.')
                                  }

                                  help.setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png');
                              message.channel.send(help).catch((e) => {});
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix+'setup') {
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              message.reply('Setting up new channels...');
                              //find any channels with the existing names, delete them
                              if (bot.channels.find(channel => channel.name === 'bot-commands')) {
                                  var botCommands = bot.channels.find(channel => channel.name === 'bot-commands');
                                  botCommands.delete();
                              }
                              if (server != 'manacube' && server != 'battleclash' && server != 'saico') {
                                if (bot.channels.find(channel => channel.name === 'outpost')) {
                                    var outpostc = bot.channels.find(channel => channel.name === 'outpost');
                                    outpostc.delete();
                                }
                              }
                              if (bot.channels.find(channel => channel.name === 'ingame-chat')) {
                                  var ingamechat = bot.channels.find(channel => channel.name === 'ingame-chat');
                                  ingamechat.delete();
                              }
                              if (bot.channels.find(channel => channel.name === 'logs')) {
                                  var logsc = bot.channels.find(channel => channel.name === 'logs');
                                  logsc.delete();
                              }
                              if (bot.channels.find(channel => channel.name === 'ftop')) {
                                  var logsc = bot.channels.find(channel => channel.name === 'ftop');
                                  logsc.delete();
                              }
                              if (server == 'cosmic') {
                                if (bot.channels.find(channel => channel.name === 'fwealth')) {
                                    var logsc = bot.channels.find(channel => channel.name === 'fwealth');
                                    logsc.delete();
                                }
                                if (bot.channels.find(channel => channel.name === process.env.coreChunkChannel)) {
                                    var logsc = bot.channels.find(channel => channel.name === process.env.coreChunkChannel);
                                    logsc.delete();
                                }
                              }
                              if (server == 'cosmic') {
                                if (bot.channels.find(channel => channel.name === 'find-channel')) {
                                    var findchn = bot.channels.find(channel => channel.name === 'find-channel');
                                    findchn.delete();
                                }
                                if (bot.channels.find(channel => channel.name === 'stronghold')) {
                                    var shchn = bot.channels.find(channel => channel.name === 'stronghold');
                                    shchn.delete();
                                }
                              }
                              if (bot.channels.find(channel => channel.name === 'away')) {
                                  var awy = bot.channels.find(channel => channel.name === 'away');
                                  awy.delete();
                              }
                              if (bot.channels.find(channel => channel.name === process.env.wallsChannel+'')) {
                                  var wallchecking = bot.channels.find(channel => channel.name === process.env.wallsChannel+'');
                                  wallchecking.delete();
                              }
                              if (bot.channels.find(channel => channel.name === process.env.buffersChannel+'')) {
                                  var bufferchecking = bot.channels.find(channel => channel.name === process.env.buffersChannel+'');
                                  bufferchecking.delete();
                              }
                              if (server != 'archon' && server != 'royalcraft' && server != 'battleclash' && server != 'mccentral' && server != 'saico') {
                                if (bot.channels.find(channel => channel.name === 'tps')) {
                                    var tpsc = bot.channels.find(channel => channel.name === 'tps');
                                    tpsc.delete();
                                }
                              }
                              if (bot.channels.find(channel => channel.name === 'economy')) {
                                  var economyc = bot.channels.find(channel => channel.name === 'economy');
                                  economyc.delete();
                              }
                              //make all new channels
                              try {
                                message.guild.createChannel(process.env.wallsChannel+'', "text").then(() => {
                                  message.guild.createChannel(process.env.buffersChannel+'', "text").then(() => {
                                    if (server == 'cosmic') {message.guild.createChannel(process.env.coreChunkChannel+'', "text").then(() => {});}
                                      message.guild.createChannel("bot-commands", "text").then(() => {
                                        message.guild.createChannel("ftop", "text").then(() => {
                                          if (server == 'cosmic') message.guild.createChannel("fwealth", "text");
                                          message.guild.createChannel("ingame-chat", "text").then(() => {
                                              message.guild.createChannel("economy", "text").then(() => {
                                                  if (server == 'cosmic') message.guild.createChannel("find-channel", "text");
                                                    if (server == 'cosmic') message.guild.createChannel("stronghold", "text");
                                                      if (server != 'manacube' && server != 'battleclash' && server != 'saico' && server != 'convict') {message.guild.createChannel("outpost", "text").then(() => {});}
                                                          if (server != 'archon' && server != 'royalcraft' && server != 'mccentral' && server != 'saico'  && server != 'vanity' && server != 'convict') message.guild.createChannel("tps", "text").then(() => {});
                                                            message.guild.createChannel("away", "text").then(() => {
                                                              message.guild.createChannel("logs", "text").then(() => {
                                                                  //Create weewoo channel and apps channel
                                                                  message.guild.createChannel(process.env.weewooChannel+"", "text").then(() => {
                                                                    message.guild.createChannel(process.env.applicationChannel+"", "text").then(() => {});
                                                                  });
                                                                  setSetting('setup', true, function(s) {});
                                                                  botIsSetup = true;
                                                                  message.reply(':white_check_mark: Created all channels, you may want to add permissions to them. **PLEASE RUN THE COMMAND '+prefix+'set**');
                                                                  message.channel.send(':warning: The roles for this bot are: \n`'+adminRoleN+'` - Commands like /restart, /sendchat, /broadcast, (And more) \n`'+trustedRoleN+'` - Commands like /raid toggle, /outpost toggle, /whitelist (And more) \n`'+useRoleN+'` - All basic commands like /ftop, /fwealth, /bal, /fwho (And more) \n :exclamation: You must have a role with one of those names! Edit the config to change the roles.');
                                                                  message.channel.send('Setup the wall check interval with ``'+prefix+'wallinterval <minutes>`` or bufferinterval - Edit the alert messages using '+prefix+'set. \n Set the bot prefix with ``'+prefix+'prefix <prefix>`` \n Setup custom welcome/leave message with '+prefix+'set discordjoinmsg or discordleavemsg\nSet your join command with '+prefix+'set joincommand <command>\n\nThen run ``'+prefix+'restart``.\n\n:white_check_mark: Setup complete. Please use "'+prefix+'c" to rename these channels.');
                                                                  economyc = bot.channels.find(channel => channel.name === 'economy');
                                                                  var extr = "";
                                                                  if (server == 'cosmic') {extr = "When you pay the bot, cosmic is weird so the name has to be exact, case sensitive!";}
                                                                  economyc.send('Any payments to the bot show up here. To pay someone from the bot you can do ``'+prefix+'pay IGN Amount``. Test whitelisted users by having them pay the bot $1, if they are whitelisted it shows up here. '+extr);
                                                                  wallchecking = bot.channels.find(channel => channel.name === process.env.wallsChannel+'');
                                                                  wallchecking.send('Type ``'+prefix+'toggle walls`` till it is true, then ``'+prefix+'restart`` and finally ``'+prefix+'checked`` Wall checking should be setup. Same for buffers channel (use '+prefix+'toggle buffers)');
                                                                  ftopchannel = bot.channels.find(channel => channel.name === 'ftop');
                                                                  var cextr = "";
                                                                  if (server == 'cosmic') {cextr = "Same commands for fwealth but ftop replaced with fwealth."}
                                                                  ftopchannel.send('Use `'+prefix+'autoftop <minutes>` to set how often ftop is auto posted here. Use `'+prefix+'toggle ftop` to toggle auto posting. '+cextr);
                                                                  awaychannel = bot.channels.find(channel => channel.name === 'away');
                                                                  awaychannel.send('Any '+prefix+'away forms show up here.');
                                                                  if (server == 'cosmic') {
                                                                    strongholdChannel = bot.channels.find(channel => channel.name === 'stronghold');
                                                                    strongholdChannel.send('Use '+prefix+'sh or stronghold for stronghold info. Use '+prefix+'sh set <faction> to set the faction to monitor, and finally use '+prefix+'sh toggle to toggle stronghold alerts. To configure stronghold intervals, and messages, look at '+prefix+'set.');
                                                                  }

                                                              });
                                                          });
                                                  });
                                                  });
                                                  });
                                          });
                                  });
                                });
                              } catch (e) {
                                  message.channel.send(':x: Could not complete setup! ``'+e+'``').catch((e) => {});
                                  return;
                              }
                          } else {
                              message.channel.send(noaccess).then(() => {
                                  message.channel.send('Since this is the setup command, please make sure to fully read the documentation and setup the config correctly. The roles for this bot are: \n`'+adminRoleN+'` - Commands like /restart, /sendchat, /broadcast (And more) \n`'+trustedRoleN+'` - Commands like /raid toggle, /outpost toggle, /whitelist (And more) \n`'+useRoleN+'` - All basic commands like /ftop, /fwealth, /bal, /fwho (And more)\n :exclamation: You must have a role with one of those names! Edit the config to change the roles.');
                              }).catch((e) => {});
                          }
                      }

                      if (message.content.split(' ')[0] == prefix + 'faction') {
                          //faction command
                          message.delete().catch((e) => {});
                          var commandSplit = message.content.split(' ');
                          var command = commandSplit[0];
                          var faction = commandSplit[1];

                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              if (faction == undefined) {
                                  message.reply('Please specify a faction!');
                              } else {
                                  message.reply('Faction to monitor outposts on is now ``' + faction+'``');
                                  //update settings.json
                                  setSetting("factionName", faction, function() {});
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.split(' ')[0] == prefix + 'prefix') {
                          //prefix command
                          message.delete().catch((e) => {});
                          var commandSplit = message.content.split(' ');
                          var command = commandSplit[0];
                          var newprefix = commandSplit[1];

                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              if (newprefix == undefined) {
                                  message.reply('Please specify a prefix!');
                              } else {
                                  message.reply('Prefix is now ' + newprefix);
                                  //update settings.json
                                  setSetting("prefix", newprefix, function() {});
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.split(' ')[0] == prefix + 'set') {
                        if (message.member.roles.find(role => role.name === adminRoleN)) {
                          message.delete().catch((e) => {});
                          if (message.content.split(' ')[1] === undefined) {
                            const help = new Discord.RichEmbed()
                                .setColor('#5E34B0')
                                .setTitle(bot.user.username+' - Configure')
                                .setTimestamp()
                                .setDescription('Options for '+prefix+'set are: \n**discordwallsmessage, discordbuffersmessage, discordalertmention, deletealerts, checkedtype, minecraftwallsmessage, minecraftbuffersmessage, discordweewoomsg, minecraftweewoomsg, discordweewoointerval, minecraftweewoointerval, game, discordjoinmsg, discordleavemsg, chattype, timezone, notificationdelay, notifyOnlineAfterWallsPass, notifyOnlineAfterBuffersPass, discordNotificationOffset, clearCheckChannels, fancyFtop, applicationsenabled, applyblacklist, denyifapplied, acceptedrole, acceptedremovedrole, deleteDeniedApps, closeappsafter, logEverything, joincommand, discordstrongholdinterval, minecraftstrongholdinterval, discordstrongholdmsg, minecraftstrongholdmsg, strongholdalerttype, economy, publicChat, outpostSpamInterval, wallsTopicMsg, buffersTopicMsg, ecoTopicMsg, taskChannel, antiAfk, coreChunkAlerts, coreAlertTime, playtime, blackmarketRole, physics**\n\nRun '+prefix+'set <option> for more info on what each one does.')
                                .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png');
                            message.channel.send(help).catch((e) => {});
                          } else if (message.content.split(' ')[1].toString() == 'game') {
                              var newGame = message.content.split(prefix + 'set game ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a game! This command will set the game the discord bot is playing.');
                              } else {
                                  setSetting('game', newGame, function() {
                                    message.reply(':white_check_mark: The bot will now be playing **' + newGame + '**, restarting -please wait!');
                                    fs.writeFile(assetsPath+'restart.txt', '.', function() {
                                        console.log('Restarting...');
                                    });
                                  });
                              }
                          } else if (message.content.split(' ')[1].toString() == 'discordjoinmsg' || message.content.split(' ')[1].toString() == 'discordleavemsg') {
                              var newMsg = message.content.split(prefix + 'set discordjoinmsg ')[1] || message.content.split(prefix + 'set discordleavemsg ')[1];
                              if (newMsg == undefined) {
                                  message.reply('Please specify a message! This command will set the message for when somebody joins/leaves the discord.\n:exclamation: Use {user} for the user mention. Use {tag} for their discord name as text. Simply type `none` for no messages on join/leave.');
                              } else {
                                  setSetting(message.content.split(' ')[1].toString().trim(), newMsg, function() {
                                    var type = "leave";
                                    if (message.content.split(' ')[1] == 'discordjoinmsg') type = "welcome";
                                    message.reply(':white_check_mark: The '+type+' message is now '+newMsg+'. This may require a restart to take affect.');
                                  });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'chattype') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please specify a chat type! This command will set if the bot & alts talk in either faction or ally chat! Ex: set chattype f. \nOptions: (\'a\', \'f\')');
                              } else if (newGame.toString().toLowerCase().trim() == 'a' || newGame.toString().toLowerCase().trim() == 'f') {
                                  setSetting('chatType', newGame.toLowerCase(), function() {
                                    var type = "faction";
                                    if (newGame.toLowerCase() == 'a') {
                                      type = "ally";
                                    }
                                    message.reply(':white_check_mark: The bot will chat in **' + type + '** chat. This may require a restart to take affect.');
                                  });
                              } else {
                                message.reply('Please specify a chat type! This command will set if the bot & alts talk in either faction or ally chat! Ex: set chattype f. \nOptions: (\'a\', \'f\')');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'timezone') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please specify a timezone! This command will set the timezone for logs. Please use exact timezone names. (CST is \'America/Chicago\' EST is \'America/New_York\') A list of valid types can be found here: https://stackoverflow.com/questions/38399465/how-to-get-list-of-all-timezones-in-javascript (Scroll down some)');
                              } else {
                                  setSetting('timezone', newGame, function() {
                                    message.reply(':white_check_mark: The log timezones are now in '+newGame+' This may require a restart to take affect.');
                                  });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'notificationdelay') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify a delay! This command will set the delay between reminders to check walls/buffers. This is in MS! 1 second = 1000 ms.');
                              } else {
                                if (newGame < 7000) {
                                  message.reply(':warning: Going below 7 seconds may cause the bot to be kicked for spam.');
                                }
                                setSetting('notificationDelay', newGame, function() {
                                  message.reply(':white_check_mark: The notification delay is now '+newGame+'ms. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'notifyonlineafterwallspass') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify an amount! This command will set the delay for after WALLS pass X minutes, start posting the '+prefix+'online command, and start mentioning those that are online & whitelisted.\n**In minutes!**');
                              } else {
                                setSetting('notifyOnlineAfterWallsPass', newGame, function() {
                                  message.reply(':white_check_mark: Online count will be posted after WALLS pass '+newGame+' minutes. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'notifyonlineafterbufferspass') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify an amount! This command will set the delay for after BUFFERS pass X minutes, start posting the '+prefix+'online command, and start mentioning those that are online & whitelisted.\n**In minutes!**');
                              } else {
                                setSetting('notifyOnlineAfterBuffersPass', newGame, function() {
                                  message.reply(':white_check_mark: Online count will be posted after BUFFERS pass '+newGame+' minutes. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'discordnotificationoffset') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify an amount! This command will set the delay discord starts alerting walls and buffers after the in-game side does! Ex: set discordNotificationOffset 5 - If ingame starts spamming to check at 5 min, discord will start at 10 min.');
                              } else {
                                setSetting('discordNotificationOffset', newGame, function() {
                                  message.reply(':white_check_mark: The discord is now offset from in-game spam by '+newGame+' minutes. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'clearcheckchannels') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if any messages posted in the walls & buffers channels will be deleted. (Excludes bot messages) This helps keep them clean.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('clearCheckChannels', type, function() {
                                  message.reply(':white_check_mark: Clearing walls/buffers channels messages are now '+type+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set if any messages posted in the walls & buffers channels will be deleted. (Excludes bot messages) This helps keep them clean.');
                              }
                          } else if (message.content.split(' ')[1].toString() == 'discordwallsmessage') {
                              var newGame = message.content.split(prefix+'set discordwallsmessage ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a message! This command sets the discord message for when WALL reminders go off.\n:exclamation: Use {prefix} for the bot prefix. Use {time} for minutes unchecked.');
                              } else {
                                setSetting('alertmessage', newGame, function() {
                                  message.reply(':white_check_mark: The WALLS alert message for discord is now ``'+newGame+'``. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString() == 'discordbuffersmessage') {
                              var newGame = message.content.split(prefix+'set discordbuffersmessage ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a message! This command sets the discord message for when BUFFER reminders go off.\n:exclamation: Use {prefix} for the bot prefix. Use {time} for minutes unchecked.');
                              } else {
                                setSetting('bufferalertmessage', newGame, function() {
                                  message.reply(':white_check_mark: The BUFFERS alert message for discord is now ``'+newGame+'``. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'discordalertmention') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either \'roles\' or \'everyone\'! This command will set when discord wall reminders go off, if it @\'s everyone or @\'s roles. The roles mentioned are the permission roles for the bot.');
                              } else if (newGame.toString().toLowerCase().trim() == 'roles' || newGame.toString().toLowerCase().trim() == 'everyone') {
                                setSetting('alerttype', '@'+newGame.toString().toLowerCase().trim(), function() {
                                  message.reply(':white_check_mark: The alert mentions for walls & buffers messages are now '+newGame+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either \'roles\' or \'everyone\'! This command will set when discord wall/buffers reminders go off, if it @\'s everyone or @\'s roles. The roles mentioned are the permission roles for the bot.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'deletealerts') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if wall checking reminders sent in walls/buffers get deleted once a new one posts. This means the mentions will still stack up, but there will only show 1 message to check walls/buffers at once.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('deleteAlerts', type, function() {
                                  message.reply(':white_check_mark: Removing wall/buffer reminders is now '+type+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set if wall checking reminders sent in walls/buffers get deleted once a new one posts. This means the mentions will still stack up, but there will only show 1 message to check walls/buffers at once.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'checkedtype') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either \'msg\' or \'embed\'! This command will set after someone checks walls, if it sends a fancy embed or plain text message. Goes for if you check from in-game or discord.');
                              } else if (newGame.toString().toLowerCase().trim() == 'msg' || newGame.toString().toLowerCase().trim() == 'embed') {
                                setSetting('checkedType', newGame.toString().toLowerCase().trim(), function() {
                                  message.reply(':white_check_mark: The type of message for checking walls is now a '+newGame+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either \'msg\' or \'embed\'! This command will set after someone checks walls, if it sends a fancy embed or plain text message. Goes for if you check from in-game or discord.');
                              }
                          } else if (message.content.split(' ')[1].toString() == 'minecraftwallsmessage') {
                              var newGame = message.content.split(prefix+'set minecraftwallsmessage ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a message! This command sets the Minecraft message for when WALL reminders go off.\n:exclamation: Use {botname} for the bot\'s minecraft username. Use {time} for minutes unchecked.');
                              } else {
                                setSetting('mcalertmessage', newGame, function() {
                                  message.reply(':white_check_mark: The WALLS alert message for Minecraft is now ``'+newGame+'``. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString() == 'minecraftbuffersmessage') {
                              var newGame = message.content.split(prefix+'set minecraftbuffersmessage ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a message! This command sets the Minecraft message for when BUFFER reminders go off.\n:exclamation: Use {botname} for the bot\'s minecraft username. Use {time} for minutes unchecked.');
                              } else {
                                if (newGame.length > 120) {
                                  message.reply(':warning: That message is too long and may get the bot kicked for spam!');
                                }
                                setSetting('mcbufferalertmessage', newGame, function() {
                                  message.reply(':white_check_mark: The BUFFER alert message for Minecraft is now ``'+newGame+'``. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'fancyftop') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if F-top/F-wealth is plain text, or a structured fancy embed with fields.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('fancyFtop', type, function() {
                                  message.reply(':white_check_mark: FancyFtop is now '+type+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set if F-top/F-wealth is plain text, or a structured fancy embed with fields.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'applicationsenabled') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if the '+prefix+'apply command is enabled.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('applicationsEnabled', type, function() {
                                  if (type) {
                                    type = 'enabled';
                                  } else {type = 'disabled'}
                                  message.reply(':white_check_mark: The apply command is now '+type+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set if the '+prefix+'apply command is enabled.');
                              }
                          } else if (message.content.split(' ')[1].toString() == 'applyblacklist') {
                              var newGame = message.content.split(prefix+'set applyblacklist ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a role **NAME**! This command sets the role NAME that is not allowed to use '+prefix+'apply.');
                              } else {
                                setSetting('blacklistedFromApply', newGame, function() {
                                  message.reply(':white_check_mark: The role **NAME** blacklisted from '+prefix+'apply is now \''+newGame+'\' This may require a restart to take affect.\n:warning: Please make sure you typed the name, NOT a MENTION!');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'denyifapplied') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will deny someone from using '+prefix+'apply if they have already submitted an application. You have to delete the app from the applications channel before they can apply again.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('denyIfAppliedAlready', type, function() {
                                  message.reply(':white_check_mark: Denying users that already submitted an application is now '+type+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will deny someone from using '+prefix+'apply if they have already submitted an application. You have to delete the app from the applications channel before they can apply again.');
                              }
                          } else if (message.content.split(' ')[1].toString() == 'acceptedrole') {
                              if (message.mentions.roles === undefined || message.mentions.roles.length < 1) {
                                  message.reply('Please mention 1+ valid roles! This command sets the role(s) that the user is given if their application is accepted.\nUse \'none\' for no role.');
                              } else {
                                var roleIds = "";
                                message.mentions.roles.forEach(m => {
                                  roleIds += m.id+"-";
                                });

                                setSetting('acceptedRole', roleIds, function() {
                                  message.reply(':white_check_mark: The role(s) given on an application being accepted have been set. This may require a restart to take affect.\n:warning: Please make sure you mentioned the roles!');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString() == 'acceptedremovedrole') {
                              if (message.mentions.roles === undefined || message.mentions.roles.length < 1) {
                                  message.reply('Please mention 1+ valid roles! This command sets the role(s) that the user is removed from if their application is accepted.\nUse \'none\' for no role.');
                              } else {
                                var roleIds = "";
                                message.mentions.roles.forEach(m => {
                                  roleIds += m.id+"-";
                                });

                                setSetting('acceptedRemovedRoles', roleIds, function() {
                                  message.reply(':white_check_mark: The role(s) removed on an application being accepted have been set. This may require a restart to take affect.\n:warning: Please make sure you mentioned the roles!');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'deletedeniedapps') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if applications that get denied are deleted from the apps channel.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('deleteDeniedApps', type, function() {
                                  message.reply(':white_check_mark: Deleting denied applications are now '+type+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set if applications that get denied are deleted from the apps channel.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'closeappsafter') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify a delay in **MINUTES**! This command will set the delay before a users application is closed. This is time TOTAL, so make sure they have enough time to fill out your application.');
                              } else {
                                setSetting('closeAppsAfter', newGame, function() {
                                  message.reply(':white_check_mark: Apps will now be closed after '+newGame+' minutes. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'logeverything') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if every single chat message the bot receives is logged in LOG.txt. Disable if your pc is slow, as it has caused issues for some people.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('logEverything', type, function() {
                                  message.reply(':white_check_mark: Logs are now '+type+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set if every single chat message the bot receives is logged in LOG.txt. Disable if your pc is slow, as it has caused issues for some people.');
                              }
                          } else if (message.content.split(' ')[1].toString() == 'joincommand') {
                              var newGame = message.content.split(prefix+'set joincommand ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a command! This command is ran when the bot & alts first log into the server.');
                              } else {
                                if (newGame.length > 120) {
                                  message.reply(':warning: That message is too long and may get the bot kicked for spam!');
                                }
                                setSetting('joincommand', newGame, function() {
                                  message.reply(':white_check_mark: The join command is now ``'+newGame+'``. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString() == 'discordweewoomsg') {
                              var newGame = message.content.split(prefix+'set discordweewoomsg ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a message! This command sets the message for when weewoo is spamming.\n:exclamation: Use {prefix} for the bot prefix.');
                              } else {
                                setSetting('weewoomsg', newGame, function() {
                                  message.reply(':white_check_mark: The weewoo message for discord is now ``'+newGame+'``. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString() == 'minecraftweewoomsg') {
                              var newGame = message.content.split(prefix+'set minecraftweewoomsg ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a message! This command sets the message for when weewoo is spamming in-game chat.\n:exclamation: Use {botname} for the bot username. Use \'none\' for no message in-game.');
                              } else {
                                setSetting('mcweewoomsg', newGame, function() {
                                  message.reply(':white_check_mark: The weewoo message for minecraft is now ``'+newGame+'``. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'discordweewoointerval') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify an amount! This command will set the interval an alert will be sent while weewoo is enabled. **IN MS!**. 1 second = 1000 ms.');
                              } else {
                                if (newGame > 3500) {
                                  message.reply(':warning: Going below 3 seconds may start causing the discord bot to get rate limited for spam!');
                                }
                                setSetting('weewoointerval', newGame, function() {
                                  message.reply(':white_check_mark: The discord spam for weewoo is now '+newGame+'ms. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'minecraftweewoointerval') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify an amount! This command will set the interval an alert will be sent in-game while weewoo is enabled. **IN MS!**. 1 second = 1000 ms.');
                              } else {
                                if (newGame > 3500) {
                                  message.reply(':warning: Going below 3 seconds may start causing the minecraft bot to get kicked for spam!');
                                }
                                setSetting('minecraftweewoointerval', newGame, function() {
                                  message.reply(':white_check_mark: The minecraft spam for weewoo is now '+newGame+'ms. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'discordstrongholdinterval') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify an amount! This command will set the interval for when an alert will be sent in discord while stronghold is not capped. **IN MS!**. 1 second = 1000 ms.');
                              } else {
                                if (newGame > 3500) {
                                  message.reply(':warning: Going below 3 seconds may start causing the discord bot to get rate limited for spam!');
                                }
                                setSetting('strongholdinterval', newGame, function() {
                                  message.reply(':white_check_mark: The discord spam for stronghold is now '+newGame+'ms. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'minecraftstrongholdinterval') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify an amount! This command will set the interval for when an alert will be sent in-game while stronghold is not capped. **IN MS!**. 1 second = 1000 ms.');
                              } else {
                                if (newGame > 3500) {
                                  message.reply(':warning: Going below 3 seconds may start causing the minecraft bot to be kicked for spam!');
                                }
                                setSetting('mcstrongholdinterval', newGame, function() {
                                  message.reply(':white_check_mark: The minecraft spam for stronghold is now '+newGame+'ms. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString() == 'discordstrongholdmsg') {
                              var newGame = message.content.split(prefix+'set discordstrongholdmsg ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a message! This command sets the message for when stronghold is spamming discord chat.\n:exclamation: Use {prefix} for the bot prefix. Use {cap} for percent capped. Use {type} for type of stronghold. Use \'none\' for no message.');
                              } else {
                                setSetting('strongholdmsg', newGame, function() {
                                  message.reply(':white_check_mark: The stronghold message for discord is now ``'+newGame+'``. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString() == 'minecraftstrongholdmsg') {
                              var newGame = message.content.split(prefix+'set minecraftstrongholdmsg ')[1];
                              if (newGame == undefined) {
                                  message.reply('Please specify a message! This command sets the message for when stronghold is spamming in-game chat.\n:exclamation: Use {cap} for percent capped. Use {type} for type of stronghold. Use \'none\' for no message in-game.');
                              } else {
                                setSetting('mcstrongholdmsg', newGame, function() {
                                  message.reply(':white_check_mark: The stronghold message for minecraft is now ``'+newGame+'``. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'strongholdalerttype') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either \'roles\', \'everyone\', or \'none\'! This command will set when discord stronghold spam goes off, if it @\'s everyone or @\'s roles (\'none\' for no mentions). The roles mentioned are the permission roles for the bot.');
                              } else if (newGame.toString().toLowerCase().trim() == 'roles' || newGame.toString().toLowerCase().trim() == 'everyone') {
                                setSetting('strongholdalert', '@'+newGame.toString().toLowerCase().trim(), function() {
                                  message.reply(':white_check_mark: The alert mentions for walls & buffers messages are now '+newGame+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either \'roles\', \'everyone\', or \'none\'! This command will set when discord stronghold spam goes off, if it @\'s everyone or @\'s roles (\'none\' for no mentions). The roles mentioned are the permission roles for the bot.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'economy') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if when the bot is paid, if payments show up in the economy channel.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('economy', type, function() {
                                  message.reply(':white_check_mark: Showing payments in the economy channel are now '+type+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set if when the bot is paid, if payments show up in the economy channel.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'publicchat') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if #ingame-chat channel shows public chat.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('publicChat', type, function() {
                                  if (type) {
                                    type = 'enabled';
                                  } else {type = 'disabled'}
                                  message.reply(':white_check_mark: Public chat logging is now '+type+'. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set if #ingame-chat channel shows public chat.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'outpostspaminterval') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify a delay! This command will set the delay between outpost alerts. This is in MS! 1 second = 1000 ms.');
                              } else {
                                if (newGame < 2000) {
                                  message.reply(':warning: Going below 2 seconds may cause the bot to be kicked for spam.');
                                }
                                setSetting('outpostspaminterval', newGame, function() {
                                  message.reply(':white_check_mark: The alert delay is now '+newGame+'ms. This may require a restart to take affect.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'wallstopicmsg') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set the topic message (top of the channel) will say who checked last and when.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('wallsTopicMsg', type, function() {
                                  if (type) {
                                    type = 'enabled';
                                  } else {type = 'disabled'}
                                  message.reply(':white_check_mark: Topic messages are now '+type+' for walls. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set the topic message (top of the channel) will say who checked last and when.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'bufferstopicmsg') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set the topic message (top of the channel) will say who checked last and when.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('buffersTopicMsg', type, function() {
                                  if (type) {
                                    type = 'enabled';
                                  } else {type = 'disabled'}
                                  message.reply(':white_check_mark: Topic messages are now '+type+' for buffers. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set the topic message (top of the channel) will say who checked last and when.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'ecotopicmsg') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set the topic message (top of the channel) will say the top payment to the bot, the latest payment, and when.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('ecoTopicMsg', type, function() {
                                  if (type) {
                                    type = 'enabled';
                                  } else {type = 'disabled'}
                                  message.reply(':white_check_mark: Topic messages are now '+type+' for economy channel. This may require a restart to take affect.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set the topic message (top of the channel) will say who checked last and when.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'taskchannel') {
                            if (message.content.split(' ')[2] === undefined) {
                              message.reply(':x: Please mention a channel. (Type a # and channel name and select it) This will set the channel that automated task outputs go to.');
                            } else {
                              var taskChannelNew = message.content.split(' ')[2].toString().replace('<#', '').replace('>', '');
                              if(!thisguild.channels.get(taskChannelNew+'')) {
                                message.reply('That is an invalid channel!');
                              } else {
                                var taskChnName = thisguild.channels.get(taskChannelNew+'').name;
                                setSetting('taskChannelName', taskChnName, function() {
                                  message.reply(':white_check_mark: Automated task outputs now go into **'+taskChnName+'** ('+taskChannelNew+') This may require a restart to take affect.');
                                });
                              }
                            }

                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'antiafk') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if the bot does the anti afk command. (NOTE: **THIS IS USED FOR TPS ALERTS!**)');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('antiAfk', type, function() {
                                  if (type) {
                                    type = 'enabled';
                                  } else {type = 'disabled'}
                                  message.reply(':white_check_mark: The anti-afk command is now '+type+'. This may require a restart to take affect.');
                                });
                              } else {
                                  message.reply('Please use either true or false! This command will set if the bot does the anti afk command. (NOTE: **THIS IS USED FOR TPS ALERTS!**)');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'corechunkalerts') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if when a core chunk is raided a timer will be set which will @ you after the raid cooldown is over.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('coreChunks', type, function() {
                                  message.reply(':white_check_mark: Core chunk alerts are now '+type+'. Taking affect next restart.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set if when a core chunk is raided a timer will be set which will @ you after the raid cooldown is over.');
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'corealerttime') {
                              var newGame = Number(message.content.split(' ')[2]);
                              if (newGame == undefined || isNaN(newGame) || newGame.toString().includes('.') || newGame.toString().includes('-') || newGame.toString().includes('/') || newGame.toString().includes('*')) {
                                  message.reply('Please specify an amount! This command will set the time a core chunk alert is sent. If this is 30, an alert will be sent if a faction goes off raid cooldown in 30 minutes. (If coreChunkAlerts are enabled)\n:warning: This is in minutes!');
                              } else {
                                setSetting('coreAlertTime', newGame, function() {
                                  message.reply(':white_check_mark: Core chunks will now be alerted if '+newGame+' minutes from being able to be raided.');
                                });
                              }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'playtime') {
                              var newGame = message.content.split(' ')[2];
                              if (newGame == undefined) {
                                  message.reply('Please use either true or false! This command will set if whitelisted players playtime is tracked.');
                              } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                                var type = true;
                                if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                                setSetting('playtime', type, function() {
                                  message.reply(':white_check_mark: Playtime tracking is now '+type+'. Taking affect next restart.');
                                });
                              } else {
                                message.reply('Please use either true or false! This command will set if whitelisted players playtime is tracked.');
                              }
                          } else if (message.content.split(' ')[1].toString() == 'blackmarketrole') {
                            if (message.mentions.roles === undefined || message.mentions.roles.length < 1) {
                                message.reply('Please mention 1+ valid roles! This command sets the role that is mentioned if the blackmarket restock had slot bot tickets. Use \'none\' for no role.');
                            } else {
                              if (message.content.split(' ')[2] === 'none') {
                                setSetting('bmRole', 'none', function() {
                                  message.reply(':white_check_mark: The role mentioned for blackmarket restock has been set.');
                                });
                              } else {
                                try {
                                  setSetting('bmRole', message.mentions.roles.first().id, function() {
                                    message.reply(':white_check_mark: The role mentioned for blackmarket restock has been set.');
                                  });
                                } catch (e) {
                                  message.reply('Please mention 1+ valid roles! This command sets the role that is mentioned if the blackmarket restock had slot bot tickets. Use \'none\' for no role.');
                                }
                              }
                            }
                          } else if (message.content.split(' ')[1].toString().toLowerCase() == 'physics') {
                            var newGame = message.content.split(' ')[2];
                            if (newGame == undefined) {
                                message.reply('Please use either true or false! This command will set if the bot will have physics (Will it float or not) Setting this to false can make some servers kick you for flying!');
                            } else if (newGame.toString().toLowerCase().trim() == 'true' || newGame.toString().toLowerCase().trim() == 'false') {
                              var type = true;
                              if (newGame.toString().toLowerCase().trim() == 'false') type = false;
                              setSetting('physics', type, function() {
                                message.reply(':white_check_mark: Physics are now '+type+'. Taking affect next restart.');
                              });
                            } else {
                              message.reply('Please use either true or false! This command will set if the bot will have physics (Will it float or not) Setting this to false can make some servers kick you for flying!');
                            }
                          } else {
                            const help = new Discord.RichEmbed()
                                .setColor('#5E34B0')
                                .setTitle(bot.user.username+' - Configure')
                                .setTimestamp()
                                .setDescription('Options for '+prefix+'set are: \n**discordwallsmessage, discordbuffersmessage, discordalertmention, deletealerts, checkedtype, minecraftwallsmessage, minecraftbuffersmessage, discordweewoomsg, minecraftweewoomsg, discordweewoointerval, minecraftweewoointerval, game, discordjoinmsg, discordleavemsg, chattype, timezone, notificationdelay, notifyOnlineAfterWallsPass, notifyOnlineAfterBuffersPass, discordNotificationOffset, clearCheckChannels, fancyFtop, applicationsenabled, applyblacklist, denyifapplied, acceptedrole, acceptedremovedrole, deleteDeniedApps, closeappsafter, logEverything, joincommand, discordstrongholdinterval, minecraftstrongholdinterval, discordstrongholdmsg, minecraftstrongholdmsg, strongholdalerttype, economy, publicChat, outpostSpamInterval, wallsTopicMsg, buffersTopicMsg, ecoTopicMsg, taskChannel, antiAfk, coreChunkAlerts, coreAlertTime, playtime, blackmarketRole, physics**\n\nRun '+prefix+'set <option> for more info on what each one does.')
                                .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png');
                            message.channel.send(':warning: Unknown setting!', help).catch((e) => {});
                          }
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message.content.split(' ')[0].toString().toLowerCase() == prefix+'task') {
                        message.delete().catch((e) => {});
                        if (message.member.roles.find(role => role.name === adminRoleN)) {
                          var arg = message.content.split(' ')[1];

                          if (arg === undefined) {
                            return message.reply(":x: Invalid args, ``"+prefix+"task <list> | task <add> <interval> <returnsOutput> <command> | task <remove> <id>``");
                          }

                          if (arg == 'list') {
                            if (c_settings.tasks.length == 0) {
                              message.channel.send('There are no automated tasks on the list. Add with `'+prefix+'task add`').catch((e) => {});
                            } else {
                              var taskIndex = 1;
                              var tasksAp = "";
                              c_settings.tasks.forEach(task => {
                                tasksAp += '\nID: '+taskIndex+' | '+task.toString();
                                taskIndex++;
                              });
                              message.channel.send('Current Automated Tasks: \n```\n'+tasksAp+'```').catch((e) => {});
                            }
                          } else if (arg == 'add') {
                            //task <add> <interval> <returnsOutput> <command>
                            var taskInterval = message.content.split(' ')[2];
                            var returnsOutput = message.content.split(' ')[3];
                            if (taskInterval === undefined || isNaN(Number(taskInterval)) || Number(taskInterval) < 5 || taskInterval.includes('*') || taskInterval.includes('-') || taskInterval.includes('+') || taskInterval.includes('/') || taskInterval.includes('.')) {
                              message.channel.send('Interval must be a number in **MINUTES**! Interval is how often the bot does this command. Must be at least 5 minutes.');
                            } else {
                              if (returnsOutput === undefined) {
                                message.channel.send('Please specify if the command returns output or not. This means if it is a command like /bal, or /fwho it will return the output to the taskChannel (Set with '+prefix+'set)\nUse true or false.');
                              } else {
                                if (returnsOutput.toString().toLowerCase().trim() == 'true' || returnsOutput.toString().toLowerCase().trim() == 'false') {
                                  //Interval was correct, and returnsOutput was true or false
                                  taskInterval = Number(taskInterval)*60*1000; //To ms
                                  var taskReturnsOutput = true;
                                  if (returnsOutput.toString().toLowerCase().trim() == 'false') {
                                    taskReturnsOutput = false;
                                  }

                                  if (message.content.split(' ')[4] === undefined) {
                                    message.reply('Please specify a command to be executed. - task <add> <interval> <returnsOutput> <command> ');
                                  } else {
                                    var taskExec = message.content.toString().replace(message.content.split(' ')[0]+' '+message.content.split(' ')[1]+' '+message.content.split(' ')[2]+' '+message.content.split(' ')[3], '');
                                    fs.readFile(assetsPath+'settings.json', 'utf8', function(err, contents) {
                                      if (err) return console.log(err);
                                      var json = JSON.parse(contents);

                                      json.tasks.push(message.content.toString().replace(message.content.split(' ')[0]+' '+message.content.split(' ')[1]+' ', ''));

                                      json = JSON.stringify(json, undefined, 4);
                                      fs.writeFile(assetsPath+'settings.json', json, err => {
                                          if (err) throw err;
                                          var taskExtra = "This task will **NOT** attempt to return any output from ingame to the "+c_settings.taskChannelName+" channel.";
                                          if (taskReturnsOutput) {
                                            taskExtra = "This task **will** attempt to return any output from ingame to the "+c_settings.taskChannelName+" channel.";
                                          }
                                          message.reply('Task has been added. Details:\nThis task will run every '+message.content.split(' ')[2]+' minutes.\n'+taskExtra+'\nThis task will execute the command: ``'+taskExec+'``.\n\nRemove a task with ``'+prefix+'task remove <id>`` **This task will take affect next '+prefix+'restart**');
                                      });
                                    });
                                  }

                                } else {
                                  message.channel.send('Please specify if the command returns output or not. This means if it is a command like /bal, or /fwho it will return the output to the taskChannel (Set with '+prefix+'set)\nUse true or false.');
                                }
                              }
                            }
                          } else if (arg == 'remove') {
                            var taskId = message.content.split(' ')[2];
                            if (taskId === undefined || isNaN(Number(taskId))) {
                              message.channel.send('Please specify a task ID to remove. List task IDs with `'+prefix+'task list`.');
                            } else {
                              fs.readFile(assetsPath+'settings.json', 'utf8', function(err, contents) {
                                if (err) return console.log(err);
                                var json = JSON.parse(contents);

                                var taskIndex = 1;
                                json.tasks.forEach(task => {
                                  if (taskIndex == taskId) {
                                    json.tasks.splice(taskIndex - 1);
                                  }
                                  taskIndex++;
                                });

                                json = JSON.stringify(json, undefined, 4);
                                fs.writeFile(assetsPath+'settings.json', json, err => {
                                    if (err) throw err;
                                    message.reply(':white_check_mark: Task #'+taskId+' has been removed. Taking affect next restart!');
                                });
                              });
                            }
                          } else {
                            message.reply(":x: Invalid args, ``"+prefix+"task <list> | task <add> <interval> <returnsOutput> <command> | task <remove> <id>``");
                          }
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message.content.split(' ')[0] == prefix + 'afinterval' && server == 'cosmic') {
                          //auto find interval command
                          message.delete().catch((e) => {});
                          var commandSplit = message.content.split(' ');
                          var command = commandSplit[0];
                          var newprefix = commandSplit[1];

                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              if (newprefix == undefined) {
                                  message.reply('Please specify an interval!');
                              } else {
                                  message.reply(':white_check_mark: The autofind list will now be checked every ' + newprefix + ' minutes! Taking affect next restart! \n:warning: going below 5 minutes can sometimes cause the bot to be kicked for spam, depending on how many players you are finding.');
                                  //update settings.json
                                  setSetting('afinterval', Number(newprefix)*60*1000, function() {});
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix+'interval') {
                        message.reply(':x: The interval command has been updated. User either wallinterval or bufferinterval!');
                      }

                      if (message.content.split(' ')[0] == prefix + 'wallinterval') {
                          //wall check interval command
                          message.delete().catch((e) => {});
                          var commandSplit = message.content.split(' ');
                          var command = commandSplit[0];
                          var wallinterval = commandSplit[1];

                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              if (wallinterval == undefined || wallinterval.includes('-') || wallinterval.includes('.') || wallinterval == '0' || wallinterval.includes('+') || wallinterval.includes('/') || wallinterval.includes('*') || wallinterval.includes('=') || wallinterval.match(/.*[a-zA-Z].*/)) {
                                  message.reply('Please specify an interval **in minutes**! (Greater than 0)');
                              } else {
                                  message.reply(':white_check_mark: The wall alert time is now **' + wallinterval + ' minutes**! Taking affect next restart!');
                                  //update settings.json
                                  setSetting("interval", wallinterval*60000, function() {});
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.split(' ')[0] == prefix + 'bufferinterval') {
                          //buffer check interval command
                          message.delete().catch((e) => {});
                          var commandSplit = message.content.split(' ');
                          var command = commandSplit[0];
                          var wallinterval = commandSplit[1];

                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              if (wallinterval == undefined || wallinterval.includes('-') || wallinterval.includes('.') || wallinterval == '0' || wallinterval.includes('+') || wallinterval.includes('/') || wallinterval.includes('*') || wallinterval.includes('=') || wallinterval.match(/.*[a-zA-Z].*/)) {
                                  message.reply('Please specify an interval **in minutes**! (Greater than 0)');
                              } else {
                                  message.reply(':white_check_mark: The buffer alert time is now **' + wallinterval + ' minutes**! Taking affect next restart!');
                                  //update settings.json
                                  setSetting("bufferinterval", wallinterval*60000, function() {});
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix+'toggle') {
                        if (server == 'cosmic') {
                          message.reply(':x: Please follow the format: ``'+prefix+'toggle <walls/buffers/ftop/fwealth>``');
                        } else {
                          message.reply(':x: Please follow the format: ``'+prefix+'toggle <walls/buffers/ftop>``');
                        }
                      }

                      if (message == prefix + 'toggle walls') {
                          //wall checks toggle command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              toggleSetting("wallchecks", function(state) {
                                message.reply(':white_check_mark: Wall checks are now ' + state +', taking affect next restart!');
                                wall_checking_enabled = c_settings.wallchecks;
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'toggle buffers') {
                          //BUFFER checks toggle command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                            toggleSetting("bufferchecks", function(state) {
                              message.reply(':white_check_mark: Buffer checks are now ' + raidevent+', taking affect next restart!');
                              buffer_checking_enabled = c_settings.bufferchecks;
                            });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'toggle ftop') {
                          //Ftop toggle command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              toggleSetting('autoftop', function(state) {
                                message.reply(':white_check_mark: Auto ftop posts are now ' + state + ', taking affect next restart!');
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'toggle fwealth' && server == 'cosmic') {
                          //Fwealth toggle command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              toggleSetting('autofwealth', function(state) {
                                message.reply(':white_check_mark: Auto fwealth posts are now ' + state + ', taking affect next restart!');
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'connect') {
                          //reconnect command for the /server
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              message.reply('Force running command ``' + joincommand + '``!');
                              fs.appendFile(assetsPath+'runcommand.txt', joincommand+'', err => {
                                  if (err) throw err;
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.split(' ')[0] == prefix + 'tps' && server != 'royalcraft' && server != 'archon' && server != 'saico' && server != 'vanity' && server != 'mccentral') {
                          //tps set #
                          message.delete().catch((e) => {});
                          var commandSplit = message.content.split(' ');
                          var command = commandSplit[0];
                          var set = commandSplit[1];
                          var value = commandSplit[2];

                          if (message.member.roles.find(role => role.name === adminRoleN)) {

                              if (set == 'set') {
                                  setSetting("tpsalert", value*1, function() {
                                    message.reply(':white_check_mark: Set tps alerts to notify when tps is **less than ' + value + '**, taking affect next restart!');
                                  });
                              } else if (set == 'toggle') {
                                  //toggle tps alerts
                                  if (message.member.roles.find(role => role.name === adminRoleN)) {
                                      toggleSetting('tpsalerts', function(state) {
                                        message.reply('TPS alerts are now ' + state + ', taking affect next restart! ``'+prefix+'restart``');
                                      });
                                  } else {
                                      message.channel.send(noaccess).catch((e) => {});
                                  }
                              } else {
                                  message.reply('Invalid arguments! ``'+prefix+'tps set # or tps toggle``');
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'flist') {
                          //flist command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                                var page = message.content.toLowerCase().split(' ')[1] || 1;
                                if (isNaN(page) || page.toString().includes('.') || page.toString().includes('-') || page.toString().includes('/') || page.toString().includes('*')) {
                                  message.reply(':x: Page must be a number.');
                                } else {
                                  message.reply('Getting faction list...');
                                  lastRequestedChannel = message.channel;
                                  if (server == 'custom') {
                                    fs.writeFile(assetsPath+'runcommand.txt', c_config.fListCommand.toString().replace('%page%', page), err => {
                                        if (err) throw err;
                                    });
                                  } else {
                                    fs.writeFile(assetsPath+'runcommand.txt', '/f list '+page, err => {
                                        if (err) throw err;
                                    });
                                  }
                                }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'list' && server == 'cosmic') {
                          //list command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              message.reply('Getting player list...');
                              lastRequestedChannel = message.channel;
                              fs.writeFile(assetsPath+'runcommand.txt', '/list ', err => {
                                  if (err) throw err;
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'grace') {
                        //grace command
                        message.delete().catch((e) => {});
                        if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                          lastRequestedChannel = message.channel;
                          message.reply('Getting grace period info...');
                          if (server == 'custom') {
                            fs.writeFile(assetsPath+'runcommand.txt', c_config.graceCommand+'', err => {
                              if (err) throw err;
                            });
                          } else {
                            if (server == 'mineheroes') {
                              fs.writeFile(assetsPath+'runcommand.txt', '/graceperiod ', err => {
                                if (err) throw err;
                              });
                            } else {
                              fs.writeFile(assetsPath+'runcommand.txt', '/grace ', err => {
                                if (err) throw err;
                              });
                            }
                          }
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message == prefix + 'raid') {
                          //raid command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              message.reply('Getting raid info...');
                              lastRequestedChannel = message.channel;
                              fs.writeFile(assetsPath+'runcommand.txt', '/raid ', err => {
                                  if (err) throw err;
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'outpost' && server != 'battleclash' && server != 'manacube' && server != 'saico') {
                          //outpost command
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === useRoleN) || message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              message.reply('Getting outpost info...');
                              lastRequestedChannel = message.channel;
                              if (server == 'custom') {
                                fs.writeFile(assetsPath+'runcommand.txt', c_config.outpostCommand, err => {
                                    if (err) throw err;
                                });
                              } else {
                                fs.writeFile(assetsPath+'runcommand.txt', '/outpost', err => {
                                    if (err) throw err;
                                });
                              }

                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'outpost toggle') {
                          //toggle outpost alerts
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              toggleSetting('outposts', function(state) {
                                message.reply('Outpost alerts are now ' + state + ' \n:warning: Taking affect next restart! ('+prefix+'restart)');
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix + 'raid toggle') {
                          //toggle raid event alerts
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === trustedRoleN) || message.member.roles.find(role => role.name === adminRoleN)) {
                              toggleSetting('raidevents', function(state) {
                                message.reply('Raid event alerts are now ' + state + ' \n:warning: Make sure to restart the bot now! ``'+prefix+'restart``');
                              });
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.split(' ')[0] == prefix + 'broadcast') {
                          var commandSplit = message.content.split(' ');
                          var commandSplitMSG = message.content.split(prefix + 'broadcast ')[1];
                          var sendChatCommand = commandSplit[0];
                          var sendChatMsg = commandSplitMSG;

                          if (sendChatMsg != undefined || match != null || match != undefined) {
                              if (message.content.match(/^.*broadcast <@&(\d+)> .*/)) {
                                  var match = sendChatMsg.match(/<@&(\d+)>/gm)[0];
                                  var findit = match.replace('<@&', '');
                                  var findit = findit.replace('>', '');
                                  if (message.member.roles.find(role => role.name === adminRoleN)) {
                                      if (message.guild && message.content.startsWith(prefix + 'broadcast')) {
                                          //broadcast command
                                          message.guild.members.forEach(member => {
                                              if (member.id != bot.user.id && !member.user.bot) {
                                                  if (member.roles.find(role => role.id === findit)) {
                                                      sendChatMsg = sendChatMsg.replace(/<@&(\d+)>/, '');
                                                      member.send(sendChatMsg).catch((e) => {console.log(e)});
                                                  }
                                              }
                                          });
                                      }
                                  } else {
                                      message.channel.send(noaccess).catch((e) => {});
                                  }
                              } else {
                                  message.reply('Please use the correct arguments, /broadcast @role *message*');
                              }
                          } else {
                              message.reply('Please use the correct arguments, /broadcast @role *message*');
                          }
                      }

                      if (message.content.match(/^\/f f .*/) || message.content.match(/^\/f who .*/)) {
                          message.reply('You probably want to do: ``'+prefix+'fwho <faction>``');
                      }

                      //Moderation.. /purge, /mute
                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'purge') {
                          //purge command
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              message.delete().catch((e) => {});
                              try {
                                  var purgeAmount = message.content.toLowerCase().split(' ')[1];
                                  if (purgeAmount == undefined || isNaN(purgeAmount) || purgeAmount == '0' || purgeAmount == '1') {
                                      message.reply('Specify the number of messages to purge! Greater than 1.');
                                  } else {
                                      purgeAmount = Number(purgeAmount);
                                      if (purgeAmount > 100) {
                                          purgeAmount = Number(100);
                                      }
                                      message.channel
                                          .fetchMessages({
                                              limit: purgeAmount
                                          })
                                          .then(messages => {
                                              message.channel.bulkDelete(messages).catch(err => {
                                                  message.reply(':x: I couldn\'t purge all the messages: ``'+err+'``').then(message => message.delete(5000));
                                                  return;
                                              });
                                              message.channel.send(":white_check_mark: Deleted " + purgeAmount + " messages!")
                                                  .then(message => message.delete(3000));
                                          })
                                          .catch(err => {
                                              message.reply(':x: I couldn\'t purge all the messages: ``'+err+'``').then(message => message.delete(5000));
                                              return;
                                          });
                                  }
                              } catch (e) {
                                  message.reply(':x: I couldn\'t purge all the messages: ``'+e+'``').then(message => message.delete(5000));
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'mute') {
                          //Mute command
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              message.delete().catch((e) => {});
                              var mention = message.content.toLowerCase().split(' ')[1];
                              if (!mention) {
                                  message.reply('``'+prefix+'mute @user``');
                                  return;
                              }
                              const mentionmatch = mention.match(/^<@!?(\d+)>$/);
                              if (!mentionmatch) {
                                  message.reply('``'+prefix+'mute @user``');
                              } else {
                                  try {
                                      mention = message.mentions.members.first();
                                      message.guild.channels.forEach(channel => {
                                          channel.overwritePermissions(mention, { 'SEND_MESSAGES': false })
                                              .then()
                                              .catch(console.log);
                                      });
                                  } catch (e) {
                                      message.reply(':warning: Something went wrong: ``'+e+'``');
                                      return;
                                  }
                                  message.reply(':white_check_mark: Muted '+mention+' use ``'+prefix+'unmute @user`` to unmute them!')
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message.content.toLowerCase().split(' ')[0] == prefix + 'unmute') {
                          //Unmute command
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              message.delete().catch((e) => {});
                              var mention = message.content.toLowerCase().split(' ')[1];
                              if (!mention) {
                                  message.reply('``'+prefix+'unmute @user``');
                                  return;
                              }
                              const mentionmatch = mention.match(/^<@!?(\d+)>$/);
                              if (!mentionmatch) {
                                  message.reply('``'+prefix+'unmute @user``');
                              } else {
                                  try {
                                      mention = message.mentions.members.first();
                                      message.guild.channels.forEach(channel => {
                                          channel.overwritePermissions(mention, { 'SEND_MESSAGES': null })
                                              .then()
                                              .catch(console.log);
                                      });
                                  } catch (e) {
                                      message.reply(':warning: Something went wrong: ``'+e+'``');
                                      return;
                                  }
                                  message.reply(':white_check_mark: Unmuted '+mention+' use ``'+prefix+'mute @user`` to mute them!')
                              }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix+'drop') {
                        message.delete().catch((e) => {});
                        if (message.member.roles.find(role => role.name === adminRoleN)) {
                          mcscript.dropAll();
                          message.reply(':white_check_mark: Dropping all items in the bot\'s inventory.');
                        } else {
                          message.channel.send(noaccess).catch((e) => {});
                        }
                      }

                      if (message.content.split(' ')[0] == prefix+'say') {
                          message.delete().catch((e) => {});
                          if (message.member.roles.find(role => role.name === adminRoleN)) {
                              var commandSplit = message.content.split(' ');
                              var command = commandSplit[0];
                              channelse = commandSplit[1];
                              var channelbf = commandSplit[1];
                              var messagesay = message.content;
                              messagesay = messagesay.toString().replace(/^\/say \<\#[0-9]*\>/, '');
                              if (channelse == undefined) {
                                  message.channel.send(':exclamation: Please use the right arguments, '+prefix+'say <#channel> <message>');
                              } else if (messagesay == undefined) {
                                  message.channel.send(':exclamation: Please use the right arguments, '+prefix+'say <#channel> <message>');
                              } else if (channelbf.includes('<#') != true) {
                                  message.channel.send(':exclamation: Invalid Channel! \n Please use the right arguments, '+prefix+'say <#channel> <message>');
                              } else {
                                  channelse = channelse.toString().replace('<#', '');
                                  channelse = channelse.toString().replace('>', '');
                                  try {
                                      bot.channels.get(channelse).send(messagesay).then(reply => {
                                          message.reply(':white_check_mark: Posted the message in '+channelbf);
                                      }).catch(err => {
                                          message.channel.send(':exclamation: Something went wrong: ``'+err+'``');
                                      });
                                  } catch (e) {
                                      message.channel.send(':exclamation: Something went wrong: ``'+e+'``');
                                  }
                             }
                          } else {
                              message.channel.send(noaccess).catch((e) => {});
                          }
                      }

                      if (message == prefix+"apply") {
                        //Blacklist
                        if (message.member.roles.find(role => role.name === c_settings.blacklistedFromApply+'')) {
                          return message.reply(':x: Your role forbids you from using this command!');
                        }

                        var appsChannel = getC('applications') || thisguild.channels.find(channel => channel.name === process.env.applicationChannel+'');

                        if (!appsChannel) {
                          return message.channel.send(':x: Sorry, the application channel was not found. Please contact an admin on the server, they need a text channel specifically named "'+process.env.applicationChannel+'"!');
                        }

                        if (c_settings.denyIfAppliedAlready+'' == 'true') {
                          //Deny them from applying if application is in apps channel with their id on it.
                          var vnext = true;
                          appsChannel.fetchMessages({
                              limit: 50,
                          }).then((messages) => {
                              messages.forEach(emessage => {
                                if (emessage.embeds[0] != undefined) {
                                  var footerText = emessage.embeds[0].footer.text.toString()+'';
                                  var footerText = footerText.match(/\(([0-9]*)\)/)[1];
                                  if (footerText.toString()+'' == message.author.id.toString()+'') {
                                    vnext = false;
                                    return message.reply(':x: You already have an application submitted. Please contact a server admin if you think that this is an error or wait until your application is reviewed.');
                                  }
                                }
                              });
                          }).catch(err => {});
                          setTimeout(function() {
                            if (vnext) {
                              next();
                            }
                          }, 500);
                        } else {next();}

                        function next() {
                          if (applycooldown) {
                            return message.reply(':clock1: The apply command is currently on cooldown.');
                          } else {
                            setapplycooldown();

                            if (c_settings.applicationsEnabled.toString().toLowerCase() == 'true') {
                              var vcontinue = true;
                              openApplications.forEach(app => {
                                var userid = app.split(':')[0];
                                if (userid+'' == message.author.id+'') {
                                  vcontinue = false;
                                  return message.channel.send(':x: You already have an open application. DM me "cancel" to stop your current application.');
                                }
                              });

                              setTimeout(function() {
                                if (vcontinue) {
                                  const app = require(assetsPath+'applicationquestions.json');

                                  const appStartedEmbed = new Discord.RichEmbed()
                                    .setTitle(app.applicationStarted.embedTitle+'')
                                    .setThumbnail(app.applicationStarted.thumbnailURL+'')
                                    .setColor(app.applicationStarted.embedHexColor+'')
                                    .setDescription(app.applicationStarted.description+'');
                                    if (app.applicationStarted.timestampSet) {appStartedEmbed.setTimestamp()}

                                  message.author.send(appStartedEmbed).then(msg => {
                                    message.channel.send(':white_check_mark: Application started in DM for '+message.author+'.');
                                    //First info embed sent, start app questions.
                                    openApplications.push(message.author.id+':1');
                                    setTimeout(function() {
                                      const question1 = new Discord.RichEmbed()
                                        .setTitle(app.questions[0].question+'')
                                        .setColor(app.questions[0].color+'')
                                        if (app.questions[0].timestampSet) {question1.setTimestamp()}

                                      message.author.send(question1).catch(() => {removeApplication(item);});
                                    }, 2000);
                                    setTimeout(function() {
                                      //Close app after inactivity.
                                      openApplications.forEach(app => {
                                        var userid = app.split(':')[0];
                                        if (userid+'' == message.author.id+'') {
                                          //Timeout ended and the open apps still had their id, send msg
                                          removeApplication(app);
                                          removeApplicationData(message.author.id+"");
                                          return message.author.send('You have not responded for too long, this application is now closed. Feel free to open another by typing `'+prefix+'apply` in the server.').catch((e) => {});
                                        }
                                      });
                                    }, Number(c_settings.closeAppsAfter)*60*1000);
                                  }).catch(() => {
                                    return message.reply(':x: '+message.author+' Please update your privacy settings so that I can DM you!');
                                  });
                                }
                              }, 500);
                            } else {
                              message.reply(':x: Sorry, applications are currently disabled.');
                            }
                          }
                        }
                      }

                      
                      //Set custom channels 
                      if (message.content.toLowerCase().split(' ')[0] == prefix+'c') {
                        if (message.member.roles.find(role => role.name === adminRoleN)) {
                          const cName = message.content.split(' ')[1];
                          const cChan = message.mentions.channels.first();
                          if (message == prefix+'c' || !cName || !cChan) {
                            const help = new Discord.RichEmbed()
                                .setColor('#5E34B0')
                                .setTitle(bot.user.username+' - Channels')
                                .setTimestamp()
                                .setDescription('Options for '+prefix+'c are: \n**logs, botCommands, outpost, ingameChat, wallChecking, bufferChecking, tps, economy, ftop, fwealth, find, stronghold, coreChunk, away, task, weewoo, applications**\n\nRun '+prefix+'c <name> <channel> (Mention a channel with #channel) Some of these are server specific and you do not need to set.')
                                .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png');

                              return message.channel.send(help);
                          } else if (cName.toLowerCase() === 'logs') {
                            setC('logs', cChan.id);
                          } else if (cName.toLowerCase() === 'botcommands') {
                            setC('botCommands', cChan.id);
                          } else if (cName.toLowerCase() === 'outpost') {
                            setC('outpost', cChan.id);
                          } else if (cName.toLowerCase() === 'ingamechat') {
                            setC('ingameChat', cChan.id);
                          } else if (cName.toLowerCase() === 'wallchecking') {
                            setC('wallChecking', cChan.id);
                          } else if (cName.toLowerCase() === 'bufferchecking') {
                            setC('bufferChecking', cChan.id);
                          } else if (cName.toLowerCase() === 'tps') {
                            setC('tps', cChan.id);
                          } else if (cName.toLowerCase() === 'economy') {
                            setC('economy', cChan.id);
                          } else if (cName.toLowerCase() === 'ftop') {
                            setC('ftop', cChan.id);
                          } else if (cName.toLowerCase() === 'fwealth') {
                            setC('fwealth', cChan.id);
                          } else if (cName.toLowerCase() === 'find') {
                            setC('find', cChan.id);
                          } else if (cName.toLowerCase() === 'stronghold') {
                            setC('stronghold', cChan.id);
                          } else if (cName.toLowerCase() === 'corechunk') {
                            setC('coreChunk', cChan.id);
                          } else if (cName.toLowerCase() === 'away') {
                            setC('away', cChan.id);
                          } else if (cName.toLowerCase() === 'task') {
                            setC('task', cChan.id);
                          } else {
                            const help = new Discord.RichEmbed()
                                .setColor('#5E34B0')
                                .setTitle(bot.user.username+' - Channels')
                                .setTimestamp()
                                .setDescription('Options for '+prefix+'c are: \n**logs, botCommands, outpost, ingameChat, wallChecking, bufferChecking, tps, economy, ftop, fwealth, find, stronghold, coreChunk, away, task**\n\nRun '+prefix+'c <name> <channel> (Mention a channel with #channel) Some of these are server specific and you do not need to set.')
                                .setFooter('Powered by UltimateBot  https://ultimatebot.pw/ ', 'https://ultimatebot.pw/img/favicon.png');

                              return message.channel.send(':warning: Uknown option!', help);
                          }

                          message.channel.send(':white_check_mark: The '+cName+' channel\'s id has been set to '+cChan.id+'!');
                        } else {
                          message.channel.send(noaccess).catch(e => {});
                        } 
                      }

                      //END COMMANDS
                  }
              }
          });

          const alreadyHadKey = (id) => {
            try {
              bot.users.get(id+'').send(':x: Sorry, you already have a key open. The last sent key above is no longer valid. Please use the other key you were sent, or wait 10m for them to expire.');
            } catch (e) {
              console.log('User already had a key open and tried to send another one. '+id+' discord id.');
            }
          };

          exports.alreadyHadKey = alreadyHadKey;

          const failedLink = (msg) => {
            logsc = getC('logs') || thisguild.channels.find(channel => channel.name === 'logs');
            logsc.send(':warning: Failed whitelist link! \n`'+msg+'`').catch((e) => {console.log(e)});
          }

          exports.failedLink = failedLink;

          const linked = (msg) => {
            logsc = getC('logs') || thisguild.channels.find(channel => channel.name === 'logs');
            logsc.send(':white_check_mark: User added to whitelist! \n`'+msg+'`').catch((e) => {console.log(e)});
          }

          exports.linked = linked;

          const sendData = (contents) => {
             if (contents.match(/^checked:.*/)) {
                var checkedusername = contents.replace('checked:', '');

                wallchecking = getC('wallChecking') || bot.channels.find(channel => channel.name === process.env.wallsChannel+'') || logsc;
                clearInterval(wallintervalspam);
                check_time = Date.now() / 1000;
                check_time = check_time - lastcheck;
                check_time = check_time / 60;
                check_time = Math.round(check_time);
                wallinterval = c_settings.interval;
                var wallintervalsec = wallinterval/1000;
                if (Number(Date.now() / 1000) - Number(lastcheck) <= wallintervalsec) {
                    var timeleft;
                    var altcheck_rk = Date.now()/1000 - lastcheck;
                    altcheck_rk = altcheck_rk/60;
                    timeleft = altcheck_rk - wallintervalmin;
                    timeleft = Math.round(timeleft);
                    timeleft = timeleft.toString().replace('-', '');
                    var maybe_s;
                    if (timeleft != '1') {
                        maybe_s = 's';
                    } else {maybe_s = '';}
                    fs.writeFile(assetsPath+'sendchat.txt', '/msg '+checkedusername+' You can\'t check the walls for '+timeleft+' minute'+maybe_s+' (aprox) alt0', err => {
                        if (err) throw err;
                    });
                } else {
                    //add check to user
                    var replace = require('replace-in-file');
                    var user_regex =  new RegExp(".*:"+checkedusername+":.*:.*", "i"); // discordid:username:checks
                    var checkregex =  /.*:.*:(.*):.*/i;
                    if (wall_checking_enabled) {
                        function addcheck(match) {
                          //we have--discordid:username:checks:bufchecks as the match var
                          var currentcheck = match.match(/.*:.*:(.*):.*/i);
                          var newmatch = match.match(/.*:.*:/i);
                          var newcheck = Number(currentcheck[1]) + 1;
                          var opt = match.split(':');
                          //id:username:wcheck:bcheck
                          var output = opt[0]+':'+opt[1]+':'+newcheck+':'+opt[3];
                          return output;
                        }
                        var roptions = {
                            files: assetsPath+'users.txt',
                            from: user_regex,
                            to: (match) => addcheck(match)
                        };
                        var newchecks = replace.sync(roptions);
                    }
                    var replace = require('replace-in-file');
                    var authorchecks = '(Not whitelisted)';
                    function getcheck(match) {
                        //we have--discordid:username:checks as the match var
                        var currentcheck = match.match(/.*:.*:(.*):.*/i);
                        authorchecks = currentcheck[1];
                        if (authorchecks == 1) {
                            authorchecks = authorchecks + ' wall check';
                        } else {
                            authorchecks = authorchecks+' wall checks';
                        }
                        return match;
                    }
                    var user_regex =  new RegExp(".*:"+checkedusername+":.*:.*", "i");
                    var roptions = {
                        files: assetsPath+'users.txt',
                        from: user_regex,
                        to: (match) => getcheck(match)
                    };
                    var newchecks = replace.sync(roptions);

                    if (c_settings.checkedType.toString()+''.toLowerCase() == 'embed') {
                        if (c_settings.deleteAlerts.toString()+'' == 'true') {
                            wallchecking.fetchMessages({
                                limit: 3,
                            }).then((messages) => {
                                messages.forEach(message => {
                                    if (message.content.includes(c_settings.alertmessage.toString())) {
                                        try {
                                            message.delete().catch((e) => {});
                                        } catch (e) {}
                                    }
                                });
                            }).catch(err => {});
                        }
                        const checkedEmbed = new Discord.RichEmbed()
                            .setColor('#00E575')
                            .setTitle('Walls Checked')
                            .addField('Checked By:', '`'+checkedusername+'`'+' ['+authorchecks+']', true)
                            .addField('Time Checked:', getTime()+'', true)
                            .addField('Time Taken:', '**'+check_time+'** minutes', true)
                            .addField('Type:', 'In-game', true)
                            .setTimestamp();
                        wallchecking.send(checkedEmbed).catch((e) => {});

                        //Topic messages
                        if (c_settings.wallsTopicMsg) {
                          wallchecking.setTopic("Last checked by: "+checkedusername+' ['+authorchecks+'] at '+getTime()).catch((e) => {});
                        }
                    } else {
                        wallchecking.send(':green_square: The walls have been checked *ingame* by `'+checkedusername+'` ['+authorchecks+'] after **'+check_time+' minutes**! ('+getTime()+')').catch((e) => {});
                    }
                    fs.writeFile(assetsPath+'sendchat.txt', 'The walls have been checked by '+checkedusername+' ['+authorchecks+'] after '+check_time+' minutes! alt0', err => {
                        if (err) throw err;
                    });
                    rebootcheck = true;
                    lastcheck = Date.now()/1000; //ms to seconds
                    setTimeout(function() {
                        clearInterval(wallintervalspam);
                        wallintervalspam = setInterval(wallalert, Number(c_settings.notificationDelay));
                    }, wallintervalmin*60000);

                    //log last check time incase of downtime
                    setSetting("lastcheck", Date.now(), function() {});
                }
            } else if (contents.match(/^bchecked:.*/)) {
              //BUFFER CHECKED ONLY -----------------------------------------------------
              var checkedusername = contents.replace('bchecked:', '');

              bufferchecking = getC('bufferChecking') || bot.channels.find(channel => channel.name === process.env.buffersChannel+'');
              clearInterval(bufferintervalspam);
              bcheck_time = Date.now() / 1000;
              bcheck_time = bcheck_time - lastbuffercheck;
              bcheck_time = bcheck_time / 60;
              bcheck_time = Math.round(bcheck_time);
              bufferinterval = c_settings.bufferinterval;
              var bufferintervalsec = bufferinterval/1000;
              if (Number(Date.now() / 1000) - Number(lastbuffercheck) <= bufferintervalsec) {
                  var timeleft;
                  var altcheck_rk = Date.now()/1000 - lastbuffercheck;
                  altcheck_rk = altcheck_rk/60;
                  timeleft = altcheck_rk - bufferintervalmin;
                  timeleft = Math.round(timeleft);
                  timeleft = timeleft.toString().replace('-', '');
                  var maybe_s;
                  if (timeleft != '1') {
                      maybe_s = 's';
                  } else {maybe_s = '';}
                  fs.writeFile(assetsPath+'sendchat.txt', '/msg '+checkedusername+' You can\'t check the buffers for '+timeleft+' minute'+maybe_s+' (aprox) alt0', err => {
                      if (err) throw err;
                  });
              } else {
                  //add check to user
                  var replace = require('replace-in-file');
                  var user_regex =  new RegExp(".*:"+checkedusername+":.*:.*", "i"); // discordid:username:checks
                  var checkregex =  /.*:.*:.*:(.*)/i;
                  if (buffer_checking_enabled) {
                      function addcheck(match) {
                        //we have--discordid:username:checks as the match var
                        var currentcheck = match.match(/.*:.*:.*:(.*)/i);
                        var newmatch = match.match(/.*:.*:/i);
                        var newcheck = Number(currentcheck[1]) + 1;
                        var output = currentcheck[1].replace(currentcheck[1], newmatch+newcheck)
                        return output;
                      }
                      var roptions = {
                          files: assetsPath+'users.txt',
                          from: user_regex,
                          to: (match) => addcheck(match)
                      };
                      var newchecks = replace.sync(roptions);
                  }
                  var replace = require('replace-in-file');
                  var authorchecks = '(Not whitelisted)';
                  function getcheck(match) {
                      //we have--discordid:username:checks as the match var
                      var currentcheck = match.match(/.*:.*:.*:(.*)/i);
                      authorchecks = currentcheck[1];
                      if (authorchecks == 1) {
                          authorchecks = authorchecks + ' buffer check';
                      } else {
                          authorchecks = authorchecks+' buffer checks';
                      }
                      return match;
                  }
                  var user_regex =  new RegExp(".*:"+checkedusername+":.*:.*", "i");
                  var roptions = {
                      files: assetsPath+'users.txt',
                      from: user_regex,
                      to: (match) => getcheck(match)
                  };
                  var newchecks = replace.sync(roptions);

                  if (c_settings.checkedType+''.toLowerCase() == 'embed') {
                      if (c_settings.deleteAlerts+'' == 'true') {
                          bufferchecking.fetchMessages({
                              limit: 3,
                          }).then((messages) => {
                              messages.forEach(message => {
                                  if (message.content.includes(c_settings.alertmessage)) {
                                      try {
                                          message.delete().catch((e) => {});
                                      } catch (e) {}
                                  }
                              });
                          }).catch(err => {});
                      }
                      const checkedEmbed = new Discord.RichEmbed()
                          .setColor('#00E575')
                          .setTitle('Buffers Checked')
                          .addField('Checked By:', '`'+checkedusername+'`'+' ['+authorchecks+']', true)
                          .addField('Time Checked:', getTime()+'', true)
                          .addField('Time Taken:', '**'+bcheck_time+'** minutes', true)
                          .addField('Type:', 'In-game', true)
                          .setTimestamp();
                      bufferchecking.send(checkedEmbed).catch((e) => {});

                      //Topic messages
                      if (c_settings.buffersTopicMsg) {
                        bufferchecking.setTopic("Last checked by: "+checkedusername+' ['+authorchecks+'] at '+getTime()).catch((e) => {});
                      }
                  } else {
                      bufferchecking.send(':green_square: The buffers have been checked *ingame* by `'+checkedusername+'` ['+authorchecks+'] after **'+check_time+' minutes**! ('+getTime()+')').catch((e) => {});
                  }
                  fs.writeFile(assetsPath+'sendchat.txt', 'The buffers have been checked by '+checkedusername+' ['+authorchecks+'] after '+bcheck_time+' minutes! alt0', err => {
                      if (err) throw err;
                  });
                  bufferrebootcheck = true;
                  lastbuffercheck = Date.now()/1000; //ms to seconds
                  setTimeout(function() {
                      clearInterval(bufferintervalspam);
                      bufferintervalspam = setInterval(bufferalert, Number(c_settings.notificationDelay));
                  }, bufferintervalmin*60000);

                  //log last check time incase of downtime
                  setSetting("lastbuffercheck", Date.now(), function() {});
              }
            } else if (contents.match(/^weewoo:.*/)) {
              let weewoousername = contents.match(/%(.*)%/)[1];
              let weewooText = contents.split(weewoousername)[1].replace('% ', '');

              //Set off weewoo
              weewooChannel = getC('weewoo') || bot.channels.find(channel => channel.name === process.env.weewooChannel+'');
              logsc = getC('logs') || bot.channels.find(channel => channel.name === 'logs');

              //Start spam in weewoochannel
              if (weewoocmd == 1) {
                fs.writeFile(assetsPath+'sendchat.txt', '/msg '+weewoousername+' Weewoo is already enabled. alt0', err => {
                    if (err) throw err;
                });
              } else {
                  weewoocmd = 1;
                  wall_checking_enabled = false;
                  buffer_checking_enabled = false;

                  try {
                    logsc.send('Weewoo broadcast was enabled in-game by ' + weewoousername).catch((e) => {});
                  } catch (e) {
                    console.log('Could not post weewoo log to logs channel for some reason. '+weewoousername+' set off the weewoo ingame at '+getTime());
                  }

                  weewooChannel = getC('weewoo') || bot.channels.find(channel => channel.name === process.env.weewooChannel+'');
                  winterval = setInterval(function() {
                      try {
                          var adminN = thisguild.roles.find(role => role.name === adminRoleN);
                          var trustedN = thisguild.roles.find(role => role.name === trustedRoleN);
                          var memberN = thisguild.roles.find(role => role.name === useRoleN);
                          var discordweewoomsg = c_settings.weewoomsg;
                          discordweewoomsg = weewooText === '%none' ? discordweewoomsg.replace('{prefix}', prefix) : weewooText;
                          weewooChannel.send(':rotating_light: ' + adminN + ' ' + trustedN + ' ' + memberN + ' | '+discordweewoomsg).catch((e) => {});
                      } catch (e) {
                         console.log(e);
                          weewooChannel.send(':rotating_light: @everyone | Get on we are being raided!').catch((e) => {});
                      }
                  }, c_settings.weewoointerval);
                  var mcweewoomsg = c_settings.mcweewoomsg;
                  mcweewoomsg = weewooText === '%none' ? mcweewoomsg.replace('{botname}', process.env.MUSERNAME+'') : weewooText;
                  wiinterval = setInterval(function() {
                    if (mcweewoomsg.toString().toLowerCase().trim() != 'none' && mcweewoomsg.toString().trim() != ' ') {
                      fs.writeFile(assetsPath+'sendchat.txt', mcweewoomsg+' alt0', err => {
                          if (err) throw err;
                      });
                    }
                  }, c_settings.minecraftweewoointerval);
              }
            } else if (contents.match(/^safe:.*/)) {
              var weewoousername = contents.replace('safe:', '');
              weewooChannel = getC('weewoo') || bot.channels.find(channel => channel.name === process.env.weewooChannel+'');
              logsc = getC('logs') || bot.channels.find(channel => channel.name === 'logs');

              if (weewoocmd == 0) {
                  //Resend no weewoo ocurring
                  fs.writeFile(assetsPath+'sendchat.txt', '/msg '+weewoousername+' no weewoo is ocurring! alt0', err => {
                      if (err) throw err;
                  });
              } else {
                weewoocmd = 0;
                clearInterval(winterval);
                clearInterval(wiinterval);
                wall_checking_enabled = c_settings.wallchecks;
                buffer_checking_enabled = c_settings.bufferchecks;
                try {
                  logsc.send('Weewoo broadcast was **disabled** in-game by ' + weewoousername).catch((e) => {});
                  fs.writeFile(assetsPath+'sendchat.txt', '/msg '+weewoousername+' Raid declared as safe. alt0', err => {
                      if (err) throw err;
                  });
                } catch (e) {
                  console.log('Could not post weewoo log to logs channel for some reason. '+weewoousername+' disabled the weewoo ingame at '+getTime());
                }
              }

            } else if (contents.match(/^paid:.*/)) {
                var contents = contents.replace('paid:', '');
                var pusername = contents.match(/%(.*)%/)[1];
                contents = contents.replace(/%.*% /, '').trim();
                var theirid;

                function getcheck(match) {
                    theirid = match.match(/(.*):.*:.*:.*/i)[1];
                    return match;
                }
                var user_regex =  new RegExp(".*:"+pusername+":.*:.*", "i");
                var roptions = {
                    files: assetsPath+'users.txt',
                    from: user_regex,
                    to: (match) => getcheck(match)
                };
                const replace = require('replace-in-file');
                replace.sync(roptions);
                var mention = "";
                if (theirid != undefined) {
                  mention = "(<@"+theirid+">)";
                }
                const paid = new Discord.RichEmbed()
                    .setColor('#00E575')
                    .setDescription('``' + contents + '`` '+mention)
                    .setTitle('**Money Received**')
                    .setTimestamp();
                if (c_settings.economy) {
                  economyc.send(paid).catch((e) => {console.log(e)});

                  //Topic messages
                  if (c_settings.ecoTopicMsg) {
                    var currentTopic = economyc.topic;
                    var money = contents.match(/\$([0-9]*.?[0-9]*)/)[1];

                    //Top payment
                    if (currentTopic != null && currentTopic != undefined && currentTopic.toString().trim() != '' && currentTopic.toString().trim() != ' ') {
                      var currentTop = currentTopic.match(/Top Payment: (.*) \| /i)[1];
                      if (Number(currentTop.match(/\$([0-9]*.?[0-9]*)/)[1].replace('$', '')) < Number(money.replace('$', ''))) {
                        //Set new top
                        economyc.setTopic("Top Payment: $"+money+" by "+mention+" | Last paid by: "+mention+" $"+money+" at "+getTime()).catch((e) => {});
                      } else {
                        //Carry on current top
                        economyc.setTopic("Top Payment: "+currentTop+" | Last paid by: "+mention+" $"+money+" at "+getTime()).catch((e) => {});
                      }
                    } else {
                      //Set inital top payment
                      economyc.setTopic("Top Payment: $"+money+" by "+mention+" | Last paid by: "+mention+" $"+money+" at "+getTime()).catch((e) => {});
                    }
                  }

                } else {
                  console.log('Warning: Payment received but '+prefix+'set economy was set to false! '+contents);
                }
            } else if (contents.match(/^sent:.*/)) {
                var contents = contents.replace('sent:', '');
                contents = contents.replace(/%.*% /, '').trim();
                const sent = new Discord.RichEmbed()
                    .setColor('#E25141')
                    .setDescription('``' + contents + '``')
                    .setTitle('**Money Sent**')
                    .setTimestamp();
                try {
                  economyc.send(sent).catch((e) => {console.log(e)});
                } catch (e) {}
            } else if (contents.match(/^joined:.*/)) {
              console.log(contents);
                var contents = contents.replace('joined:', '');
                try {
                  ingamechat.send(':warning: ``'+contents+'`` @everyone').catch((e) => {});
                } catch (e) {}
            } else if (contents.match(/^left:.*/)) {
              console.log(contents);
                var contents = contents.replace('left:', '');
                try {
                  ingamechat.send(':white_circle: ``'+contents+'``').catch((e) => {});
                } catch (e) {}
            } else if (contents.match(/^blackmarket:.*/)) {
              var bm = contents.toString().replace('blackmarket:', '');
              try {
                var bmChannel = bot.channels.find(channel => channel.name === process.env.blackmarketChannel+'');
                if (bmChannel && process.env.bmEnabled == 'true') {
                  //If the channel was found and bm is enabled
                  const bmEmbed = new Discord.RichEmbed()
                      .setColor('#5E34B0')
                      .setDescription('('+getTime()+') The Black Market has restocked with:\n**' + bm.replace('*', '') + '**')
                      .setTitle('**Black Market Restock**')
                      .setTimestamp();
                  //Slots alert
                  let bmItem = bm.replace('*', '');

                  if (bmItem.includes('Cosmo-Slot Bot Ticket')) {
                    bmEmbed.setThumbnail('https://cdn.cosmicpvp.com/buycraft/icons/3643119.png?5');
                      let mention = thisguild.roles.find(r => r.id == c_settings.bmRole);

                      if (!mention) mention = '**Slot Bot Tickets**';

                      bmChannel.send(mention, bmEmbed).catch((e) => {console.log(e)});
                  } else {
                    try {
                      bmChannel.send(bmEmbed).catch((e) => {console.log(e)});
                  } catch (e) {}
                  }
                  
                } else if (!bmChannel && process.env.bmEnabled == 'true') {
                  console.log('ERROR: The black market channel was not found, cannot send message!');
                }
              } catch (e) {console.log('Black market alert error: '+e);}
            } else if (contents.match(/^stronghold:.*/)) {
              var shInfo = contents.toString().replace('stronghold:', '');

              const strongholdEmbed = new Discord.RichEmbed()
                  .setColor('#0099ff')
                  .setTitle('**Stronghold**')
                  .setTimestamp();
              var shInfo = shInfo.split('infernal:');
              strongholdEmbed.addField('Frozen', '```'+shInfo[0]+'```');
              strongholdEmbed.addField('Infernal', '```'+shInfo[1]+'```');
              lastRequestedChannel.send(strongholdEmbed).catch((e) => {console.log(e)});
            } else if (contents.match(/^shattack:.*/)) {
              var shInfo = contents.toString().replace('shattack:', '');
              strongholdChannel = getC('stronghold') || bot.channels.find(channel => channel.name === 'stronghold');
              try {
                if (c_settings.strongholdalert.toString().toLowerCase()+'' == '@roles') {
                  var adminN = message.guild.roles.find(role => role.name === adminRoleN);
                  var trustedN = message.guild.roles.find(role => role.name === trustedRoleN);
                  var memberN = message.guild.roles.find(role => role.name === useRoleN);

                  strongholdChannel.send(adminN + ' ' + trustedN + ' ' + memberN + ' | '+shInfo).catch((e) => {console.log(e)});
                } else if (c_settings.strongholdalert.toString().toLowerCase()+'' == '@none') {
                  strongholdChannel.send(shInfo).catch((e) => {console.log(e)});
                } else {
                  strongholdChannel.send('@everyone | '+shInfo).catch((e) => {console.log(e)});
                }
              } catch (e) {
                  strongholdChannel.send('@everyone | '+shInfo).catch((e) => {console.log(e)});
              }
            } else if (contents.match(/^shlost:.*/)) {
              var shInfo = contents.toString().replace('shlost:', '');
              strongholdChannel = getC('stronghold') || bot.channels.find(channel => channel.name === 'stronghold');
              strongholdChannel.send('(:white_circle:) Stronghold has been lost.\n'+shInfo).catch((e) => {console.log(e)});
            } else if (contents.match(/^shcapped:.*/)) {
              var shInfo = contents.toString().replace('shcapped:', '');
              strongholdChannel = getC('stronghold') || bot.channels.find(channel => channel.name === 'stronghold');
              strongholdChannel.send(':white_check_mark: Stronghold has been captured.\n'+shInfo).catch((e) => {console.log(e)});
            } else if (contents.match(/^core:.*/)) {
              var raided = contents.toString().replace('core:', '');
              var facRaided = raided.match(/^\(!\) You have breached (.*)'s Core Chunk, taking [0-9]* Faction Points!/i)[1];
              const coreEmbed = new Discord.RichEmbed()
                  .setColor('#00E575')
                  .setTitle('**'+facRaided+' Breached**')
                  .setDescription('('+getTime()+') **'+raided+'**')
                  .setFooter("A timer has been set for 8 hours.")
                  .setTimestamp();
              try {
                if (c_settings.coreChunks) {
                  coreChunkChan =  getC('coreChunk') || thisguild.channels.find(channel => channel.name === process.env.coreChunkChannel) || logsc;
                  coreChunkChan.send(coreEmbed).catch((e) => {});
                  //Log to data
                  getCoreData(function(json) {
                    var tempArray = json;
                    tempArray.push(facRaided+":"+Date.now());

                    coresFile.set("coreData", tempArray);
                  });
                }
              } catch (e) {console.log('Error posting core chunk raid: '+e)}
            }
          }

          exports.sendData = sendData;

        
          const sendChatData = (contents) => {
            if (contents != '') {
              contents = contents.replace(/undefined/gi, '');
                try {
                  ingamechat.send(contents).catch((e) => {});
                } catch (e) {}
            }
          };

          exports.sendChatData = sendChatData;

          const disableAll = (cb) => {
            wall_checking_enabled = false;
            buffer_checking_enabled = false;
            checktimediff((diff) => {
              cb(diff);
            });
          };

          exports.disableAll = disableAll;

          const getAll = (cb) => {
            let returning = '';
            checktimediff((diff) => {
              returning += diff;
            });
            buffchecktimediff((diff) => {
              returning += ', '+diff;
            });

            cb(returning);
          };

          exports.getAll = getAll;

          bot.on('error', console.error); }

    /*});

  });
  req.on('error', function (err) {
    console.log('Verification Error: ' + err.message);
  });
  req.end();
}*/

//
// {@UltimateBot} Deobfuscated
// Made in v1.3
//
