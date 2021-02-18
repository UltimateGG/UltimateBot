window.addEventListener('DOMContentLoaded', () => {
const remote = require('electron').remote;
const assetsPath = require('path').join(__dirname, '../assets/');
var fs = require('fs');

var app = require(assetsPath+'applicationquestions.json');

function selectElement(id, valueToSelect) {
	let element = document.getElementById(id);
	element.value = valueToSelect;
}

//Set first embeds (not questions yet)

//Application started 
document.getElementById('appstartedcp').value = app.applicationStarted.embedHexColor+"";
document.getElementById('appstartedtitle').value = app.applicationStarted.embedTitle;
document.getElementById('appstartedthumb').value = app.applicationStarted.thumbnailURL;
document.getElementById('appstarteddesc').value = app.applicationStarted.description;
document.getElementById('appstartedcolor').value = document.getElementById('appstartedcp').value;
selectElement('appstartedtimestamp', app.applicationStarted.timestampSet);

document.getElementById('appstartedcp').addEventListener('input', function (evt) {
    document.getElementById('appstartedcolor').value = this.value;
});

//Application finished 
document.getElementById('appfinishedcp').value = app.applicationFinished.embedHexColor+"";
document.getElementById('appfinishedtitle').value = app.applicationFinished.embedTitle;
document.getElementById('appfinishedthumb').value = app.applicationFinished.thumbnailURL;
document.getElementById('appfinisheddesc').value = app.applicationFinished.description;
document.getElementById('appfinishedcolor').value = document.getElementById('appfinishedcp').value;
selectElement('appfinishedtimestamp', app.applicationFinished.timestampSet);

document.getElementById('appfinishedcp').addEventListener('input', function (evt) {
    document.getElementById('appfinishedcolor').value = this.value;
});

//Application submitted 
document.getElementById('appsubmitcp').value = app.applicationSent.color;
document.getElementById('appsubmitcolor').value = document.getElementById('appsubmitcp').value;

document.getElementById('appsubmitcp').addEventListener('input', function (evt) {
    document.getElementById('appsubmitcolor').value = this.value;
});

//Application accepted 
document.getElementById('appacceptcp').value = app.applicationAccepted.embedHexColor;
document.getElementById('appaccepttitle').value = app.applicationAccepted.embedTitle;
document.getElementById('appacceptthumb').value = app.applicationAccepted.thumbnailURL;
document.getElementById('appacceptdesc').value = app.applicationAccepted.description;
document.getElementById('appacceptcolor').value = document.getElementById('appacceptcp').value;
selectElement('appaccepttimestamp', app.applicationAccepted.timestampSet);

document.getElementById('appacceptcp').addEventListener('input', function (evt) {
    document.getElementById('appacceptcolor').value = this.value;
});

//Application denied 
document.getElementById('appdeniedcp').value = app.applicationDenied.embedHexColor;
document.getElementById('appdeniedtitle').value = app.applicationDenied.embedTitle;
document.getElementById('appdeniedthumb').value = app.applicationDenied.thumbnailURL;
document.getElementById('appdenieddesc').value = app.applicationDenied.description;
document.getElementById('appdeniedcolor').value = document.getElementById('appdeniedcp').value;
selectElement('appdeniedtimestamp', app.applicationDenied.timestampSet);

document.getElementById('appdeniedcp').addEventListener('input', function (evt) {
    document.getElementById('appdeniedcolor').value = this.value;
});

//QUESTIONS EDITOR 

var container = document.getElementById('questionsContainer');
var currentQuestion = 0;
app.questions.forEach(question => {
	var questionNumber = app.questions[currentQuestion].number; 
	
	var questionContainer = document.createElement("div");
	questionContainer.id = questionNumber;
	
	var h = document.createElement("H2");
	var t = document.createTextNode(questionNumber+".");
	h.appendChild(t); 
	questionContainer.appendChild(h);
	
	var breaks = document.createElement("br");
	questionContainer.appendChild(breaks);
	questionContainer.appendChild(breaks);
	
	var qinput = document.createElement("div");
	qinput.classList.add("input-group", "mb-3");
	qinput.style.width = "95%";
	
	var qinputprepend = document.createElement("div");
	qinputprepend.classList.add('input-group-prepend');
	
	var qinputprependtext = document.createElement("span");
	qinputprependtext.classList.add("input-group-text");
	qinputprependtext.textContent = "Question:";
	
	//Build question box 
	qinputprepend.appendChild(qinputprependtext);
	qinput.appendChild(qinputprepend);
	
	var questionText = document.createElement("input");
	questionText.classList.add("form-control");
	questionText.type = "text";
	questionText.value = app.questions[currentQuestion].question;
	questionText.id = "question"+currentQuestion;

	qinput.appendChild(questionText);

	questionContainer.appendChild(qinput);
	
	//HEX COLOR 
	var colorinput = document.createElement("div");
	colorinput.classList.add("input-group", "mb-3");
	colorinput.style.width = "95%";
	
	var colorinputprepend = document.createElement("div");
	colorinputprepend.classList.add('input-group-prepend');
	
	var colorPicker = document.createElement("input");
	colorPicker.type = "color";
	colorPicker.value = app.questions[currentQuestion].color;
	colorPicker.className = "QcolorPicker";
	colorPicker.id = "cp"+currentQuestion;
	
	var colorinputprependtext = document.createElement("span");
	colorinputprependtext.classList.add("input-group-text");
	colorinputprependtext.appendChild(colorPicker);
	colorinputprependtext.textContent = " Hex Color:";
	
	colorinput.appendChild(colorPicker);
	
	//Build question box 
	colorinputprepend.appendChild(colorinputprependtext);
	colorinput.appendChild(colorinputprepend);
	
	var colorText = document.createElement("input");
	colorText.classList.add("form-control");
	colorText.type = "text";
	colorText.value = app.questions[currentQuestion].color;
	colorText.id = "color"+currentQuestion;

	colorPicker.addEventListener('input', function (evt) {
		colorText.value = this.value;
	});

	colorinput.appendChild(colorText);

	questionContainer.appendChild(colorinput);
	
	
	//TIMESTAMP 
	var tstampinfo = document.createElement("p");
	tstampinfo.innerHTML = "Timestamp enabled (Adds the current time on the embed):";
	
	questionContainer.appendChild(tstampinfo);
	
	var selection = document.createElement("select");
	selection.classList.add("custom-select", "timestamp");
	selection.style.width = "95%";
	selection.id = "timestamp"+currentQuestion;
	
	var optiont = document.createElement("option");
	optiont.text = "True";
	selection.add(optiont);
	
	var optionf = document.createElement("option");
	optionf.text = "False";
	selection.add(optionf);
	
	if (!app.questions[currentQuestion].timestampSet) {
	selection.value = "False";
	}
	
	questionContainer.appendChild(selection);
	
	var spacer = document.createElement("div");
	spacer.style = "margin-bottom:2.3em;";
	
	questionContainer.appendChild(spacer);
	
	container.appendChild(questionContainer);
	
	currentQuestion++;
});

function addQuestion(num) {
	var questionNumber = num; 
	
	var questionContainer = document.createElement("div");
	questionContainer.id = questionNumber;
	
	var h = document.createElement("H2");
	var t = document.createTextNode(questionNumber+".");
	h.appendChild(t); 
	questionContainer.appendChild(h);
	
	var breaks = document.createElement("br");
	questionContainer.appendChild(breaks);
	questionContainer.appendChild(breaks);
	
	var qinput = document.createElement("div");
	qinput.classList.add("input-group", "mb-3");
	qinput.style.width = "95%";
	
	var qinputprepend = document.createElement("div");
	qinputprepend.classList.add('input-group-prepend');
	
	var qinputprependtext = document.createElement("span");
	qinputprependtext.classList.add("input-group-text");
	qinputprependtext.textContent = "Question:";
	
	//Build question box 
	qinputprepend.appendChild(qinputprependtext);
	qinput.appendChild(qinputprepend);
	
	var questionText = document.createElement("input");
	questionText.classList.add("form-control");
	questionText.type = "text";
	questionText.id = "question"+currentQuestion;

	qinput.appendChild(questionText);

	questionContainer.appendChild(qinput);
	
	//HEX COLOR 
	var colorinput = document.createElement("div");
	colorinput.classList.add("input-group", "mb-3");
	colorinput.style.width = "95%";
	
	var colorPicker = document.createElement("input");
	colorPicker.type = "color";
	colorPicker.className = "QcolorPicker";
	colorPicker.value = "#0099ff";
	colorPicker.id = "cp"+currentQuestion;
	
	var colorinputprepend = document.createElement("div");
	colorinputprepend.classList.add('input-group-prepend');
	
	var colorinputprependtext = document.createElement("span");
	colorinputprependtext.classList.add("input-group-text");
	colorinputprependtext.textContent = "Hex Color:";
	
	colorinput.appendChild(colorPicker);
	
	//Build question box 
	colorinputprepend.appendChild(colorinputprependtext);
	colorinput.appendChild(colorinputprepend);
	
	var colorText = document.createElement("input");
	colorText.classList.add("form-control");
	colorText.type = "text";
	colorText.value = "#0099ff";
	colorText.id = "color"+currentQuestion;

	colorPicker.addEventListener('input', function (evt) {
		colorText.value = this.value;
	});

	colorinput.appendChild(colorText);

	questionContainer.appendChild(colorinput);
	
	
	//TIMESTAMP 
	var tstampinfo = document.createElement("p");
	tstampinfo.innerHTML = "Timestamp enabled (Adds the current time on the embed):";
	
	questionContainer.appendChild(tstampinfo);
	
	var selection = document.createElement("select");
	selection.classList.add("custom-select");
	selection.style.width = "95%";
	selection.id = "timestamp"+currentQuestion;
	
	var optiont = document.createElement("option");
	optiont.text = "True";
	selection.add(optiont);
	
	var optionf = document.createElement("option");
	optionf.text = "False";
	selection.add(optionf);

	selection.value = "False";
	
	questionContainer.appendChild(selection);
	
	var spacer = document.createElement("div");
	spacer.style = "margin-bottom:2.3em;";
	
	questionContainer.appendChild(spacer);
	
	container.appendChild(questionContainer);
}


//Add question button 
document.getElementById('addq').addEventListener('click', function() {
   //Add question inside of json
 fs.readFile(assetsPath+'applicationquestions.json', 'utf8', function(err, contents) {
	if (err) return console.log(err);
	var json = JSON.parse(contents);
	var qnumber = json.questions.length;
	if (qnumber + 1 > 25) {
		document.getElementById('addq').classList = "";
		document.getElementById('addq').classList.add("btn", "btn-danger");
		document.getElementById('addq').innerHTML = "Max is 25!";
		setTimeout(function() {
		document.getElementById('addq').classList = "";
		document.getElementById('addq').classList.add("btn", "btn-success");
		document.getElementById('addq').innerHTML = "Add Question";
		}, 1000);
	} else {
		var newQuestion = {
		  "number": qnumber+1,
		  "question": "",
		  "color": "",
		  "timestampSet": false
		};
		json.questions.push(newQuestion);
		json = JSON.stringify(json, undefined, 4);
		fs.writeFile(assetsPath+'applicationquestions.json', json, err => {
			if (err) throw err;
			//Add new html element 
			addQuestion(qnumber+1);
			document.getElementById('addq').innerHTML = "Added!";
			currentQuestion++;
			setTimeout(function() {
			document.getElementById('addq').innerHTML = "Add Question";
			}, 1800);
		});
	}
 });
});

document.getElementById('removeq').addEventListener('click', function() {
	//Remove last question from json first 
	fs.readFile(assetsPath+'applicationquestions.json', 'utf8', function(err, contents) {
	  if (err) return console.log(err);
	  var json = JSON.parse(contents);

	  json.questions.forEach(question => {
		if (question.number == currentQuestion - 1) {
		  json.questions.splice(currentQuestion - 1);
		}
	  });

	  json = JSON.stringify(json, undefined, 4);
	  fs.writeFile(assetsPath+'applicationquestions.json', json, err => {
		  if (err) throw err;
		  //Update html 
		  currentQuestion--;
		  removeQuestion(currentQuestion + 1);
	  });
	});
});

function removeQuestion(num) {
	document.getElementById(num+'').remove();
	document.getElementById('removeq').innerHTML = "Removed Last Question!";
	setTimeout(function() {
		document.getElementById('removeq').innerHTML = "Remove Question";
	}, 1000);
}


document.getElementById('save').addEventListener('click', function() {
	//Save all questions and overwrite current appquestions json file 
	
	//Save application started 
	var appStartedTs = document.getElementById('appstartedtimestamp').value;
	if (appStartedTs.includes('true')) {
		appStartedTs = true; 
	} else { 
		appStartedTs = false;
	}
	
	var appFinishedTs = document.getElementById('appfinishedtimestamp').value;
	if (appFinishedTs.includes('true')) {
		appFinishedTs = true; 
	} else { 
		appFinishedTs = false;
	}
	
	var appAcceptTs = document.getElementById('appaccepttimestamp').value;
	if (appAcceptTs.includes('true')) {
		appAcceptTs = true; 
	} else { 
		appAcceptTs = false;
	}
	
	var appDeniedTs = document.getElementById('appdeniedtimestamp').value;
	if (appDeniedTs.includes('true')) {
		appDeniedTs = true; 
	} else { 
		appDeniedTs = false;
	}
	
	var applicationQuestionsEND = {
		"applicationStarted": {
			"embedTitle": document.getElementById('appstartedtitle').value+'',
			"thumbnailURL": document.getElementById('appstartedthumb').value+'',
			"description":  document.getElementById('appstarteddesc').value+'',
			"embedHexColor": document.getElementById('appstartedcolor').value+'',
			"timestampSet": appStartedTs
		},
		
		"applicationFinished": {
			"embedTitle": document.getElementById('appfinishedtitle').value+'',
			"thumbnailURL": document.getElementById('appfinishedthumb').value+'',
			"description":  document.getElementById('appfinisheddesc').value+'',
			"embedHexColor": document.getElementById('appfinishedcolor').value+'',
			"timestampSet": appFinishedTs
		},
		"applicationSent": {
			"color": document.getElementById('appsubmitcolor').value+''
		},
		"applicationAccepted": {
			"embedTitle": document.getElementById('appaccepttitle').value+'',
			"thumbnailURL": document.getElementById('appacceptthumb').value+'',
			"description":  document.getElementById('appacceptdesc').value+'',
			"embedHexColor": document.getElementById('appacceptcolor').value+'',
			"timestampSet": appAcceptTs
		},
		"applicationDenied": {
			"embedTitle": document.getElementById('appdeniedtitle').value+'',
			"thumbnailURL": document.getElementById('appdeniedthumb').value+'',
			"description":  document.getElementById('appdenieddesc').value+'',
			"embedHexColor": document.getElementById('appdeniedcolor').value+'',
			"timestampSet": appDeniedTs
		},
		questions: []
	};
	
	
	//Add each question from questionsContainer div 
	var i = currentQuestion;
	var questionIndexTa = 0;
	for (i; i > 0; i--) {
		var qNumber = questionIndexTa;
		var qQuestion = document.getElementById('question'+questionIndexTa).value+'';
		var qColor = document.getElementById('color'+questionIndexTa).value+'';
		var qTimestamp = document.getElementById('timestamp'+questionIndexTa).value+'';
		if (qTimestamp.includes('true')) {
			qTimestamp = true; 
		} else { 
			qTimestamp = false;
		}
		
		var qQuestionJson = {
			"number": qNumber + 1,
            "question": qQuestion,
            "color": qColor,
            "timestampSet": qTimestamp
		}
		
		applicationQuestionsEND.questions.push(qQuestionJson);
		
		questionIndexTa++;
	}
	
	var endJson = JSON.stringify(applicationQuestionsEND, undefined, 4)
	
    fs.writeFile(assetsPath+'applicationquestions.json', endJson, err => {
	    if (err) throw err;
		//Close window or whatever
		document.getElementById('save').innerHTML = "Saved!";
		setTimeout(function() {
			document.getElementById('save').innerHTML = "Save Questions";
		}, 1800);
    });
});



//THEME 
var theme = require(assetsPath+'settings.json').consoleTheme;
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