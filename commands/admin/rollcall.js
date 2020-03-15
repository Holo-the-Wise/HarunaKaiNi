const { Command } = require('discord.js-commando');
const rolecooldown = 1000 * 60 * 60 * 12;//cooldown, after this time the roles are reset 1000 * secs * mins* hours
const ownerid = require('../../config.json').OwnerId;

module.exports = class RollcallCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'rollcall', // Name of this command.
            memberName: 'rollcall', // Name of this command.
            group: 'admin', // The group the command belongs to, assigned upon registration.
            description: 'Starts a rollcall for CB', // Short description of the command.
            aliases: [ // Aliases for this command.
                'cw',
                'cws'
            ],
            format: '[cw]', // Usage format string of the command.
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
        let cwmaybe = message.guild.roles.find(u => u.name == "CB Maybe");
        let fishrole = message.guild.roles.find(u => u.name == "FISH");

        if (!cwconfirmed && !cwmaybe) {
            return message.channel.send("Error no CB roles found");
        };
    
        if (message.client.rollcallActive) {
            return message.channel.send("A CW rolecall is already active for tonight.");
        }
        const gao = message.guild.emojis.find(emoji => emoji.name === "gao");
        const love = message.guild.emojis.find(emoji => emoji.name === "Love");

        message.channel.send(`Ahoy ${fishrole}, Haruna desu! ${gao} Please react Y or M on your availability for clan wars tonight! ${love}`).then(msg => {
            message.delete();
            msg.react("🇾");
            msg.react("🇲")
            message.client.rollcallMsgId = msg.id;
            message.client.rollcallActive = true;
            owner.send(`Rollcall started by ${message.author}`);
        
    
            setTimeout(function () {
                let membersArray = cwconfirmed.members.array();
                for (var i = 0; i < membersArray.length; i++) {
                    membersArray[i].removeRole(cwconfirmed);
                }
                let membersArray2 = cwmaybe.members.array();
                for (var i = 0; i < membersArray2.length; i++) {
                    membersArray2[i].removeRole(cwmaybe);
                }
                message.client.rollcallMsgId  = 0;
                message.client.rollcallActive = false;
                msg.delete();
                owner.send(`Rollcall roles cleared normally`);
            }, rolecooldown);

        }).catch(console.error);
    }
};