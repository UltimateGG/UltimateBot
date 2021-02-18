const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const distFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/');

const version = fs.readFileSync(distFolder+'assets/version.txt', 'utf8').toString().replace('\n', '');

console.log('Starting updater for UltimateBot v'+version+'...');
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

const uAppFiles = [
  "a1.js",
  "a2.js",
  "a3.js",
  "a4.js",
  "b.js",
  "d.js"
];

setTimeout(copyFiles, 5000);

async function copyFiles() {
  load();
  console.log('\nCopying all files to update folder...');

  var appFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/app/app');
  var updateFolder = path.join(__dirname, '../UltimateBot Backend/update');

  for (i = 0; i < appFiles.length; i++) {
    var contents = fs.readFileSync(appFolder+'/'+appFiles[i], 'utf8').toString();
    console.log('Copying file '+appFiles[i]+'...');
    fs.writeFile(updateFolder+'/'+uAppFiles[i], contents, err => {
      if (err) throw err;
      if (i+1 == appFiles.length) {
        console.log('\nSuccessfully copied '+appFiles.length+' files to update folder.\n');
        clearInterval(lsInterval);
        setTimeout(finished, 2500);
      }
    });
    await new Promise(done => setTimeout(() => done(), 2500));
  }
}

function finished() {

  console.log('\n\nUpdating version file...');

  const assetsFolder = path.join(__dirname, '../UltimateBot Backend/update');
  fs.writeFile(assetsFolder+'/version.txt', version, err => {
      if (err) throw err;
      clearInterval(running);
      console.log('\n\n\x1b[32mDone! Successfully redid updater files for UltimateBot v'+version+' in '+totalCompilationTime+'ms. You will manually need to do .env, settings, and changelog.\x1b[0m\n');
      process.exit(1);
  });
}
