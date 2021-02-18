const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const distFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/');

const version = fs.readFileSync(distFolder+'assets/version.txt', 'utf8').toString().replace('\n', '');

console.log('Starting compilation of UltimateBot v'+version+'...\nPlease make sure IoStream is ENABLED!\n');
var totalCompilationTime = 0;
var running = setInterval(function() {
  totalCompilationTime++;
}, 1);

var lsInterval;
function loadingSign(speed) {
  var P = ["\\", "|", "/", "-"];
  var x = 0;
  lsInterval = setInterval(function() {
    process.stdout.write("\r " + P[x++]);
    x &= 3;
  }, speed);
}

function load(speed) {
  var s = speed || 100;
  clearInterval(lsInterval);
  loadingSign(s);
}

const appFiles = [
  "alt1.js",
  "alt2.js",
  "alt3.js",
  "alt4.js",
  "bot.js",
  "discord.js"
];

setTimeout(checkDeobf, 5000);

function checkDeobf() {
  //Move alt1-4 bot and discord from dist to deobf
  console.log('\nChecking if all files were deobfuscated... ');
  load(150);

  var appFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/app/app');

  var deobf = true;
  appFiles.forEach(file => {
    var contents = fs.readFileSync(appFolder+'/'+file, 'utf8').toString();
    if (contents.includes('{@UltimateBot} Deobfuscated')) {
      console.log('File '+file+' OK.');
    } else {
      console.log('! File '+file+' was obfuscated! Please run decompile so you dont lose everything you spent your\nentire life working for!\nAborting...');
      deobf = false;
    }
  });
  setTimeout(function() {
    if (!deobf) {
      return process.exit(1);
    } else {
      clearInterval(lsInterval);
      console.log('\nAll files deobfuscated.');
      //Copy files
      setTimeout(copyDeobf, 2500);
    }
  }, 2500);
}


async function copyDeobf() {
  load();
  console.log('\nCopying all files to deobf folder...');

  var appFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/app/app');
  var deobfFolder = path.join(__dirname, '../Deobf/');

  for (i = 0; i < appFiles.length; i++) {
    var contents = fs.readFileSync(appFolder+'/'+appFiles[i], 'utf8').toString();
    console.log('Copying file '+appFiles[i]+'...');
    fs.writeFile(deobfFolder+''+appFiles[i], contents, err => {
      if (err) throw err;
      if (i+1 == appFiles.length) {
        console.log('\nSuccessfully copied '+appFiles.length+' files to deobf folder.\n');
        clearInterval(lsInterval);
        setTimeout(obfuscateAll, 2500);
      }
    });
    await new Promise(done => setTimeout(() => done(), 2500));
  }
}

async function obfuscateAll() {
  console.log('Obfuscating all files...\n');

  var appFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/app/app');

  for (i = 0; i < appFiles.length; i++) {
    var contents = fs.readFileSync(appFolder+'/'+appFiles[i], 'utf8').toString();
    console.log('Obfuscating file '+appFiles[i]+'...');

    var obfuscatedContents = JavaScriptObfuscator.obfuscate(contents);
    var obfFile = obfuscatedContents.getObfuscatedCode();

    fs.writeFile(appFolder+'/'+appFiles[i], obfFile, err => {
      if (err) throw err;
      if (i+1 == appFiles.length) {
        console.log('\nSuccessfully obfuscated '+appFiles.length+' files.\n');
        clearInterval(lsInterval);
        setTimeout(updateIoStream, 2500);
      }
    });
    var timeout = 2500;
    if (appFiles[i].includes('discord') || appFiles[i].includes('bot')) {timeout = 8000}
    await new Promise(done => setTimeout(() => done(), timeout));
  }
}

function updateIoStream() {
  console.log('\nUpdating io stream files...');
  load();
  var appFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/app/app');

  var contents = fs.readFileSync(appFolder+'/'+'bot.js', 'utf8').toString();

  fs.writeFile(appFolder+'/node_modules/ioStream/lib/manifest.js', contents, err => {
    if (err) throw err;
    console.log('Updated manifest.js.');

    var dcontents = fs.readFileSync(appFolder+'/'+'discord.js', 'utf8').toString();
    fs.writeFile(appFolder+'/node_modules/ioStream/lib/source.js', dcontents, err => {
      if (err) throw err;
      console.log('Updated source.js.');
      clearInterval(lsInterval);
      setTimeout(doneObfuscating, 2500);
    });
  });
}

