const Discord = require('discord.js');
const ownerid = require('../config.json').OwnerId;

module.exports = async (client, messageReaction, user) => {

    if (messageReaction.message.channel.type == 'dm'){
        return;
    }
        let cwconfirmed = messageReaction.message.guild.roles.find(u => u.name == "CB Confirmed");
        let cwmemes = message.guild.roles.find(u => u.name == "Supreme Meme Stream Dream Team");

        if(user.bot){
            return;
        }
        const hawoo = messageReaction.message.guild.emojis.find(emoji => emoji.name === "hawoo");
        const ramspin = message.guild.emojis.find(emoji => emoji.name === "a_RamSpin");

        if(client.rollcallActive && messageReaction.message.id == client.rollcallMsgId){
            if(messageReaction.emoji === hawoo){
                let target = messageReaction.message.guild.members.find(u => u.id == user.id);
                target.addRole(cwconfirmed);
            } else if (messageReaction.emoji === ramspin){
                let target = messageReaction.message.guild.members.find(u => u.id == user.id);
                target.addRole(cwmemes);
            }
        }
    return;
};