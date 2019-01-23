const generalChannelID = require("../config.json").generalChannel;
const logChannelID = require("../config.json").logChannel;
const Discord = require("discord.js");

module.exports = async (client, emoji) => {
    // let guild = emoji.guild;
    let generalChannel = emoji.guild.channels.find(u => u.id == generalChannelID);
    let logChannel = emoji.guild.channels.find(u => u.id == logChannelID);
    console.log(`Emoji deleted: ${emoji.name}`);

    const embed = new Discord.RichEmbed()
        .setAuthor(`Emoji deleted`, ``)
        .setThumbnail(`${emoji.url}`)
        .setColor(0x00AE86)
        .addField(`\u200b`, `\`:${emoji.name}:\``)
        .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
        .setTimestamp();
    generalChannel.send(embed);
    logChannel.send(embed);
};