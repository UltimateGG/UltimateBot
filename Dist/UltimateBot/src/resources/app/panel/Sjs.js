window.addEventListener('DOMContentLoaded', () => {

    const assetsPath = require('path').join(__dirname, '../assets/');
    var settings = require(assetsPath+'settings.json');

    var autofind = settings.autofind;
    var planet = settings.joincommand+'';
    var prefix = require(assetsPath+'settings.json').prefix+'';
    var game = settings.game+'';
    var raideventalerts = settings.raidevents;
    var tpsalerts = settings.tpsalerts;
    var outpostfac = settings.factionName+'';
    var outpostalerts = settings.outposts;
    var wallchecking = settings.wallchecks;
	var bufferchecking = settings.bufferchecks;
    var playertrack = settings.playertracking;
	var shfac = settings.strongholdfac;
	var sh = settings.stronghold;
	var appsenabled = settings.applicationsEnabled;
	var theme = settings.consoleTheme;

    //Set the setting selectors to the current options
    function selectElement(id, valueToSelect) {
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }

    if (autofind == false) {
        selectElement('autofind', '2');
    } else {
        selectElement('autofind', '1');
    }
    document.getElementById('planet').value = planet;
    document.getElementById('prefix').value = prefix;
    document.getElementById('game').value = game;

    if (raideventalerts == false) {
        selectElement('raidevent', '2');
    } else {
        selectElement('raidevent', '1');
    }

    if (tpsalerts == false) {
        selectElement('tpsalert', '2');
    } else {
        selectElement('tpsalert', '1');
    }

    document.getElementById('faction').value = outpostfac;
	document.getElementById('strongholdfaction').value = shfac;

    if (outpostalerts == false) {
        selectElement('outpostalert', '2');
    } else {
        selectElement('outpostalert', '1');
    }
	
	if (sh == false) {
        selectElement('strongholdalert', '2');
    } else {
        selectElement('strongholdalert', '1');
    }

    if (wallchecking == false) {
        selectElement('wallchecking', '2');
    } else {
        selectElement('wallchecking', '1');
    }
	
	if (bufferchecking == false) {
        selectElement('bufferchecking', '2');
    } else {
        selectElement('bufferchecking', '1');
    }

    if (playertrack == false) {
        selectElement('playeralerts', '2');
    } else {
        selectElement('playeralerts', '1');
    }
	
	if (appsenabled == false) {
        selectElement('applications', '2');
    } else {
        selectElement('applications', '1');
    }
	
	if (theme == 1) {
        selectElement('theme', '1');
    } else {
        selectElement('theme', '2');
    }

    document.getElementById('save').addEventListener('click', function() {
        document.getElementById('save').innerHTML = 'Saving...';
        //save json and return to home page
        var fs = require('fs');
        const stripIndent = require('strip-indent');
        const editJsonFile = require("edit-json-file");
        let file = editJsonFile(assetsPath+'settings.json');
        //get all new input settings
        var autofinds = document.getElementById('autofind').value;
        if (autofinds != '1') {
            file.set("autofind", false);
        } else {
            file.set("autofind", true);
        }
        var planets = document.getElementById('planet').value;
        file.set("joincommand", planets+'');
        var prefixs = document.getElementById('prefix').value;
        file.set("prefix", prefixs+'');

        var games = document.getElementById('game').value;
        file.set("game", games+'');

        var raids = document.getElementById('raidevent').value;
        if (raids != '1') {
            file.set("raidevents", false);
        } else {
            file.set("raidevents", true);
        }

        var tpss = document.getElementById('tpsalert').value;
        if (tpss != '1') {
            file.set("tpsalerts", false);
        } else {
            file.set("tpsalerts", true);
        }

        var outpostfacc = document.getElementById('faction').value;
        file.set("factionName", outpostfacc+'');
		
		var shfacc = document.getElementById('strongholdfaction').value;
        file.set("strongholdfac", shfacc+'');

        var outpostss = document.getElementById('outpostalert').value;
        if (outpostss != '1') {
            file.set("outposts", false);
        } else {
            file.set("outposts", true);
        }
		
		var strongholdss = document.getElementById('strongholdalert').value;
        if (strongholdss != '1') {
            file.set("stronghold", false);
        } else {
            file.set("stronghold", true);
        }

        var wallcheckss = document.getElementById('wallchecking').value;
        if (wallcheckss != '1') {
            file.set("wallchecks", false);
        } else {
            file.set("wallchecks", true);
        }
		
		var buffercheckss = document.getElementById('bufferchecking').value;
        if (buffercheckss != '1') {
            file.set("bufferchecks", false);
        } else {
            file.set("bufferchecks", true);
        }

        var playerss = document.getElementById('playeralerts').value;
        if (playerss != '1') {
            file.set("playertracking", false);
        } else {
            file.set("playertracking", true);
        }
		
		var appss = document.getElementById('applications').value;
        if (appss != '1') {
            file.set("applicationsEnabled", false);
        } else {
            file.set("applicationsEnabled", true);
        }
		
		var themee = document.getElementById('theme').value;
        if (themee == 1) {
            file.set("consoleTheme", 1);
        } else {
            file.set("consoleTheme", 2);
        }

        file.save();
        setTimeout(function() {
            var fs = require('fs');
            fs.writeFile('./pm2.log','Settings saved! (A restart is required to take affect)', function (err) {
                if (err) {console.log(err);}
                document.getElementById('save').innerHTML = 'Saved!';
                //Close window somehow
                const remote = require('electron').remote;
                var window = remote.getCurrentWindow();
                window.close();
            });
        }, 500);
    });
	
	if (theme == 1) {
	//Light theme 
		document.body.style.backgroundColor = "white";
		document.body.style.color = "#000";
		var x = document.getElementsByClassName("custom-select");
		var i;
		for (i = 0; i < x.length; i++) {
		  x[i].style.border = "solid 1px black";
		}
		var xx = document.getElementsByClassName("form-control");
		var ii;
		for (ii = 0; ii < xx.length; ii++) {
		  xx[ii].style.border = "solid 1px black";
		}
	}
});