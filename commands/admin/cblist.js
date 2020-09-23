const { Command } = require('discord.js-commando');
const ownerid = require('../../config.json').OwnerId;

module.exports = class CBListCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'cblist', 
            memberName: 'cblist', 
            group: 'admin', 
            description: 'Shows list of all CB role players',
            aliases: ['cbwho', 'cwlist'],
            format: '[cblist]', 
            guarded: false, 
            guildOnly: true,
            ownerOnly: false 
        })
    }
    
    hasPermission(message) {
        let PermissionLevel = 1;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message, args) {

        let owner = message.guild.members.get(ownerid);

        let cwconfirmed = message.guild.roles.find(u => u.name == "CB Confirmed");
        // let cwmaybe = message.guild.roles.find(u => u.name == "CB Maybe");
        
        let msg = "";

        if (cwconfirmed.members.array().length == 0 && cwmaybe.members.array().length == 0){
            return message.channel.send("CBList is currently empty");
        } else {
            msg = msg.concat("**CB Confirmed**\n");
            cwconfirmed.members.forEach(member => {
                msg = msg.concat(member.user.username,`\n`);
            });

            
            return message.channel.send(msg);
        }
    }
};