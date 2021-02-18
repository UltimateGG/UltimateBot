If you are doing a custom server config please follow these instructions.

This is not recommended and it is not 100% that all features will still work.
First, in .env set your serverConfiguration= to 'custom'
Then in notepad++ or text editor, open "customConfig.json"

You should know how to edit regex to do most of this.
I suggest this regex tester: https://regex101.com/

Most of this is self explanitory. Please follow each instruction for each setting.
If you do not have any flags in your regex, please leave "FLAGS:". The term
FLAGS: should have 1 space behind it from your regex.
Your regex should not contain the 2 slashes /EXPRESSION/, just the expression.


##############################################################################
##############################################################################
##############################################################################
SINCE THIS IS JSON, YOU CANNOT HAVE A BACKSLASH. PLEASE PASTE *ALL* REGEX INTO
https://www.freeformatter.com/json-escape.html#ad-output
AND CLICK ESCAPE. THEN YOU CAN PASTE IT INTO QUOTES.

PLEASE LEAVE A MESSAGE AS DEFAULT IF YOU DO NOT HAVE THAT FEATURE ON YOUR SERVER.

IF YOUR BOT IS CRASHING AND RESTARTING EVERY SECOND ONCE YOU EDIT THE CONFIG,
PLEASE PASTE YOUR CONFIG JSON INTO https://jsonlint.com/ AND CLICK VALIDATE
TO CHECK YOUR ERRORS. IF YOU STILL CANT FIND THE ISSUE CONTACT ME.
##############################################################################
##############################################################################
##############################################################################


########## TPA ##########
Tpa doesnt do much more than send an alert to console
that someone has requested to tp to the bot. 

You should highlight in a capturing group (parenthesis) the username.


########## CHECKEDMSG ##########
The message the bot will receive when someone checks walls only. 
Same as msging walls, but I kept from the old bot. Make sure the format
works with /msg on your server. 

######################################################
MAKE SURE TO HIGHLIGHT THE USERNAME IN ALL /MSG REGEXS 
USING () AROUND IT
######################################################

##### NOTE FOR ALL /MSGS: ####
Yes this is bad regex with .*, and anyone can bypass it by doing /msg BOT ] [username -> me] checked,
it will infact trigger it. The IMPORTANT setting is the usernameIndex, the message is split by spaces
and the username index, will be the first split by space. 
Example:
[username -> me] message
Split by space: my username index would be 0.
My messageIndex would be 3. Remember splitting is 0 based arrays.

On the username, these will be replaced with nothing: [, ], (, ), :, ;, |

#### *MSG #### 
The rest of the things with xMsg are self explanitory. Please follow the same format as
the checkedmsg.


#### Paid Msg #### 
When the bot receives money. Do not highlight anything with () here.

#### money sent ####
Bot sends money to someone. Do not highlight anything with () here.


#### LINK ####
This is a message still. Do not highlight anything with () here.
You cant change the word "link" from the regex, as the bot checks if it includes
link to check for a key.


#### link username ####
Same as link, but highlight the username with ()


#### link key #### 
Same as link, but highlight the KEY with ()


#### tfa ####
2fa message if your server has one, the bot will @everyone in the ingame chat channel saying you need
the code. Reason is that the walls/buffers cant go off if it is stuck in 2fa. (Discord side will work) 


#### raid event warn ####
If your server has automatic raid events, the message to trigger an alert
Hightlight the time here with ().


#### basicmsg #### 
Important. The regex for when any message is received. Do not hightlight anything here.



#################### Index ####################
The index of the word when the message is split by 
a space. Numbers only.


#### username Index ####
Index of the username on /msg 
Ex: 
[username -> me] hi
is 0
[[Rank] username -> me] hi
is 1

#### msg Index ####
The content of the message index.
Ex:
[username -> me] hi
is 3


#### username money sent index ####
The username when money is sent to someone.
Ex:
$1 has been sent to USERNAME.

#### username money received index ####
Username when someone pays the bot.
Note: []().:;| are all replaced with nothing.
Ex:
$1 has been received from USERNAME!


#### actual money index ####
The $ amount of money from money being received.
Ex:
$AMOUNT has been received from username.



#### Custom Commands ####
If it has %x% that is a placeholder 
and it will be replaced with an argument from
the message.


### CUSTOM CHAT FORMATS ###


### FTOP ###
Please read: This is the format
the bot will use to register things in chat
and it is very sensitive. Please match it to your server exact.
Example: if your ftop is
N. FACTION - VALUE (PERCENT)
you cant do 
"..?\. (.*) - (.*)" as the percent will be included in the value.
It must be 
"..?\. (.*) - (.*) \(.*"

Please highlight 2 things in ():
The faction.
The value.


#Ftop includes:
The start: should be the top line of ftop: example if ftop was
------------.[ Top Factions ].------------------
You would want ftopStartIncludes to be
Top Factions, as it would include that.

##### No ftop start line: #####
This means the bot either cant register the top line of the ftop board
because the server has broken json, or the ftop doesnt have a start
line.
Set to true if so because it is 
how discord registers what embed
to send.
################################


#Ftop PLACE includes:
each faction on ftop needs these characters to register.
Add as many as you like.
Ex:
#1. FACTION - $VALUE
I could do
[
    ".",
    "$"
]

### Fwho includes ###
What the lines for fwho
should include.
This must have 
AT LEAST ONE
entry in it.

If you have debug on and dont see the members online for fwho
in console, the server has broken json. Sorry, but that line cannot
show up for you.


#### OUTPOST ####
Opens as gui means
if you do your outpost command
a window opens like a chest.

Window title is the top left name of the chest.

Outpost item slot is the slot of the item
KEEP IN MIND THIS IS 0 BASED!

Outpost lore lines.
This is 0 based, the LORE of the item is the
text on it. Put lines to include.

I cannot do outpost alerts for this as it changes too much, sorry.


### TPS COMMAND ###
This is not just tps command, the bot runs this every 5 min
for an anti afk command. Please have something here.

TPS REGEX:
When you do the tps command, the exact number tps, with decimal included
for tps. ONE NUMBER ONLY.


### GRACE PERIOD ###
Command is the command that returns the time for
grace period. Includes is what the message
must include to show up.


### Debug ###
Set this to true if you want to see what messages the bot is receiving in chat. Sometimes
the server returns broken json.

To see debug formatted corrently, as it spams:

Open a command prompt as administrator. Type "npm i pm2 -g"
after its done type "pm2 log"
keep it open, you now have a live feed of console but formatted correctly with line breaks + arrays.






