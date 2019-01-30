const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const quotes = require('../../assets/quotes.json');
const allquotes = require('../../assets/allquotes.json');

module.exports = class QuoteCountCommand extends Command {
    constructor(client){
        super(client, {
            name: 'quotecount',
            memberName: 'quotecount',
            group: 'misc',
            description: 'Returns how many quotes the specified member has',
            aliases: ['quotescount'],
            examples: ['quotecount holo', 'quotescount @holo'],
            args: [
                {
                    key: 'member',
                    prompt: 'What user would you like to lookup quotes for?',
                    type: 'member',
                    validate: member => {
                        if(member){ return true;} else{
                            return 'No user specified';
                        }
                    }
                }
            ],
            guildOnly: true,
        });
    }


    async run (message, {member}){
        let userToQuote = member.user;
        let userId = userToQuote.id;
        if(quotes[userId]){
            let size = quotes[userId].length
            if(size == 1){
                return message.say(`${userToQuote.username}#${userToQuote.discriminator} has ${size} quote`);
            } else {
                return message.say(`${userToQuote.username}#${userToQuote.discriminator} has ${size} quotes`)
            }
        } else {
            return message.say(`No quotes found for ${userToQuote.username}#${userToQuote.discriminator}`);
        }
    }
};