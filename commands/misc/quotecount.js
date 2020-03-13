const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const quotes = require('../../assets/quotes.json');
const allquotes = require('../../assets/allquotes.json');
const ownerid = require('../../config.json').OwnerId;

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

        let owner = message.guild.members.get(ownerid);

        
        if(!member){
            return message.say("No such user found");
        }
        let userToQuote = member.user;
        let userId = userToQuote.id;
        if(quotes[userId]){
            let size = quotes[userId].length

            owner.send(`Quotecount of ${userToQuote.tag} (${userToQuote.id}) requested by ${message.author.tag} (${message.author.id}). Returned: ${size}`);
            if(size == 1){
                return message.say(`${userToQuote.tag} has ${size} quote`);
            } else {
                return message.say(`${userToQuote.tag} has ${size} quotes`)
            }
        } else {
            owner.send(`Quotecount of ${userToQuote.tag} (${userToQuote.id}) requested by ${message.author.tag} (${message.author.id}). Returned: none.`);
            return message.say(`No quotes found for ${userToQuote.tag}`);
        }
    }
};