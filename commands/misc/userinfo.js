const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment-timezone');
const logger = require('../../util/logging');

module.exports = class UserInfoCommand extends Command {
    constructor(client){
        super(client, {
            name: 'userinfo',
            memberName: 'userinfo',
            group: 'misc',
            description: 'Display info about user',
            aliases: ['memberinfo', 'user', 'member'],
            examples: ['userinfo'],
            args: [
                {
                    key: 'member',
                    prompt: 'What member would you like to lookup?',
                    type: 'member',
                    default: ''
                }
            ],
            guildOnly: true,
        });
    }

    async run (message, {member} ){

        if (member === '') {
            member = message.member;
        }        

        let memberStatus = '';
        if (member.presence.activities[0] != null) {
            memberStatus = `${member.presence.activities[0].type}: ${member.presence.activities[0].name}${member.presence.activities[0].details ? ` - **${member.presence.activities[0].details}**` : ""}`;
        } 

        let userRoles = '';
        if (member.roles.cache.size > 1) {
            let rolesArray = member.roles.cache.array();
            let rolesString = '';
            for (let i = 0; i < rolesArray.length; i++){
                if(rolesArray[i].name != '@everyone'){
                    rolesString += `${rolesArray[i].name}, `;
                }
            }
            rolesString = rolesString.slice(0,-2);
            userRoles = rolesString;
        } else {
            userRoles = 'N/A';
        }
        console.log(`roles: ${userRoles}`);
        
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.client.user.tag}`, `${message.client.user.displayAvatarURL({dynamic: true})}`)
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL({dynamic: true})}`)
            .setTimestamp(new Date())
            .setTitle(`Information for ${(member.user.tag)}${member.user.bot === true ? ' **[BOT]**' : ''}`)
            .setThumbnail(`${member.user.displayAvatarURL({dynamic: true})}`)
            .setDescription(member.roles.cache.hoist || 'Online')
            .setColor(member.displayHexColor)
            .addField(
                `__**Identity**__`,
                `**Tag**: ${member.user.tag}\nID: ${member.user.id}\n`,
                true
            )
            if (memberStatus != ''){
                embed.addField(
                    `__**Status**__`,
                    `${memberStatus} \n`,
                    true
                )
            }
            embed.addField(
                `__**Account Created - (${moment(member.user.createdAt).fromNow()})**__`,
                `**Date:** ${moment(member.user.createdAt).format('L')}\n` +
                `**Time:** ${moment(member.user.createdAt).format('LTS')}\n`,
            )
            .addField(
                `__**Joined Guild - (${moment(member.joinedAt).fromNow()})**__`,
                `**Date:** ${moment(member.joinedAt).format('L')}\n` +
                `**Time:** ${moment(member.joinedAt).format('LTS')}\n`,
            )
            .addField(
                `Roles - (${member.roles.cache.size > 0 ? member.roles.cache.size.toLocaleString() - 1 : 0})`,`
                ${userRoles}`,
                false
            )
            
        logger(message.client, `Userinfo activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})\n` +
        `Requested info for: ${member} (${member.user.tag} - ID: ${member.user.id})`);
        
        return message.channel.send(embed);
    }
};