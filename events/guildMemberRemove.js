const capChannelID = require("../config.json").capChannel;
const ownerid = require('../config.json').OwnerId;

module.exports = async (client, member) => {

    let owner = member.guild.members.cache.get(ownerid);
    
    let guild = member.guild;
    capChannel = guild.channels.cache.find(u => u.id == capChannelID);

    console.log(`${member.user.username} ID: ${member.user.id} has left ${guild}`);
    capChannel.send(`${member.user} (${member.user.username}) ID: ${member.user.id} has left the server :cry:`);
    

    return owner.send(`${member.user.tag} ID: ${member.user.id} has left the server.`);
};