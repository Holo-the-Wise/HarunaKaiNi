const Discord = require('discord.js');
const ownerid = require('../config.json').OwnerId;

module.exports = async (client, message) => {

    // let owner = message.guild.members.get(ownerid);

    if (message.author.bot) {
        return;
    }
    if (!message.content.startsWith(client.commandPrefix)) {
            return;
    } else {
        let args = message.content.split(' ').slice(1);
        let command = message.content.toLowerCase().split(' ')[0];
        let owneruser = client.owner;
        // console.log(`Command ${command} ${args} activated by ${message.author.username}`);
    }
};