 const {Command} = require('discord.js-commando')
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
                default: ''
            },
            {
                key: 'dsaytext',
                prompt: 'Please type a message',
                type: 'string',
            }],
            guildOnly: false,
            ownerOnly: true
        })
    }

    hasPermission(message) {
        let PermissionLevel = 3;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run(message, {dsaytext}) {
        console.log("hi0");
        message.say(dsaytext);
        
    }
};