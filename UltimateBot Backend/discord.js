require('dotenv').config();
var token = process.env.TOKEN+'';

var fs = require('fs');

const Discord = require('discord.js');
var bot = new Discord.Client();

var prefix = '-';
//Guild id
var thisguild = '661666239701319701';
//If maxrolementions was 3 for example, and they sent 4 role mentions it would be flagged.
var maxAllowedRoleMentionsPerMessage = 3;
var maxAllowedUserMentionsPerMessage = 4;
//Max amount of times one user can be flagged before getting muted. This counts for both the user & role mentions.
//If this is 2 for example, on the 3rd time they get muted.
var maxMentionStrikes = 2;
//How many hours the user will be muted for 
var muteTimeHours = 12;

var botcommands = '661668794565001217';
var ticketcategory = '661677450270474264';
var ticketlogs = '661677085021962269';

var moment = require('moment-timezone');

function getTime() {
  //get time function
  var time = moment(Date.now())
    .tz("America/Chicago")
    .format('LT');
  var timezoneAbbr = moment.tz.zone("America/Chicago").abbr(360);
  return time + ' ' + timezoneAbbr;
}

bot.on('ready', function() {
  console.log('Ready.');
  bot.user.setActivity('for '+prefix+'new | UltimateBot.pw', { type: 'WATCHING' });

  bot.on('guildMemberAdd', (member) => {
    if (member.guild.id+'' != '661666239701319701') return;
    
    //Add role cuz dyno is gay
    var memberrole = member.guild.roles.find(role => role.name === "Member");
    member.addRole(memberrole);
    //:green_book: 
    bot.channels.get('661667375975890944').send(':green_book: Welcome, ``'+member.user.tag+'`` ('+member+'). Please read <#677666078654201876>.');
    
    //Check if they were muted
    fs.readFile('./muteData.txt', 'utf8', function (err, data) {
      var lines = data.toString().split(/\n/);
      lines.forEach(line => {
        if (line.toString().includes(member.id+'') && line.includes('muted')) {
          try {
            thisguild = bot.guilds.get(thisguild+'');
             thisguild.channels.forEach(channel => {
               channel.overwritePermissions(member, {
                SEND_MESSAGES: false,
                ATTACH_FILES: false,
                ADD_REACTIONS: false
              });
             });
          } catch (e) {console.log(e)}
        }
      });
    });
  });
  
  bot.on('guildMemberRemove', (member) => {
    //:closed_book: 
    if (member.guild.id+'' != '661666239701319701') return;
    bot.channels.get('661667375975890944').send(':closed_book:  Goodbye, ``'+member.user.tag+'``.');
  });
  
  //Setup interval for checking muted users time
  setInterval(function() {
    fs.readFile('./muteData.txt', 'utf8', function (err, data) {
      var lines = data.toString().split(/\n/);
      lines.forEach(line => {
        if (line.toString().includes('muted')) {
          //Someone is muted, check the time
          var tLine = line.toString().split(':');
          var mTime = tLine[4];
          //If their time was greater than the current time unmute
          var muteTimeHoursMs = Number(muteTimeHours) * 60;
          muteTimeHoursMs = Number(muteTimeHoursMs) * 60000;
          
          var d = new Date();  
          var now = d.getTime();
          now = now.toString()+'';
          now = Number(now);

          if (Number(mTime) > Number(muteTimeHoursMs + Number(now))) {
            thisguild = bot.guilds.get(thisguild+'');
            var theUser = tLine[0].toString();
            theUser = bot.users.get(theUser+'');
            try {
                 thisguild.channels.forEach(channel => {
                   channel.overwritePermissions(theUser, {
                    SEND_MESSAGES: null,
                    ATTACH_FILES: null,
                    ADD_REACTIONS: null
                  });
                 });
              fs.readFile('./muteData.txt', 'utf8', function (err, data) {
                  if (err) {
                    return console.log(err);
                  }                  
                  var oldProfile = new RegExp(theUser.id+".*", "g");
                  
                  var d = new Date();
                  var now = d.getTime();
                  var newProfile = data.replace(oldProfile, theUser.id+':0:'+now);

                  fs.writeFile('./muteData.txt', newProfile, 'utf8', function (err) {
                     if (err) return console.log(err);
                  });
                });
              console.log('Unmuted '+theUser.id+'. Mute expired.');
            } catch (e) {console.log(e)}
          }
        }
      });
      //Also reset stat after 24 hours
      var lines = data.toString().split(/\n/);
      lines.forEach(line => {
        if (line.toString().includes('muted') != true) {
          var tLine = line.toString().split(':');
          var cTime = tLine[2];
          
          if (Number(cTime) > Number(Number(cTime) + Number(86400000))) {
            fs.readFile('./muteData.txt', 'utf8', function (err, data) {
              if (err) {
                return console.log(err);
              }                  
              var oldProfile = new RegExp(line+"", "g");
              var userId = tLine[0].toString();
              var d = new Date();
              var now = d.getTime();
              var newProfile = data.replace(oldProfile, userId+':0:0');

              fs.writeFile('./muteData.txt', newProfile, 'utf8', function (err) {
                 if (err) return console.log(err);
              });
            });
          }
        }
      });
    });
  }, 60000);
  
  
  bot.on('raw', packet => {
  if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
  
  const channel = bot.channels.get(packet.d.channel_id);
  if (channel.id != '703409465826869349') return; //Guild/channel lock. Roles channel id
  
  if (channel.messages.has(packet.d.message_id)) return;
  
  channel.fetchMessage(packet.d.message_id).then(message => {
      const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
      const reaction = message.reactions.get(emoji);
      if (reaction) reaction.users.set(packet.d.user_id, bot.users.get(packet.d.user_id));
      if (packet.t === 'MESSAGE_REACTION_ADD') {
          bot.emit('messageReactionAdd', reaction, bot.users.get(packet.d.user_id));
      }
      if (packet.t === 'MESSAGE_REACTION_REMOVE') {
          bot.emit('messageReactionRemove', reaction, bot.users.get(packet.d.user_id));
      }
  });
  
});

bot.on('messageReactionAdd', (reaction, user) => {
  if (user.bot) {return}

  if (reaction.message.channel.id != '703409465826869349') return; //Roles channel lock id

  if (reaction.emoji.name == '🔔') {
      reaction.remove(user);
        user = reaction.message.guild.members.get(user.id+'');
    
        if (user.roles.find(role => role.name === "Updates")) {
          //Remove role
          var updatesRole = reaction.message.guild.roles.find(role => role.name === "Updates");
          user.removeRole(updatesRole);
          user.sendMessage(":no_bell: You will no longer receive notifications for important updates in **UltimateBot**.").catch(() => {});
        } else {
          var updatesRole = reaction.message.guild.roles.find(role => role.name === "Updates");
          user.addRole(updatesRole);
          user.sendMessage(":bell: You now receive notifications for important updates in **UltimateBot**.").catch(() => {});
        }
  } else {
      //Remove unwanted reaction 
      reaction.message.reactions.forEach(reaction => {
        if (reaction.emoji != '🔔') {
          reaction.users.forEach(user => {
            reaction.remove(user);
          });
        }
      });
  }
});
  
  
  //Commands
bot.on('message', message => {
  
  if (message.author.bot) {return}
  if (message.channel.type == 'dm') {return}
  if (!message.guild) {return}
  
  if (message.guild.id+'' == '661666239701319701') {
    
    //Mention counters, these are redefined every message and set to 0
    var roleMentions = 0;
    var userMentions = 0;
    var currentStrikes;
    var theirStrikes;
    var fullProfile;
    var profile;
    
    message.mentions.roles.forEach(role => {
      roleMentions++;
    });
    
    message.mentions.users.forEach(role => {
      userMentions++;
    });
    
    //Multiple mentions to the same role or user only count as 1 to discord.
    //Flag their message and after the max strikes mute for each channel if these go off
    if (roleMentions >= maxAllowedRoleMentionsPerMessage) {
      message.delete();
      //Check their current strikes, if not found make 1
      fs.readFile('./muteData.txt', function (err, contents) {
        if (err) {
          return console.log(err); 
        }

        if (contents.toString().includes(message.author.id+'')) {
          //User already has a profile, get current strikes make sure its not above max
          var lines = contents.toString().split(/\n/);
          lines.forEach(line => {
            if (line.toString().includes(message.author.id+'')) {
              //Found the users profile, check strikes
              fullProfile = line.toString();
              profile = line.split(':');
              
              theirStrikes = Number(profile[1].toString());
              
              if (theirStrikes >= maxMentionStrikes) {
                //Past threshold, mute them on each chanel. Then set to muted in profile
                try {
                 message.guild.channels.forEach(channel => {
                   channel.overwritePermissions(message.author, {
                    SEND_MESSAGES: false,
                    ATTACH_FILES: false,
                    ADD_REACTIONS: false
                  });
                 });
                message.channel.send(message.author+' :exclamation: You have been muted for '+muteTimeHours+' hours for exceeding the max strikes ('+maxMentionStrikes+') for message mentions.');
                //Set to muted in profile
                fs.readFile('./muteData.txt', 'utf8', function (err, data) {
                  if (err) {
                    return console.log(err);
                  }                  
                  var oldProfile = new RegExp(fullProfile+"", "g");
                  
                  var oldTime = profile[2];
                  var d = new Date();
                  var now = d.getTime();
                  var newProfile = data.replace(oldProfile, fullProfile+':muted:'+now);

                  fs.writeFile('./muteData.txt', newProfile, 'utf8', function (err) {
                     if (err) return console.log(err);
                  });
                });
                  
               } catch (e) {
                 console.log(e);
               }
              } else {
                //Add strike.
                fs.readFile('./muteData.txt', 'utf8', function (err, data) {
                  if (err) {
                    return console.log(err);
                  }
                  var newStrikes = Number(theirStrikes) + 1; 
                  
                  var oldProfile = new RegExp(fullProfile+"", "g");
                  
                  var oldTime = profile[2];
                  var newProfile = data.replace(oldProfile, message.author.id+':'+newStrikes+':'+oldTime);

                  fs.writeFile('./muteData.txt', newProfile, 'utf8', function (err) {
                     if (err) return console.log(err);
                     message.channel.send(message.author+' You sent too many role mentions in that message. The max allowed is **'+maxAllowedUserMentionsPerMessage+'**! After '+maxMentionStrikes+' strikes you will be muted.\nYou now have **'+newStrikes+'** strikes.');
                  });
                });
              }
            }
          });
        } else {
          //Create their profile add 1 strike
          var d = new Date();
          var now = d.getTime();
          fs.appendFile('./muteData.txt', message.author.id+':1:'+now+'\n', function (err) {
            if (err) {return console.log(err)}
          });

          message.channel.send(message.author+' You sent too many role mentions in that message. The max allowed is **'+maxAllowedUserMentionsPerMessage+'**! After '+maxMentionStrikes+' strikes you will be muted.\nYou now have **1** strike.');
        }
        
      });    
    } else if (userMentions >= maxAllowedUserMentionsPerMessage) {
      message.delete();
      //Check their current strikes, if not found make 1
      fs.readFile('./muteData.txt', function (err, contents) {
        if (err) {
          return console.log(err); 
        }

        if (contents.toString().includes(message.author.id+'')) {
          //User already has a profile, get current strikes make sure its not above max
          var lines = contents.toString().split(/\n/);
          lines.forEach(line => {
            if (line.toString().includes(message.author.id+'')) {
              //Found the users profile, check strikes
              fullProfile = line.toString();
              profile = line.split(':');
              
              theirStrikes = Number(profile[1].toString());
              
              if (theirStrikes >= maxMentionStrikes) {
                //Past threshold, mute them on each chanel. Then set to muted in profile
                try {
                 message.guild.channels.forEach(channel => {
                   channel.overwritePermissions(message.author, {
                    SEND_MESSAGES: false,
                    ATTACH_FILES: false,
                    ADD_REACTIONS: false
                  });
                 });
                message.channel.send(message.author+' :exclamation: You have been muted for '+muteTimeHours+' hours for exceeding the max strikes ('+maxMentionStrikes+') for message mentions.');
                //Set to muted in profile
                fs.readFile('./muteData.txt', 'utf8', function (err, data) {
                  if (err) {
                    return console.log(err);
                  }                  
                  var oldProfile = new RegExp(fullProfile+"", "g");
                  
                  var oldTime = profile[2];
                  var d = new Date();
                  var now = d.getTime();
                  var newProfile = data.replace(oldProfile, fullProfile+':muted:'+now);

                  fs.writeFile('./muteData.txt', newProfile, 'utf8', function (err) {
                     if (err) return console.log(err);
                  });
                });
                  
               } catch (e) {
                 console.log(e);
               }
              } else {
                //Add strike.
                fs.readFile('./muteData.txt', 'utf8', function (err, data) {
                  if (err) {
                    return console.log(err);
                  }
                  var newStrikes = Number(theirStrikes) + 1; 
                  
                  var oldProfile = new RegExp(fullProfile+"", "g");
                  
                  var oldTime = profile[2];
                  var newProfile = data.replace(oldProfile, message.author.id+':'+newStrikes+':'+oldTime);

                  fs.writeFile('./muteData.txt', newProfile, 'utf8', function (err) {
                     if (err) return console.log(err);
                     message.channel.send(message.author+' You sent too many user mentions in that message. The max allowed is **'+maxAllowedUserMentionsPerMessage+'**! After '+maxMentionStrikes+' strikes you will be muted.\nYou now have **'+newStrikes+'** strikes.');
                  });
                });
              }
            }
          });
        } else {
          //Create their profile add 1 strike
          var d = new Date();
          var now = d.getTime();
          fs.appendFile('./muteData.txt', message.author.id+':1:'+now+'\n', function (err) {
            if (err) {return console.log(err)}
          });

          message.channel.send(message.author+' You sent too many user mentions in that message. The max allowed is **'+maxAllowedUserMentionsPerMessage+'**! After '+maxMentionStrikes+' strikes you will be muted.\nYou now have **1** strike.');
        }
        
      });

      }

    //Help mention
    if (message.content.toLowerCase().trim().match(/^<@!?673919210271014941>$/)) {
      message.channel.send('Hello '+message.author+' Use '+prefix+'help for a list of commands.');
    }
    
    
    if (message.content.toLowerCase().split(' ')[0] == prefix+'help') {
      message.delete();
      const help = new Discord.RichEmbed() 
        .setColor('#039BE5')
        .setTitle('UltimateBot Support')
        .setDescription('Open a support ticket for help.')

        .addField(prefix+'help', 'Shows this page.')

        .addBlankField()
        .addField(prefix+'new', 'Create a new support ticket channel where you can get help.')

        .addBlankField()
        .addField(prefix+'close [reason]', 'Run in the ticket channel you want to close. Closes the ticket for a optional reason.')
      
        .addBlankField()
        .addField(prefix+'find <id>', 'Finds the discord user tag associated with the id. **Support** role only.')
      
        .addBlankField()
        .addField(prefix+'(un)mute @user', 'Mutes or unmutes the set user. **Support** role only.')

        .addBlankField()
        .addField(prefix+'id', 'Gives you your discord id for linking on the website.')
		
		.addBlankField()
        .addField(prefix+'suggest <message>', 'Posts a suggestion to add to the bot up for vote.')


        .setFooter('https://ultimatebot.pw/', 'https://ultimatebot.pw/img/favicon.png');

      bot.channels.get(botcommands).send(help);
    }
	
	//Suggest command 
	if (message.content.toLowerCase().split(' ')[0] == prefix+'suggest' || message.content.toLowerCase().split(' ')[0] == prefix+'suggestion') {
		message.delete();
		let suggestion = message.content.replace(message.content.split(' ')[0], '');
		
		if (!suggestion) {
			return message.reply(':x: Please specify something to suggest. `'+prefix+'suggest <message>`');
		}
		
		const suggest = new Discord.RichEmbed()
			.setTitle('Suggestion')
			.setColor('#0388fc')
			.setDescription(suggestion)
			.setFooter('Suggested by: '+message.author.tag+' ('+message.author.id+')', 'https://ultimatebot.pw/img/favicon.png')
			.setTimestamp();
		
		const suggestionChannel = bot.channels.get('720016090154926191');
		if (!suggestionChannel) {
			return message.reply(':x: Something went wrong, suggestion channel was not found please contact support.');
		}
		
		suggestionChannel.send(suggest).then(msg => {
			msg.react('✅').then(r => {
				msg.react('❌');
			});
		});
	}

    if (message.content.toLowerCase().trim() == prefix+'id') {
      message.reply('Your id is: \n```'+message.author.id+'```');
    }
    
    if (message.content.toLowerCase().split(' ')[0] == prefix+'new') {
      message.delete();
      var server = message.guild;
      
      message.reply('Attempting to create a new support ticket...');
      
      //Check and make sure theres no existing ticket with that user name. This limits users to 1 ticket per account big brain
      var category = server.channels.find(c => c.name == "Tickets" && c.type == "category");
      if (!category) {return message.reply(':x: The tickets category was not found. Please contact an admin.')}
      
      function checkChannels(callback) {
        var done = false;
        
        setTimeout(function() {
          if (done) {
            return;
          } else {
            done = true;
            return callback(false);
          }
        }, 1000);
        
        server.channels.forEach(channel => {
          if (channel.name.trim()+'' == message.author.id.trim()+'') {
            done = true;
            return callback(true);
          }
        });
        
      }
      
      checkChannels(function(existing) {
        if (existing == true) {
          return message.reply(':x: You seem to already have a support ticket open. Please use ``'+prefix+'close [reason]`` in this channel to close the ticket.');
        } else {
          server.createChannel(message.author.id+'', "text")
      .then(channel => {
        var category = server.channels.find(c => c.name == "Tickets" && c.type == "category");

        if (!category) {return message.reply(':x: The tickets category was not found. Please contact an admin.')};
        
        async function setChannel() {
          await channel.setParent(category.id);
          await channel.lockPermissions();
          await channel.overwritePermissions(message.author.id,{'READ_MESSAGES': true, 'SEND_MESSAGES': true});
        }
        setChannel();
        
        const ticket = new Discord.RichEmbed()
        .setColor('#039BE5') //#039BE5
        .setTitle('UltimateBot Support Ticket')
        .setDescription('Thank you for contacting support, please leave a message in one of the formats below. Use **'+prefix+'close [reason]** to close this ticket at any time.')
        .addField('Bot restarting or crashing?', 'Crashing could have many causes, and following this format will help resolve it faster. Leave a message including __**all**__ of the following:\n`Node Version:`\n`PM2 Version:`\n`Computer OS & Bit:`\n`Bot Type:`\nTo get your node and pm2 version, open a command prompt as administrator, and type "node -v" and "pm2 -v" If you have a failure on the pm2 version, do "npm i pm2 -g" And then try again. Your computer operating system is self-explanitory, please leave the version of your system aswell. On windows, to get your PC\'s bit:\nHit windows key, type "view ram info" and open that page, find the "System Type" line. Bot type is if you are using the windows version, or linux/mac command line version.')
        .addField('Have a Question?', 'Please type a detailed question in this channel, and refrain from talking in public channels about ongoing conversations in tickets.')
        .addField('Found a bug or server config issue?', 'If you found something that you believe to be unintentional behaviour please leave a message including __**all**__ of the following:\n`Server IP:`\n`Issue:`\n`Priority:`')
        .setFooter('https://ultimatebot.pw/', 'https://ultimatebot.pw/img/favicon.png');
        
        var hello = 'Hello, '+message.author+'.';
        channel.send(hello, ticket);
        
        message.reply(':white_check_mark: A new ticket has been opened in <#'+channel.id+'>.');
        
        const ticketLog = new Discord.RichEmbed()
        .setColor('#5de84a')
        .setTitle('New Ticket')
        .setDescription(message.author+' has opened a new ticket - <#'+channel.id+'> ('+getTime()+')');
        
        const ticketLogMe = new Discord.RichEmbed()
        .setColor('#5de84a')
        .setTitle('New Ticket In UltimateBot')
        .setDescription(message.author+' has opened a new ticket - ('+getTime()+')');
        
        
        bot.channels.get(ticketlogs).send(ticketLog);
        //bot.users.get('239081547477549057').send(ticketLogMe);
      }).catch(console.error);
        }
      });
      
    }
    
    if (message.content.toLowerCase().split(' ')[0] == prefix+'close') {
        message.delete();
        var server = message.guild;
        
        //reason 
        var reason = 'No reason specified.';
        if (message.content.replace(prefix+'close ', '') == undefined) {} else {
          reason = message.content.replace(prefix+'close ', '');
        }
      
        //delete that channel if its in tickets category and NOT ticket-log
      
        if (message.channel.name+'' == 'ticket-log') {return message.reply(':x: That action cannot be used in this channel!')}
        if (message.channel.parentID+'' == ticketcategory) {
          //Its in ticket category and not ticket logs channel 
          message.channel.send(':red_square: Closing this ticket please wait...');
          
          function getOwner(callback) {
            var done = false;
            setTimeout(function() {
              if (done) {return}
              done = true;
              //If it cant find the user this hits 0 and activates
              return callback('Unknown User');
            }, 3000);
            server.members.forEach(member => {
              if (member.id+'' == message.channel.name+'') {
                done = true;
                return callback(member.user.tag.replace(/`/g, ''));
              }
            });
          }

          function getTranscript(cb) {
            let transcript = '';
            message.channel.fetchMessages({limit: 100}).then(messages => {
              messages = messages.array();
              messages.reverse();

              messages.forEach((msg, mindex) => {
                try {
                  transcript += msg.author.tag+' ('+msg.author.id+')\n'+msg.content+'\n\n';
                  msg.attachments.forEach((att) => {
                    transcript += msg.author.tag+' ('+msg.author.id+')\n'+'[Attachment]: '+att.url+'\n\n';
                  });
                } catch (e) {
                  console.log(e);
                }
                if (mindex == messages.length - 1) {
                  //Done gathering make file 
                  let fileName = message.channel.name+' at '+Date.now()+'.txt';
                  fs.writeFile('./transcripts/'+fileName, transcript, err => {
                    if (err) return console.log(err);

                    cb(fileName);
                  });
                }
              });
            })
          }
          
          getOwner(function(owner) {  
            getTranscript(fileName => {
              message.channel.delete();
            
              if (reason+''.trim() == prefix+'close') {reason = 'No reason specified.'}
              
                const ticketCloseLog = new Discord.RichEmbed()
                .setColor('#e03434')
                .setTitle('Ticket Closed')
                .setDescription(message.author+' has closed ticket ``'+message.channel.name.trim()+'`` (``'+owner+'``) ('+getTime()+')\n**Reason:** '+reason);

                bot.channels.get(ticketlogs).send(ticketCloseLog).then((tlog) => {
                  bot.channels.get(ticketlogs).send('Transcript: ', {files: ['./transcripts/'+fileName]});
                });
              try {
                  if (reason.toLowerCase().includes('-nts')) {
                    bot.users.get(message.channel.name.trim()+'').send(message.author+' has closed your UltimateBot support ticket ``'+message.channel.name.trim()+'`` ('+getTime()+')\n**Reason:** '+reason.replace('-nts', ''));
                  } else {
                    bot.users.get(message.channel.name.trim()+'').send(message.author+' has closed your UltimateBot support ticket ``'+message.channel.name.trim()+'`` ('+getTime()+')\n**Reason:** '+reason+'\nTranscript:', {files: ['./transcripts/'+fileName]});
                  }
              } catch (e) {}
            });
          });
          
        } else {
          return message.reply(':x: That action cannot be used in this channel!');
        }
      }
    
      if (message.content.toLowerCase().split(' ')[0] == prefix+'find') {
         if (message.member.roles.find('id', '661676696482611200')) {
          message.delete();
          //find command
          var findid = message.content.split(' ')[1];
          var founduser;
          if (findid != undefined && isNaN(findid) === false && findid.length == 18) {
          let member = message.mentions.members.first();  
          message.reply('Finding user from id `'+findid+'`...');

          message.guild.members.forEach(member => {
            if (member.id == findid) {
              founduser = member.user.tag;
            }
          });
          if (founduser == undefined) {
            founduser = false;
          }  
          var color;
          if (founduser == false) {
            color = '#d14338';
            founduser = 'not a valid id, or is not in this server!';
          } else {
            color = '#039BE5';
            founduser = '``'+founduser+'``';
          }
          const findembed = new Discord.RichEmbed() //find embed
          .setColor(color)
          .setDescription('ID ``'+findid+'`` is '+founduser)
          message.channel.send(findembed);
          } else {
            message.reply('Incorrect use, '+prefix+'find **ID**');
          }
        } else {
          message.channel.send('Sorry, this command can only be used by the **Support** role.');
        }
      }
    
    if (message.content.toLowerCase().split(' ')[0] == prefix+'mute') {
     if (message.member.roles.find('id', '661676696482611200')) {
       var user = message.mentions.members.first();
       
       if (user) {
         try {
           message.guild.channels.forEach(channel => {
             channel.overwritePermissions(user, {
              SEND_MESSAGES: false,
              ATTACH_FILES: false
            });
           });
           message.reply(':white_check_mark: Muted '+user+'. Use ``'+prefix+'unmute @user`` to unmute them.');
         } catch (e) {
           console.log(e);
         }
       } else {
         message.channel.send('Please specify a valid user to mute!');
       }
     } else {
          message.channel.send('Sorry, this command can only be used by the **Support** role.');
     } 
    }
    
    if (message.content.toLowerCase().split(' ')[0] == prefix+'unmute') {
     if (message.member.roles.find('id', '661676696482611200')) {
       var user = message.mentions.members.first();
       
       if (user) {
         try {
           message.guild.channels.forEach(channel => {
             channel.overwritePermissions(user, {
              SEND_MESSAGES: null,
              ATTACH_FILES: null
            });
           });
           message.reply(':white_check_mark: Unmuted '+user+'. Use ``'+prefix+'mute @user`` to mute them.');
         } catch (e) {
           console.log(e);
         }
       } else {
         message.channel.send('Please specify a valid user to unmute!');
       }
     } else {
          message.channel.send('Sorry, this command can only be used by the **Support** role.');
     } 
    }
    
  }
});
  
});


//Web app link 

const isValidId = (inputId) => {
  let ubdc = bot.guilds.get('661666239701319701');

  let returning = false;
  ubdc.members.forEach(member => {
    if (member.id == inputId) {
      returning = true;
    }
  });

  return returning;
};

exports.isValidId = isValidId;

const addRoles = (inputId) => {
  try {
    let ubdc = bot.guilds.get('661666239701319701');

    ubdc.members.forEach(member => {
      if (member.id == inputId) {
        //Add role 
        var clientRole = ubdc.roles.find(r => r.name === 'Client');

        member.addRole(clientRole).then(member => {
          const thankYou = new Discord.RichEmbed()
            .setTitle('Thank You')
            .setColor('#36c922')
            .setDescription('Thank you for purchasing UltimateBot. You now have the client role and have access to client channels.')
          
            member.sendMessage(thankYou).catch(e => {});
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

exports.addRoles = addRoles;


bot.login(token);
