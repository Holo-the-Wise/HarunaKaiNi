const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const quotes = require('../../assets/quotes.json');
const allquotes = require('../../assets/allquotes.json');

module.exports = class QuoteCommand extends Command {
    constructor(client){
        super(client, {
            name: 'quote',
            memberName: 'quote',
            group: 'misc',
            description: 'Randomly choose from a bunch of quotes. Specify a user to get just quotes from them.',
            aliases: ['quotes'],
            examples: ['quote', 'quotes', 'quote @holo'],
            args: [
                {
                    key: 'member',
                    prompt: 'What user would you like to lookup quotes for?',
                    type: 'member',
                    default: ''
                }
            ],
            guildOnly: true,
        });
    }


    async run (message, {member}){
        if (!member) {
            let size = allquotes.length;
            let quoteNumber = Math.floor((Math.random() * size));
            message.channel.send(`${allquotes[quoteNumber]}`);
        } else {
            let userToQuote = member.user;
            let userId = userToQuote.id;
            if(quotes[userId]){
                let size = quotes[userId].length
                let quoteNumber = Math.floor((Math.random() * size));
                message.say(`${quotes[userId][quoteNumber]}`);
            } else {
                return message.say(`No quotes found for ${userToQuote.username}#${userToQuote.discriminator}`);
            }
        }
    }
};