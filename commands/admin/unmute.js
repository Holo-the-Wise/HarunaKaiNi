const { Command } = require('discord.js-commando')
const silencedRole = require('../../config.json').silencedrole;

module.exports = class UnmuteCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'unmute',
            memberName: 'unmute',
            group: 'admin',
            description: 'Unmutes the mentionned user for a given length of time',
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
    }
};