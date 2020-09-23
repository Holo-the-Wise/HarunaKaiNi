const { Command } = require('discord.js-commando')
const ownerid = require('../../config.json').OwnerId;

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
            guildOnly: false, // Whether the command can only be run in a guild channel.
            ownerOnly: false // Whether the command can only be used by an owner.
        });
    }


    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }
    
    async run (message, args) {
        
        let owner = message.guild.members.get(ownerid);
        message.client.emojinotifs = !message.client.emojinotifs;
        
        console.log(`Emoji notifications toggled by ${message.author.username}. Current state: ${message.client.emojinotifs ? "enabled" : "disabled"}`);
        // owner.send(`Emoji notifications toggled by ${message.author.username}. Current state: ${message.client.emojinotifs ? "enabled" : "disabled"}`);

        return message.channel.send(`Emoji notifications are now ${message.client.emojinotifs ? "enabled" : "disabled"}`).then(message.delete());
    }
}