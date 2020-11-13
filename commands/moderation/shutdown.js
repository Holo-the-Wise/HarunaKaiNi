const { Command } = require('discord.js-commando');
const logger = require('../../util/logging');

module.exports = class ShutdownCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'shutdown',
            memberName: 'shutdown',
            group: 'moderation',
            description: 'Shuts down the bot',
            examples: ['shutdown'],
            guildOnly: false,
            ownerOnly: false
        })
    }

    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message) {

        message.channel.send("Shutting down, Goodbye :wave:");
        logger(message.client, `Shutdown activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);
        
        setTimeout(() => { message.client.destroy(); }, 2000);
        return;
    }
};