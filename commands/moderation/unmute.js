const { Command } = require('discord.js-commando')
const silencedRole = require('../../config.json').silencedrole;
const logger = require('../../util/logging');

module.exports = class UnmuteCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'unmute',
            memberName: 'unmute',
            group: 'moderation',
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

        logger(message.client, `Unmute activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})` +
        `${member} (${member.displayName} - ID: ${member.id}) has been unmuted.`);
    }
};