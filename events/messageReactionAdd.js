module.exports = async (client, messageReaction, user) => {

    if (messageReaction.message.channel.type == 'dm'){
        return;
    }
        let cwconfirmed = messageReaction.message.guild.roles.cache.find(u => u.name == "CB Confirmed");
        let cwmemes = messageReaction.message.guild.roles.cache.find(u => u.name == "Supreme Meme Stream Dream Team");

        if(user.bot){
            return;
        }
        const hawoo = messageReaction.message.guild.emojis.cache.find(emoji => emoji.name === "hawoo");
        const ramspin = messageReaction.message.guild.emojis.cache.find(emoji => emoji.name === "a_RamSpin");

        if(client.rollcallActive && messageReaction.message.id == client.rollcallMsgId){
            if(messageReaction.emoji === hawoo){
                let target = messageReaction.message.guild.members.cache.find(u => u.id == user.id);
                target.roles.add(cwconfirmed);
            } else if (messageReaction.emoji === ramspin){
                let target = messageReaction.message.guild.members.cache.find(u => u.id == user.id);
                target.roles.add(cwmemes);
            }
        }
    return;
};