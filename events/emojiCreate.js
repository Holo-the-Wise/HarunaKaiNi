const generalChannelID = require("../config.json").generalChannel;
const clanChannelID = require("../config.json").clanChannel;
const capChannelID = require("../config.json").capChannel;
const Discord = require("discord.js");
const ownerid = require('../config.json').OwnerId;

module.exports = async (client, emoji) => {

    let owner = emoji.guild.members.get(ownerid);
    

    if(!client.emojinotifs){
        return;
    }
    let generalChannel = emoji.guild.channels.find(u => u.id == generalChannelID);
    let clanChannel = emoji.guild.channels.find(u => u.id == clanChannelID);
    let capChannel = emoji.guild.channels.find(u => u.id == capChannelID);
    console.log(`New emoji created: ${emoji.name}`);
    // let creator;

    

    // console.log(creator);
    const embed = new Discord.RichEmbed()
        .setAuthor(`New Emoji Added`, ``)
        .setThumbnail(`${emoji.url}`)
        .setColor(0x00AE86)
        .addField(`\u200b`, `\`:${emoji.name}:\``)
        // .setFooter(`Added by: ${creator.tag}`, `${creator.displayAvatarURL}`)
        .setTimestamp();

    emoji.fetchAuthor().then((User) => {
        let creator = User;
        embed.setFooter(`Added by: ${creator.tag}`, `${creator.displayAvatarURL}`);
        generalChannel.send(embed);
        clanChannel.send(embed);
        capChannel.send(embed);
        return owner.send(`New Emoji created by ${creator.username}: ${emoji.name} - ${emoji.url}`);
    }).catch(err => {
        console.error(err);
    });
};