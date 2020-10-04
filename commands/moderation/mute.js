const { Command } = require('discord.js-commando')
const ms = require('ms');
const Discord = require("discord.js");
const silencedRole = require('../../config.json').silencedrole;
const assets = require('../../assets/imageassets.json');
const logger = require('../../util/logging');

module.exports = class MuteCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'mute',
            memberName: 'mute',
            group: 'moderation',
            description: 'Mutes the mentionned user for a given length of time (1 hour by default)',
            aliases: ['silence', 'stfu', 'shutup'],
            examples: ['mute @holo 60m'],
            format: 'mute [user] [time]',
            args: [
                {
                    key: 'member',
                    prompt: 'Which user would you like to mute?',
                    type: 'member',
                },
                {
                    key: 'duration',
                    prompt: 'How long do you want to mute for?',
                    type: 'string',
                    default: '60m'
                }
            ],
            guildOnly: true,
        })
    }

    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message, {member, duration}) {
        
        if(member.roles.cache.find(x => x.name === silencedRole)){
            return message.say(`${member} is already muted.`);
        }
        
        let silenced = message.guild.roles.cache.find(u => u.name == silencedRole);
        if (!silenced) {
            return message.say(`Error: I cannot find the muted role`);
        };
        
        let time = duration;
        
        member.roles.remove(member.roles.cache).then(member.roles.add(silenced));

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${member.displayName} has been muted for ${ms(ms(time), { long: true })}`, `${message.client.user.displayAvatarURL({dynamic: true})}`)
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
            .setTimestamp(new Date())
            .setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
            .setColor('#ff0000')
            .setImage(assets["muted"])
        message.channel.send(embed);
        
        logger(message.client, `Mute activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})\n` +
        `Muted: ${member} (${member.displayName} - ID: ${member.id}) for duration: ${ms(ms(time))}`);
        
        // when mute duration is over
        message.client.muted[member.id] = setTimeout(() => {
            member.roles.remove(silenced).then(message.say(`Lockdown lifted. ${member} has been unmuted.`)).catch(console.error);
            
            logger(message.client, `${member} (${member.displayName} - ID: ${member.id}) has been unmuted`);

            delete message.client.muted[member.id];
        }, ms(time));

        message.delete();
    }
};