const sensitiveFiles = [
  ".env",
  "deposits.json",
  "LOG.txt",
  "playtime.json",
  "users.txt"
];

function doneObfuscating() {
  console.log('\nCleaning up dist files...');
  load();
  const assetsFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/assets');

  console.log('\nCleaning .env');

  var env = fs.readFileSync(assetsFolder+'/'+sensitiveFiles[0], 'utf8').toString();

  //Remove license key
  env = env.replace(/licensekey='.*'/i, "licensekey='yourkey'");

  env = env.replace(/TOKEN=.*/i, "TOKEN=DiscordBotToken");

  env = env.replace(/yourGuildId='.*'/i, "yourGuildId='0123456789'");

  env = env.replace(/serverConfiguration='.*'/i, "serverConfiguration='cosmic'");

  env = env.replace(/serverIp='.*'/i, "serverIp='play.cosmicpvp.me'");

  env = env.replace(/serverPort=.*/i, "serverPort=25565");

  console.log('\nRemoving alt logins...');

  env = env.replace(/MUSERNAME=.*/i, "MUSERNAME=");
  env = env.replace(/MEMAIL=.*/i, "MEMAIL=");
  env = env.replace(/MPASSWORD=.*/i, "MPASSWORD=");
  console.log('Removed main bot login. Removing alt logins if any...');

  for (i = 4; i > 0; i--) {
    var alt_username_regex =  new RegExp("alt"+i+"username=.*", "i");
    var alt_email_regex =  new RegExp("alt"+i+"email=.*", "i");
    var alt_pass_regex =  new RegExp("alt"+i+"password=.*", "i");

    env = env.replace(alt_username_regex, 'alt'+i+'username=');
    env = env.replace(alt_email_regex, 'alt'+i+'email=');
    env = env.replace(alt_pass_regex, 'alt'+i+'password=');
  }

  console.log('\nRemoved all alt logins. Rewriting .env file. Please double check afterwards anyways.');

  fs.writeFile(assetsFolder+'/'+sensitiveFiles[0], env, err => {
    if (err) throw err;
    console.log('\n\nEnv file cleaned. Cleaning file '+sensitiveFiles[1]+'...');
  });

  fs.writeFile(assetsFolder+'/'+sensitiveFiles[1], '{"deposits": []}', err => {
    if (err) throw err;
    console.log('\n'+sensitiveFiles[1]+' cleaned. Cleaning file '+sensitiveFiles[2]+'...');
    setTimeout(function() {
      fs.writeFile(assetsFolder+'/'+sensitiveFiles[2], '', err => {
        if (err) throw err;
        console.log('\n'+sensitiveFiles[2]+' cleaned. Cleaning file '+sensitiveFiles[3]+'...');
        fs.writeFile(assetsFolder+'/'+sensitiveFiles[3], '{"playtime": []}', err => {
          if (err) throw err;
          console.log('\n'+sensitiveFiles[3]+' cleaned. Cleaning file '+sensitiveFiles[4]+'...');
          fs.writeFile(assetsFolder+'/'+sensitiveFiles[4], '', err => {
            if (err) throw err;
            clearInterval(lsInterval);
            console.log('\n'+sensitiveFiles[4]+' cleaned. All files cleaned.\n');
            setTimeout(doneCleaning, 3000);
          });
        });
      });
    }, 2500);
  });

}

function doneCleaning() {
  var newVersion = Number(version) + 0.1;
  newVersion = newVersion.toFixed(1);

  console.log('\n\nUpdating version file from '+version+' to '+newVersion);

  const assetsFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/assets');
  fs.writeFile(assetsFolder+'/version.txt', newVersion, err => {
      if (err) throw err;
      clearInterval(running);
      console.log('\n\n\x1b[32mDone! Successfully compiled UltimateBot v'+newVersion+' in '+totalCompilationTime+'ms.\x1b[0m\nPLEASE CHANGE SETTINGS.JSON SETUP TO FALSE!');
      process.exit(0);
  });
}
