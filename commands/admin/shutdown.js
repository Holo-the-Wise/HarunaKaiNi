const { Command } = require('discord.js-commando');
const owners = require('../../config.json').OwnerId;

module.exports = class ShutdownCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'shutdown',
            memberName: 'shutdown',
            group: 'admin',
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

    async run (message, args) {

        let owner = message.guild.members.get(ownerid);
        message.channel.send("Shutting down, Goodbye :wave:");

        // const messaged = await owner.send(`Haruna K2 shutdown by ${message.author.tag}`);
        return messaged.client.destroy();
    }
};