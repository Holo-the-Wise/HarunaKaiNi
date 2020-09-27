const { Command } = require('discord.js-commando')
const silencedRole = require('../../config.json').silencedrole;
const owners = require('../../config.json').OwnerId;

module.exports = class UnmuteCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'unmute',
            memberName: 'unmute',
            group: 'admin',
            description: 'Unmutes the mentionned user',
            aliases: ['release'],
            examples: ['unmute @holo'],
            format: 'unmute [user]',
            args: [
                {
                    key: 'member',
                    prompt: 'Which user would you like to unmute?',
                    type: 'member',
                }
            ],
            guildOnly: true,
            ownerOnly: false
        })
    }

    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message, {member}) {

        let owner = message.guild.members.get(ownerid);
        
        if(!member.roles.find(x => x.name === silencedRole)){
            return message.say(`${member} isn't muted.`);
        }
        let silenced = message.guild.roles.find(u => u.name == silencedRole);

        member.removeRole(silenced).then(() => {
            message.channel.send(`${member} has been unmuted`);
            clearTimeout(message.client.muted[member.id]);
            delete message.client.muted[member.id];
          }).catch(error => {
            console.log(error);
          });

        // owner.send(`${member.displayName} unmuted by ${message.author.username}`);
    }
};