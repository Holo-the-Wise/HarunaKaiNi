const generalChannelID = require("../config.json").generalChannel;
const clanChannelID = require("../config.json").clanChannel;
const capChannelID = require("../config.json").capChannel;
const Discord = require("discord.js");
const ownerid = require('../config.json').OwnerId;

module.exports = async (client, oldEmoji, newEmoji) => {

    let owner = newEmoji.guild.members.get(ownerid);

    if(!client.emojinotifs){
        return;
    }
    let generalChannel = newEmoji.guild.channels.find(u => u.id == generalChannelID);
    let clanChannel = newEmoji.guild.channels.find(u => u.id == clanChannelID);
    let capChannel = newEmoji.guild.channels.find(u => u.id == capChannelID);
    
    console.log(`Emoji ${oldEmoji.name} updated to new name ${newEmoji.name}`);
    
    const embed = new Discord.RichEmbed()
        .setAuthor(`Emoji Updated`, ``)
        .setThumbnail(`${newEmoji.url}`)
        .setColor(0x00AE86)
        .addField(`\u200b`, `\`New name :${newEmoji.name}:\``)
        .setFooter(`${newEmoji.client.user.tag}`, `${newEmoji.client.user.displayAvatarURL}`)
        .setTimestamp();

    emoji.fetchAuthor().then((User) => {
        let creator = User;
        embed.setFooter(`Updated by: ${creator.tag}`, `${creator.displayAvatarURL}`);
        generalChannel.send(embed);
        clanChannel.send(embed);
        capChannel.send(embed);
        return owner.send(`New Emoji created by ${creator.username}: ${emoji.name} - ${emoji.url}`);  
    }).catch(err => {
        console.error(err);
    }); 
};