const capChannelID = require("../config.json").capChannel;
const ownerid = require('../config.json').OwnerId;

module.exports = async (client, member) => {

    let owner = member.guild.members.get(ownerid);
    
    let guild = member.guild;
    capChannel = guild.channels.find(u => u.id == capChannelID);

    console.log(`${member.user.username}  has left ${guild}`);
    capChannel.send(`${member.user} (${member.user.username}) has left the server :cry:`);
    

    return owner.send(`${member.user.tag} has left the server.`);
};