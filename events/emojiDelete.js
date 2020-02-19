const generalChannelID = require("../config.json").generalChannel;
const clanChannelID = require("../config.json").clanChannel;
const capChannelID = require("../config.json").capChannel;
const Discord = require("discord.js");

module.exports = async (client, emoji) => {
    
    if(!client.emojinotifs){
        return;
    }
    let generalChannel = emoji.guild.channels.find(u => u.id == generalChannelID);
    let clanChannel = emoji.guild.channels.find(u => u.id == clanChannelID);
    let logChannel = emoji.guild.channels.find(u => u.id == capChannelID);
    console.log(`Emoji deleted: ${emoji.name}`);

    const embed = new Discord.RichEmbed()
        .setAuthor(`Emoji deleted`, ``)
        .setThumbnail(`${emoji.url}`)
        .setColor(0x00AE86)
        .addField(`\u200b`, `\`:${emoji.name}:\``)
        .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
        .setTimestamp();
    generalChannel.send(embed);
    clanChannel.send(embed);
    capChannel.send(embed);
};