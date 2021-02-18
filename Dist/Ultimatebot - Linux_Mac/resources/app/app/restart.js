const assetsPath = require('path').join(__dirname, '../../assets/');
const pm2 = require('pm2');
const fs = require('fs');

function startBot() {
	pm2.start({
		script: __dirname+'bot.js',
		name: 'bot',
		max_memory_restart: '1G',
		log_file: 'pm2.log'
	});
}

function restartBot() {
	pm2.restart(0, (e) => {
		if (e) {
			console.log(e);
		}
	});
}


function clearStats() {
  fs.writeFile(assetsPath+'stats.txt', '0', function (err) {});
}

fs.watchFile(assetsPath+'restart.txt', {interval:999}, (curr, prev) => {
  //If its "." restart, if its "stop", stop (Not exe)
  var contents = fs.readFileSync(assetsPath+'restart.txt').toString();

  if (contents == '.') {
    //Restart
    console.log('Restart requested (src:restart.js)...');
    clearStats();
    restartBot();
  }
});
