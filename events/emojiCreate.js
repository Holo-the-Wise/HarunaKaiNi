const clanChannelID = require("../config.json").clanChannel;
const capChannelID = require("../config.json").capChannel;
const Discord = require("discord.js");
const logger = require('../util/logging');
const Canvas = require('canvas');

module.exports = async (client, emoji) => {

    let clanChannel = emoji.guild.channels.cache.find(u => u.id == clanChannelID);
    let capChannel = emoji.guild.channels.cache.find(u => u.id == capChannelID);

    emoji.fetchAuthor().then((User) => {
        let creator = User;

        const embed = new Discord.MessageEmbed()
            .setTimestamp(new Date())
            .setTitle(`${emoji.name}`)
            .setDescription(emoji.animated ? `Animated` : "")
            .setColor(creator.displayHexColor)
            .setThumbnail(`${emoji.url}`)
            .setAuthor(`New Emoji Added`, `${client.user.displayAvatarURL({dynamic: true})}`)
            .setFooter(`Added by: ${creator.tag}`, `${creator.displayAvatarURL({ dynamic: true})}`)

        if(client.emojiNotifsGeneral){
            clanChannel.send(embed);
        }
        if(client.emojiNotifsCaptains){
            capChannel.send(embed);
        }
        
        logger(client, `New emoji added by ${creator} (${creator.tag} - ID: ${creator.id})\n` +
        `Emoji name: ${emoji.name} - URL: ${emoji.url}`);
    });
};