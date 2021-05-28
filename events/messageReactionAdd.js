module.exports = async (client, messageReaction, user) => {

    if (messageReaction.message.channel.type == 'dm'){
        return;
    }
    
    let cwconfirmed = messageReaction.message.guild.roles.cache.find(u => u.name == "CB Confirmed");
    
    if(user.bot){
        return;
    }
    
    const hawoo = messageReaction.message.guild.emojis.cache.find(emoji => emoji.name === "hawoo");
    
    if(client.rollcallActive && messageReaction.message.id == client.rollcallMsgId){
        if(messageReaction.emoji === hawoo){
            let target = messageReaction.message.guild.members.cache.find(u => u.id == user.id);
            target.roles.add(cwconfirmed);
        } 
    }
    return;
};