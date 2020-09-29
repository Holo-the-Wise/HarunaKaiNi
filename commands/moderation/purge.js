const { Command } = require('discord.js-commando')
const logger = require('../../util/logging');

module.exports = class PurgeCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'purge',
            memberName: 'purge',
            group: 'moderation',
            description: 'Deletes the last X messages from the channel, can also specify a user if desired',
            aliases: ['clean'],
            examples: ['purge 5', 'purge 5 @holo'],
            format: 'purge [amount] [user]',
            args: [
                {
                    key: 'deleteAmount',
                    prompt: 'How many messages do you want to delete?',
                    type: 'integer',
                    validate: number => {
                        if(number > 0){ return true;} else{
                            return 'Number must be above 0. Please reenter amount again.';
                        }
                    }
                },
                {
                    key: 'member',
                    prompt: `Which user's messages do you want to delete?`,
                    type: 'member',
                    default: ''
                }
            ],
            guildOnly: true,
        })
    }

    hasPermission(message) {
        let PermissionLevel = 2;
        let msglevel = message.client.elevation(message);
        return msglevel >= PermissionLevel;
    }

    async run (message, {deleteAmount, member}) {

        if(member == ''){
            message.channel.messages.fetch({
                limit: deleteAmount + 1,
            }).then((messages) => {
                message.channel.bulkDelete(messages, true).catch(error => console.log(error.stack));
            });
            message.channel.send(`Deleting last ${deleteAmount} messages...`).then(msg => {
                msg.edit(`Successfully deleted ${deleteAmount} messages!`);
            });
            
            logger(message.client, `Purge activated by (${message.author.tag} - ID: ${message.author.id})\n` +
            `Purged ${deleteAmount} messages by everyone in ${message.channel} (${message.channel.name})`);
        } else {
            message.channel.messages.fetch({}).then((messages) => {
                let userMessages = messages.filter(m => m.author.id === member.id).array().slice(0, deleteAmount+1);
                message.channel.bulkDelete(userMessages, true).catch(error => console.log(error.stack));
            });
            message.channel.send(`Deleting last ${deleteAmount} messages by user mentioned: ${member}`).then(msg => {
                msg.edit(`Successfully deleted ${deleteAmount} messages by ${member}!`);
            });
            
            logger(message.client, `Purge activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})\n` +
            `Purged ${deleteAmount} messages by ${member} (${member.displayName} - ID: ${member.id}) in ${message.channel} (${message.channel.name})`);
        }
    }
};