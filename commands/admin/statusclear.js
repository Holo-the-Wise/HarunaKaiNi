const { Command } = require('discord.js-commando')
const owners = require('../../config.json').OwnerId;

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

        let owner = message.guild.members.get(ownerid);
        
        message.client.user.setPresence({
            game: {
              name: ''
            }})
        .then().catch(console.error);
        
        // owner.send(`Status cleared by ${message.author.username}`);
    }
};