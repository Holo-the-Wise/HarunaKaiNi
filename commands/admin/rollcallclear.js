const { Command } = require('discord.js-commando');
const rolecooldown = 1000 * 60 * 60 * 12;
const ownerid = require('../../config.json').OwnerId;

module.exports = class RollcallCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'rollcallclear', // Name of this command.
            memberName: 'rollcallclear', // Name of this command.
            group: 'admin', // The group the command belongs to, assigned upon registration.
            description: 'Starts a rollcall for CB', // Short description of the command.
            aliases: [ // Aliases for this command.
                'cwclear',
                'cwsclear'
            ],
            format: 'cwclear', // Usage format string of the command.
            guarded: false, // Whether the command is protected from being disabled.
            guildOnly: true, // Whether the command can only be run in a guild channel.
            ownerOnly: false // Whether the command can only be used by an owner.
        })
    }


    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message, args) {

        let owner = message.guild.members.get(ownerid);

        let cwconfirmed = message.guild.roles.find(u => u.name == "CB Confirmed");
        let cwmemes = message.guild.roles.find(u => u.name == "Supreme Meme Stream Dream Team");
    
        if (!cwconfirmed) {
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
        
        message.channel.send(`Rollcall cleared`);
        // owner.send(`Rollcall clear used by ${message.author}`);
    }
};