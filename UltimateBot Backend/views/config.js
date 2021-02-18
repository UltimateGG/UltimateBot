document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#configForm').addEventListener('submit', createConfig);

    function createConfig(e) {
        e.preventDefault();

        let newConfig = defaultConfig;

        let messageFormat = document.querySelector('#msg').value.toString().toLowerCase();
        //[lavaplanet] [%username% -> me] %msg%

        //Basic Msg Regex 
        let basicMsg = messageFormat;
        basicMsg = replaceBrackets(basicMsg);
        basicMsg = basicMsg.trim()+' FLAGS:i';

        newConfig.usernameIndex = stripBrackets(messageFormat).split(' ').indexOf('%username%');
        newConfig.msgIndex = stripBrackets(messageFormat).split(' ').indexOf('%msg%');

        basicMsg = JSON.stringify('^'+basicMsg).replace(/"/g, '').replace('%username%', '.*');

        newConfig.basicmsg = basicMsg.replace('%msg%', '.*');
        newConfig.checkedmsg = basicMsg.replace('%msg%', '.?checked');
        newConfig.wallscheckedmsg = basicMsg.replace('%msg%', '.?walls');
        newConfig.bufferscheckedmsg = basicMsg.replace('%msg%', '.?buffers');
        newConfig.weewoomsg = basicMsg.replace('%msg%', '.?weewo.*');
        newConfig.safemsg = basicMsg.replace('%msg%', '.?safe');
        newConfig.link = basicMsg.replace('%msg%', 'link .*');
        let linkUsername = replaceBrackets(messageFormat).trim()+' FLAGS:i';
        linkUsername = linkUsername.replace('%msg%', 'link .*').replace('%username%', '(.*)');
        newConfig.linkusername = linkUsername;
        newConfig.linkkey = basicMsg.replace('%msg%', 'link (.*)');
        
        //Money Regex 
        let paidFormat = document.querySelector('#paid').value.toString().toLowerCase();
        
        let paidMsg = replaceBrackets(paidFormat);
        paidMsg = paidMsg.trim()+' FLAGS:';

        newConfig.usernameMoneyReceivedIndex = stripBrackets(paidFormat).replace(/\./g, '').split(' ').indexOf('%username%');
        newConfig.actualMoneyIndex = stripBrackets(paidFormat).replace(/\$/g, '').split(' ').indexOf('%money%');

        paidMsg = paidMsg.replace('%money%', '[0-9]*.?[0-9]*');
        paidMsg = paidMsg.replace('%username%', '.*');
        paidMsg = JSON.stringify('^'+paidMsg).replace(/"/g, '');

        newConfig.paidmsg = paidMsg;

        let sentFormat = document.querySelector('#sent').value.toString().toLowerCase();

        let sentMsg = replaceBrackets(sentFormat);
        sentMsg = sentMsg.trim()+' FLAGS:';

        newConfig.usernameMoneySentIndex = stripBrackets(sentFormat).replace(/\./g, '').split(' ').indexOf('%username%');

        sentMsg = sentMsg.replace('%money%', '[0-9]*.?[0-9]*');
        sentMsg = sentMsg.replace('%username%', '.*');
        sentMsg = JSON.stringify('^'+sentMsg).replace(/"/g, '');

        newConfig.moneysent = sentMsg;

        //Commands 
        newConfig.ftopCommand = document.querySelector('#cmdftop').value;
        newConfig.fListCommand = document.querySelector('#cmdflist').value;
        newConfig.payCommand = document.querySelector('#cmdpay').value;
        newConfig.payCommandRequiresConfirmation = document.querySelector('#payconf').checked;
        newConfig.fwhoCommand = document.querySelector('#cmdfwho').value;
        
        //FTop Format 
        const ftopFormat = document.querySelector('#ftopformat').value;
        
        let ftopMsg = replaceBrackets(ftopFormat);
        ftopMsg = ftopMsg.trim();

        ftopMsg = ftopMsg.replace('%place%', '[0-9][0-9]?');
        ftopMsg = ftopMsg.replace('%faction%', '(.*)');
        ftopMsg = ftopMsg.replace('%value%', '(.*)');

        newConfig.fTopPlace = ftopMsg;

        //Ftop start line 
        newConfig.ftopStartIncludes = document.querySelector('#ftopstart').value;

        //Flist start line 
        newConfig.flistStartIncludes = document.querySelector('#fliststart').value;

        //Fwho lines 
        const fwhoLines = document.querySelector('#fwholines').value;
        newConfig.fWhoIncludes = [];
        fwhoLines.toString().trim().split(',').forEach((item) => {
            newConfig.fWhoIncludes.push(item);
        });

        //END CONFIG SETUP 

        document.querySelector('#configForm').style.display = 'none';
        window.location.replace('config#top');

        document.querySelector('#newConfig').innerHTML = JSON.stringify(newConfig).replace(/\\\\\\\\/g, '\\\\');

        document.querySelector('#start').hidden = false;
    }

    function replaceBrackets(string) {
        string = string.replace(/\[/g, `\\[`);
        string = string.replace(/\]/g, `\\]`);
        string = string.replace(/\(/g, `\\(`);
        string = string.replace(/\)/g, `\\)`);
        string = string.replace(/\{/g, `\\{`);
        string = string.replace(/\}/g, `\\}`);
        string = string.replace(/\:/g, `\\:`);
        string = string.replace(/\|/g, `\\|`);
        string = string.replace(/\$/g, `\\$`);
        return string;
    }

    function stripBrackets(string) {
        string = string.replace(/\[/g, '');
        string = string.replace(/\]/g, '');
        string = string.replace(/\(/g, '');
        string = string.replace(/\)/g, '');
        string = string.replace(/\{/g, '');
        string = string.replace(/\}/g, '');
        string = string.replace(/\:/g, '');
        string = string.replace(/\|/g, '');
        string = string.replace(/\$/g, '');
        return string;
    }

    const copyBtn = document.querySelector('#copyconfig');
    copyBtn.addEventListener('click', () => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy Config', 1500);
    });

    document.querySelector('#newcfg').addEventListener('click', () => {
        window.location.href = 'config';
    });
});


