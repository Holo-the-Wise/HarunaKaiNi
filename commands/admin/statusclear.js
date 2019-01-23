const { Command } = require('discord.js-commando')

module.exports = class StatusClearCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'statusclear',
            memberName: 'statusclear',
            group: 'admin',
            description: 'Clears bots status',
            examples: ['statusclear'],
            format: 'statusclear',
            guildOnly: false,
            ownerOnly: true
        })
    }

    async run (message, args) {
            message.client.user.setPresence({
                game: {
                  name: ''
                }})
            .then().catch(console.error);
    }
};