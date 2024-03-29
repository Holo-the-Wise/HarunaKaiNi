const { Command } = require('discord.js-commando')
const logger = require('../../util/logging');

module.exports = class StatusClearCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'statusclear',
            memberName: 'statusclear',
            group: 'admin',
            description: 'Clears bots status',
            format: 'statusclear',
            guarded: false,
            ownerOnly: true
        })
    }

    async run (message) {

        message.client.user.setPresence({ 
            activity: {
                name: ''
            }
        });
        
        logger(message.client, `Statusclear activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);
    }
};