const logChannelID = require("../config.json").logChannel;

module.exports = async (client, member) => {
    let guild = member.guild;
    logChannel = guild.channels.find(u => u.id == logChannelID);
    console.log(`${member.user.username}  has left ${guild}`);
    logChannel.send(`${member.user} (${member.user.username}) has left the server :cry:`);
};