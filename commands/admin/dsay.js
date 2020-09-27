 const {Command} = require('discord.js-commando');
const message = require('../../events/message');
const generalChannelID = require("../../config.json").generalChannel;

module.exports = class MuteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dsay',
            memberName: 'dsay',
            group: 'admin',
            description: 'Haruna will talk in the mentioned channel, default if no channel is mentioned',
            aliases: [],
            examples: ['dsay2 [channel] [message]'],
            format: 'dsay2 [channel] [message]',
            args: [{
                key: 'textchannel',
                prompt: 'Please enter a channel',
                type: 'channel',
            },
            {
                key: 'dsaytext',
                prompt: 'Please type a message',
                type: 'string',
            }],
            guildOnly: true,
            ownerOnly: false
        })
    }

    hasPermission(message) {
        let PermissionLevel = 3;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run(message, {textchannel, dsaytext}) {

        if(textchannel.type != 'text'){
            return message.channel.send(`Destination channel must be a text channel`);
        } else {
            //logging
            message.client.owners.forEach(owner => {
                owner.send(`=======================================================\n` + 
                `Guild Command dsay activated by ${message.author} (ID: ${message.author.id})\n` +
                `Channel: ${textchannel}. Text: ${dsaytext}`);
            });
    
            console.log(`=======================================================\n` + 
            `Guild Command CBList activated by ${message.author.username} (ID: ${message.author.id})\n` +
            `Channel: ${textchannel}. Text: ${dsaytext}`);
            return textchannel.send(dsaytext)
        }
        
        // if(textchannel){
        //     console.log(`channel is ${textchannel} id: ${textchannel.id}`);
        // } else if (this.client.guilds.first().channels.cache.find(channel => channel.name == textchannel)){

        //     let dchannel = this.client.guilds.first().channels.cache.find(channel => channel.name == textchannel);
        //     console.log(`textchannel is ${dchannel} id: ${dchannel.id}`);
        // }
        // logging
        // message.client.owners.forEach(owner => {
        //     owner.send(`=======================================================\n` + 
        //     `Guild Command Dsay activated by ${message.author} (ID: ${message.author.id})` + 
        //     `Channel Test: ${dsaytext}`);
        // });

        // console.log(`=======================================================\n` + 
        // `Guild Command CBList activated by ${message.author.username} (ID: ${message.author.id})`);

        // message.channel.send(textchannel);
        // return message.say(dsaytext);
    }
};