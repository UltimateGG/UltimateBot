const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const distFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/');

const version = fs.readFileSync(distFolder+'assets/version.txt', 'utf8').toString().replace('\n', '');

console.log('Starting DE-compilation of UltimateBot v'+version+'...');
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

setTimeout(copyDeobf, 5000);


async function copyDeobf() {
  load();
  console.log('\nCopying all files from deobf folder...');

  var appFolder = path.join(__dirname, '../Dist/UltimateBot/src/resources/app/app/');
  var deobfFolder = path.join(__dirname, '../Deobf/');

  for (i = 0; i < appFiles.length; i++) {
    var contents = fs.readFileSync(deobfFolder+''+appFiles[i], 'utf8').toString();
    console.log('Copying file '+appFiles[i]+'...');
    fs.writeFile(appFolder+''+appFiles[i], contents, err => {
      if (err) throw err;
      if (i+1 == appFiles.length) {
        console.log('\nSuccessfully copied '+appFiles.length+' files to app folder.\n');
        clearInterval(lsInterval);
        setTimeout(finished, 2500);
      }
    });
    await new Promise(done => setTimeout(() => done(), 2500));
  }
}

function finished() {
  clearInterval(running);
  console.log('\n\n\x1b[32mDone! Successfully decompiled UltimateBot v'+version+' in '+totalCompilationTime+'ms.\nMake sure to remove IoStream\n\x1b[0m\n');
  process.exit(1);
}
