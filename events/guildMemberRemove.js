const logChannelID = require("../config.json").logChannel;

module.exports = async (client, member) => {
    // const ids = client.config.ids;
    // const leaveEmbed = new Discord.RichEmbed()
    //     .setAuthor(member.user.username, member.user.displayAvatarURL)
    //     .setTitle(`goodbye :(`)
    //     .setDescription(`<@${member.user.id}> has left the server, see ya`)
    //     .setColor('#73bcff')
    //     .setTimestamp();
        
    // if (member.guild.id === ids.server) {
    //     member.guild.channels.get(ids.joinLeaveLogs).embed(leaveEmbed);
    //     member.guild.channels.get(ids.generalChat).embed(leaveEmbed);
    // } else {
    //     return;
    // }
    let guild = member.guild;
    logChannel = guild.channels.find(u => u.id == logChannelID);
    console.log(`${member.user.username} has left ${guild}`);
    logChannel.send(`${member.user} has left the server :cry:`);
};