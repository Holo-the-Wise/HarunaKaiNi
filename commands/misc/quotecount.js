const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const quotes = require('../../assets/quotes.json');
const allquotes = require('../../assets/allquotes.json');
const logger = require('../../util/logging');

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

        if(!member){
            return message.say("No such user found");
        } else{
            let userToQuote = member.user;
            let userId = userToQuote.id;
            if(quotes[userId]){
                let size = quotes[userId].length
                if(size == 1){
                    message.say(`${userToQuote.tag} has ${size} quote`);
                } else {
                    message.say(`${userToQuote.tag} has ${size} quotes`)
                }
            } else {
                message.say(`No quotes found for ${userToQuote.tag}`);
            }
            logger(message.client, `Quotecount activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})\n` +
            `Requested quote count for: ${member} (${member.displayName} - ID: ${member.id})`);
            return;
        }
    }
};