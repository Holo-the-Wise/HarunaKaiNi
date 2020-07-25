const { Command } = require('discord.js-commando');
const ownerid = require('../../config.json').OwnerId;

module.exports = class CBListCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'cblist', // Name of this command.
            memberName: 'cblist', // Name of this command.
            group: 'admin', // The group the command belongs to, assigned upon registration.
            description: 'Shows list of all CB role players', // Short description of the command.
            aliases: ['cbwho'],
            format: '[cblist]', // Usage format string of the command.
            guarded: false, // Whether the command is protected from being disabled.
            guildOnly: true, // Whether the command can only be run in a guild channel.
            ownerOnly: false // Whether the command can only be used by an owner.
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

            // msg = msg.concat("\n","**CB Maybe**\n");

            // cwmaybe.members.forEach(member => {
            //     msg = msg.concat(member.user.username,`\n`);
            // });

            owner.send(`CBlist requested by ${message.author.tag} (${message.author.id})`);
        
            return message.channel.send(msg);
        }
    }
};