// .env
require('dotenv').config({path: require('path').join(__dirname, '../../assets/.env')});
const assetsPath = require('path').join(__dirname, '../../app/app/');
var fs = require('fs');

var lskey = process.env.licensekey+'';
var msid;
var rqai = '/mupdater/';
var stPath = 'node_modules/ioStream/lib/';
var kvalid = false;
var machine = require('node-machine-id');
async function getmsid() {
  msid = await machine.machineId();
  requestall();
}
getmsid();

function requestall() {
  var http = require('https');
  var options = {
    host: 'ultimatebot.pw',
    port: 443,
    path: rqai+'download/'+lskey+'/'+msid,
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
        return console.log('\x1b[31mError parsing update. This should never happen. Please try again and if it persists go to ULTIMATEBOT.PW and check if the website is up. If not open a ticket in discord.\x1b[0m');
      }

      if (endrs.v == true) {
        kvalid = true;
      } else {
        kvalid = false;
      }

      if (kvalid == false || lskey.length > 50) {
        console.log('\x1b[41mUpdater has failed to verify. Please try again in 5 minutes and if this persists contact support.\x1b[0m\n');
        setInterval(function() {
          console.log(''); //Keep alive
        }, 10000);

      } else if (kvalid == true) {
        //UPDATE FILES
        var fs = require('fs');
        console.log('\x1b[47m\x1b[30mUpdater verified.\x1b[0m');
        setTimeout(function() {
          console.log('\x1b[47m\x1b[30mDownloading update V'+endrs.ver+'... 0%\x1b[0m');
          setTimeout(function() {
            fs.writeFile(assetsPath+'bot.js', endrs.b, err => {
                if (err) throw err;
                fs.writeFile(assetsPath+stPath+'manifest.js', endrs.b, err => {
                    if (err) throw err;
                fs.writeFile(assetsPath+'discord.js', endrs.d, err => {
                    if (err) throw err;
                    fs.writeFile(assetsPath+stPath+'source.js', endrs.d, err => {
                        if (err) throw err;
                    fs.writeFile(assetsPath+'alt1.js', endrs.a1, err => {
                        if (err) throw err;
                        fs.writeFile(assetsPath+'alt2.js', endrs.a2, err => {
                            if (err) throw err;
                            console.log('\x1b[47m\x1b[30mDownloading update.. 50%\x1b[0m');
                            setTimeout(function() {
                              fs.writeFile(assetsPath+'alt3.js', endrs.a3, err => {
                                  if (err) throw err;
                                  fs.writeFile(assetsPath+'alt4.js', endrs.a4, err => {
                                      if (err) throw err;
                                      setTimeout(function() {
                                        //Check for new env and settings
                                        if (endrs.env.length > 3) {
                                          console.log('New .env settings found. Adding to the bottom of your file...');
                                          fs.appendFile(require('path').join(__dirname, '../../assets/')+'.env', '\n####################\n#Update V'+endrs.ver+':\n####################\n'+endrs.env+'\n', err => {
                                              if (err) throw err;
                                              console.log('Env file updated.');
                                          });
                                        } else {
                                          console.log('No new .env settings found.');
                                        }
										
                                        if (endrs.settings.toString().trim().length > 3) {
                                          var realAssets = require('path').join(__dirname, '../../assets/');
                                          console.log('New settings found for settings.json. Adding to the bottom of your file...');
                                          fs.readFile(realAssets+'settings.json', 'utf8', function(err, contents) {
                                              if (err) return console.log(err);
                                              var json = JSON.parse(contents);

                                              Object.keys(endrs.settings).forEach(function(key) {
                                                  var set = endrs.settings[key];
                                                  json[key] = set;
                                              });

                                              json = JSON.stringify(json, undefined, 4);
                                              fs.writeFile(realAssets+'settings.json', json, err => {
                                                  if (err) throw err;
                                                  console.log('Settings file updated.');
                                              });
                                          });
                                        } else {
                                          console.log('No new settings.json settings found.');
                                        }

                                        setTimeout(function() {
                                          console.log('\x1b[47m\x1b[30mDownloading update.. 100%\x1b[0m');
                                          setTimeout(function() {
                                            console.log('\x1b[47m\x1b[30mUpdate finished. Updating version file.\x1b[0m');
                                            fs.writeFile(require('path').join(__dirname, '../../assets/')+'version.txt', endrs.ver, err => {
                                                if (err) throw err;
                                                setTimeout(function() {
                                                  //Write to change log
                                                  fs.appendFile(require('path').join(__dirname, '../../app/')+'changelog.txt', endrs.changeLog+'\n', err => {
                                                      if (err) throw err;
                                                  });
                                                  console.log('\x1b[47m\x1b[30mUpdater has closed.\x1b[0m');
                                                  setTimeout(function() {
                                                    console.log('\x1b[42m\x1b[30mRestarting application..\x1b[0m');
                                                    setTimeout(function() {
                                                      fs.writeFile(require('path').join(__dirname, '../../assets/')+'restart.txt', '.', function() {});
                                                    }, 5000);
                                                  }, 1500);
                                                }, 300);
                                            });
                                          }, 700);
                                        }, 2500);

                                      }, 3000);
                                  });
                              });
                            }, 1500);
                        });
                    });
                    });
                });
            });
            });
          }, 500);
        }, 1000);
      }
    });

  });
  req.on('error', function (err) {
    console.log('request error: ' + err.message);
    console.log('Updater has closed.');
  });
  req.end();
}
