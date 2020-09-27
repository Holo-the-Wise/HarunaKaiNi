const { Command } = require('discord.js-commando')
const ms = require('ms');
const Discord = require("discord.js");
const silencedRole = require('../../config.json').silencedrole;
const assets = require('../../assets/imageassets.json');
const owners = require('../../config.json').OwnerId;

module.exports = class MuteCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'mute',
            memberName: 'mute',
            group: 'admin',
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
        
        if(member.roles.find(x => x.name === silencedRole)){
            return message.say(`${member} is already muted.`);
        }
        
        let silenced = message.guild.roles.find(u => u.name == silencedRole);
        if (!silenced) {
            return message.say(`Error: I cannot find the muted role`);
        };

        let time = duration;
        
        member.roles.array().forEach(function(r) {
            member.removeRole(r)
        })
        member.addRole(silenced).catch(console.error);

        const embed = new Discord.RichEmbed()
            .setAuthor(`${member.displayName} has been muted for ${ms(ms(time), { long: true })}`, `${message.client.user.displayAvatarURL}`)
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
            .setTimestamp(new Date())
            .setThumbnail(`${member.user.displayAvatarURL}`)
            .setColor('#ff0000')
            .setImage(assets["muted"])
        message.embed(embed);
        
        message.client.owners.forEach(owner => {
            owner.send(`=======================================================\n` + 
            `Guild Command Mute activated by ${message.author} (ID: ${message.author.id})\n` +
            `Muted: ${member} for duration: ${ms(ms(time))}`);
        });
       
        console.log(`=======================================================\n` + 
        `Guild Command Mute activated by ${message.author} (ID: ${message.author.id})\n` +
        `Muted: ${member} for duration: ${ms(ms(time))}`);
        
        // when mute duration is over
        message.client.muted[member.id] = setTimeout(() => {
            member.removeRole(silenced).then(message.say(`Lockdown lifted. ${member} has been unmuted.`)).catch(console.error);
            
            message.client.owners.forEach(owner => {
                owner.send(`=======================================================\n` + 
                `${member} has been unmuted`);
            });

            console.log(`=======================================================\n` + 
            `${member} has been unmuted`);

            delete message.client.muted[member.id];
        }, ms(time));

        message.delete();
    }
};