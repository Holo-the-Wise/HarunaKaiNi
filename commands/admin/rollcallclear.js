const { Command } = require('discord.js-commando');
const rolecooldown = 1000 * 60 * 60 * 12;
const owners = require('../../config.json').OwnerId;

module.exports = class RollcallCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'rollcallclear',
            memberName: 'rollcallclear',
            group: 'admin',
            description: 'Clears a current rollcall',
            aliases: [ 'cwclear','cwsclear','cbclear','cbsclear'] ,
            guildOnly: true, // Whether the command can only be run in a guild channel.
        })
    }


    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message, args) {

        let cwconfirmed = message.guild.roles.find(u => u.name == "CB Confirmed");
        let cwmemes = message.guild.roles.find(u => u.name == "Supreme Meme Stream Dream Team");
    
        if (!cwconfirmed) {
            owners.forEach(owner => {
                owneruser = message.client.users.cache.get(owner);
                owneruser.send(`RollcallClear Command activated by ${message.author} (ID: ${message.author.id})\n
                Error: no CB roles found`);
            });
            return message.channel.send("Error no CB roles found");
        };

        message.delete();
        message.client.rollcallMsgId = 0;
        message.client.rollcallActive = false;

        let membersArray = cwconfirmed.members.array();
        for(var i = 0; i < membersArray.length; i++){
            membersArray[i].removeRole(cwconfirmed);
        }
        
        let membersArray2 = cwmemes.members.array();
        for (var i = 0; i < membersArray2.length; i++) {
            membersArray2[i].removeRole(cwmemes);
        }
        
        owners.forEach(owner => {
            owneruser = message.client.users.cache.get(owner);
            owneruser.send(`RollcallClear Command activated by ${message.author} (ID: ${message.author.id})`);
        });

        return message.channel.send(`Rollcall cleared`);
    }
};