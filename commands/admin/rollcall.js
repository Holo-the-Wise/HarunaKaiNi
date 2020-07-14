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
        let fishrole = message.guild.roles.find(u => u.name == "FISH");

        if (!cwconfirmed && !cwmaybe) {
            return message.channel.send("Error no CB roles found");
        };
    
        if (message.client.rollcallActive) {
            return message.channel.send("A CW rolecall is already active for tonight.");
        }
        const hawoo = message.guild.emojis.find(emoji => emoji.name === "hawoo");
        const cheer = message.guild.emojis.find(emoji => emoji.name === "a_nekocheer");

        message.channel.send(`Ahoy ${fishrole}, Haruna desu!  Please react ${hawoo} if you are available for clan wars tonight! Good luck and have fun! ${cheer}`).then(msg => {
            message.delete();
            msg.react(hawoo.id);
            message.client.rollcallMsgId = msg.id;
            message.client.rollcallActive = true;
            owner.send(`Rollcall started by ${message.author}`);
        
    
            setTimeout(function () {
                let membersArray = cwconfirmed.members.array();
                for (var i = 0; i < membersArray.length; i++) {
                    membersArray[i].removeRole(cwconfirmed);
                }
                
                message.client.rollcallMsgId  = 0;
                message.client.rollcallActive = false;
                msg.delete();
                owner.send(`Rollcall roles cleared normally`);
            }, rolecooldown);

        }).catch(console.error);
    }
};