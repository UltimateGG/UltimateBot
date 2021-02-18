Thank you for purchasing UltimateBot.

If you have any issues during this setup, please join the support discord and make a support ticket. https://ultimatebot.pw/support

How to install:
If you havent already, make a folder on your desktop and extract this .zip there.

Once done navigate to the src folder, and find UltimateBot.exe
#######################################################################
**DO NOT OPEN ULTIMATEBOT.EXE YET** - if you do it will probably launch 
hundreds of windows and crash your pc. You need to install nodejs first.
#######################################################################

Right click UltimateBot.exe and click Create Shortcut

Simply make this shortcut on your desktop, or pin it to your taskbar for easy access.


**** Get the latest version of node and install it at https://nodejs.org/en/ **** When installing node
make sure you check where it says
"Automatically install the necessary tools..." <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

In the windows powershell console, if it freezes press enter.
Usually on installing visualstudio2017build:
If it still persists, restart the install for node and click repair that time.

If your ultimatebot folder is in program files or somewhere like that, you will need to right click
and run as administrator each time.

Now you need to edit the config, navigate to src/resources/assets/.env and edit .env with notepad++ or 
notepad. Make sure you put your license key correctly!

Instructions for .env:
----------------------
Any line that starts with a "#" in the config file is ignored, and you do not need to edit it.
The "licensekey" entry needs to be changed or your app can not launch. 
**** Go to https://ultimatebot.pw/dashboard **** 
It should say you have a license, and under that a button that says "Reveal license key" Click that button.
A line should pop up in bold, copy that license key. 
Go back to .env and paste it inbetween the quotes in licensekey=''

Next - Discord bot setup ==========================================================================================================
**** Go to https://discordapp.com/developers/applications/ ****
You may need to sign in with your discord account or make a developer account. Once you get to the dashboard in the top right you should see 
a button that says "New Application" Click this.
Enter a name for the bot, like your faction name.
Click "Create"
You can click the icon on the left side and upload your factions icon.
Next on the left side click "Bot"
On the far right click "Add Bot"
A pop up opens, click "Yes, do it!"
You can customise the bot name and icon here also.
Under its username at the "TOKEN" area, click "Copy"
Go back to .env and in the TOKEN= , paste your copied token after the = sign. 
Now that the discord bot is setup, invite it to your server. Go back to the "General Information" tab on the left side. 
Find "Client ID" and click "Copy"
**** Go to https://discordapi.com/permissions.html#2146958847 **** 
You must have 2fa enabled on your discord account for this bot to work, or it wont let you enable these
permissions (As per discord API rules)

At the bottom find the "Client ID" input and paste your discord bots id on the red line. 
Next at the very bottom find the link and click it to invite the discord bot.
You may have to log in, and you need administrator permissions on the discord server you want to add the bot to.
Select the server you want to add the bot into. 
Click "Authorize"
Click "Im not a robot" and fill out the captcha
You can close that tab now and the discord bot should now be in your server. If not retry the discord bot setup. If you still have errors, 
join the discord support server https://ultimatebot.pw/support and do -new. 
The discord bot will be offline for now. Continue on...

Next - Get your guild id!
Go to your discord server. 
At the bottom left of discord, click the user settings wheel.
On the left go down to "Appearance"
Scroll down and find "Advanced" and find "Developer Mode" Make sure this is checked on!!
Click esc or close this window.
Go to your discord server's icon and right click it.
At the bottom of this menu, click "Copy ID"
Go back to .env and at yourGuildId='' and paste the copied id inbetween the quotes.

Next - Roles/Permissions ==============================================================================================================
In .env the next few lines are the role names the discord bot finds on a user when they use a command, 
the user MUST have one of these roles *WITH THAT NAME* to be able to execute the command. For detailed 
command info and permission info go to https://ultimatebot.pw/documentation
Change these role names to the ones in your discord server, or create them. They do not need permissions
them selves, just the name!
If you do not understand still after going to the documentation page, go to the support discord and ask 
for help... https://ultimatebot.pw/support 

Now you need to setup your server config. This is really easy, just on the .env line where
it says serverConfiguration= find your servers option and put it in the quotes.
If you do not, it will be very broken. If your server is not on there, please open a support ticket
in discord with -new and I will get your servers config added.


This is the end of the config, now just enter your alt logins, if you dont need an alt just leave it blank
but you MUST have the top alt's login info, or the bot is basically useless. Make sure you just type 
the info after the = signs NO QUOTES and NO SPACES! For some reason I keep getting the question how to 
change the MC bots name? That is not ultimatebot, that is a Minecraft account. Please visit mojang
or minecraft.net to do that. Read more in the .env file, you should 
have read all the lines there for extra info! Alt usernames are CASE SENSITIVE!

