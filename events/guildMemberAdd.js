const generalChannelID = require("../config.json").generalChannel;
const logChannelID = require("../config.json").logChannel;
let welcome = require('../assets/welcome.json');
const silencedRole = require('../config.json').silencedrole;
const Discord = require("discord.js");

module.exports = async (client, member) => {
    
    let guild = member.guild;
    let generalChannel = guild.channels.find(u => u.id == generalChannelID);
    let logChannel = guild.channels.find(u => u.id == logChannelID);
    console.log(`${member.user.username} has joined ${guild}`);

    if (client.muted[member.id]) {
        let silenced = guild.roles.find(u => u.name == silencedRole);
        generalChannel.send(`Welcome back ${member.user}, you're still muted`);
        logChannel.send(`${member.user} has rejoined the server, still muted!`);
        member.addRole(silenced);
    } else {
    
        let size = welcome.length;
        let randNumber = Math.floor((Math.random() * size));
        let welcomeMsg = welcome[randNumber];
        let finalWelcome = welcomeMsg.replace("xxx", member.user.username);
        let color = Math.floor(Math.random() * 16777214) + 1;
    
        generalChannel.send(`Hi ${member}!, welcome to FISH and CHIPS!`);
        logChannel.send(`${member.user} has joined the server, welcome!`);
        const joinEmbed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .setColor(color)
            .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
            .setTimestamp()
            // .setDescription(finalWelcome)
            .addBlankField()
            .addField(finalWelcome,'\u200b', true)
            .setThumbnail(`${member.user.displayAvatarURL}`);
        generalChannel.send(joinEmbed);
    } 
};