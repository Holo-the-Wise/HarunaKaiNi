const capChannelID = require("../config.json").capChannel;

module.exports = async (client, member) => {
    let guild = member.guild;
    capChannel = guild.channels.find(u => u.id == capChannelID);
    console.log(`${member.user.username}  has left ${guild}`);
    capChannel.send(`${member.user} (${member.user.username}) has left the server :cry:`);
};