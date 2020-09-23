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

            if(message.channel.type == 'dm'){
                ownerid.forEach(owner => {
                    owneruser = message.client.guilds.first().members.get(owner);
                    owneruser.send(`DM Command ${command} ${args} activated by ${message.author} (ID: ${message.author.id})`);
                });
                console.log(`DM Command ${command} ${args} activated by ${message.author.username} (ID: ${message.author.id})`);
            } else {
                ownerid.forEach(owner => {
                    owneruser = message.client.guilds.first().members.get(owner);
                    owneruser.send(`Guild Command ${command} ${args} activated by ${message.member} (ID: ${message.author.id})`);
                    });
                    console.log(`Guild Command ${command} ${args} activated by ${message.member.displayName} (ID: ${message.author.id})`);
            }
            
        }
        // let owneruser = client.owner;
        
    
};