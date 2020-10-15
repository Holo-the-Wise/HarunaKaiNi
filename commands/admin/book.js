const { Command } = require('discord.js-commando')
const logger = require('../../util/logging');

module.exports = class BookCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'book',
            memberName: 'book',
            group: 'admin',
            description: 'When you need to book someone',
            details: `books = justice`,
            aliases: ['books'],
            ownerOnly: true,
            guarded: true,
            guildOnly: true,
            hidden: true
        })
    }

    async run (message, args) {
        
        if (!args){
           console.log('no args');
            return;
        } 
        // console.log(args);
        message.channel.messages.fetch(args).then(msg => {
        message.delete();
        msg.react('📗');
        msg.react('📕');
        msg.react('📘');
        msg.react('📙');
        msg.react('📒');
        msg.react('📓');
        }).catch(console.error);
                
        logger(message.client, `Book activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);
    }
};