# UltimateBot
UltimateBot is a Minecraft factions bot, connecting discord to in-game.

## About This Project
First off, I wanted to release this source code since I want beginners to be able to see/learn from it. I started the UltimateBot project in December 2019. This was the first coding project I had ever done, and I basically just learned as I went, so that is why this code is completely spaghetti and violates many coding principles.. The old website URL was http://ultimatebot.pw/ (I no longer own this domain/site) if you see that floating around.

The whole project is based in JavaScript, from the backend to the actual exe program running on the user's computer. The backend is a MEPN stack (MongoDB, Express, PUG, NodeJs) and the bot itself runs on Mineflayer/NodeJS. The code is compiled into an EXE file using electron to run as a GUI on the user's computer.

You will see many odd things in this code, many things repeating myself, inconsistent use of quotes/double quotes, inconsistent indentation etc. I do NOT write code like this anymore, for the record. Since this project I have narrowed down my career path to web development, and I have been practicing for the past 2 years since this project.

### Usage
I strongly recommend that you DO NOT use this bot in an actual factions experience. The bot is over 2 years old now, many of the servers it supports have probably changed chat formats, rules, etc. There are many bugs which is part of the reason I stopped working on it.

**Trying to modify/rebuild?**
node_modules is excluded from git. There are many folders including a package.json you may need to run `npm install` inside of.
The GUI part uses electron to compile the javascript into an exe. The javascript is actually still in a .js file, just in the resources/app/app folder and obfuscated (for production) 
This folder contains a node_modules folder, which certain modules have been modified for UltimateBot to work correctly. To get these to work, run the `npm install` command, and then drag the folders in MODIFIED_node_modules into the real node_modules, and click replace.

### Code Info
The main bot code is located in Deobf/bot.js - This is the deobfuscated and clean version. For production the code was all obfuscated and packaged into electron. The backend site code is located in UltimateBot Backend/
The backend was fully automated purchases, using the PayPal API, unlike other sellers. People are automatically given roles in discord.

**Some things you may see while browsing:**
  * **_IOStream_**:
  IOStream was a method to prevent cracking, the name is just random. There was a hidden node module deep in the code that would basically compare the bot.js & discord.js code to a clean copy located somewhere else as well. This would verify the file was not modified. Now days, I would probably use hashes but :shrug: I didn't know then. There would be random spots that would fire an io-stream check and the app would crash if it returned false. This would add many layers to cracking since obfuscated code is so hard to understand.
  
  * **_Unused, or commented code_**:
  There are many changes made throughout updates to the bot and I would take stuff out, not really optimizing anything. The files could probably be shrunk down at least 40% now if I tried. Many things could be combined to ternary statements, for example, or put into constant variables.
  
  * **_Nondynamic Variables_**:
  The backend was not very flexible/dynamic. I didn't have many things in config files, they were just hard-coded in. I actually moved some things for this code release. If you plan to modify it, just know even if you find a global variable it still may not affect what you would expect.
  
  * **_Linux/Mac Version_**:
  There was an entire separate version of the bot which did not run on electron, since for some reason electron was not building on other platforms except windows. This version just runs on PM2, and did not have much support. I am pretty sure all the bot code was the same, I probably could have merged it into one program.
  
  * **_Transfer Files (output.txt, runcommand.txt, etc.)_**:
    Since this was my first time using node, I didn't know about require(); My solution was genius, to use .txt files and constantly check for changes to them and execute the code sent. This is how the discord.js and bot.js files communicate. This did cause many issues, but it worked decent :D. (Thank you to Jacob for helping me when getting started on the bot)

# IMPORTANT
You may do whatever you want with the code under the regulations of the GNU license, but I will NOT be available to help you fix any issues nor setup the bot, the repo is archived for a reason and I do not like working on this project anymore. There are many bugs within the actual bot, as stated, this was my first code project ever.
