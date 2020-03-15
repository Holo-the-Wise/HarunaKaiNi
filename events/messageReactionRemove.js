const Discord = require('discord.js');
const ownerid = require('../config.json').OwnerId;

module.exports = async (client, messageReaction, user) => {

    let cwconfirmed = messageReaction.message.guild.roles.find(u => u.name == "CB Confirmed");
    let cwmaybe = messageReaction.message.guild.roles.find(u => u.name == "CB Maybe");
    // let client = messageReaction.message.client;
    
    if(user.bot){
        return;
    }
  
    if(client.rollcallActive && messageReaction.message.id == client.rollcallMsgId){
        if(messageReaction.emoji.name == '🇾'){
            let target = messageReaction.message.guild.members.find(u => u.id == user.id);
            target.removeRole(cwconfirmed);
        }
        if(messageReaction.emoji.name == '🇲'){
            let target = messageReaction.message.guild.members.find(u => u.id == user.id);
            target.removeRole(cwmaybe);
        }
    }
    return;
};