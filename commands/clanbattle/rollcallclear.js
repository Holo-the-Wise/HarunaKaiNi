const { Command } = require('discord.js-commando');
const logger = require('../../util/logging');

module.exports = class RollcallClearCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'rollcallclear',
            memberName: 'rollcallclear',
            group: 'clanbattle',
            description: 'Clears a current rollcall',
            aliases: [ 'cwclear','cwsclear','cbclear','cbsclear'] ,
            guarded: true,
            guildOnly: true
        })
    }

    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message) {

        let cwconfirmed = message.guild.roles.cache.find(u => u.name == "CB Confirmed");
    
        if (!cwconfirmed) {
            return message.channel.send("Error no CB roles found");
        };

        message.delete();
        message.client.rollcallMsgId = 0;
        message.client.rollcallActive = false;

        let membersArray = cwconfirmed.members.array();
        for(var i = 0; i < membersArray.length; i++){
            membersArray[i].roles.remove(cwconfirmed);
        }

        clearTimeout(message.client.cbtimer);
        
        logger(message.client, `Command RollcallClear activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`)

        return message.channel.send(`Rollcall cleared`);
    }
};