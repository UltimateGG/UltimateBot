window.addEventListener('DOMContentLoaded', () => {
  const remote = require('electron').remote;
  const assetsPath = require('path').join(__dirname, '../assets/');

  var stopped = false;

  //Load alt button sender
  var alt0 = document.getElementById('alt0');
  var alt1 = document.getElementById('alt1');
  var alt2 = document.getElementById('alt2');
  var alt3 = document.getElementById('alt3');
  var alt4 = document.getElementById('alt4');

  var fs = require('fs');
  require('dotenv').config({path: require('path').join(__dirname, '../assets/.env')});
  alt0.innerHTML = process.env.MUSERNAME;
  alt1.innerHTML = process.env.alt1username;
  alt2.innerHTML = process.env.alt2username;
  alt3.innerHTML = process.env.alt3username;
  alt4.innerHTML = process.env.alt3username;
  document.getElementById('serverIp').innerHTML = process.env.serverIp+':'+process.env.serverPort;

  //Listen for dropdown change for alt send cmd
  document.getElementById('sendfor').addEventListener('change' +
      '', function() {
    fs.writeFile(assetsPath+'sendchat.txt', document.getElementById('sendCmd').value+' alt'+document.getElementById('sendfor').value, err => {
      if (err) throw err;
      document.getElementById('sendCmd').value = '';
      document.getElementById('sendfor').value = 'N';
    });
  });

  document.getElementById('settings').addEventListener('click', function() {
    function createBrowserWindow() {
      const BrowserWindow = remote.BrowserWindow;
      var win = new BrowserWindow({
        width: 1000,
        height: 660,
        title: "UltimateBot - Settings",
        icon: assetsPath+'panel/favicon.png',
        frame: true,
        webPreferences: {
          nodeIntegration: true
        }
      });

      let url = require('url').format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, 'settings.html')
      });

      win.loadURL(url);
      win.setMenu(null);
    }
    createBrowserWindow();
  });
  
    document.getElementById('appqEditor').addEventListener('click', function() {
    function createBrowserWindow() {
      const BrowserWindow = remote.BrowserWindow;
      var win = new BrowserWindow({
        width: 1000,
        height: 660,
        title: "UltimateBot - Application Questions Editor",
        icon: assetsPath+'panel/favicon.png',
        frame: true,
        webPreferences: {
          nodeIntegration: true
        }
      });

      let url = require('url').format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, 'editor.html')
      });

      win.loadURL(url);
      win.setMenu(null);
    }
    createBrowserWindow();
  });

  function disableAll() {
    document.getElementById('restart').disabled = true;
    document.getElementById('stop').disabled = true;
    document.getElementById('kill').disabled = true;
    setTimeout(function() {
      document.getElementById('restart').disabled = false;
      document.getElementById('stop').disabled = false;
      document.getElementById('kill').disabled = false;
    }, 1500);
  }
  
  function downloadUpdate() {
    document.getElementById('restart').disabled = true;
    document.getElementById('stop').disabled = true;
    document.getElementById('kill').disabled = true;
	document.getElementById('settings').disabled = true;
	document.getElementById('appqEditor').disabled = true;
	document.getElementById('sendfor').disabled = true;
  }
  
  function updateFinished() {
	document.getElementById('restart').disabled = false;
    document.getElementById('stop').disabled = false;
    document.getElementById('kill').disabled = false;
	document.getElementById('settings').disabled = false;
	document.getElementById('appqEditor').disabled = false;
	document.getElementById('sendfor').disabled = false;
	//Change log 
	document.getElementById('updateLog').hidden = false;
  }

  //Kill
  document.getElementById('kill').addEventListener('click', function() {
    document.getElementById('kill').innerHTML = 'Ending Process...';
    disableAll();
    fs.writeFile(assetsPath+'restart.txt','kill', function(err) {if (err) {return;} document.getElementById('kill').innerHTML = 'Kill';});
  });

  //Restart
  document.getElementById('restart').addEventListener('click', function() {
    document.getElementById('restart').innerHTML = 'Restarting...';
    disableAll();

	if (stopped) {
		stopped = false;
	}

    setTimeout(function() {
      fs.writeFile(assetsPath+'restart.txt','.', function (err) {if (err) {return;}});
    }, 450);

    setTimeout(function() {
      document.getElementById('restart').innerHTML = 'Restart';
    }, 1500);
  });

  //Clear Log
  document.getElementById('clear').addEventListener('click', function() {
    document.getElementById('consoleText').innerHTML = '';
    document.getElementById('clear').innerHTML = 'Cleared!';
    setTimeout(function() {
      document.getElementById('clear').innerHTML = 'Clear Log';
    }, 1000);
  });

  //Stop
  document.getElementById('stop').addEventListener('click', function() {
    document.getElementById('stop').innerHTML = 'Stopping...';
    disableAll();
    fs.writeFile(assetsPath+'restart.txt','stop', function (err) {if (err) {return;}});
    setTimeout(function() {
		stopped = true;
      document.getElementById('stop').innerHTML = 'Stop';
    }, 1500);
  });
  
  //Start button 
  setInterval(function() {
	  if (stopped) {
		  document.getElementById('restart').innerHTML = 'Start';
		  document.getElementById('restart').className = 'btn btn-success actButtons';
	  } else {
		  document.getElementById('restart').innerHTML = 'Restart';
		  document.getElementById('restart').className = 'btn btn-primary actButtons';
	  }  
  }, 300);

