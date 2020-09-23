const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const quotes = require('../../assets/quotes.json');
const allquotes = require('../../assets/allquotes.json');
const ownerid = require('../../config.json').OwnerId;

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

        let owner = message.guild.members.get(ownerid);
        
        if (!member) {
            let size = allquotes.length;
            let quoteNumber = Math.floor((Math.random() * size));
            message.channel.send(`${allquotes[quoteNumber]}`);

            owner.send(`Random quote requested from ${message.author.tag} (${message.author.id})`);

        } else {
            let userToQuote = member.user;
            let userId = userToQuote.id;
            if(quotes[userId]){
                let size = quotes[userId].length
                let quoteNumber = Math.floor((Math.random() * size));
                message.say(`${quotes[userId][quoteNumber]}`);

                // owner.send(`Quotes from ${userToQuote.tag} (${userToQuote.id}) requested from ${message.author.tag} (${message.author.id})`);
            } else {
                return message.say(`No quotes found for ${userToQuote.tag}`);
            }
        }
    }
};