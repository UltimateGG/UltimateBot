const {app, BrowserWindow} = require('electron');
const path = require('path');
const fs = require('fs');
const pm2 = require('pm2');

const assetsPath = require('path').join(__dirname, '../assets/');
let mainWindow;

function startBot() {
	pm2.start({
		script: require('path').join(__dirname, 'start.js'),
		name: 'UltimateBot',
		max_memory_restart: '1G',
		log_file: './pm2.log'
	});
}

function stopBot(cb) {
	pm2.stop('UltimateBot', function (err) {
	  if (err) {
		  //console.log(err);
	  }
	  cb();
	});
}

function killBot() {
  pm2.killDaemon(function(err) {
    console.log('Killed process.');
    
    mainWindow = null;
    app.quit();
  });
}

function clearStats() {
  fs.writeFile(assetsPath+'stats.txt', '0', function (err) {});
}

function createWindow() {
  //Make sure app wasnt running before
  stopBot(() => {
    //Clear logs from before
    fs.writeFile('./pm2.log', '', function (err) {});
    clearStats();
    
    mainWindow = new BrowserWindow({
      width: 1000,
      height: 680,
      title: "UltimateBot",
      icon: assetsPath+'panel/favicon.png',
      frame: true,
      webPreferences: {
        nodeIntegration: true
      }
    });
    mainWindow.setMenu(null);

    let url = require('url').format({
      protocol: 'file',
      slashes: true,
      pathname: require('path').join(__dirname, 'panel.html')
    });
    mainWindow.loadURL(url);
    
    //Start pm2 process by default launch
    setTimeout(startBot, 999);

    mainWindow.on('closed', () => {
      //End pm2 on window close
      stopBot(() => {
        mainWindow = null;
        app.quit();
      });
    });
  });
}

fs.watchFile(assetsPath+'restart.txt', {interval:1000}, (curr, prev) => {
  //If its "." restart, if its "stop", stop (Not exe)
  var contents = fs.readFileSync(assetsPath+'restart.txt').toString();

  if (contents == '.') {
    //Restart
    console.log('Restart requested...');
    clearStats();
    stopBot(() => setTimeout(startBot, 999));
  } else if (contents == 'stop') {
    //Stop
    clearStats();
    console.log('Stopping...');
    stopBot(() => console.log('Bot Stopped.'));
  } else if (contents == 'kill') {
    //Kill
    killBot();
  }
});

app.on('ready', createWindow);

app.on('window-all-closed', killBot);

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

//Console log handler
let util = require('util');
let log_stdout = process.stdout;

console.log = function(d) {
  log_stdout.write(util.format(d) + '\n');

  fs.appendFile('./pm2.log', "\n"+util.format(d)+"\n", (e) => {});
}