This is the end of the .env file! =====================================================================================================

You can now double click the shortcut or exe file and the bot should launch.
Once the GUI window opens, press restart to start the bot if it hasnt already said UID:....

If you have any errors, make sure your license key is inputted correctly and your alt logins are correct. If you are stumpted on the errors, join
the support discord at https://ultimatebot.pw/support and make a support ticket.

If you dont get errors the bot should show online in your discord server! Yay.
The console/gui window you see, needs to be open 24/7 for the bot to be online! ===========================
Next, go to discord and make sure you have the 'Admin' role or top role permission from the .env file.
In any channel, run "/setup" 
The bot should now create a bunch of channels.
Click on the channels for extra info the bot posted. Set your bot prefix with "/prefix *" or any prefix you want. Read all the info the bot posted.
To clear the info use /purge 5 and clear it.

These new channels have no permissions, make sure to change them,
or drop them in a faction permission category!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 
In your wall checking channel you set, follow the instructions.
Each reboot the bot will post info in the #logs channel. The bot should say "Buffers/walls have been checked by x after *a lot* of minutes!"
You can always toggle wall checks with "*prefix*toggle walls" or buffers.

Modify settings here, or in the ultimatebot.exe gui, click settings at the bottom right. Not all settings are included there, and you should use /settings
in discord to change certain settings, and /set for even more settings.

Next set the game the bot is playing.. "/game Minecraft" or anything you want, you can include spaces.
Now in set where the bot goes /server to 
"/set joincommand /server factions" for example.
Restart the bot with "/restart"

ALL:
Use "/wallinterval 15" for example to set the wall checking interval to 15 minutes.
Also /bufferinterval. Use /toggle buffers or /toggle walls.
Whitelist users for in-game with /whitelist.

COSMIC ONLY:
In #find-channel make sure the bot goes to the right planet, if not text it for yourself in-game.
#find-channel - "/find" It should say "x is in YOUR game, Xplanet"
Use /stronghold set <faction> to set your faction for stronghold monitoring.
Use /sh or stronghold toggle to set stronghold alerts.
Now in #outpost also is raid event alerts, Use "/raid toggle" to alert before a raid event starts happening. Use "/raid" in #bot-commands 
to get current raid info. 
Use "/autofind" for help on autofind players, all autofind/find outputs go into the #find-channel. 

If your server has a tps command:
Use "/tps set 17.50" to set the tps alerts to when tps is below 17.50 for example.
Use "/tps toggle" to toggle tps alert notifications. 
Tps is posted in #tps every 5 minutes! -------------------

If your server has outpost:
Next is outpost, in #outpost run "/faction *faction*" and input your faction name. When any outpost with this faction name is being taken
it will alert spam in this outpost channel. 
Use "/outpost toggle" to toggle alerts.
Use "/outpost" to view the outpost info!

ALL:
You can setup a custom join or leave message for your discord server, so when someone joins or leaves 
it says it in the "System messages channel" (Go to server overview to see this channel) If you do not
want a custom join or leave message set them to 'none' !
Use /set discordjoinmsg or discordleavemsg. 

Next you can configure the logs timezone, this time is also outputted in discord sometimes. This sets a 
timestamp on certain messages. You may leave this default for CST timezone. 
/set timezone <timezone> - Help is in the command just run /set timezone

Next is wall checking alert messages, you can keep this default and see what it looks like before 
editing this. Be aware that there is discord and minecraft alert messages, (They go in ally or fac chat)
depending on your setting, and you can set each of them. 
Use /set chattype a/f for ally or faction chat.
Use /set to look at all options, you are able to customize wall checking messages there,
Also /set discordalertmention roles/everyone to set the wall reminder mention.


Edit: There is now way more things set with ***/set in discord***. Run the command for a list!


There are lots more commands awating you in "/help"! 

*********************************************************************************************************************************************
Congratz, you have just setup the bot! For detailed command info use "/help" OR go to https://ultimatebot.pw/documentation
If you need help or support go to https://ultimatebot.pw/support and join the discord!

If you see a issue/bug with the bot please make a report in the discord with -new.

How to make the bot startup when your pc restarts:
Right click the desktop shortcut icon you made, and click copy.

Press Windows+R key and type "shell:startup" and hit enter.
In the folder that opens paste the shortcut, ultimatebot will now start when your pc boots.

Thank you for reading this!