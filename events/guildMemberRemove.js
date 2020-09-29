const capChannelID = require("../config.json").capChannel;
const logger = require('../util/logging');

module.exports = async (client, member) => {

    let guild = member.guild;
    capChannel = guild.channels.cache.find(u => u.id == capChannelID);

    logger(client, `A member has left FISH n CHIPS\n` + 
    `Username: ${member.user.tag} - ID: ${member.user.id}.`);

    return capChannel.send(`${member.user} (${member.user.username}) ID: ${member.user.id} has left the server :cry:`);
}