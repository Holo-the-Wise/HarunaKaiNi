const Discord = require('discord.js');
const ownerid = require('../config.json').OwnerId;

module.exports = async (client, messageReaction, user) => {

    let cwconfirmed = messageReaction.message.guild.roles.find(u => u.name == "CB Confirmed");
    
    if(user.bot){
        return;
    }
    
    const hawoo = messageReaction.message.guild.emojis.find(emoji => emoji.name === "hawoo");
    if(client.rollcallActive && messageReaction.message.id == client.rollcallMsgId){
        if(messageReaction.emoji === hawoo){
            let target = messageReaction.message.guild.members.find(u => u.id == user.id);
            target.removeRole(cwconfirmed);
            console.log("test");
        }
    }
    return;
};