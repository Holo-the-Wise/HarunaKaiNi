const clanChannelID = require("../config.json").clanChannel;
const capChannelID = require("../config.json").capChannel;
const Discord = require("discord.js");
const logger = require('../util/logging');

module.exports = async (client, oldEmoji, newEmoji) => {

    let clanChannel = newEmoji.guild.channels.cache.find(u => u.id == clanChannelID);
    let capChannel = newEmoji.guild.channels.cache.find(u => u.id == capChannelID);

    newEmoji.fetchAuthor().then((User) => {
        let creator = User;

        const embed = new Discord.MessageEmbed()
            .setTimestamp(new Date())
            .setTitle(`Old name: ${oldEmoji.name}\nNew name: ${newEmoji.name}`)
            .setDescription(newEmoji.animated ? `Animated` : "")
            .setColor(creator.displayHexColor)
            .setThumbnail(`${newEmoji.url}`)
            .setAuthor(`Emoji Edited`, `${client.user.displayAvatarURL({dynamic: true})}`)
            .setFooter(`Edited by: ${creator.tag}`, `${creator.displayAvatarURL({ dynamic: true})}`)

        if(client.emojiNotifsGeneral){
            clanChannel.send(embed);
        }
        if(client.emojiNotifsCaptains){
            capChannel.send(embed);
        }
        
        logger(client, `Emoji edited by ${creator} (${creator.tag} - ID: ${creator.id})\n` +
        `Emoji old name: ${oldEmoji.name} 🡪 Emoji new name: ${newEmoji.name} - URL: ${newEmoji.url}`);
    });
};