const { Command } = require('discord.js-commando');
const { options } = require('node-superfetch');
const logger = require('../../util/logging');

module.exports = class EmojiNotifCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'emojinotifs', // Name of this command.
            memberName: 'emojinotifs', 
            group: 'moderation', 
            description: 'Toggle emoji notifications. ',
            aliases: [ 
                'emojinotif',
            ],
            examples: [
                'emojinotifs', 'emojinotifs both', 'emojinotifs captains', 'emojinotifs clan'
            ],
            format: `[options] - Options:\n` + 
                `"general/clan" - toggle for clan-general\n` +
                `"captains/captain" - toggle for captain channel\n` +
                `"all/both" - toggle for both\n` +
                `if options empty - displays current settings`,
            args: [{
                key: 'option',
                prompt: 'Please enter a channel',
                type: 'string',
                default: ''
            }],
            guildOnly: true
        });
    }

    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }
    
    async run (message, {option}) {
        

        switch(option) {
            case '':
                break;
            case 'all':
            case 'both':
                message.client.emojiNotifsGeneral = !message.client.emojiNotifsGeneral;
                message.client.emojiNotifsCaptains = !message.client.emojiNotifsCaptains;
                break;
            case 'general':
            case 'clan':
                message.client.emojiNotifsGeneral = !message.client.emojiNotifsGeneral;
                break;
            case 'captains':
            case 'captain':
                message.client.emojiNotifsCaptains = !message.client.emojiNotifsCaptains;
                break;
            default:
                return message.channel.send('Unrecognised option. Check help for details.')
        } 

        logger(message.client, `Emojinotifs activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})\n` +
        `Clan-General emoji notifications are now ${message.client.emojiNotifsGeneral ? "enabled" : "disabled"}\n` +
        `Captains Quarters emoji notifications are now ${message.client.emojiNotifsCaptains ? "enabled" : "disabled"}`);

        return message.channel.send(`Clan-General emoji notifications are now ${message.client.emojiNotifsGeneral ? "enabled" : "disabled"}\n` +
        `Captains Quarters emoji notifications are now ${message.client.emojiNotifsCaptains ? "enabled" : "disabled"}`);
    }
}