const out = document.getElementById("consoleText");
let c = 0

function format () {
  return Array.prototype.slice.call(arguments).join(' ');
}

//Console
var fs = require('fs');
setInterval(function() {
fs.readFile('./pm2.log', function (err, data) {
  if (err) {return;}

  const Convert = require('ansi-to-html');
  const convert = new Convert();
  data = convert.toHtml(data.toString());
  
  if (data.toString().trim() == '' || data.toString().trim() == ' ') {
	return;
  }

  const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;

  const newElement = document.createElement("div");

  document.getElementById('consoleText').innerHTML += data.toString();
  
  if (data.toString().includes("Downloading update... PLEASE DO NOT CLOSE THE APPLICATION OR TURN YOUR PC OFF")) {
	  setTimeout(function() {
		  downloadUpdate();
	  }, 1500);
  }
  
  if (data.toString().includes("Updater has closed.")) {
	  setTimeout(function() {
		  updateFinished();
	  }, 1500);
  }

  out.appendChild(newElement);

  if (isScrolledToBottom) {
    out.scrollTop = out.scrollHeight - out.clientHeight
  }

  fs.writeFile('./pm2.log','', function (err) {if (err) {return;}});
  if (document.getElementById('consoleText').innerHTML.length > 60000) {
    document.getElementById('consoleText').innerHTML = '';
  }
});
}, 200);

//Alt counter
var altText = document.getElementById('altText').innerHTML;

setInterval(function() {
  fs.readFile(assetsPath+'stats.txt', function (err, data) {
    if (err) {return;}
	var newCount = Number(data.toString());
	if (newCount < 0) {newCount = 0}
	if (newCount > 5) {newCount = 5}
	document.getElementById('altText').innerHTML = newCount.toString();
  });
}, 10000);


//UPDATE LOG 
var open = false;
document.getElementById('updateLog').addEventListener('click', function() {
	if (open) {
		//Close change log 
		document.getElementById('changeLogDiv').hidden = true;
		//Hide bell 
		document.getElementById('updateLog').hidden = true;
		
		open = false;
	} else {
		//Open change log 
		open = true;
		
		fs.readFile(__dirname+"/changelog.txt", 'utf8', function(err, contents) {
			if (err) return;
			var changeLogTitle = contents.split('\n')[0];
			
			var changes = contents.replace(changeLogTitle, '');
			changes = changes.split('\n');
			
			document.getElementById('changeLogTitleHeader').innerHTML = changeLogTitle;
			//Add each change 
			var changesDiv = document.getElementById('changesDiv');
			changes.forEach(change => {
				var changeP = document.createElement('P');
				var changeText = document.createTextNode(change+"");
				changeP.appendChild(changeText);
				changesDiv.appendChild(changeP);
			});
			
			//Show change log 
			document.getElementById('changeLogDiv').hidden = false;
			//Clear change log since user viewed it 
			fs.writeFile(__dirname+"/changelog.txt", '', err => {
				if (err) throw err;
			});
		});
	}
});


//closeChangeLog
document.getElementById('closeChangeLog').addEventListener('click', function() {
	document.getElementById('changeLogDiv').hidden = true;
	//Hide bell 
	document.getElementById('updateLog').hidden = true;
	open = false;
});


//THEME 
var theme = require(assetsPath+'settings.json').consoleTheme;
if (theme == 1) {
	//Light theme 
	document.body.style.backgroundColor = "white";
	document.body.style.color = "#000";
	document.getElementById('consoleText').style.backgroundColor = "#e8e8e8";
	document.getElementById('consoleCmd').style.backgroundColor = "#e8e8e8";
	document.getElementById('sendCmd').style.backgroundColor = "#e8e8e8";
	document.getElementById('sendCmd').style.color = "#000";
}
});
