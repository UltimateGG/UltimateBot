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
  console.log('\nUID:  '+msid+"\nRunning legacy, UltimateBot has shut down :(\n");
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
        console.log('\n\n\x1b[41mYour HWID seems to have changed, if you need a reset please login to the ultimatebot.pw dashboard and click reset.\x1b[0m');
        if (endrs.alert != undefined && endrs.alert.toString().trim() != '') {
          console.log('\n\n\x1b[30m\x1b[47m'+endrs.alert+'\x1b[0m\n\n');
        }
      } else if (endrs.k == false) {
        kvalid = false;
        if (endrs.alert != undefined && endrs.alert.toString().trim() != '') {
          console.log('\n\n\x1b[30m\x1b[47m'+endrs.alert+'\x1b[0m\n\n');
        }
      } else if (endrs.k == true && endrs.h == true) {
        if (endrs.alert != undefined && endrs.alert.toString().trim() != '') {
          console.log('\n\n\x1b[30m\x1b[47m'+endrs.alert+'\x1b[0m\n\n');
        }
        kvalid = true;
        console.log('License key valid.');
      }
      //begin all
      if (kvalid == false || lskey.length > 50) {
        console.log('Your license key is not valid or was entered incorrectly! Read more in .env!\nClick the restart button after you have entered a new one in .env! \n');
        setInterval(function() {
          console.log(''); //Keep alive
        }, 10000);

      } else if (kvalid == true) {
        //AUTO UPDATER
        var fs = require('fs');
        var currentVer = fs.readFileSync(assetsPath+'version.txt', 'utf8').toString();
        console.log('\n\n\x1b[42mV'+currentVer+'\x1b[0m\n\n');

        var latestVer = endrs.version;
        if (currentVer.trim() != latestVer.toString().trim()) {
          console.log('Latest version is '+latestVer+' - \x1b[4mDownloading update... PLEASE DO NOT CLOSE THE APPLICATION OR TURN YOUR PC OFF\x1b[0m');
          //Updater handles
          setTimeout(function() {
            require('./updater.js');
          }, 5000);

        } else {*/

          kvalid = true;
          console.log('License key valid.');

          if (kvalid == true) {
            //console.log('\n\n\n✅ Up to date.\n\n\n');
            console.log('<br>Checking your config for errors...');
            if (process.env.TOKEN === undefined || process.env.yourGuildId === undefined || process.env.adminRole === undefined || process.env.trustedRole === undefined || process.env.useRole === undefined || process.env.bankRole === undefined || process.env.rotateRole === undefined || process.env.serverConfiguration === undefined || process.env.bufferCheck === undefined || process.env.wallsChannel === undefined || process.env.buffersChannel === undefined || process.env.weewooChannel === undefined || process.env.blackmarketChannel === undefined || process.env.bmEnabled === undefined || process.env.applicationChannel === undefined || process.env.serverIp === undefined || process.env.serverPort === undefined) {
              console.log('<br>\x1b[41m\x1b[37mERROR FOUND IN .ENV FILE. Please check over every setting in .env file and make they are not blank! Bot will attempt to start...\x1b[0m');
            } else {
              console.log('<br>Config valid.');
            }

            var discord;
            var downloadingPackage = false;
            setTimeout(function() {
              if (!downloadingPackage) {
                discord = require('./discord.js');
              }
            }, 5000);
            var c_settings = require(assetsPath+'settings.json');
            var c_config;
            try {
              c_config = require(assetsPath+'customConfig.json');
            } catch (e) {
              console.log(e);
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

                "blacklistedPublicChatPhrases": [
                  "to use /vote",
                  "Welcome, "
                ],

                "debug": false
              };
            }
            const windows = require("prismarine-windows")("1.8").windows;
            const Item = require("prismarine-item")("1.8");

            function reloadSettings() {
              fs.readFile(assetsPath+'settings.json', 'utf8', function(err, contents) {
                  if (err) {console.log(err)}
                  try {
                    var tjson = JSON.parse(contents);
                    c_settings = tjson;
                  } catch (e) {}
              });
               require('dotenv').config({path: require('path').join(__dirname, '../../assets/.env')});

               joincommand = c_settings.joincommand;
               chatType = c_settings.chatType;
               tpsalert = c_settings.tpsalerts;
               debug = c_config.debug;
               faction = c_settings.factionName;
               outpostcheck = c_settings.outposts;
               player_tracking = c_settings.playertracking;
               serverc = process.env.serverConfiguration.toString().toLowerCase();
               outpostspaminterval = Number(c_settings.outpostspaminterval);
               ourFac = c_settings.strongholdfac+'';
            }

            var joincommand = c_settings.joincommand;
            var chatType = c_settings.chatType;
            //const ioStream = require('ioStream');
            if (process.env.NonWindowsOS.toString().trim() == 'true') {
              require('./restart.js');
            }
            var validKeys = [];
            var cmdSpam = false;
            var tpsalert = c_settings.tpsalerts;
            var debug = c_config.debug;
            var faction = c_settings.factionName;
            var outpostcheck = c_settings.outposts;
            var player_tracking = c_settings.playertracking;
            var serverc = process.env.serverConfiguration.toString().toLowerCase();
            var online;
            var outpostspam;
            var playtimeStorage = [];
            var serverListArray = [];
            var outpostspaminterval = Number(c_settings.outpostspaminterval);

            var depositsFile;
            var playtimeFile;
            try {
              depositsFile = require('data-store')({ path: assetsPath+'deposits.json'});
              playtimeFile = require('data-store')({ path: assetsPath+'playtime.json'});
            } catch (e) {}
            //MINECRAFT BOT
            //Delete log data
            fs.writeFile(assetsPath+'sendchat.txt', '', function() {});
            fs.writeFile(assetsPath+'runcommand.txt', '', function() {});
            fs.writeFile(assetsPath+'output.txt', '', function() {});
            fs.writeFile(assetsPath+'tps.txt', '', function() {});

            fs.appendFile(assetsPath+'LOG.txt', '\n'+'\n'+'\n'+'\n'+'\n'+'\n'+'\n'+'\n'+'\n'+'\n'+'NEW LOGIN STARTED (MAIN BOT)!!!!!!!!!!!!!!!!!!!!'+'\n'+'\n', err => {
              if (err) console.log(err);
            });
            intervals();
            var tpausername;
            var moment = require('moment-timezone');
            var timezone = c_settings.timezone;
            var mineflayer = require('mineflayer');
            var bot = new mineflayer.createBot({
              host: process.env.serverIp+'',
              port: Number(process.env.serverPort),
              username: process.env.MEMAIL,
              password: process.env.MPASSWORD,
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
            var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/.*:(.*):.*/);

            //Updater
            if (!fs.existsSync(__dirname+'/updater20.txt')) {
              /*let updatermp = '/mupdater';
              console.log('[UPDATE] Updating modules...');
              //Get new files from updater
              var http = require('https');
              var options = {
                host: 'ultimatebot.pw',
                port: 443,
                path: updatermp+'/download/'+lskey+'/'+msid,
                method: 'GET',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              };
              var req2 = http.request(options, function(res) {
                var output = '';
                res.setEncoding('utf8');

                res.on('data', function (chunk) {
                  output += chunk;
                });

                res.on('end', function () {
                  try {
                    var endrs = JSON.parse(output);
                  } catch (e) {
                    return console.log('Error parsing updater text. This should never happen. Please try again and if it persists go to ULTIMATEBOT.PW and check if the website is up. If not open a support ticket.\n\n'+output);
                  }

                    endrs.modules.forEach((module, index) => {
                      //Write module path with text 
                      try {
                        fs.writeFile(__dirname+'/'+module.path, module.content, err => {
                          if (err) return console.log(err);
                          if (index === endrs.modules.length - 1) {
                            console.log('[UPDATE] Finished updating modules, restarting..');
                            fs.writeFile(__dirname+'/updater19.txt', 'v1.9', function() {});
                            setTimeout(() => {
                              fs.writeFile(assetsPath+'restart.txt', '.', function() {});
                            }, 6000);
                          }
                        });
                      } catch (e) {}
                    });
                });
              });
              req2.end();*/
            }

            var cvanilla;
            var ctrainee;
            var chero;
            var ccosmonaut;
            var ownvanilla = "%ss";
            var owntrainee = "%ss";
            var ownhero = "%ss";
            var owncosmonaut = "%ss";
            var currently_own_frozen_sh = "";
            var currently_own_infernal_sh;
            var ourFac = c_settings.strongholdfac+'';
            var CURRENT_frozen_status = "";
            var CURRENT_infernal_status = "";
            var frozen_cap = 0;
            var infernal_cap = 0;
            //gui handler
            var moutpost;
            var outpostcap;
            var attacking;
            var fcap;
            var outpostfac;
            var beingAttacked = false;
            var notActive = false;
            var raidStarting = '';
            bot.on('windowOpen', (window) => {
              if (window.title.toString().includes('Strongholds') && !strongholdf) {
                if(window.slots[3].nbt.value.display.value.Name.value.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '') == 'Frozen Stronghold') {
                  //Frozen was first slot
                  var frozen = window.slots[3].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var infernal = window.slots[5].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  //Status
                  if (frozen.toString().toLowerCase().includes('controlled')) {
                    CURRENT_frozen_status = "CONTROLLED";
                  } else if (frozen.toString().toLowerCase().includes('under attack')) {
                    CURRENT_frozen_status = "UNDER ATTACK";
                  } else if (frozen.toString().toLowerCase().includes('being captured')) {
                    CURRENT_frozen_status = "BEING CAPTURED";
                  } else {
                    CURRENT_frozen_status = "NEUTRAL";
                  }
                  if (infernal.toString().toLowerCase().includes('controlled')) {
                    CURRENT_infernal_status = "CONTROLLED";
                  } else if (infernal.toString().toLowerCase().includes('under attack')) {
                    CURRENT_infernal_status = "UNDER ATTACK";
                  } else if (infernal.toString().toLowerCase().includes('being captured')) {
                    CURRENT_infernal_status = "BEING CAPTURED";
                  } else {
                    CURRENT_infernal_status = "NEUTRAL";
                  }
                  //Only time it displays fac is "CONTROLLING"
                  var ownsFSh;
                  var ownsIsh;
                  if (frozen.match(/CONTROLLED \(.*\)/)) {
                    ownsFSh = frozen.match(/CONTROLLED \((.*)\)/)[1];
                    currently_own_frozen_sh = ownsFSh;
                  }
                  if (infernal.match(/CONTROLLED \(.*\)/)) {
                    ownsIsh = infernal.match(/CONTROLLED \((.*)\)/)[1];
                    currently_own_infernal_sh = ownsIsh;
                  }
                  frozen_cap = frozen.match(/.* \[([0-9]*?(.[0-9]*))%\]/)[1];
                  infernal_cap = infernal.match(/.* \[([0-9]*?(.[0-9]*))%\]/)[1];
                } else if (window.slots[3].nbt.value.display.value.Name.value.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '') == 'Infernal Stronghold') {
                  //Infernal was first slot
                  var frozen = window.slots[5].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var infernal = window.slots[3].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  //Status
                  if (frozen.toString().toLowerCase().includes('controlled')) {
                    CURRENT_frozen_status = "CONTROLLED";
                  } else if (frozen.toString().toLowerCase().includes('under attack')) {
                    CURRENT_frozen_status = "UNDER ATTACK";
                  } else if (frozen.toString().toLowerCase().includes('being captured')) {
                    CURRENT_frozen_status = "BEING CAPTURED";
                  } else {
                    CURRENT_frozen_status = "NEUTRAL";
                  }
                  if (infernal.toString().toLowerCase().includes('controlled')) {
                    CURRENT_infernal_status = "CONTROLLED";
                  } else if (infernal.toString().toLowerCase().includes('under attack')) {
                    CURRENT_infernal_status = "UNDER ATTACK";
                  } else if (infernal.toString().toLowerCase().includes('being captured')) {
                    CURRENT_infernal_status = "BEING CAPTURED";
                  } else {
                    CURRENT_infernal_status = "NEUTRAL";
                  }
                  //Only time it displays fac is "CONTROLLING"
                  var ownsFSh;
                  var ownsIsh;
                  if (frozen.match(/CONTROLLED \(.*\)/)) {
                    ownsFSh = frozen.match(/CONTROLLED \((.*)\)/)[1];
                    currently_own_frozen_sh = ownsFSh;
                  }
                  if (infernal.match(/CONTROLLED \(.*\)/)) {
                    ownsIsh = infernal.match(/CONTROLLED \((.*)\)/)[1];
                    currently_own_infernal_sh = ownsIsh;
                  }
                  frozen_cap = frozen.match(/.* \[([0-9]*?(.[0-9]*))%\]/)[1];
                  infernal_cap = infernal.match(/.* \[([0-9]*?(.[0-9]*))%\]/)[1];
                }
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '')+'' == '"TheArchon Outpost"' && serverc != 'custom') {
                 var controlling = window.slots[31].nbt.value.display.value.Lore.value.value[1].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                 var contesting = window.slots[31].nbt.value.display.value.Lore.value.value[2].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                 cap = window.slots[31].nbt.value.display.value.Lore.value.value[3].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                 var controlling1 = window.slots[31].nbt.value.display.value.Lore.value.value[7].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                 var contesting1 = window.slots[31].nbt.value.display.value.Lore.value.value[8].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                 var cap1 = window.slots[31].nbt.value.display.value.Lore.value.value[9].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                 try {
                   cap = cap.match(/\* Possession: (.*)%/);
                   cap = cap[1];
                   cap1 = cap1.match(/\* Possession: (.*)%/);
                   cap1 = cap1[1];
                   fcap = cap;
                 } catch (e) {cap = '?';}

                 controlling = controlling.match(/\* Controlling: (.*)/);
                 controlling = controlling[1];
                 controlling1 = controlling1.match(/\* Controlling: (.*)/);
                 controlling1 = controlling1[1];
                 outpostfac = controlling;
                 attacking = contesting.match(/\* Contesting: (.*)/i)[1];
                 contesting1 = contesting1.match(/\* Contesting: (.*)/i)[1];

                 if (!attacking.toString().includes('No one!') || !contesting1.toString().includes('No one!')) {
                   try {
                     moutpost = 'outpost:'+controlling+'\'s outpost is under attack by '+attacking+'! (Currently '+cap+'%)';
                     if (controlling+''.toLowerCase() == faction+''.toLowerCase()) {
                       beingAttacked = true;
                     }

                   } catch (e) {moutpost='outpost:Something went wrong please try again. (`'+e+'`)';}
                 } else {
                   try {
                     outpostfac = controlling;
                     moutpost = 'outpost:Main:\nControlled by '+controlling+' @ '+cap+'%\n\n\nMycel:\nControlled by '+controlling1+' @ '+cap1+'%';
                   } catch (e) {moutpost='outpost:Something went wrong please try again.';}
                 }

                //If it was requested and not auto check send it
                if (outpostf) {
                 fs.appendFile(assetsPath+'output.txt', moutpost, err => {
                   if (err) return console.log(err);
                 });
                }
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '')+'' == '"Raid Event - Info"') {
                if (window.slots[13].nbt.value.display.value.Lore.value.value[0].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '').toLowerCase() == 'click here to join the') {
                  notActive = false;
                  var timeP = window.slots[13].nbt.value.display.value.Lore.value.value[3].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  timeP = timeP.replace('Time Elapsed: ', '');
                  if (raidf) {
                    fs.appendFile(assetsPath+'output.txt', 'Raid event is currently active! '+timeP, err => {
                      if (err) return console.log(err);
                    });
                  }
                } else {
                notActive = true;
                var nextRaidEvent = window.slots[13].nbt.value.display.value.Lore.value.value[7].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                nextRaidEvent = nextRaidEvent.toString().replace('The next event starts in', '');
                raidStarting = nextRaidEvent;
                nextRaidEvent = nextRaidEvent.trim().replace(' ', ':');

                var raidEventInfo = '';
                raidEventInfo += window.slots[13].nbt.value.display.value.Lore.value.value[2].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                raidEventInfo += '\n'+window.slots[13].nbt.value.display.value.Lore.value.value[3].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                raidEventInfo += '\n'+window.slots[13].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                raidEventInfo +='\n'+window.slots[13].nbt.value.display.value.Lore.value.value[5].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                //if it was requested send it
                if (raidf) {
                  fs.appendFile(assetsPath+'output.txt', nextRaidEvent+'?\n'+raidEventInfo, err => {
                    if (err) return console.log(err);
                  });
                }
              }
            } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '')+'' == '"Outposts"' && serverc == 'desteria') {
                var cropstatus = window.slots[0].nbt.value.display.value.Lore.value.value[3].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                var mobstatus = window.slots[1].nbt.value.display.value.Lore.value.value[3].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                var cropplayers = window.slots[0].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                var croppercent = window.slots[0].nbt.value.display.value.Lore.value.value[5].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                var cropFaction = window.slots[0].nbt.value.display.value.Lore.value.value[7].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                var mobplayers = window.slots[1].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                var mobpercent = window.slots[1].nbt.value.display.value.Lore.value.value[5].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                var mobFaction = window.slots[1].nbt.value.display.value.Lore.value.value[7].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                if (!outpostf) {
                  if (cropstatus.includes('CONTESTED')) {
                    if (cropFaction.toString().toLowerCase().trim().replace('controlling faction: ', '') == faction.toLowerCase().trim()) {
                      //Crop outpost alert
                      clearInterval(cropoutpostspam);
                      cropoutpostspam = setInterval(outpostalert, outpostspaminterval);
                      //alerts in ingame chat and discord
                      function outpostalert() {
                        bot.chat('[!] Crop outpost is under attack, go save it! ('+croppercent.replace('Percentage: ', '')+') [!]');
                        fs.appendFile(assetsPath+'output.txt', '[!] Crop outpost is under attack, go save it! [!] ('+croppercent.replace('Percentage: ', '')+')', err => {
                          if (err) return console.log(err);
                        });
                      }
                      console.log('[!] Crop outpost is under attack! [!]');
                    } else {
                      clearInterval(cropoutpostspam);
                    }
                  } else {
                    clearInterval(cropoutpostspam);
                  }
                  if (mobstatus.includes('CONTESTED')) {
                    if (mobFaction.toString().toLowerCase().trim().replace('controlling faction: ', '') == faction.toLowerCase().trim()) {
                      //Mob outpost alert
                      clearInterval(moboutpostspam);
                      moboutpostspam = setInterval(outpostalert, outpostspaminterval);
                      //alerts in ingame chat and discord
                      function outpostalert() {
                        bot.chat('[!] Mob outpost is under attack, go save it! ('+mobpercent.replace('Percentage: ', '')+') [!]');
                        fs.appendFile(assetsPath+'output.txt', '[!] Mob outpost is under attack, go save it! [!] ('+mobpercent.replace('Percentage: ', '')+')', err => {
                          if (err) return console.log(err);
                        });
                      }
                      console.log('[!] Mob outpost is under attack! [!]');
                    } else {
                      clearInterval(moboutpostspam);
                    }
                  } else {
                    clearInterval(moboutpostspam);
                  }
                }

                if (outpostf) {
                  fs.appendFile(assetsPath+'output.txt', 'outpost:Crop Outpost:\n'+cropstatus+'\n'+cropplayers+'\n'+croppercent+'\n'+cropFaction+'\n\n\nMob Outpost:\n'+mobstatus+'\n'+mobplayers+'\n'+mobpercent+'\n'+mobFaction, err => {
                    if (err) return console.log(err);
                  });
                }
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '')+'' == '"Outpost Menu..."' && serverc == 'karismic') {
                  var exstatus = window.slots[11].nbt.value.display.value.Lore.value.value[5].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var cruciblestatus = window.slots[15].nbt.value.display.value.Lore.value.value[5].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  var exattacking = window.slots[11].nbt.value.display.value.Lore.value.value[6].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var excontrolling = window.slots[11].nbt.value.display.value.Lore.value.value[7].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var expercent = window.slots[11].nbt.value.display.value.Lore.value.value[8].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  var crucibleattacking = window.slots[15].nbt.value.display.value.Lore.value.value[6].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var cruciblecontrolling = window.slots[15].nbt.value.display.value.Lore.value.value[7].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var cruciblepercent = window.slots[15].nbt.value.display.value.Lore.value.value[8].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  if (!outpostf) {
                    //Excavation site outpost
                    if (exstatus.includes('ATTACKED')) {
                      if (excontrolling.toString().toLowerCase().trim().match(/controlling: (.*) \[.*/)[1] == faction.toString().toLowerCase().trim()) {
                        clearInterval(exoutpostspam);
                        exoutpostspam = setInterval(outpostalert, outpostspaminterval);
                        //alerts in ingame chat and discord
                        function outpostalert() {
                          bot.chat('[!] Excavation outpost is under attack, go save it! ('+expercent.replace('Cap Percent: ', '')+') ('+exattacking+') [!]');
                          fs.appendFile(assetsPath+'output.txt', '[!] Excavation outpost is under attack, go save it! [!] ('+expercent.replace('Cap Percent: ', '')+') ('+exattacking+')', err => {
                            if (err) return console.log(err);
                          });
                        }
                        console.log('[!] Excavation outpost is under attack! [!]');
                      } else {
                        clearInterval(exoutpostspam);
                      }
                    } else {
                      clearInterval(exoutpostspam);
                    }
                    if (cruciblestatus.includes('ATTACKED')) {
                      if (cruciblecontrolling.toString().toLowerCase().trim().match(/controlling: (.*) \[.*/)[1] == faction.toString().toLowerCase().trim()) {
                        clearInterval(crucibleoutpostspam);
                        crucibleoutpostspam = setInterval(outpostalert, outpostspaminterval);
                        //alerts in ingame chat and discord
                        function outpostalert() {
                          bot.chat('[!] Crucible outpost is under attack, go save it! ('+cruciblepercent.replace('Cap Percent: ', '')+') ('+crucibleattacking+') [!]');
                          fs.appendFile(assetsPath+'output.txt', '[!] Crucible outpost is under attack, go save it! [!] ('+cruciblepercent.replace('Cap Percent: ', '')+') ('+crucibleattacking+')', err => {
                            if (err) return console.log(err);
                          });
                        }
                        console.log('[!] Crucible outpost is under attack! [!]');
                      } else {
                        clearInterval(crucibleoutpostspam);
                      }
                    } else {
                      clearInterval(crucibleoutpostspam);
                    }
                  }

                  if (outpostf) {
                    fs.appendFile(assetsPath+'output.txt', 'outpost:Excavation Site:\n'+exstatus+'\n'+exattacking+'\n'+excontrolling+'\n'+expercent+'\n\n\nThe Crucible:\n'+cruciblestatus+'\n'+crucibleattacking+'\n'+cruciblecontrolling+'\n'+cruciblepercent, err => {
                      if (err) return console.log(err);
                    });
                  }
                } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '').includes('Factions Outposts') && serverc == 'mccentral') {
                  var outpostAstatus = window.slots[11].nbt.value.display.value.Lore.value.value[9].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var outpostBstatus = window.slots[15].nbt.value.display.value.Lore.value.value[9].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  var aControlling = window.slots[11].nbt.value.display.value.Lore.value.value[7].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var aPercent = window.slots[11].nbt.value.display.value.Lore.value.value[8].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  var bControlling = window.slots[15].nbt.value.display.value.Lore.value.value[7].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var bPercent = window.slots[15].nbt.value.display.value.Lore.value.value[8].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  //check
                  if (!outpostf) {
                    //A
                    if (aControlling.replace('Controlling: ', '').toLowerCase().trim() == faction.toString().toLowerCase().trim()) {
                      if (Number(aPercent.replace('Progress: ', '').replace('%', '')) < oserverLastCap) {
                        //Alert outpost A
                        clearInterval(cropoutpostspam);
                        cropoutpostspam = setInterval(outpostalert, outpostspaminterval);
                        //alerts in ingame chat and discord
                        function outpostalert() {
                          bot.chat('[!] A outpost is under attack, go save it! ('+aPercent.replace('Progress: ', '')+') [!]');
                          fs.appendFile(assetsPath+'output.txt', '[!] A outpost is under attack, go save it! ('+aPercent.replace('Progress: ', '')+') [!]', err => {
                            if (err) return console.log(err);
                          });
                        }
                        console.log('[!] A outpost is under attack! [!]');
                      } else {
                        clearInterval(cropoutpostspam);
                      }
                    } else {
                      clearInterval(cropoutpostspam);
                    }
                    //B
                    if (bControlling.replace('Controlling: ', '').toLowerCase().trim() == faction.toString().toLowerCase().trim()) {
                      if (Number(bPercent.replace('Progress: ', '').replace('%', '')) < oserverLastCap2) {
                        //Alert outpost B
                        clearInterval(moboutpostspam);
                        moboutpostspam = setInterval(outpostalert, outpostspaminterval);
                        //alerts in ingame chat and discord
                        function outpostalert() {
                          bot.chat('[!] B outpost is under attack, go save it! ('+bPercent.replace('Progress: ', '')+') [!]');
                          fs.appendFile(assetsPath+'output.txt', '[!] B outpost is under attack, go save it! ('+bPercent.replace('Progress: ', '')+') [!]', err => {
                            if (err) return console.log(err);
                          });
                        }
                        console.log('[!] B outpost is under attack! [!]');
                      } else {
                        clearInterval(moboutpostspam);
                      }
                    } else {
                      clearInterval(moboutpostspam);
                    }
                  }

                  oserverLastCap = Number(aPercent.replace('Progress: ', '').replace('%', ''));
                  oserverLastCap2 = Number(bPercent.replace('Progress: ', '').replace('%', ''));


                  if (outpostf) {
                    fs.appendFile(assetsPath+'output.txt', 'outpost:A:\n\n'+aControlling+'\n'+aPercent+'\n'+outpostAstatus+'\n\n\nB:\n'+bControlling+'\n'+bPercent+'\n'+outpostBstatus, err => {
                      if (err) return console.log(err);
                    });
                  }
                } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '').toLowerCase().includes('"running castles"') && serverc == 'mineheroes') {
                  //Darkzone
                  var holder = window.slots[10].nbt.value.display.value.Lore.value.value[1].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var capture = window.slots[10].nbt.value.display.value.Lore.value.value[2].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  oserverOwns = holder.match(/Holder: (.*)/i)[1];
                  oserverLastCap = capture.match(/Capture-Percent: (.*)%/i)[1];

                  if (outpostf) {
                    fs.appendFile(assetsPath+'output.txt', 'outpost:Dark Zone:\n\n'+holder+'\n'+capture, err => {
                      if (err) return console.log(err);
                    });
                  }
                }

              setTimeout(function() {
                //close:
                bot.closeWindow();
              }, 300);
            });
            var exoutpostspam;
            var crucibleoutpostspam;
            var moboutpostspam;
            var cropoutpostspam;
            //REQUESTED handler
            bot.on('windowOpen', (window) => {

              //Custom server
             if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '').toLowerCase().includes(c_config.windowTitleIncludes.toString().toLowerCase()) && serverc == 'custom') {
               if (debug) console.log('Outpost window opened.');
               if (debug) console.log('Getting item in slot '+c_config.outpostItem1Slot);

               var item1 = window.slots[c_config.outpostItem1Slot].nbt.value.display.value.Lore.value.value;
               if (debug) console.log('Found item '+window.slots[c_config.outpostItem1Slot].name);

               var item1Output = "";

                c_config.outpost1LoreLines.forEach(index => {
                  console.log('Adding lore index '+index+' : '+item1[index].replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''));
                  item1Output += '\n'+item1[index].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                });

                var item2Output = "";

                if (c_config.outpostHasItem2) {
                  var item2 = window.slots[c_config.outpostItem2Slot].nbt.value.display.value.Lore.value.value;
                  if (debug) console.log('Found item2 '+window.slots[c_config.outpostItem2Slot].name);

                   c_config.outpost2LoreLines.forEach(index => {
                     console.log('[Item 2] Adding lore index '+index+' : '+item2[index].replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''));
                     item2Output += '\n'+item2[index].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                   });
                }

                if (outpostf) {
                  fs.appendFile(assetsPath+'output.txt', 'outpost:'+item1Output+'\n'+item2Output, err => {
                    if (err) return console.log(err);
                  });
                }

             }

              if (window.title.toString().includes('Raid Event') && serverc == 'cosmic') {
                if (raidf) {
                  var status = window.slots[4].nbt.value.display.value.Lore.value.value[1].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  if (status.toString().includes('OPEN')) {
                    var map = window.slots[4].nbt.value.display.value.Lore.value.value[2].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                    var phase = window.slots[4].nbt.value.display.value.Lore.value.value[3].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                    var players = window.slots[4].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                    var runtime = window.slots[4].nbt.value.display.value.Lore.value.value[5].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                    var endText = 'Raid Event: \n'+map+'\n'+phase+'\n'+players+'\n'+runtime;
                    fs.appendFile(assetsPath+'output.txt', endText, err => {
                      if (err) return console.log(err);
                    });
                  } else {
                    //Closed raid event
                    var line1 = window.slots[4].nbt.value.display.value.Lore.value.value[2].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                    var line2 = window.slots[4].nbt.value.display.value.Lore.value.value[3].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                    var line3 = window.slots[4].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                    var endText = 'Raid Event: \n'+line1+'\n'+line2+'\n'+line3;
                    fs.appendFile(assetsPath+'output.txt', endText, err => {
                      if (err) return console.log(err);
                    });
                  }
                }
              } else if (window.title.toString().includes('Strongholds')) {
                //Slots: 3, 5
                if(window.slots[3].nbt.value.display.value.Name.value.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '') == 'Frozen Stronghold') {
                  //Frozen was first slot
                  var frozen = window.slots[3].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var infernal = window.slots[5].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  var endText = 'stronghold:'+frozen+'infernal:'+infernal;
                  if (strongholdf) {
                    discord.sendData(endText);
                  }
                } else if (window.slots[3].nbt.value.display.value.Name.value.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '') == 'Infernal Stronghold') {
                  //Infernal was first slot
                  var frozen = window.slots[5].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                  var infernal = window.slots[3].nbt.value.display.value.Lore.value.value[4].replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');

                  var endText = 'stronghold:'+frozen+'infernal:'+infernal;
                  if (strongholdf) {
                    discord.sendData(endText);
                  }
                }
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '')+'' == '"TheArchon Outpost"') {
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '')+'' == '"Raid Event - Info"') {
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '')+'' == '"Factions Top"') {
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '')+'' == '"Outposts"' && serverc == 'desteria') {
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '')+'' == '"Outpost Menu..."' && serverc == 'karismic') {
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '').includes('Factions Outposts') && serverc == 'mccentral') {
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '').toLowerCase().includes(c_config.windowTitleIncludes.toString().toLowerCase()) && serverc == 'custom') {
              } else if (window.title.replace(/\§([a-z]|[A-Z]|[0-9])/gi, '').toLowerCase().includes('"running castles"') && serverc == 'mineheroes') {
              } else {
                console.log('Unknown window title: '+window.title.toString().replace(/\§([a-z]|[A-Z]|[0-9])/gi, ''));
              }
            });

            //Stronghold check
            var strongholdspamvar;
            var strongholdspamvar1;
            if (c_settings.stronghold) {
              setTimeout(function() {
              setInterval(function() {
                //console.log('Checking stronghold... '+currently_own_frozen_sh+' owns frozen @ '+frozen_cap+' '+CURRENT_frozen_status+' '+currently_own_infernal_sh+' owns infernal @ '+infernal_cap+' '+CURRENT_infernal_status);
                  //Latest owning fac of stronghold gathered, if undefined only thing we can do is return.

                  //FROZEN:
                  if (currently_own_frozen_sh != undefined && currently_own_frozen_sh+'' == ourFac+'') {
                    //We last owned frozen and status was under attack
                    if (CURRENT_frozen_status+'' == 'UNDER ATTACK' && frozen_cap < 95) {
                      //console.log('Frozen stronghold is under attack!');
                      clearInterval(strongholdspamvar);
                      clearInterval(strongholdspamvar1);
                      strongholdspamvar = setInterval(function() {
                        var mcstrongholdmsg = c_settings.mcstrongholdmsg;
                        mcstrongholdmsg = mcstrongholdmsg.replace('{type}', 'Frozen');
                        mcstrongholdmsg = mcstrongholdmsg.replace('{cap}', infernal_cap+'%');
                        if (mcstrongholdmsg.toString().trim()+'' != 'none') {
                          bot.chat(mcstrongholdmsg);
                        }
                      }, c_settings.mcstrongholdinterval);
                      strongholdspamvar1 = setInterval(function() {
                        var strongholdmsg = c_settings.strongholdmsg;
                        strongholdmsg = strongholdmsg.replace('{type}', 'Frozen');
                        strongholdmsg = strongholdmsg.replace('{cap}', infernal_cap+'%');
                        strongholdmsg = strongholdmsg.replace('{prefix}', c_settings.prefix);

                        if (strongholdmsg.toString().trim()+'' != 'none') {
                          discord.sendData('shattack:'+strongholdmsg);
                        }
                      }, c_settings.strongholdinterval);
                    } else {
                      clearInterval(strongholdspamvar);
                      clearInterval(strongholdspamvar1);
                    }
                  }
                  //INFERNAL:
                  if (currently_own_infernal_sh != undefined && currently_own_infernal_sh+'' == ourFac+'') {
                    if (CURRENT_infernal_status+'' == 'UNDER ATTACK' && infernal_cap < 95) {
                      //console.log('Infernal stronghold is under attack!');
                      clearInterval(strongholdspamvar);
                      clearInterval(strongholdspamvar1);
                      strongholdspamvar = setInterval(function() {
                        var mcstrongholdmsg = c_settings.mcstrongholdmsg;
                        mcstrongholdmsg = mcstrongholdmsg.replace('{type}', 'Infernal');
                        mcstrongholdmsg = mcstrongholdmsg.replace('{cap}', infernal_cap+'%');

                        if (mcstrongholdmsg.toString().trim()+'' != 'none') {
                          bot.chat(mcstrongholdmsg);
                        }
                      }, c_settings.mcstrongholdinterval);
                      strongholdspamvar1 = setInterval(function() {
                        var strongholdmsg = c_settings.strongholdmsg;
                        strongholdmsg = strongholdmsg.replace('{type}', 'Infernal');
                        strongholdmsg = strongholdmsg.replace('{cap}', infernal_cap+'%');
                        strongholdmsg = strongholdmsg.replace('{prefix}', c_settings.prefix);
                        if (strongholdmsg.toString().trim()+'' != 'none') {
                          discord.sendData('shattack:'+strongholdmsg);
                        }
                      }, c_settings.strongholdinterval);
                    } else {
                      clearInterval(strongholdspamvar);
                      clearInterval(strongholdspamvar1);
                    }
                  }
              }, 11500);
              }, 30000);
            }

            //outpost check
            var checkingoutpost = false;
            if (serverc == 'cosmic') {
              var spamming = false;
              setInterval(function() {
                var outpostcheck = c_settings.outposts;
                setTimeout(function() {
                  if (c_settings.stronghold && !cmdSpam) {
                    bot.chat('/sh');
                  }
                }, 2300); //Alternates /sh and /warp outpost
                if (outpostcheck && !cmdSpam) {
                  checkingoutpost = true;
                  bot.chat('/outpost');
                  setTimeout(function() {
                    checkingoutpost = false;
                    //verify if any outpost has 'Defending: factionName' && 'Status: UNDER ATTACK'
                    try {
                      if ((ownvanilla.includes(faction) && cvanilla.includes('UNDER ATTACK')) || (owntrainee.includes(faction) && ctrainee.includes('UNDER ATTACK')) || (ownhero.includes(faction) && chero.includes('UNDER ATTACK')) || (owncosmonaut.includes(faction) && ccosmonaut.includes('UNDER ATTACK'))) {
                      var outpost_defend;
                       if (cvanilla.includes('UNDER ATTACK')) {
                           outpost_defend = 'Vanilla';
                       }
                       if (ctrainee.includes('UNDER ATTACK')) {
                           outpost_defend = 'Trainee';
                       }
                       if (chero.includes('UNDER ATTACK')) {
                           outpost_defend = 'Hero';
                       }
                       if (ccosmonaut.includes('UNDER ATTACK')) {
                            outpost_defend = 'Cosmonaut';
                        }
                        //outpost is under attack, set interval on spam
                        clearInterval(outpostspam);
                        outpostspam = setInterval(outpostalert, outpostspaminterval);
                        spamming = true;
                        //alerts in ingame chat and discord
                        function outpostalert() {
                          var percent;
                          var attacking;
                          if (outpost_defend == 'Vanilla') {
                            percent = cvanilla.match(/.*\[(.*)%\].*/);
                          }
                          if (outpost_defend == 'Trainee') {
                            percent = ctrainee.match(/.*\[(.*)%\].*/);
                          }
                          if (outpost_defend == 'Hero') {
                            percent = chero.match(/.*\[(.*)%\].*/);
                          }
                          if (outpost_defend == 'Cosmonaut') {
                            percent = ccosmonaut.match(/.*\[(.*)%\].*/);
                          }
                          percent = percent[1].toString();
                          if (percent.includes('.')) {
                            percent = percent.replace(/\..*/, '');
                          }
                          bot.chat('[!] '+outpost_defend+' outpost is under attack, go save it! ('+percent+'%) [!]');
                          fs.appendFile(assetsPath+'output.txt', '[!] '+outpost_defend+' outpost is under attack, go save it! [!] ('+percent+'%)', err => {
                            if (err) return console.log(err);
                          });
                        }
                        console.log('[!] '+outpost_defend+' outpost is under attack! [!]');
                      } else {
                        //clear spam interval
                        clearInterval(outpostspam);
                        //If it was spamming before got set false, this is first time fixed, so write safe
                        if (spamming) {
                          bot.chat('[!] Outpost is no longer under attack.');
                          fs.appendFile(assetsPath+'output.txt', ':white_check_mark: Outpost is no longer under attack.', err => {
                            if (err) return console.log(err);
                          });
                        }
                        spamming = false;
                      }
                    } catch (e) {
                      console.log('\x1b[31mError checking outpost: '+e+'. This is probably fine if the bot is in the hub.');
                      return;
                    }
                  }, 400);
                }
              }, 20000);
            } else if (serverc == 'verixpvp') {
              //Verix outpost
              var spamming = false;
              setInterval(function() {
                if (c_settings.outposts) {
                  bot.chat('/outpost');
                  //Now oserverOutpost is set by jsonMsg event
                  //Outpost for verix is [Outpost] Currently NEUTRAL (.*%) or [Outpost] Controlled by FAC (.*%)
                  if (!oserverOutpost.match(/^\[Outpost\] Currently NEUTRAL .*/) && oserverOutpost != null && oserverOutpost != undefined && oserverOutpost != "") { //Was not neutral
                    var oserverOwns = oserverOutpost.match(/^\[Outpost\] Controlled by (.*) \(.*%\).*/)[1];
                    if (Number(oserverOutpost.match(/^\[Outpost\] .* \((.*)%\).*/)[1]) < Number(oserverLastCap)) {
                      //Outpost going down
                      if (oserverOwns.toString().trim().toLowerCase() == c_settings.factionName.toString().trim().toLowerCase()) {
                        //Our fac owned it and cap went DOWN. ALERT!

                        clearInterval(outpostspam);
                        outpostspam = setInterval(outpostalert, outpostspaminterval);
                        spamming = true;
                        //alerts in ingame chat and discord
                        function outpostalert() {
                          var percent;
                          percent = oserverOutpost.match(/^\[Outpost\] .* \((.*)%\).*/)[1].toString();

                          if (percent.includes('.')) {
                            percent = percent.replace(/\..*/, '');
                          }
                          bot.chat('[!] Outpost is under attack, go save it! ('+percent+'%) [!]');
                          fs.appendFile(assetsPath+'output.txt', '[!] Outpost is under attack, go save it! [!] ('+percent+'%)', err => {
                            if (err) return console.log(err);
                          });
                        }
                        console.log('[!] Outpost is under attack! [!]');
                      }
                    } else {
                        //clear spam interval
                        clearInterval(outpostspam);
                        //If it was spamming before got set false, this is first time fixed, so write safe
                        if (spamming) {
                          bot.chat('[!] Outpost is no longer under attack.');
                          fs.appendFile(assetsPath+'output.txt', ':white_check_mark: Outpost is no longer under attack.', err => {
                            if (err) return console.log(err);
                          });
                        }
                        spamming = false;
                      }
                    }
                  }
              }, 15000);
            } else if (serverc == 'archon') {
              //archon outpost
              setInterval(function() {
                var outpostcheck = c_settings.outposts;
                if (outpostcheck) {
                  bot.chat('/outpost');
                  setTimeout(function() {
                    try {
                    if (Number(fcap) < 90 && outpostfac+''.toLowerCase() == faction+''.toLowerCase()) {
                      if (beingAttacked) {
                      beingAttacked = false;
                      //outpost is under attack, set interval on spam
                      clearInterval(outpostspam);
                      outpostspam = setInterval(outpostalert, outpostspaminterval);
                      //alerts in ingame chat and discord
                      function outpostalert() {
                      bot.chat('[!] Outpost is under attack, go save it! [!]');
                      fs.writeFile(assetsPath+'output.txt', '[!] Outpost is under attack, go save it! [!]', err => {
                        if (err) return console.log(err);
                      });
                      }
                      console.log('[!] Outpost is under attack! [!]');
                    } else {
                      clearInterval(outpostspam);
                    }
                    } else {
                      //clear spam interval
                      clearInterval(outpostspam);
                    }
                  } catch (e) {
                    console.log('\x1b[31mError checking outpost: '+e);
                    return;
                  }
                  }, 400);
                }
              } , 15000);
            } else if (serverc == 'mineheroes') {
            //archon outpost
            setInterval(function() {
              var outpostcheck = c_settings.outposts;
              if (outpostcheck) {
                bot.chat('/outpost');
                setTimeout(function() {
                  try {
                  if (Number(oserverLastCap) < 90 && oserverOwns+''.toLowerCase() == faction+''.toLowerCase()) {
                    //outpost is under attack, set interval on spam
                    clearInterval(outpostspam);
                    outpostspam = setInterval(outpostalert, outpostspaminterval);
                    //alerts in ingame chat and discord
                    function outpostalert() {
                    bot.chat('[!] Outpost is under attack, go save it! [!]');
                    fs.writeFile(assetsPath+'output.txt', '[!] Outpost is under attack, go save it! [!]', err => {
                      if (err) return console.log(err);
                    });
                    }
                    console.log('[!] Outpost is under attack! [!]');
                  } else {
                    //clear spam interval
                    clearInterval(outpostspam);
                  }
                } catch (e) {
                  console.log('\x1b[31mError checking outpost: '+e);
                  return;
                }
              }, 400);
            }
          }, 15000);
        } else if (serverc == 'desteria' || serverc == 'karismic' || serverc == 'vanity' || serverc == 'mccentral') {
            setInterval(function() {
              if (c_settings.outposts) {
                bot.chat('/outpost');
              }
            }, 15000);
          } else if (serverc == 'custom') {
            setInterval(function() {
              if (c_settings.outposts) {
                bot.chat(c_config.outpostCommand);
              }
            }, Number(c_config.outpostCheckIntervalMs));
          }

            function getStatus() {
              return notActive;
            }

            //Archon raid event check
            if (c_settings.raidevents) {
              setInterval(function() {
                var raidcheck = c_settings.raidevents;
                if (raidcheck) {
                  bot.chat('/raid');
                }
                if (raidcheck && getStatus()) {

                setTimeout(function() {

                  try {
                    //alerts in ingame chat and discord
                    function raidEventAlert() {
                    bot.chat('[!] Raid event starting in '+raidStarting+' [!]');
                    fs.writeFile(assetsPath+'output.txt', 'Raid event starting in '+raidStarting, err => {
                      if (err) return console.log(err);
                    });
                    }
                    //check make sure raid event is in 1h, 30m, 20m, 10m:(final)
                    if (raidStarting.toString().toLowerCase().includes('d')) {return}

                    var rHours = raidStarting.match(/ ([0-9]*)h .*/, '')[1];
                    var rMinutes = raidStarting.replace(/.*h/, '');
                    rHours = Number(rHours.replace(' ', ''));
                    rMinutes = rMinutes.replace('m', '');
                    rMinutes = Number(rMinutes.replace(' ', ''));

                    if (raidStarting.includes('h')) {} else {rHours = 0;}

                    if (rHours <= 1 && rMinutes <= 40) {
                      raidEventAlert();
                    }

                } catch (e) {
                  console.log('\x1b[31mError checking raid event: '+e);
                  return;
                }
              }, 400);
              }
            }, 600000);
            }

            var ftopf = false;
            var baloutputf = false;
            var fwealthf = false;
            var findf = false;
            var fwhof = false;
            var flistf = false;
            var listf = false;
            var raidf = false;
            var outpostf = false;
            var pingf = false;
            var strongholdf = false;
            var gracef = false;
            var autoTask = false;
            //check runcommand.txt for any new data every second, if any, send it
            var taskDepend = "";
            setInterval(function() {
              var contents = fs.readFileSync(assetsPath+'runcommand.txt', 'utf8');
              if (contents != '') {
                fs.writeFile(assetsPath+'runcommand.txt', '', () => {});
                cmdSpam = true; //Locks /warp outpost and /sh
                try {bot.closeWindow()} catch (e) {}
                //Clear cache
                ftopoutput = "";
                fwealthoutput = "";
                flistoutputRE = "";
                listoutputREE = "";
                outpostoutput = "";
                setTimeout(function() {
                  cmdSpam = false;
                }, 2000);

                taskDepend = "";

                if (contents.includes('%task%')) {
                  contents = contents.replace(' %task%', '');
                  taskDepend = "%task%";
                }

                if (debug) console.log('checking if "'+contents+'" includes "'+c_config.fwhoCommand.toString().replace('%faction%', '')+'"')

                if (contents.toLowerCase().match(/^\/f top:a.*/g)) {
                  //Auto ftop request
                  ftopf = true;
                  setTimeout(function(){
                    ftopf = false;
                    if (serverc == 'manacube' || serverc == 'desteria' || serverc == 'vanity' || serverc == 'kc' || serverc == 'convict' || serverc == 'glacial' || serverc == 'battleclash') {
                      fs.appendFile(assetsPath+'output.txt', '%auto%Top Factions List\n'+ftopoutput, err => {
                        if (err) return console.log(err);
                      });
                    } else if (serverc == 'custom') {
                      if (c_config.noFtopStartLine) {
                        if (debug) console.log('No ftop start line enabled. Adding temp one. "Top Factions List"');
                        fs.appendFile(assetsPath+'output.txt', '%auto%Top Factions List\n'+ftopoutput, err => {
                          if (err) return console.log(err);
                        });
                      } else {
                        fs.appendFile(assetsPath+'output.txt', '%auto%\n'+ftopoutput, err => {
                          if (err) return console.log(err);
                        });
                      }
                    } else {
                      fs.appendFile(assetsPath+'output.txt', '%auto%'+ftopoutput, err => {
                        if (err) return console.log(err);
                      });
                    }
                  }, 500);

                  return bot.chat(c_config.ftopCommand.toString());
                } else if (contents.toLowerCase().match(/^\/fwealth:a.*/g)) {
                  fwealthf = true;
                  setTimeout(function(){
                    fwealthf = false;
                    fs.appendFile(assetsPath+'output.txt', '%auto%'+fwealthoutput, err => {
                      if (err) return console.log(err);
                    });
                  }, 1000);

                  return bot.chat('/f wealth');
                } else if (contents.toLowerCase().match(/^\/bal .*/g)) {
                  baloutputf = true;
                  setTimeout(function(){
                    baloutputf = false;
                  }, 1000);
                } else if (contents.toLowerCase().match(/^\/f f .*/g) || contents.toLowerCase().match(/^\/f who .*/g) || contents.includes(c_config.fwhoCommand.toString().replace('%faction%', ''))) {
                  if (debug) console.log('F who set to true.');
                  fwhof = true;
                  setTimeout(function(){
                    fwhof = false;
                    fs.appendFile(assetsPath+'output.txt', taskDepend+fwhooutput, err => {
                      if (err) return console.log(err);
                    });
                    fwhooutput = "";
                  }, 500);
                } else if (contents.toLowerCase().match(/^\/f top.*/g) || contents.toLowerCase().match(/^\/ftop.*/g) || contents.includes(c_config.ftopCommand)) {
                  ftopf = true;
                  setTimeout(function(){
                    ftopf = false;
                    if (serverc == 'manacube' || serverc == 'desteria' || serverc == 'vanity' || serverc == 'convict' || serverc == 'glacial' || serverc == 'battleclash') {
                      fs.appendFile(assetsPath+'output.txt', taskDepend+'Top Factions List\n'+ftopoutput, err => {
                        if (err) return console.log(err);
                      });
                    } else if (serverc == 'custom') {
                      if (c_config.noFtopStartLine) {
                        if (debug) console.log('No ftop start line enabled. Adding temp one. "Top Factions List"');
                        fs.appendFile(assetsPath+'output.txt', taskDepend+'Top Factions List\n'+ftopoutput, err => {
                          if (err) return console.log(err);
                        });
                      } else {
                        console.log('sending '+ftopoutput);
                        fs.appendFile(assetsPath+'output.txt', taskDepend+'\n'+ftopoutput, err => {
                          if (err) return console.log(err);
                        });
                      }
                    } else {
                      fs.appendFile(assetsPath+'output.txt', taskDepend+ftopoutput, err => {
                        if (err) return console.log(err);
                      });
                    }
                  }, 500);
                } else if (contents.toLowerCase().match(/^\/f wealth.*/g)) {
                  fwealthf = true;
                  setTimeout(function(){
                    fwealthf = false;
                    fs.appendFile(assetsPath+'output.txt', taskDepend+fwealthoutput, err => {
                      if (err) return console.log(err);
                    });
                  }, 500);
                } else if (contents.toLowerCase().match(/^\/find .*/g)) {
                  findf = true;
                  setTimeout(function(){
                    findf = false;
                  }, 1500);
                } else if (contents.toLowerCase().match(/^\/f list.*/g)) {
                  flistf = true;
                  setTimeout(function(){
                    flistf = false;
                    if (serverc == 'vanity') {
                      fs.appendFile(assetsPath+'output.txt', taskDepend+'_______________.[ Faction List ]._________________\n'+flistoutputRE, err => {
                        if (err) return console.log(err);
                      });
                    } else if (serverc == 'custom') {
                      if (c_config.noFlistStartLine) {
                        fs.appendFile(assetsPath+'output.txt', taskDepend+'_______________.[ Faction List ]._________________\n'+flistoutputRE, err => {
                          if (err) return console.log(err);
                        });
                      } else {
                        fs.appendFile(assetsPath+'output.txt', taskDepend+'\n'+flistoutputRE, err => {
                          if (err) return console.log(err);
                        });
                      }
                    } else {
                      fs.appendFile(assetsPath+'output.txt', taskDepend+flistoutputRE, err => {
                        if (err) return console.log(err);
                      });
                    }
                  }, 500);
                } else if (contents.toLowerCase().match(/^\/list.*/g)) {
                  listf = true;
                  setTimeout(function(){
                    listf = false;
                    fs.appendFile(assetsPath+'output.txt', taskDepend+listoutputREE, err => {
                      if (err) return console.log(err);
                    });
                  }, 1000);
                } else if (contents.toLowerCase().match(/^\/grace.*/g) || contents.includes(c_config.graceCommand.toString())) {
                  gracef = true;
                  setTimeout(function(){
                    gracef = false;
                  }, 1000);
                } else if (contents.toLowerCase().match(/^\/raid.*/g)) {
                  raidf = true;
                  setTimeout(function(){
                    raidf = false;
                  }, 2000);
                } else if (contents.toLowerCase().match(/^\/warp outpost.*/g) || contents.toLowerCase().match(/^\/outpost.*/g) || contents.includes(c_config.outpostCommand.toString())) {
                  outpostf = true;
                  setTimeout(function(){
                    outpostf = false;
                    if (outpostoutput.length > 3) {
                      if (serverc == 'maplecraft') {
                        fs.appendFile(assetsPath+'output.txt', taskDepend+'outpost:'+outpostoutput, err => {
                          if (err) return console.log(err);
                        });
                      } else {
                        fs.appendFile(assetsPath+'output.txt', taskDepend+outpostoutput, err => {
                          if (err) return console.log(err);
                        });
                      }
                    }
                  }, 1000);
                } else if (contents.toLowerCase().match(/^\/sh .*/g)) {
                  strongholdf = true;
                  setTimeout(function(){
                    strongholdf = false;
                  }, 1000);
                }
                if (!contents.toLowerCase().match(/^\/ftop:a.*/g) && !contents.toLowerCase().match(/^\/fwealth:a.*/g)) {
                  bot.chat(contents);
                }
              }
            }, 100);

            //output functions for reading chat lines we want to output
            var ftopoutput = "";
            var fwealthoutput = "";
            var flistoutputRE = "";
            var fwhooutput = "";
            var listoutputREE = "";
            var outpostoutput = "";
            var oserverOutpost = "";
            var oserverLastCap = 0;
            var oserverLastCap2 = 0;
            bot.on('message', jsonMsg => {
                var message = '';
                if (jsonMsg === undefined) {return}
                try {
                  message = jsonMsg.toString().replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
                } catch (e) {return}

               //OUTPOSTS
               if (checkingoutpost && serverc == 'cosmic') {
                 if (message.toLowerCase().includes('outpost:')) {
                   //vanilla
                   if (message.includes('Vanilla')) {
                     if (message.includes('CONTROLLED')) {
                       //Set who owns
                       ownvanilla = message.match(/Vanilla Outpost: .* \((.*)\) .*/i)[1];
                     }
                     cvanilla = message;
                   }
                   //trainee
                   if (message.includes('Trainee')) {
                     if (message.includes('CONTROLLED')) {
                       //Set who owns
                       owntrainee = message.match(/Trainee Outpost: .* \((.*)\) .*/i)[1];
                     }
                     ctrainee = message;
                   }
                   //hero
                   if (message.includes('Hero')) {
                     if (message.includes('CONTROLLED')) {
                       //Set who owns
                       ownhero = message.match(/Hero Outpost: .* \((.*)\) .*/i)[1];
                     }
                     chero = message;
                   }
                   //cosmonaut
                   if (message.includes('Cosmonaut')) {
                     if (message.includes('CONTROLLED')) {
                       //Set who owns
                       owncosmonaut = message.match(/Cosmonaut Outpost: .* \((.*)\) .*/i)[1];
                     }
                     ccosmonaut = message;
                   }
                 }
               }

               if (outpostf && serverc == 'vanity') {
                 if (message.toLowerCase().includes('outpost') || message.toLowerCase().includes('*') || message.toLowerCase().includes('controlled by')) {
                   fs.appendFile(assetsPath+'output.txt', taskDepend+'outpost:'+message+'\n', err => {
                     if (err) return console.log(err);
                   });
                 }
               }

               if (message.toLowerCase().includes('[outpost] ')) {
                 if (outpostf) {
                   fs.appendFile(assetsPath+'output.txt', taskDepend+message, err => {
                     if (err) return console.log(err);
                   });
                   if (message.toLowerCase().includes('outpost') || message.toLowerCase().includes('*') || message.toLowerCase().includes('controlled by')) {
                     fs.appendFile(assetsPath+'output.txt', taskDepend+'outpost:'+message, err => {
                       if (err) return console.log(err);
                     });
                   }
                 }
                   oserverOutpost = message;
                   setTimeout(function() {
                     if (message.match(/^\[Outpost\] .* \((.*)%\).*/)) {
                       oserverLastCap = message.match(/^\[Outpost\] .* \((.*)%\).*/)[1];
                     }
                   }, 20000);
               } else if (outpostf) {
                 //Cosmic outpost grab chat 
                if (message.includes('Outpost:') || message.includes('Hades Outpost ')) {
                  outpostoutput += message+'\n';
                }
               }

              //OTHER COMMANDS
              if (ftopf) {
                  if (serverc == 'manacube') {
                    if (message.toLowerCase().trim().includes(': $') || message.toLowerCase().trim().includes('top factions list')) {
                      ftopoutput += "\n"+message;
                    }
                  } else if (serverc == 'archon' || serverc == 'desteria' || serverc == 'karismic' || serverc == 'battleclash') {
                    if (message.toLowerCase().trim().includes('$') || message.toLowerCase().trim().includes('faction worth') || message.toLowerCase().trim().includes('top factions')) {
                      ftopoutput += "\n"+message;
                    }
                  } else if (serverc == 'custom') {
                    if (debug) console.log(message);
                    if (message.includes(c_config.ftopStartIncludes)) {
                      ftopoutput += "\n"+message;
                    }
                    c_config.ftopPlaceIncludes.forEach(string => {
                      if (message.includes(string) && !(ftopoutput.includes(message))) {
                        ftopoutput += "\n"+message;
                      }
                    });
                  } else if (serverc == 'mccentral') {
                    if (message.toLowerCase().includes('faction worth') || message.toLowerCase().includes('- $') || message.toLowerCase().includes('top factions') || message.toLowerCase().includes('factions top')) {
                      ftopoutput += "\n"+message;
                    }
                  } else if (serverc == 'saico') {
                    if (message.toLowerCase().includes('(!) faction top') || message.toLowerCase().includes('- $') || message.toLowerCase().includes('top factions') || message.toLowerCase().includes('factions top')) {
                      ftopoutput += "\n"+message;
                    }
                  } if (serverc == 'verixpvp' || serverc == 'royalcraft' || serverc == 'maplecraft') {
                    if (message.toLowerCase().includes('top wealth') || message.toLowerCase().includes('top factions (') || message.toLowerCase().includes('total server value:') || message.toLowerCase().includes('total:') || message.toLowerCase().includes('$') || message.toLowerCase().includes('faction points') || message.toLowerCase().includes('___.[')) {
                      ftopoutput += "\n"+message;
                    }
                  } else if (serverc == 'cosmic' || serverc == 'kc') {
                    if (message.toLowerCase().includes('.[ top factions [') || message.toLowerCase().includes(' - $') || message.toLowerCase().includes('top factions (') || message.toLowerCase().includes('faction points') || message.toLowerCase().includes('.[ top by')) {
                      ftopoutput += "\n"+message;
                    }
                  } else if (serverc == 'vanity') {
                    if (message.toLowerCase().includes('faction wealth') || message.toLowerCase().includes(' $') || message.toLowerCase().includes('top factions')) {
                      if (message.toLowerCase().includes('.') || message.toLowerCase().includes('faction wealth')) {
                        ftopoutput += "\n"+message;
                      }
                    }
                  } else if (serverc == 'mineheroes' || serverc == 'fantasycloud' || serverc == 'convict' || serverc == 'glacial' || serverc == 'predator' || serverc == 'treasurewars') {
                    if (message.toLowerCase().includes('factions top') || message.toLowerCase().includes('top factions') || message.toLowerCase().includes('ftop (') || message.toLowerCase().includes(' $') || message.toLowerCase().includes('points)')) {
                        ftopoutput += "\n"+message;
                    }
                  }
              } else if (baloutputf) {
                  if (message.toLowerCase().includes('\'s balance') || message.toLowerCase().includes('balance of') || message.toLowerCase().includes('balance:')) {
                    fs.appendFile(assetsPath+'output.txt', taskDepend+message, err => {
                      if (err) return console.log(err);
                    });
                  } else if (message.toLowerCase().includes('is not locally online') || message.toLowerCase().includes('player not found.')) {
                    message = 'That player is not online/was not found!';
                    fs.appendFile(assetsPath+'output.txt', taskDepend+message, err => {
                      if (err) return console.log(err);
                    });
                  }
              } else if (gracef) {
                if (serverc == 'custom') {
                  if (debug) console.log('Message received while grace was true. '+message);
                  console.log('checking if '+message.toLowerCase()+' includes '+c_config.graceInfoIncludes.toString().toLowerCase());
                  if (message.toLowerCase().includes(c_config.graceInfoIncludes.toString().toLowerCase())) {
                    fs.appendFile(assetsPath+'output.txt', taskDepend+message+'', err => {
                      if (err) return console.log(err);
                    });
                  }
                } else {
                  if (message.toLowerCase().includes('grace period') || message.toLowerCase().includes('so that everyone can prepare their bases for') || message.toLowerCase().includes('and creeper eggs are disabled') || message.toLowerCase().includes('ending in:')) {
                    var msg = message.replace(/`/g, '');
                    fs.appendFile(assetsPath+'output.txt', taskDepend+msg+'', err => {
                      if (err) return console.log(err);
                    });
                  }
                }
              } else if (fwealthf) {
                if (message.toLowerCase().includes('top factions (') || message.toLowerCase().includes('$')) {
                  fwealthoutput += "\n"+message;
                }
              } else if (findf) {
                if (message.toLowerCase().includes('is in your game')) {
                  fs.appendFile(assetsPath+'output.txt', taskDepend+message, err => {
                    if (err) return console.log(err);
                  });
                } else if (message.toLowerCase().includes('is on the server')) {
                  fs.appendFile(assetsPath+'output.txt', taskDepend+message, err => {
                    if (err) return console.log(err);
                  });
                } else if (message.toLowerCase().includes('online player found for')) {
                  fs.appendFile(assetsPath+'output.txt', taskDepend+message, err => {
                    if (err) return console.log(err);
                  });
                } else if (message.toLowerCase().includes('is currently disabled')) {
                  fs.appendFile(assetsPath+'output.txt', taskDepend+message, err => {
                    if (err) return console.log(err);
                  });
                }
              } else if (fwhof) {
                if (serverc == 'custom') {
                  if (debug) console.log('Received message while fwho was true: '+message);
                  c_config.fWhoIncludes.forEach(string => {
                    if (message.toLowerCase().includes(string.toLowerCase()) && !(fwhooutput.toLowerCase().includes(message.toLowerCase()))) {
                      console.log('appending '+message);
                      fwhooutput += "\n"+message;
                    }
                  });
                } else {
                    if (message.toLowerCase().includes('description:')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('rank:') || message.toLowerCase().includes('faction worth:') || message.toLowerCase().includes('leader:')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('age:') || message.toLowerCase().includes('created:') || message.toLowerCase().includes('founded:') || message.toLowerCase().includes('joining:')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('shield:') || message.toLowerCase().includes('shield active from') || message.toLowerCase().includes('forcefield:')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('bank:') || message.toLowerCase().includes('balance:')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('*') || message.toLowerCase().includes('|') || message.toLowerCase().includes('-') || message.toLowerCase().includes('+')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('members online (') || message.toLowerCase().includes('followers online (')) {
                      fwhooutput += '\n\n'+message;
                    }
                    if (message.toLowerCase().includes('members offline (') || message.toLowerCase().includes('followers offline (')) {
                      fwhooutput += '\n\n'+message;
                    }
                    if (message.toLowerCase().includes('allies:') || message.toLowerCase().includes('allies (')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('truces') || message.toLowerCase().includes('truces (')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('land/power') || message.toLowerCase().includes('land / power') || message.toLowerCase().includes('land | power')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('faction wealth')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('spawner value')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('faction worth:')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('members online [') || message.toLowerCase().includes('members online (') || message.toLowerCase().includes('followers online (') || message.toLowerCase().includes('online: (') || message.toLowerCase().includes('alts online: (')) {
                      fwhooutput += '\n\n'+message;
                    }
                    if (message.toLowerCase().includes('members offline [') || message.toLowerCase().includes('members offline (') || message.toLowerCase().includes('followers offline (') || message.toLowerCase().includes('offline: (') || message.toLowerCase().includes('alts offline: (')) {
                      fwhooutput += '\n\n'+message;
                    }
                    if (message.toLowerCase().includes('alts online (') || message.toLowerCase().includes('alts offline (')) {
                      fwhooutput += '\n\n'+message;
                    }
                    if (message.toLowerCase().includes('faction wealth')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('spawner value')) {
                      fwhooutput += '\n'+message;
                    }
                    if (message.toLowerCase().includes('(!) the faction or player') || message.toLowerCase().includes('no faction or player')) {
                      fwhooutput = 'faction not found';
                    }
                  }
              } else if (flistf) {
                if (debug) console.log('Message received while flist was true: '+message);
                if (serverc == 'custom') {
                  if (message.toLowerCase().includes(c_config.flistStartIncludes.toString().toLowerCase())) {
                    flistoutputRE += "\n"+message;
                  }
                  c_config.flistIncludes.forEach(string => {
                    if (message.includes(string) && !(flistoutputRE.includes(message))) {
                      flistoutputRE += "\n"+message;
                    }
                  });
                } else {
                  if (message.toLowerCase().includes('.[ factions') || message.toLowerCase().includes('[ online faction') || message.toLowerCase().includes('.[ faction') || message.toLowerCase().includes('/') || message.toLowerCase().includes('online')) {
                    flistoutputRE += "\n"+message;
                  }
                }
              } else if (listf) {
                if (message.toLowerCase().includes('players') || message.toLowerCase().includes('*')) {
                  listoutputREE += '\n'+message;
                }
              } else if (pingf) {
                if (debug) console.log('Message received while tps cmd was true: '+message);
                if (serverc == 'custom') {
                  var tpsregex = new RegExp(c_config.tpsRegex.split(' FLAGS:')[0], c_config.tpsRegex.split(' FLAGS:')[1]);
                  if (debug) console.log('Tps regex is '+tpsRegex);
                  var ctps = message.match(tpsregex);
                  if (debug) console.log(ctps);
                  ctps = ctps[1];
                  if (debug) console.log('Taking index 1. :: '+ctps+' Wrote to tps file.');
                  fs.writeFile(assetsPath+'tps.txt', taskDepend+ctps, err => {
                    if (err) return console.log(err);
                  });
                } else {
                  if (serverc == 'cosmic') {
                    if (message.toLowerCase().match(/server \"tps\" \=/)) {
                      var msg = message.replace(/server \"tps\" \= /gi, '');
                      fs.writeFile(assetsPath+'tps.txt', taskDepend+msg, err => {
                        if (err) return console.log(err);
                      });
                    }
                  } else if (serverc == 'manacube') {
                    if (message.toLowerCase().match(/tps stats \[now\], .*/i)) {
                      var vtps = message.toLowerCase().match(/.*15m\]: (.*), .*, .*, .*/i)[1];
                      vtps = vtps.replace('*', '');
                      fs.writeFile(assetsPath+'tps.txt', taskDepend+vtps, err => {
                        if (err) return console.log(err);
                      });
                    }
                  } else if (serverc == 'desteria') {
                    //Essentials tps 1m, 5m, 15m
                    if (message.toLowerCase().match(/^TPS from last 1m.*/i)) {
                      var msg = message.match(/^TPS from last 1m, 5m, 15m: ([0-9]*.?[0-9]*), .*, .*/i)[1];
                      msg = msg.replace('*', '');
                      fs.writeFile(assetsPath+'tps.txt', taskDepend+msg, err => {
                        if (err) return console.log(err);
                      });
                    }
                  } else if (serverc == 'battleclash') {
                    try {
                      if (message.match(/.*, .*, .*, .*, .*/)) {
                        var vtps = message.match(/(.*), /)[1].replace(/\[.\] /g, '');
                        vtps = vtps.replace(/, .*/, '');
                        vtps = vtps.replace('*', '');

                        fs.writeFile(assetsPath+'tps.txt', taskDepend+vtps, err => {
                          if (err) return console.log(err);
                        });
                      }
                    } catch (e) {}
                 } else {
                    //Fallback tps - zap symbol one
                    try {
                      if (message.match(/.*, .*, .*, .*, .*/)) {
                        var vtps = message.match(/(.*), /)[1];
                        vtps = vtps.replace(/, .*/, '');
                        vtps = vtps.replace('*', '');

                        fs.writeFile(assetsPath+'tps.txt', taskDepend+vtps, err => {
                          if (err) return console.log(err);
                        });
                      }
                    } catch (e) {}
                 }
                }
              }
            });

            //check sendchat.txt for any new data every second, if any, send it
            setInterval(function() {
              fs.readFile(assetsPath+'sendchat.txt', 'utf8', function(err, contents) {
                if (contents != '') {fs.writeFile(assetsPath+'sendchat.txt', '', function() {});}
                if (contents == '') {
                } else if (contents.includes('alt0')) {
                  contents = contents.replace('alt0', '');
                  var sendchatmsg = contents;
                  bot.chat(sendchatmsg);
                }
              });
            }, 1000);

            //relog and kicking things
            function bindEvents() {
              bot.on('login', function() {
                console.log('\x1b[35m'+process.env.MUSERNAME+' Logged in.\n');
                var online = true;
              });

              bot.on('kicked', function(reason) {
                console.log(
                    'I was kicked for',
                    reason,
                    ' at ' + getTime() + ' restarting in 60 seconds.'
                );
              });

              var lastplayer = false;
              bot.on('end', function(reason) {
                var scache = serverListArray;
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
                console.log('Main bot ended for some reason at ' + getTime() + ' restarting in 60 seconds. '+reason);
                if (c_settings.playtime) {
                  console.log('<br>Calculating all players playtime...');
                  var PT_END_DATA = playtimeFile.get("playtime");
                  scache.forEach(username => {
                    if (username == scache[scache.length]) {
                      lastplayer = true;
                    }
                    username = username.toString().toLowerCase().trim();
                    whitelist.forEach(user => {
                      if (user.toString().toLowerCase().trim() == username) {
                        var date = Date.now();

                        if (!playtimeStorage) return;

                        if (playtimeStorage.some(user => user.name === username)) {
                          playtimeStorage.forEach(user => {
                            if (user.name === username) {
                              if (user.login != undefined) {
                                var total = Number(Number(date) - Number(user.login));
                                total = total.toString().replace('-', '');
                                total = Number(total);

                                //Find user in playtime
                                var storageUser;
                                if (PT_END_DATA.some(user => user.name === username)) {
                                  PT_END_DATA.forEach(user => {
                                    if (user.name === username) {
                                      //Add to total
                                      storageUser = user;
                                    }
                                  });
                                } else {
                                  //Create new storage user
                                  storageUser = {
                                    "name": username,
                                    "total": 0
                                  };

                                  PT_END_DATA.push(storageUser);
                                  if (lastplayer) {
                                    playtimeFile.set("playtime", PT_END_DATA);
                                  }
                                }

                                if (storageUser.total != undefined) {
                                  var newTotal = Number(storageUser.total + total);
                                  playtimeStorage[playtimeStorage.indexOf(user)].total = newTotal;
                                  //Save to json file
                                  if (PT_END_DATA.some(user => user.name === username)) {
                                    PT_END_DATA.forEach(user => {
                                      if (user.name === username) {
                                        //Add to total
                                        user.total = newTotal;
                                      }
                                    });
                                  } else {
                                    //Create user
                                    var user = {
                                      "name": username,
                                      "total": newTotal
                                    };
                                    PT_END_DATA.push(user);
                                  }

                                  if (lastplayer) {
                                    playtimeFile.set("playtime", PT_END_DATA);
                                  }
                                } else {
                                  playtimeStorage[playtimeStorage.indexOf(user)].total = total;
                                  //Save to json file
                                  var json = playtimeFile.get("playtime");

                                  if (PT_END_DATA.some(user => user.name === username)) {
                                    PT_END_DATA.forEach(user => {
                                      if (user.name === username) {
                                        //SET total
                                        user.total = Number(total);
                                      }
                                    });
                                  } else {
                                    //Create user
                                    var user = {
                                      "name": username,
                                      "total": total
                                    };
                                    PT_END_DATA.push(user);
                                  }

                                  if (lastplayer) {
                                    playtimeFile.set("playtime", PT_END_DATA);
                                  }
                                }
                              }
                            }
                          });
                        }
                      }
                    });
                  });
                }

                setTimeout(function() {
                  fs.writeFile(assetsPath+'restart.txt', '.', function() {
                    console.log('Restarting...');
                  });
                }, 60000);
              });
            }

            var botUsername = process.env.MUSERNAME;

            function getTime() {
              //get time function
              var time = moment(Date.now())
                  .tz(timezone)
                  .format('LT');
              var timezoneAbbr = moment.tz.zone(timezone).abbr(360);
              return time + ' ' + timezoneAbbr;
            }

            bot.on('login', function() {
              try {
                var contents = fs.readFileSync(assetsPath+'stats.txt').toString();
                var newStat = Number(contents);
                if (newStat < 0) {
                  newStat = 0;
                } else {
                  newStat = newStat + 1;
                }
                fs.writeFile(assetsPath+'stats.txt', newStat, function(err) {if (err) {console.log(err);}});
              } catch (e) {}
              logincmds();
            });

            function logincmds() {
              //login commands
              try {
                setTimeout(function() {
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
              } catch (e) {}
              /*ioStream.getStreams(function(stream) {
                if (stream) {} else {
                  //process.exit(1);
                }
              });*/
            }

            function intervals() {
              //Anti AFK
              console.log('Setting up intervals for '+process.env.MUSERNAME+'..\n');
              if (c_settings.antiAfk) {
                setInterval(function() {
                  if (serverc == 'cosmic') {
                    bot.chat('/ping');
                  } else if (serverc == 'verixpvp' || serverc == 'manacube' || serverc == 'karismic' || serverc == 'desteria' || serverc == 'battleclash') {
                    bot.chat('/tps');
                  } else if (serverc == 'custom') {
                    bot.chat(c_config.tpsCommand);
                  } else {
                    bot.chat('/antiafk');
                  }
                  pingf = true;
                  setTimeout(function() {
                    pingf = false;
                  }, 1000);
                }, 305000);
              } else {
                console.log('Not setting up anti afk command (/tps or /antiafk) as it was set to false. /set antiafk');
              }

              //restart catch
              setInterval(function() {
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
              }, 300000);
            }
            var tpa;
            var checkedmsg;
            var wallscheckedmsg;
            var bufferscheckedmsg;
            var weewoomsg;
            var safemsg;
            var paidmsg;
            var moneysent;
            var link;
            var linkusername;
            var linkkey;
            var tfa;
            var raideventwarn;
            var basicmsg;
            var usernameIndex;
            var usernameMoneySentIndex;
            var usernameMoneyReceivedIndex;
            var msgIndex;
            var actualMoneyIndex;

            if (serverc == 'cosmic' || serverc == 'saico') {
              if (serverc == 'cosmic') {
                tpa = /^\[\/TPA\] (.*) \(.*\) has requested (?:to teleport to you|that you teleport to them)/g;
              } else {
                tpa = /^\(!\) .* (.*) has requested (?:to teleport to you|that you teleport to them).*/g;
              }
              checkedmsg = /^\[.*\] \[(.*) -> me\] \/?checked/i; //Walls only still
              wallscheckedmsg = /^\[.*\] \[(.*) -> me\] \/?walls/i;
              bufferscheckedmsg = /^\[.*\] \[(.*) -> me\] \/?buffers/i;
              weewoomsg = /^\[.*\] \[(.*) -> me\] \/?weewo.*/i;
              safemsg = /^\[.*\] \[(.*) -> me\] \/?safe/i;
              paidmsg = /^\$[0-9]*.?[0-9]* has been received from .*/;
              moneysent = /^\$[0-9]*.?[0-9]* has been sent to .*/;
              link = /^\[.*\] \[.* -> me\] link .*/i;
              linkusername = /^\[.*\] \[(.*) -> me\] link .*/i;
              linkkey = /^\[.*\] \[.* -> me\] link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[.*\] \[.* -> me\] .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 6;
              usernameMoneyReceivedIndex = 6;
              actualMoneyIndex = 0;
            } else if (serverc == 'verixpvp') {
              tpa = /^NOTICE » .?\[.*\].? (.*) has requested (?:to teleport to you|that you teleport to them)/g;
              checkedmsg = /^\[.?\[.*\].? .* -> Yourself\] checked/i;
              wallscheckedmsg = /^\[.?\[.*\].? .* -> Yourself\] walls/i;
              bufferscheckedmsg = /^\[.?\[.*\].? .* -> Yourself\] buffers/i;
              weewoomsg = /^\[.?\[.*\].? .* -> Yourself\] weewoo.*/i;
              safemsg = /^\[.?\[.*\].? .* -> Yourself\] safe/i;
              paidmsg = /^NOTICE » \$[0-9]*?.[0-9]* has been received from .?\[.*\].? .*\./;
              moneysent = /^SUCCESS » \$[0-9]*?.[0-9]* has been sent to .?\[.*\].? .*\./;
              link = /^\[.?\[.*\].? .* -> Yourself\] link .*/i;
              linkusername = /^\[.?\[.*\].? (.*) -> Yourself\] link .*/i;
              linkkey = /^\[.?\[.*\].? .* -> Yourself\] link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[.?\[.*\].? .* -> Yourself\] .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 8;
              usernameMoneyReceivedIndex = 8;
              actualMoneyIndex = 2;
            } else if (serverc == 'manacube') {
              tpa = /^(.*) has requested (?:to teleport to you|that you teleport to them)\./g;
              checkedmsg = /^.* -> You checked/i;
              wallscheckedmsg = /^.* -> You walls/i;
              bufferscheckedmsg = /^.* -> You buffers/i;
              weewoomsg = /^.* -> You weewoo/i;
              safemsg = /^.* -> You safe/i;
              paidmsg = /^\$[0-9]*.?[0-9]* has been received from .*/;
              moneysent = /^\$[0-9]*.?[0-9]* has been sent to .*/;
              link = /^.* -> You link .*/i;
              linkusername = /^(.*) -> You link .*/i;
              linkkey = /^.* -> You link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^.* -> You .*/i;
              usernameIndex = 0;
              msgIndex = 3;
              usernameMoneySentIndex = 5;
              usernameMoneyReceivedIndex = 5;
              actualMoneyIndex = 0;
            } else if (serverc == 'archon') {
              tpa = /^(.*) has requested (?:to teleport to you|that you teleport to them)\./g;
              checkedmsg = /^\[?.*\] \((.*) . me\) \/?checked/i;
              wallscheckedmsg = /^\[?.*\] \((.*) . me\) \/?walls/i;
              bufferscheckedmsg = /^\[?.*\] \((.*) . me\) \/?buffers/i;
              weewoomsg = /^\[?.*\] \((.*) . me\) \/?weewoo.*/i;
              safemsg = /^\[?.*\] \((.*) . me\) \/?safe/i;
              paidmsg = /^\$[0-9]*.?[0-9]* has been received from .*/;
              moneysent = /^\$[0-9]*.?[0-9]* has been sent to .*/;
              link = /^\[?.*\] \(.* . me\) link .*/i;
              linkusername = /^\[?.*\] \((.*) . me\) link .*/i;
              linkkey = /^\[?.*\] \(.* . me\) link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[?.*\] \(.* . me\) .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 5;
              usernameMoneyReceivedIndex = 5;
              actualMoneyIndex = 0;
            } else if (serverc == 'karismic') {
              tpa = /^(.*) has requested (?:to teleport to you|that you teleport to them)\./g;
              checkedmsg = /^\[\[.*\] (.*) -> me\] \/?checked/i;
              wallscheckedmsg = /^\[\[.*\] (.*) -> me\] \/?walls/i;
              bufferscheckedmsg = /^\[\[.*\] (.*) -> me\] \/?buffers/i;
              weewoomsg = /^\[\[.*\] (.*) -> me\] \/?weewoo.*/i;
              safemsg = /^\[\[.*\] (.*) -> me\] \/?safe/i;
              paidmsg = /^\(!\) \$[0-9]*.?[0-9]* has been received from .*/;
              moneysent = /^\(!\) \$[0-9]*.?[0-9]* has been sent to .*/;
              link = /^\[\[.*\] .* -> me\] link .*/i;
              linkusername = /^\[\[.*\] (.*) -> me\] link .*/i;
              linkkey = /^\[\[.*\] .* -> me\] link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[\[.*\] .* -> me\] .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 7;
              usernameMoneyReceivedIndex = 7;
              actualMoneyIndex = 1;
            } else if (serverc == 'vanity') {
              tpa = /^(.*) has requested (?:to teleport to you|that you teleport to them)\./g;
              checkedmsg = /^\[\[.*\] (.*) -> me\] \/?checked/i;
              wallscheckedmsg = /^\[\[.*\] (.*) -> me\] \/?walls/i;
              bufferscheckedmsg = /^\[\[.*\] (.*) -> me\] \/?buffers/i;
              weewoomsg = /^\[\[.*\] (.*) -> me\] \/?weewoo.*/i;
              safemsg = /^\[\[.*\] (.*) -> me\] \/?safe/i;
              paidmsg = /^\$[0-9]*.?[0-9]* has been received from .*/;
              moneysent = /^\$[0-9]*.?[0-9]* has been sent to .*/;
              link = /^\[\[.*\] .* -> me\] link .*/i;
              linkusername = /^\[\[.*\] (.*) -> me\] link .*/i;
              linkkey = /^\[\[.*\] .* -> me\] link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[\[.*\] .* -> me\] .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 6;
              usernameMoneyReceivedIndex = 6;
              actualMoneyIndex = 0;
            } else if (serverc == 'mccentral' || serverc == 'kc') {
              tpa = /^(.*) has requested (?:to teleport to you|that you teleport to them)\./g;
              checkedmsg = /^\[(.*) -> me\] \/?checked/i;
              wallscheckedmsg = /^\[(.*) -> me\] \/?walls/i;
              bufferscheckedmsg = /^\[(.*) -> me\] \/?buffers/i;
              weewoomsg = /^\[(.*) -> me\] \/?weewoo.*/i;
              safemsg = /^\[(.*) -> me\] \/?safe/i;
              paidmsg = /^\$[0-9]*.?[0-9]* has been received from .*/;
              moneysent = /^\$[0-9]*.?[0-9]* has been sent to .*/;
              link = /^\[.* -> me\] link .*/i;
              linkusername = /^\[(.*) -> me\] link .*/i;
              linkkey = /^\[.* -> me\] link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[.* -> me\] .*/i;
              usernameIndex = 0;
              msgIndex = 3;
              usernameMoneySentIndex = 5;
              usernameMoneyReceivedIndex = 5;
              actualMoneyIndex = 0;
            } else if (serverc == 'royalcraft') {
              tpa = /^\(!\) .* (.*) has requested (?:to teleport to you|that you teleport to them)\./g;
              checkedmsg = /^.* -> You. checked/i;
              wallscheckedmsg = /^.* -> You. walls/i;
              bufferscheckedmsg = /^.* -> You. buffers/i;
              weewoomsg = /^.* -> You. weewoo/i;
              safemsg = /^.* -> You. safe/i;
              paidmsg = /^Information \| \$[0-9]*.?[0-9]* has been received from .*/;
              moneysent = /^Information \| \$[0-9]*.?[0-9]* has been sent to .*/;
              link = /^.* -> You link. .*/i;
              linkusername = /^(.*) -> You. link .*/i;
              linkkey = /^.* -> You. link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^.* -> You. .*/i;
              usernameIndex = 0;
              msgIndex = 3;
              usernameMoneySentIndex = 7;
              usernameMoneyReceivedIndex = 7;
              actualMoneyIndex = 2;
            } else if (serverc == 'mineheroes') {
              tpa = /^\* (.*) has requested (?:to teleport to you|that you teleport to them).*/g;
              checkedmsg = /^\[.*\] \[(.*) . me\] \/?checked/i;
              wallscheckedmsg = /^\[.*\] \[(.*) . me\] \/?walls/i;
              bufferscheckedmsg = /^\[.*\] \[(.*) . me\] \/?buffers/i;
              weewoomsg = /^\[.*\] \[(.*) . me\] \/?weewoo.*/i;
              safemsg = /^\[.*\] \[(.*) . me\] \/?safe/i;
              paidmsg = /^\$[0-9]*.?[0-9]* has been received from .*/;
              moneysent = /^\$[0-9]*.?[0-9]* has been sent to .*/;
              link = /^\[.*\] \[.* . me\] link .*/i;
              linkusername = /^\[.*\] \[(.*) . me\] link .*/i;
              linkkey = /^\[.*\] \[.* . me\] link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[.*\] \[.* . me\] .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 5;
              usernameMoneyReceivedIndex = 5;
              actualMoneyIndex = 0;
            } else if (serverc == 'fantasycloud') {
              tpa = /^\* (.*) has requested (?:to teleport to you|that you teleport to them).*/g;
              checkedmsg = /^\(:?:? ?\(.*\) ?:?:? (.*) -> me\) \/?checked/i;
              wallscheckedmsg = /^\(:?:? ?\(.*\) ?:?:? (.*) -> me\) \/?walls/i;
              bufferscheckedmsg = /^\(:?:? ?\(.*\) ?:?:? (.*) -> me\) \/?buffers/i;
              weewoomsg = /^\(:?:? ?\(.*\) ?:?:? (.*) -> me\) \/?weewoo.*/i;
              safemsg = /^\(:?:? ?\(.*\) ?:?:? (.*) -> me\) \/?safe/i;
              paidmsg = /^\+ \$[0-9]*.?[0-9]* \(from \(.*\) .*\)/;
              moneysent = /^\- \$[0-9]*.?[0-9]* \(sent to \(.*\) .*\)/;
              link = /^\(:?:? ?\(.*\) ?:?:? .* -> me\) link .*/i;
              linkusername = /^\(:?:? ?\(.*\) ?:?:? (.*) -> me\) link .*/i;
              linkkey = /^\(:?:? ?\(.*\) ?:?:? .* -> me\) link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\(:?:? ?\(.*\) ?:?:? (.*) -> me\) .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 5;
              usernameMoneyReceivedIndex = 4;
              actualMoneyIndex = 1;
            } else if (serverc == 'convict') {
              tpa = /^\* (.*) has requested (?:to teleport to you|that you teleport to them).*/g;
              checkedmsg = /^\[\[.*\] (.*) -> me\] \/?checked/i;
              wallscheckedmsg = /^\[\[.*\] (.*) -> me\] \/?walls/i;
              bufferscheckedmsg = /^\[\[.*\] (.*) -> me\] \/?buffers/i;
              weewoomsg = /^\[\[.*\] (.*) -> me\] \/?weewoo.*/i;
              safemsg = /^\[\[.*\] (.*) -> me\] \/?safe/i;
              paidmsg = /^\$[0-9]*.?[0-9]* has been received from \[.*\] .*\./;
              moneysent = /^\$[0-9]*.?[0-9]* has been sent to \[.*\] .*/;
              link = /^\[\[.*\] .* -> me\] link .*/i;
              linkusername = /^\[\[.*\] (.*) -> me\] link .*/i;
              linkkey = /^\[\[.*\] .* -> me\] link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[\[.*\] .* -> me\] .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 6;
              usernameMoneyReceivedIndex = 6;
              actualMoneyIndex = 0;
            } else if (serverc == 'battleclash') {
              tpa = /^\* (.*) has requested (?:to teleport to you|that you teleport to them).*/g;
              checkedmsg = /^\[\[.*\] (.*) -> me\] \/?checked/i;
              wallscheckedmsg = /^\[\[.*\] (.*) -> me\] \/?walls/i;
              bufferscheckedmsg = /^\[\[.*\] (.*) -> me\] \/?buffers/i;
              weewoomsg = /^\[\[.*\] (.*) -> me\] \/?weewoo.*/i;
              safemsg = /^\[\[.*\] (.*) -> me\] \/?safe/i;
              paidmsg = /^.* . \$[0-9]*.?[0-9]* has been received from \[.*\] .*./ ;
              moneysent = /^.* . \$[0-9]*.?[0-9]* has been sent to \[.*\] .*./ ;
              link = /^\[\[.*\] .* -> me\] link .*/i;
              linkusername = /^\[\[.*\] (.*) -> me\] link .*/i;
              linkkey = /^\[\[.*\] .* -> me\] link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[\[.*\] .* -> me\] .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 8;
              usernameMoneyReceivedIndex = 8;
              actualMoneyIndex = 2;
            } else if (serverc == 'glacial') {
              tpa = /^\* (.*) has requested (?:to teleport to you|that you teleport to them).*/g;
              checkedmsg = /^<\[.*\] (.*) -> me> \/?checked/i;
              wallscheckedmsg = /^<\[.*\] (.*) -> me> \/?walls/i;
              bufferscheckedmsg = /^<\[.*\] (.*) -> me> \/?buffers/i;
              weewoomsg = /^<\[.*\] (.*) -> me> \/?weewoo.*/i;
              safemsg = /^<\[.*\] (.*) -> me> \/?safe/i;
              paidmsg = /^\[!\] \$[0-9]*.?[0-9]* has been received from \[.*\] .*\./;
              moneysent = /^\[!\] \$[0-9]*.?[0-9]* has been sent to \[.*\] .*/;
              link = /^<\[.*\] .* -> me> link .*/i;
              linkusername = /^<\[.*\] (.*) -> me> link .*/i;
              linkkey = /^<\[.*\] .* -> me> link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^<\[.*\] .* -> me> .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 7;
              usernameMoneyReceivedIndex = 7;
              actualMoneyIndex = 1;
            } else if (serverc == 'predator') {
              tpa = /^\(!\) .* (.*) has requested (?:to teleport to you|that you teleport to them)\./g;
              checkedmsg = /^.* -> You .checked/i;
              wallscheckedmsg = /^.* -> You .walls/i;
              bufferscheckedmsg = /^.* -> You .buffers/i;
              weewoomsg = /^.* -> You .weewoo/i;
              safemsg = /^.* -> You .safe/i;
              paidmsg = /^\[!\] \$[0-9]*.?[0-9]* has been received from .*\./;
              moneysent = /^\[!\] \$[0-9]*.?[0-9]* has been sent to .*\./;
              link = /^.* -> You :link .*/i;
              linkusername = /^(.*) -> You :link .*/i;
              linkkey = /^.* -> You :link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^.* -> You ..*/i;
              usernameIndex = 0;
              msgIndex = 3;
              usernameMoneySentIndex = 6;
              usernameMoneyReceivedIndex = 6;
              actualMoneyIndex = 1;
            } else if (serverc == 'treasurewars') {
              tpa = /^\(!\) .* (.*) has requested (?:to teleport to you|that you teleport to them)\./g;
              checkedmsg = /^.* to Me » \/?checked/i;
              wallscheckedmsg = /^.* to Me » \/?walls/i;
              bufferscheckedmsg = /^.* to Me » \/?buffers/i;
              weewoomsg = /^.* to Me » \/?weewoo/i;
              safemsg = /^.* to Me » \/?safe/i;
              paidmsg = /^Economy » You have been paid \$[0-9]*.?[0-9]* by .*\./;
              moneysent = /^Economy » You have paid .* \$[0-9]*.?[0-9]*\./;
              link = /^.* to Me » link .*/i;
              linkusername = /^(.*) to Me » link .*/i;
              linkkey = /^.* to Me » link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^.* to Me » .*/i;
              usernameIndex = 0;
              msgIndex = 4;
              usernameMoneySentIndex = 5;
              usernameMoneyReceivedIndex = 8;
              actualMoneyIndex = 6;
            } else if (serverc == 'maplecraft') {
              tpa = /^\* (.*) has requested (?:to teleport to you|that you teleport to them).*/g;
              checkedmsg = /^\[.*\]\[(.*) -> me\] \/?checked/i;
              wallscheckedmsg = /^\[.*\]\[(.*) -> me\] \/?walls/i;
              bufferscheckedmsg = /^\[.*\]\[(.*) -> me\] \/?buffers/i;
              weewoomsg = /^\[.*\]\[(.*) -> me\] \/?weewoo.*/i;
              safemsg = /^\[.*\]\[(.*) -> me\] \/?safe/i;
              paidmsg = /^\[!\] \$[0-9]*.?[0-9]* has been received from \[.*\] .*\./;
              moneysent = /^\[!\] \$[0-9]*.?[0-9]* has been sent to \[.*\] .*/;
              link = /^\[.*\]\[.* -> me\] link .*/i;
              linkusername = /^\[.*\]\[(.*) -> me\] link .*/i;
              linkkey = /^\[.*\]\[.* -> me\] link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[.*\]\[.* -> me\] .*/i;
              usernameIndex = 0;
              msgIndex = 3;
              usernameMoneySentIndex = 7;
              usernameMoneyReceivedIndex = 7;
              actualMoneyIndex = 1;
            } else if (serverc == 'custom') {
              //c_config
              console.log('** LOADING CUSTOM CONFIG **<br>');
              tpa = new RegExp(c_config.tpa.split(' FLAGS:')[0], c_config.tpa.split(' FLAGS:')[1]);
              checkedmsg = new RegExp(c_config.checkedmsg.split(' FLAGS:')[0], c_config.checkedmsg.split(' FLAGS:')[1]);
              wallscheckedmsg = new RegExp(c_config.wallscheckedmsg.split(' FLAGS:')[0], c_config.wallscheckedmsg.split(' FLAGS:')[1]);
              bufferscheckedmsg = new RegExp(c_config.bufferscheckedmsg.split(' FLAGS:')[0], c_config.bufferscheckedmsg.split(' FLAGS:')[1]);
              weewoomsg = new RegExp(c_config.weewoomsg.split(' FLAGS:')[0], c_config.weewoomsg.split(' FLAGS:')[1]);
              safemsg = new RegExp(c_config.safemsg.split(' FLAGS:')[0], c_config.safemsg.split(' FLAGS:')[1]);
              paidmsg = new RegExp(c_config.paidmsg.split(' FLAGS:')[0], c_config.paidmsg.split(' FLAGS:')[1]);
              moneysent = new RegExp(c_config.moneysent.split(' FLAGS:')[0], c_config.moneysent.split(' FLAGS:')[1]);
              link = new RegExp(c_config.link.split(' FLAGS:')[0], c_config.link.split(' FLAGS:')[1]);
              linkusername = new RegExp(c_config.linkusername.split(' FLAGS:')[0], c_config.linkusername.split(' FLAGS:')[1]);
              linkkey = new RegExp(c_config.linkkey.split(' FLAGS:')[0], c_config.linkkey.split(' FLAGS:')[1]);
              tfa = new RegExp(c_config.tfa.split(' FLAGS:')[0], c_config.tfa.split(' FLAGS:')[1]);
              raideventwarn = new RegExp(c_config.raideventwarn.split(' FLAGS:')[0], c_config.raideventwarn.split(' FLAGS:')[1]);
              basicmsg = new RegExp(c_config.basicmsg.split(' FLAGS:')[0], c_config.basicmsg.split(' FLAGS:')[1]);
              usernameIndex = c_config.usernameIndex;
              msgIndex = c_config.msgIndex;
              usernameMoneySentIndex = c_config.usernameMoneySentIndex;
              usernameMoneyReceivedIndex = c_config.usernameMoneyReceivedIndex;
              actualMoneyIndex = c_config.actualMoneyIndex;

              console.log('\x1b[33m** CUSTOM CONFIG LOADED: **\x1b[0m<br><br>');
              console.log('Registered Regex:<br>'+tpa+'\n<br>'+checkedmsg+'\n<br>'+wallscheckedmsg+'\n<br>'+bufferscheckedmsg+'\n<br>'+weewoomsg+'\n<br>'+safemsg+'\n<br>'+paidmsg+'\n<br>'+moneysent+'\n<br>'+link+'\n<br>'+linkusername+'\n<br>'+linkkey+'\n<br>'+tfa+'\n<br>'+raideventwarn+'\n<br>'+basicmsg+'\n<br>'+'\nSplit by Space Index:\n<br>/Msg username: '+usernameIndex+'\n<br>/msg text: '+msgIndex+'\n<br>/pay username: '+usernameMoneySentIndex+'\n<br>$ received username: '+usernameMoneyReceivedIndex+'\n<br>$Money: '+actualMoneyIndex+'\n\n<br>\x1b[33m** End Config **\x1b[0m');
            } else {
              //Fallback messages
              tpa = /^(.*) has requested (?:to teleport to you|that you teleport to them)/g;
              checkedmsg = /^\[.*\] \[(.*) -> me\] \/?checked/i; //Walls only still
              wallscheckedmsg = /^\[.*\] \[(.*) -> me\] \/?walls/i;
              bufferscheckedmsg = /^\[.*\] \[(.*) -> me\] \/?buffers/i;
              weewoomsg = /^\[.*\] \[(.*) -> me\] \/?weewoo.*/i;
              safemsg = /^\[.*\] \[(.*) -> me\] \/?safe/i;
              paidmsg = /^\$[0-9]*.?[0-9]* has been received from .*/;
              moneysent = /^\$[0-9]*.?[0-9]* has been sent to .*/;
              link = /^\[.*\] \[.* -> me\] link .*/i;
              linkusername = /^\[.*\] \[(.*) -> me\] link .*/i;
              linkkey = /^\[.*\] \[.* -> me\] link (.*)/i;
              tfa = /^\(!\) You need to enter your 2fa code .*/i;
              raideventwarn = /^\*\*\* RAID EVENT STARTING IN (.*)/gim;
              basicmsg = /^\[.*\] \[.* -> me\] .*/i;
              usernameIndex = 1;
              msgIndex = 4;
              usernameMoneySentIndex = 5;
              usernameMoneyReceivedIndex = 5;
              actualMoneyIndex = 0;
            }

            var chatLogBuilder = "";
            if (c_settings.publicChat) {
              setInterval(function() {
                if (chatLogBuilder != undefined && chatLogBuilder.toString().trim() != '' && chatLogBuilder.toString().trim() != ' ' && !chatLogBuilder.toString().trim().includes('CosmicPvP: OUTPOSTS')) {
                  discord.sendChatData('```'+chatLogBuilder+'```');
                  chatLogBuilder = "";
                }
              }, 5000);
            }

            var intopen = false;
            var currentShop = '';
            bot.on('message', jsonMsg => {
              var message = '';
              if (jsonMsg === undefined) {return}
              try {
                message = jsonMsg.toString().replace(/\§([a-z]|[A-Z]|[0-9])/gi, '');
              } catch (e) {return;}

                if (jsonMsg != undefined) {
                  if (c_settings.logEverything.toString().toLowerCase() == 'true') {
                    var today = new Date();
                    var ltime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                    fs.appendFile(assetsPath+'LOG.txt', '\n'+'['+ltime+'] '+jsonMsg.toString(), err => {
                      if (err) return console.log(err);
                    });
                  }
                  if (jsonMsg.toString().match(/^\(Q \[.*/)) {
                    if (serverc == 'cosmic' || serverc == 'desteria') {
                      console.log('[QUEUE]: '+message);
                    }
                  }
                  if (serverc == 'cosmic' && jsonMsg.toString().match(/^\(Stronghold\) .* is no longer controlling .*/)) {
                      var shfaction = jsonMsg.toString().match(/^\(Stronghold\) (.*) is no longer controlling .*/)[1];
                      var shtype = jsonMsg.toString().match(/^\(Stronghold\) .* is no longer controlling (.*)!/)[1];
                      if (shfaction+'' == ourFac+'') {
                        //Our stronghold has been lost.
                        discord.sendData('shlost:' + jsonMsg);
                      }
                  }
                  if (serverc == 'cosmic' && jsonMsg.toString().match(/^\(Stronghold\) .* has taken control of .*/)) {
                      var shfaction = jsonMsg.toString().match(/^\(Stronghold\) (.*) has taken control of .*/)[1];
                      var shtype = jsonMsg.toString().match(/^\(Stronghold\) .* has taken control of (.*)!/)[1];
                      if (shfaction+'' == ourFac+'') {
                        //Our stronghold has been lost.
                        discord.sendData('shcapped:' + jsonMsg);
                      }
                  }

                  //Core chunks
                  if (jsonMsg.toString().match(/^\(!\) You have breached .*'s Core Chunk, taking [0-9]* Faction Points!/i)) {
                    console.log('Core chunk breached: '+jsonMsg.toString());
                    discord.sendData('core:'+jsonMsg.toString());
                  }

                  //Interstellar shop
                  if (jsonMsg.toString().toLowerCase().match(/^\(!\) the black market merchant at.*/i) && serverc == 'cosmic') {
                    currentShop = '';
                    intopen = true;

                    setTimeout(function() {
                      //Send after few ms of collecting
                      intopen = false;
                      discord.sendData('blackmarket:'+currentShop.toString());
                    }, 350);
                  }
                  if (intopen) {
                    //Collecting messages that start with *
                    if (jsonMsg.toString().match(/^\* .*/)) {
                      currentShop += jsonMsg.toString()+' ';
                    }
                  }

                  if (message.match(raideventwarn) && serverc == 'cosmic') {
                    //write to output the raid event time thing
                    console.log('\x1b[0mRAID EVENT ALERT - ' + message);
                    fs.appendFile(assetsPath+'output.txt', '\n' + message, err => {
                      if (err) return console.log(err);
                    });
                  }

                  //Public chat logging:
                  if (c_settings.publicChat) {
                    if (message.toString().toLowerCase().trim() == '' || message.toString().toLowerCase().trim() == ' ' || message.toString().toLowerCase().includes('`') || message.toString().toLowerCase().includes('cosmicannouncer') || message.toString().toLowerCase().includes('have been checked by') || message.toString().toLowerCase().includes('not been checked') || message.toString().toLowerCase().includes('outpost is under attack') || message.toString().toLowerCase().includes('is no longer under attack') || message.toString().toLowerCase().includes('we are being raided')) {
                      // .
                    } else {
                      if (serverc == 'custom') {
                        let send = true;
                        c_config.blacklistedPublicChatPhrases.forEach(phrase => {
                          if (message.includes(phrase)) {
                            send = false;
                          }
                        });
                        if (send) {
                          chatLogBuilder += '\n'+message+'';
                        }
                      } else {
                          chatLogBuilder += '\n'+message+'';
                      }
                    }
                  }

                  if (message.toString().toLowerCase().includes(botUsername.toLowerCase()) || message.toString().toLowerCase().includes('`') || message.toString().toLowerCase().includes('cosmicannouncer') || message.toString().toLowerCase().includes('have been checked by') || message.toString().toLowerCase().includes('not been checked') || message.toString().toLowerCase().includes('outpost is under attack') || message.toString().toLowerCase().includes('is no longer under attack') || message.toString().toLowerCase().includes('we are being raided')) {} else {

                    if (serverc == 'cosmic' || serverc == 'desteria') {
                      if (message.toLowerCase().includes('[tc]') || message.toLowerCase().includes('[ac]') || message.toLowerCase().includes('[fc]')) {
                        if (chatLogBuilder.toString().includes(message)) {return}
                        discord.sendChatData('\n' + message + '`');

                        if (message.toLowerCase().includes('[ac]') || message.toLowerCase().includes('ally:')) {
                          console.log('\x1b[35m'+message);
                        } else if (message.toLowerCase().includes('[tc]')) {
                          console.log('\x1b[36m'+message);
                        } else if (message.toLowerCase().includes('[fc]')) {
                          console.log('\x1b[32m'+message);
                        }
                      }
                    } else if (serverc == 'verixpvp' || serverc == 'vanity') {
                      if (message.toLowerCase().includes('ally:')) {
                        if (chatLogBuilder.toString().includes(message)) {return}
                        discord.sendChatData('\n`'+message+'`');
                        console.log('\x1b[35m'+message);
                      }
                    }

                    if (message.toLowerCase().includes('➡ me]') || message.toLowerCase().includes('➥ me') || message.toLowerCase().includes('me ➥') || message.toLowerCase().includes('-> me]') || message.toLowerCase().includes('you ->') || message.toLowerCase().includes('-> you') || message.toLowerCase().includes('[me ->') || message.toLowerCase().includes('[yourself ->') || message.toLowerCase().includes('-> yourself]') || message.toLowerCase().includes('-> me)') || message.toLowerCase().includes('-> me>') || message.toLowerCase().includes('<me ->') || message.toLowerCase().includes('to me »')) {
                      if (!message.includes('checked') || !message.includes('check the walls for')) {
                        if (message.toLowerCase().includes('link')) {
                          //whitelist adding themself
                          if (message.match(link)) {
                            var username = message.match(linkusername)[1];
                            var key = message.match(linkkey)[1];

                            if (key) {
                              key = key.trim();
                            }

                            var worked = false;
                            validKeys.forEach(tkey => {
                              var tykey = tkey.split(':')[0];
                              var dcid = tkey.split(':')[1];
                              if (tykey+'' == key+'') {
                                //Valid key that had not expired. Add them to whitelist.
                                worked = true;
                                var temparr = validKeys;
                                validKeys = [];
                                temparr.forEach(item => {
                                  if (item != tykey+':'+dcid) {
                                    validKeys.push(item);
                                  }
                                });
                                fs.appendFile(assetsPath+'users.txt', dcid+':'+username+':0:0\n', err => {
                                  if (err) {return console.log(err)}
                                  bot.chat('/msg '+username+' You have been added to the whitelist.');
                                  console.log('<br>[SELF WHITELIST] Added '+dcid+':'+ username + ' to the whitelist!');
                                });
                              }
                            });
                            setTimeout(function() {
                              if (!worked) {
                                discord.failedLink(message);
                              } else {
                                discord.linked(message);
                              }
                            }, 1000);
                          }
                        }

                        if (message.match(basicmsg)) {
                          discord.sendChatData('\n`'+process.env.MUSERNAME+' MSG: '+message+'`');
                          console.log('\x1b[0mPM: ' + message);
                        }
                      }
                    }
                  }

                  if (message.match(tfa)) {
                    discord.sendChatData('\n`'+process.env.MUSERNAME+' 2FA: '+message+'` @everyone');
                    console.log('\x1b[31m2FA: ' + message);
                  }

                  if (message.match(tpa)) {
                    var msg = message;
                    var result = tpa.exec(msg);
                    console.log('TPA ALERT - ' +result + ' Registered Username As: ' + result[1]);
                    tpausername = result[1];
                  }

                  //Any /msg stuff, all just using username
                  if (message.match(checkedmsg) || message.match(wallscheckedmsg) || message.match(bufferscheckedmsg) || message.match(weewoomsg) || message.match(safemsg)) {
                    var checkedusername;
                    if (serverc == 'fantasycloud' && message.includes('CLOUD')) {
                      checkedusername = message.toString().split(' ')[3];
                    } else if (serverc == 'maplecraft') {
                      checkedusername = message.toString().split(' ')[usernameIndex].replace(/^\[Factions.*\]\[/, '');
                    } else {
                      checkedusername = message.toString().split(' ')[usernameIndex];
                    }

                    checkedusername = checkedusername.replace(/\]/g, '');
                    checkedusername = checkedusername.replace(/\[/g, '');
                    checkedusername = checkedusername.replace(/\(/g, '');
                    checkedusername = checkedusername.replace(/\)/g, '');

                    checkedusername = checkedusername.replace(/\:/g, '');
                    checkedusername = checkedusername.replace(/\;/g, '');
                    checkedusername = checkedusername.replace(/\|/g, '');
                    checkedusername = checkedusername.replace(/»/g, '');
                    var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/.*:(.*):.*:.*/);
                    whitelist.forEach((wusername) => {
                      if (wusername == null || wusername == '' || wusername == '\n') {return;}
                      if (checkedusername.toLowerCase() == wusername.toLowerCase()) {
                        var checktype = 'checked:';
                        if (message.match(bufferscheckedmsg)) {
                          checktype = 'bchecked:';
                        } else if (message.match(weewoomsg)) {
                          checktype = 'weewoo:';
                        } else if (message.match(safemsg)) {
                          checktype = 'safe:';
                        }

                        if (checktype === 'weewoo:') {
                            try {
                              let weewooText = message.split('weewoo')[1] && message.split('weewoo')[1].length > 4 ? message.split('weewoo')[1] : 'none';
                              discord.sendData(checktype+'%'+checkedusername+'%'+weewooText);
                            } catch (e) {}
                        } else {
                          discord.sendData(checktype+checkedusername);
                        }
                        if (checktype == 'checked:' || checktype == 'bchecked:') {
                          console.log('\x1b[33m'+checkedusername+' Checked the walls or buffers in-game at '+getTime()+'<br>');
                        } else if (checktype == 'weewoo:') {
                          console.log('\x1b[33m'+checkedusername+' Set off weewoo in-game at '+getTime()+'<br>');
                        } else if (checktype == 'safe:') {
                          console.log('\x1b[33m'+checkedusername+' Declared weewoo safe in-game at '+getTime()+'<br>');
                        }
                        /*ioStream.getStreams(function(stream) {
                          if (stream) {} else {
                            var i = 1;
                            //process.exit(i);
                          }
                        });*/
                      }
                    });
                  }

                  if (message.replace(/,/g, '').match(paidmsg) || message.replace(/,/g, '').match(moneysent)) {
                    message = message.replace(/,/g, '');
                    var paidusername;
                    if (message.match(paidmsg)) {
                      if (serverc == 'fantasycloud' && message.includes('CLOUD')) {
                        paidusername = message.toString().split(' ')[6];
                      } else {
                        paidusername = message.toString().split(' ')[usernameMoneyReceivedIndex];
                      }
                    } else if (message.match(moneysent)) {
                      if (serverc == 'fantasycloud' && message.includes('CLOUD')) {
                        paidusername = message.toString().split(' ')[6];
                      } else {
                        paidusername = message.toString().split(' ')[usernameMoneySentIndex];
                      }
                    }
                    paidusername = paidusername.replace(/\]/g, '');
                    paidusername = paidusername.replace(/\[/g, '');
                    paidusername = paidusername.replace(/\(/g, '');
                    paidusername = paidusername.replace(/\)/g, '');
                    paidusername = paidusername.replace(/\./g, '');

                    paidusername = paidusername.replace(/\:/g, '');
                    paidusername = paidusername.replace(/\;/g, '');
                    paidusername = paidusername.replace(/\|/g, '');
                    paidusername = paidusername.replace(/»/g, '');
                    paidusername = paidusername.replace(/undefined/gi, '');

                    var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/.*:(.*):.*:.*/);
                    whitelist.forEach((wusername) => {
                      if (wusername == null || wusername == '' || wusername == '\n') {return;}
                      if (paidusername.toLowerCase() == wusername.toLowerCase()) {
                        var type = 'paid:';
                        if (message.match(moneysent)) {
                          type = 'sent:';
                        }
                        var susername = '%'+paidusername+'% ';
                        message = message.replace(/undefined/gi, '');
                        discord.sendData(type+susername+message);
                        console.log('\x1b[0m'+message+' \x1b[35mat '+getTime());
                        if (type == 'paid:') {
                          //Log to deposits.json
                          var amountDeposited = message.split(' ')[actualMoneyIndex];
                          console.log(amountDeposited);
                          amountDeposited = amountDeposited.replace('$', '');
                          amountDeposited = amountDeposited.replace(/,/g, '');
                          amountDeposited = Number(amountDeposited);
                          if (isNaN(amountDeposited)) {
                            console.log('Error, probably your server config. User deposited money but the amount returned as not a number. Trying other indexs\'');
                            amountDeposited = message.split(' ')[actualMoneyIndex - 1];
                            amountDeposited = amountDeposited.replace('$', '');
                            amountDeposited = amountDeposited.replace(/,/g, '');
                            amountDeposited = Number(amountDeposited);
                            if (isNaN(amountDeposited)) {
                              amountDeposited = message.split(' ')[actualMoneyIndex + 1];
                              amountDeposited = amountDeposited.replace('$', '');
                              amountDeposited = amountDeposited.replace(/,/g, '');
                              amountDeposited = Number(amountDeposited);
                            }

                            if (isNaN(amountDeposited)) {
                              return console.log('Failed to find the amount of money received. Make sure your server config is set.');
                            }
                          }
                          var payments = depositsFile.get("deposits");

                          if (!payments) return;

                          if (payments.some(user => user.name === paidusername)) {
                              var depositsJson = depositsFile.get("deposits");
                              depositsJson.forEach(user => {
                                if (user.name == paidusername) {
                                  //Add to users total
                                  var currentTotal = Number(user.total);
                                  user.total = Number(Number(currentTotal) + Number(amountDeposited));

                                  depositsFile.set("deposits", depositsJson);
                                }
                              });
                          } else {
                            //Create users profile
                            var user = {
                              "name": paidusername,
                              "total": amountDeposited
                            };

                            var depositsJson = depositsFile.get("deposits");
                            depositsJson.push(user);

                            depositsFile.set("deposits", depositsJson);
                          }
                        }
                      }
                    });
                  }

                }
            });

            function dedupe(str) {
              var array = str.split(/\r?\n/).filter(function(elem, pos) {
                return str.split(/\r?\n/).indexOf(elem) == pos;
              });
              return array;
            }

            //player tracker
            var findlist = fs.readFileSync(assetsPath+'track.txt', 'utf8').split(/\r?\n/);
            var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/.*:(.*):.*:.*/);
            setInterval(function() {
              whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/.*:(.*):.*:.*/); //Refresh
              findlist = fs.readFileSync(assetsPath+'track.txt', 'utf8').split(/\r?\n/);
            }, 15000);
              bot.on('playerJoined', player => {
                if (downloadingPackage) {return}
                if (!serverListArray.includes(player.username.toString().toLowerCase())) {
                  serverListArray.push(player.username.toString().toLowerCase()+'');
                }
                if (player_tracking) {
                findlist = fs.readFileSync(assetsPath+'track.txt', 'utf8').split(/\r?\n/);
                findlist.forEach((username) => {
                  if (player.username.toLowerCase() == username.toLowerCase()) {
                    discord.sendData('joined:'+player.username+' joined the game at '+getTime());
                  }
                });
                }
                if (c_settings.playtime) {
                  var username = player.username.toString().toLowerCase().trim();
                  whitelist.forEach(user => {
                    if (user.toString().toLowerCase().trim() == username) {
                      var date = Date.now();
                      var user = {
                        "name": username,
                        "login": date
                      };

                      if (playtimeStorage.some(user => user.name === username)) {
                        playtimeStorage.forEach(user => {
                          if (user.name === username) {
                            playtimeStorage[playtimeStorage.indexOf(user)].login = date;
                          }
                        });
                      } else {
                        playtimeStorage.push(user);
                      }
                    }
                  });
                }
              });

              bot.on('playerLeft', player => {
                if (downloadingPackage) {return;}
                var scache = serverListArray;
                serverListArray = [];
                scache.forEach(playername => {
                  if (playername.toString().toLowerCase()+'' != player.username.toString().toLowerCase()+'') {
                    serverListArray.push(playername.toString().toLowerCase());
                  }
                });
                if (player_tracking) {
                findlist = fs.readFileSync(assetsPath+'track.txt', 'utf8').split(/\r?\n/);
                findlist.forEach((username) => {
                  if (player.username.toLowerCase() == username.toLowerCase()) {
                    discord.sendData('left:'+player.username+' left the game at '+getTime());
                  }
                });
                }
                if (c_settings.playtime) {
                  var username = player.username.toString().toLowerCase().trim();
                  calcPlaytime(username);
                }
              });


            function calcPlaytime(username) {
              if (downloadingPackage) {return;}

              whitelist.forEach(user => {
                if (user.toString().toLowerCase().trim() == username) {
                  var date = Date.now();

                  if (!playtimeStorage) return;

                  if (playtimeStorage.some(user => user.name === username)) {
                    playtimeStorage.forEach(user => {
                      if (user.name === username) {
                        if (user.login != undefined) {
                          var total = Number(Number(date) - Number(user.login));
                          total = total.toString().replace('-', '');
                          total = Number(total);

                          //Find user in playtime
                          var json = playtimeFile.get("playtime");
                          var storageUser;

                          if (!json) return;

                          if (json.some(user => user.name === username)) {
                            json.forEach(user => {
                              if (user.name === username) {
                                //Add to total
                                storageUser = user;
                              }
                            });
                          } else {
                            //Create new storage user
                            storageUser = {
                              "name": username,
                              "total": 0
                            };

                            json.push(storageUser);
                            playtimeFile.set("playtime", json);
                          }

                          if (storageUser.total != undefined) {
                            var newTotal = Number(storageUser.total + total);
                            playtimeStorage[playtimeStorage.indexOf(user)].total = newTotal;
                            //Save to json file
                            var json = playtimeFile.get("playtime");

                            if (!json) return;

                            if (json.some(user => user.name === username)) {
                              json.forEach(user => {
                                if (user.name === username) {
                                  //Add to total
                                  user.total = newTotal;
                                }
                              });
                            } else {
                              //Create user
                              var user = {
                                "name": username,
                                "total": newTotal
                              };
                              json.push(user);
                            }

                            playtimeFile.set("playtime", json);
                          } else {
                            playtimeStorage[playtimeStorage.indexOf(user)].total = total;
                            //Save to json file
                            var json = playtimeFile.get("playtime");

                            if (!json) return;

                            if (json.some(user => user.name === username)) {
                              json.forEach(user => {
                                if (user.name === username) {
                                  //SET total
                                  user.total = Number(total);
                                }
                              });
                            } else {
                              //Create user
                              var user = {
                                "name": username,
                                "total": total
                              };
                              json.push(user);
                            }

                            playtimeFile.set("playtime", json);
                          }
                        }
                      }
                    });
                  }
                }
              });
            }

            const addValidKey = (key) => {
              var havekey = false;
              validKeys.forEach(keyy => {
                var realkey = keyy.split(':')[1];
                if (realkey+'' == key.split(':')[1]+'') {
                  //User already had a key open.
                  havekey = true;
                  discord.alreadyHadKey(keyy.split(':')[1]);
                }
              });
              setTimeout(function() {
                if (!havekey) {
                  validKeys.push(key+'');
                  //10m expire
                  var keycache = key;
                  setTimeout(function() {
                    var temparr = validKeys;
                    validKeys = [];
                    temparr.forEach(item => {
                      if (item != keycache) {
                        validKeys.push(item);
                      }
                    });
                  }, 10 * 60 * 1000);
                }
              }, 500);
            };

            exports.addValidKey = addValidKey;

            const getOnline = (cb) => {
              var currentlyOnline = [];
              var whitelist = fs.readFileSync(assetsPath+'users.txt', 'utf8').split(/.*:(.*):.*:.*/);
              whitelist.forEach((wusername) => {
                if (serverListArray.includes(wusername.toLowerCase())) {
                  currentlyOnline.push(wusername);
                }
              });
              setTimeout(function() {
                cb(currentlyOnline);
              }, 700);
            };

            const reloadBotSettings = () => {
              reloadSettings();
            };

            const dropAll = () => {
                var currentTimeout = 0;
                bot.inventory.items().forEach(item => {
                  setTimeout(function() {
                    bot.tossStack(item);
                    currentTimeout += 300;
                  }, currentTimeout);
                });
            };

            exports.getOnline = getOnline;
            exports.reloadBotSettings = reloadBotSettings;
            exports.dropAll = dropAll;
            //End
            bot.on('error', (e) => console.log(e));}
        /*}
      }

    });

  });

  req.on('error', function (err) {
    console.log('Verification Error: ' + err.message+'. Either the verification servers are down or your wifi is currently out. Trying again in 5 minutes.');
    setTimeout(function() {
      console.log('Retrying request.');
      fs.writeFile(assetsPath+'restart.txt', '.', function() {});
    }, 5*60*1000);
  });

  req.end();
}*/

//Stops any process errors 
process.on('uncaughtException', function (err) {
  console.error(err);
});

//
// {@UltimateBot} Deobfuscated
// Made in v1.3
//
