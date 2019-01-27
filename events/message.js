const Discord = require('discord.js');

module.exports = async (client, message) => {
    
    if (!message.content.startsWith(client.commandPrefix)) {
        return;
    }
    if (message.author.bot) {
        return;
    }
    let args = message.content.split(' ').slice(1);
    let command = message.content.toLowerCase().split(' ')[0];
    
    console.log(`Command ${command} ${args} activated by ${message.author.username}`);
    // const mess = message.content.toLowerCase();
    // const args = message.content.trim().split(/ +/g);
    // const config = client.config;
    // const disabledUsers = config.disabledUsers;

    // 

    // if (message.author.bot) {
    //     return;
    // } else if (message.channel.type === "dm") {
    //     dms.send(dm);
    // } else if (!message.guild.me.hasPermission('SEND_MESSAGES')) {
    //     return;
    // }



};