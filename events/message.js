const Discord = require('discord.js');

module.exports = async (client, message) => {

    if (message.author.bot) {
        return;
    }
    if (!message.content.startsWith(client.commandPrefix)) {
        // if (message.channel.guild) {
        //     if (message.author.bot) {
        //         return;
        //     }
        //     console.log("not dm");
        //     collectEmojis(message);
        //     // collectReactionEmojis(message);
        // } else {
            return;
        // }
    } else {
        let args = message.content.split(' ').slice(1);
        let command = message.content.toLowerCase().split(' ')[0];
    
        console.log(`Command ${command} ${args} activated by ${message.author.username}`);
    }
    

   


};