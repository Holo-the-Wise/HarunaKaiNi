const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const logger = require('../../util/logging');

module.exports = class AvatarCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'avatar',
            memberName: 'avatar',
            group: 'misc',
            description: 'Shows the avatar of the specified user or yourself!',
            aliases: ['profilepic','dp', 'pfp'],
            examples: ['avatar', 'avatar holothewise', 'avatar @holothewise'],
            format: 'avatar [user] (mention or plaintext)',
            args: [
                {
                    key: 'member',
                    prompt: 'Which user would you like to get the avatar of?',
                    type: 'member',
                    default: ''
                }
            ],
            guildOnly: true,
        })
    }

    async run (message, args) {

        const member = args.member.user || message.author;
        if (!member.avatar) return message.channel.send('This user does not have an avatar!');
        
        const avatar = member.displayAvatarURL({dynamic: true});
        let color = Math.floor(Math.random() * 16777214) + 1;

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${member.tag}`, avatar)
            .setColor(color)
            .setDescription(`[Avatar URL](${avatar})`)
            .setImage(avatar)

        logger(message.client, `Avatar activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})\n` +
        `Avatar requested: ${member} (${member.tag} - ID: ${member.id})`);

        return message.channel.send(embed);
    }
};