const { Command } = require('discord.js-commando')
const logger = require('../../util/logging');

module.exports = class DsayCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'dsay',
            memberName: 'dsay',
            group: 'admin', 
            description: 'Haruna will talk in the mentioned channel. Server only command', 
            format: '[channel] [message]', 
            examples: ['dsay2 #general hello there'],
            args: [
                {
                    key: 'textchannel',
                    prompt: 'Please enter a channel',
                    type: 'channel',
                },
                {
                    key: 'dsaytext',
                    prompt: 'Please type a message',
                    type: 'string',
                }
            ],
            argsPromptLimit: 2,  
            defaultHandling: true, 
            guildOnly: true,   
        })
    }

    hasPermission(message) {
        let PermissionLevel = 3;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }
    
    async run (message, {textchannel, dsaytext}) {
        if(textchannel.type != 'text'){
            return message.channel.send(`Destination channel must be a text channel`).then(message.delete());
        } else {
            logger(message.client, `Dsay activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})\n` +
            `Channel: ${textchannel} (${textchannel.name}). Text: ${dsaytext}`);
            return textchannel.send(dsaytext).then(message.delete());
        }
    }
};