const Discord = require("discord.js");
const clanChannelID = require("../config.json").clanChannel;
const capChannelID = require("../config.json").capChannel;
const logger = require('../util/logging');

module.exports = async (client, emoji) => {
    console.log(`${emoji.name} deleted`);
    let clanChannel = emoji.guild.channels.cache.find(u => u.id == clanChannelID);
    let capChannel = emoji.guild.channels.cache.find(u => u.id == capChannelID);

    // emoji.fetchAuthor().then((User) => {
    //     let creator = User;

        const embed = new Discord.MessageEmbed()
            .setTimestamp(new Date())
            .setTitle(`${emoji.name}`)
            .setDescription(emoji.animated ? `Animated` : "")
            .setColor(client.displayHexColor)
            .setThumbnail(`${emoji.url}`)
            .setAuthor(`Emoji Deleted`, `${client.user.displayAvatarURL({dynamic: true})}`)
            // .setFooter(`Deleted by: ${creator.tag}`, `${creator.displayAvatarURL({ dynamic: true})}`)

        if(client.emojiNotifsGeneral){
            clanChannel.send(embed);
        }
        if(client.emojiNotifsCaptains){
            capChannel.send(embed);
        }
        
        logger(client, `Emoji deleted\n` +
        `Emoji name: ${emoji.name} - URL: ${emoji.url}`);
    // });
};