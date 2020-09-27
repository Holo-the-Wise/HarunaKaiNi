const { Command } = require('discord.js-commando');
const owners = require('../../config.json').OwnerId;
const logger = require('../../util/logging');

module.exports = class EmojiNotifCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'emojinotifs', // Name of this command.
            memberName: 'emojinotifs', 
            group: 'admin', 
            description: 'Toggle emoji notifications',
            aliases: [ 
                'emojinotif',
            ],
            examples: [
                'emojinotifs'
            ],
            format: 'emojinotifs',
            guildOnly: true
        });
    }

    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }
    
    async run (message) {
        

        message.client.emojinotifs = !message.client.emojinotifs;

        // message.client.owners.forEach(owner => {
        //     owner.send(`=======================================================\n` + 
        //     `Guild Command EmojiNotifs activated by ${message.author} (ID: ${message.author.id})\n` +
        //     `Emoji notifications are now ${message.client.emojinotifs ? "enabled" : "disabled"}`);
        // });

        // console.log(`=======================================================\n` + 
        // `Guild Command CBList activated by ${message.author.username} (ID: ${message.author.id})\n` +
        // `Emoji notifications are now ${message.client.emojinotifs ? "enabled" : "disabled"}`);
        
        logger(message, `Command emojinotifs activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})\n` +
            `Emoji notifications are now ${message.client.emojinotifs ? "enabled" : "disabled"}`);

        return message.channel.send(`Emoji notifications are now ${message.client.emojinotifs ? "enabled" : "disabled"}`).then(message.delete());
    }
}