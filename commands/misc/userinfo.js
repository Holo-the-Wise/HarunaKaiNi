const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment-timezone');
require('moment-duration-format');
const ownerid = require('../../config.json').OwnerId;

module.exports = class UserInfoCommand extends Command {
    constructor(client){
        super(client, {
            name: 'userinfo',
            memberName: 'userinfo',
            group: 'misc',
            description: 'Display info about user',
            aliases: ['memberinfo'],
            examples: ['userinfo'],
            args: [
                {
                    key: 'user',
                    prompt: 'What user would you like to lookup?',
                    type: 'member',
                    default: ''
                }
            ],
            guildOnly: true,
        });
    }

    hasPermission(message) {
        if(message.channel.type == "text"){
        let PermissionLevel = 0;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
        }
        else {return true;}
    }

    async run (message, args){

        let owner = message.guild.members.get(ownerid);

        let user;
        if (args.user === '') {
            args.user = message.guild.members.get(message.author.id)
            user = args.user.user
        } else {
            user = args.user.user
        }
        

        let userColor = (args.user).displayHexColor;
        if (userColor === '#000000') {
            userColor = 0x7289DA
        } else {
            userColor = Number(userColor.replace('#', '0x'))
        }

        let userStatus = '';
        if (user.presence.game !== null) {
            if (user.presence.game.type === 0) {
                userStatus = `Playing **${(user.presence.game.name)}**`
            } else if (user.presence.game.type === 1) {
                userStatus = `Streaming **${(user.presence.game.name)}**`
            } else if (user.presence.game.type === 2) {
                userStatus = `Listening to **${(user.presence.game.name)}**`
            } else if (user.presence.game.type === 3) {
                userStatus = `Watching **${(user.presence.game.name)}**`
            }
            if (user.presence.game.url !== null) { userStatus = `[${userStatus}](${user.presence.game.url})` }
        }
        
        
        let userRoles;
        if (args.user.roles.size > 1) {
            let rolesArray = args.user.roles.array();
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
        
    

        const embed = new Discord.RichEmbed()
            .setAuthor(`${message.client.user.tag}`, `${message.client.user.displayAvatarURL}`)
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
            .setTimestamp(new Date())
            .setTitle(`Information for ${(user.tag)}${user.bot === true ? ' **[BOT]**' : ''}`)
            .setThumbnail(`${user.displayAvatarURL}`)
            .setDescription(userStatus)
            .addField('Identity', `
                **Tag:** ${(user.tag)}
                **ID:** ${user.id}
                **Status:** ${user.presence.status}`,
                true)
            .addField(`Account Created - (${moment(user.createdAt).fromNow()})`,`
                **Date:** ${moment(user.createdAt).format('L')}
                **Time:** ${moment(user.createdAt).format('LTS')} ${moment.tz(moment.tz.guess()).format('z')}`,
                true)
            .addField(`Joined Guild - (${moment(args.user.joinedAt).fromNow()})`,`
                **Date:** ${moment(args.user.joinedAt).format('L')}
                **Time:** ${moment(args.user.joinedAt).format('LTS')} ${moment.tz(moment.tz.guess()).format('z')}`,
                true)
            .addField(`Roles - (${args.user.roles.size > 0 ? args.user.roles.size.toLocaleString() - 1 : 0})`,`
                ${userRoles}`,
                false)
            .setColor(userColor)

        owner.send(`Userinfo for ${user.tag} (${user.id}) requested by ${message.author.tag} (${message.author.id})`);
        return message.embed(embed);
    }
};