const defaultConfig = {
	"tpa": "^(.*) has requested (?:to teleport to you|that you teleport to them)\\\. FLAGS:g",
	
	"checkedmsg": "^\\\[?.*\\\] \\\((.*) . me\\\) \\\\/?checked FLAGS:i",
	
	"wallscheckedmsg": "^\\\[?.*\\\] \\\((.*) . me\\\) \\\\/?walls FLAGS:i",
	
	"bufferscheckedmsg": "^\\\[?.*\\\] \\\((.*) . me\\\) \\\\/?buffers FLAGS:i",
	
	"weewoomsg": "^\\\[?.*\\\] \\\((.*) . me\\\) \\\\/?weewoo FLAGS:i",
	
	"safemsg": "^\\\[?.*\\\] \\\((.*) . me\\\) \\\\/?safe FLAGS:i",
	
	"paidmsg": "^\\\$[0-9]*.?[0-9]* has been received from .* FLAGS:",
	
	"moneysent": "^\\\$[0-9]*.?[0-9]* has been sent to .* FLAGS:",
	
	"link": "^\\\[?.*\\\] \\\(.* . me\\\) link .* FLAGS:i",
	
	"linkusername": "^\\\[?.*\\\] \\\((.*) . me\\\) link .* FLAGS:i",
	
	"linkkey": "^\\\[?.*\\\] \\\(.* . me\\\) link (.*) FLAGS:i",
	
	"tfa": "^\\\(!\\\) You need to enter your 2fa code .* FLAGS:i",
	
	"raideventwarn": "^\\\*\\\*\\\* RAID EVENT STARTING IN (.*) FLAGS:gim",
	
	"basicmsg": "^\\\[?.*\\\] \\\(.* . me\\\) .* FLAGS:i",
	
	"usernameIndex": 1,
	"msgIndex": 4,
	"usernameMoneySentIndex": 4,
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