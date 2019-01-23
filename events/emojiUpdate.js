const generalChannelID = require("../config.json").generalChannel;
const logChannelID = require("../config.json").logChannel;
const Discord = require("discord.js");

module.exports = async (oldEmoji, newEmoji) => {
    // let guild = emoji.guild;
    let generalChannel = newEmoji.guild.channels.find(u => u.id == generalChannelID);
    let logChannel = newEmoji.guild.channels.find(u => u.id == logChannelID);
    console.log(`Emoji ${oldEmoji.name} updated to new name ${newEmoji.name}`);
    
    const embed = new Discord.RichEmbed()
        .setAuthor(`Emoji Updated`, ``)
        .setThumbnail(`${newEmoji.url}`)
        .setColor(0x00AE86)
        .addField(`\u200b`, `\`New name :${newEmoji.name}:\``)
        .setFooter(`${newEmoji.client.user.tag}`, `${newEmoji.client.user.displayAvatarURL}`)
        .setTimestamp();
    generalChannel.send(embed);
    logChannel.send(embed);
};