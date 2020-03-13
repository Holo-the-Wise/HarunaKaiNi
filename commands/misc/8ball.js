const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const farmhash = require('farmhash');
const ownerid = require('../../config.json').OwnerId;

module.exports = class EightballCommand extends Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            memberName: '8ball',
            group: 'misc',
            description: 'Ask the Magic 8ball a yes/no question',
            examples: ['8ball is holo best girl?'],
            args: [{
                key: 'question',
                prompt: 'Please ask a yes or no question',
                type: 'string',
            }],
            guildOnly: false,
        });
    }

    async run(message, { question }) {

        let owner = message.guild.members.get(ownerid);

        var answer = {
            "0": "It is certain",
            "1": "It is decidedly so",
            "2": "Without a doubt",
            "3": "Yes definitely",
            "4": "You may rely on it",
            "5": "As I see it, yes",
            "6": "Most likely",
            "7": "Outlook good",
            "8": "Yes",
            "9": "Signs point to yes",
            "10": "Reply hazy try again",
            "11": "Ask again later",
            "12": "Better not tell you now",
            "13": "Cannot predict now",
            "14": "Concentrate and ask again",
            "15": "Don't count on it",
            "16": "My reply is no",
            "17": "No you baka!",
            "18": "Outlook not so good",
            "19": "Very doubtful"
        }


        let hash = farmhash.hash32(question);
        let response = hash % 20;
        owner.send(`8ball question from ${message.author.tag} (${message.author.id}): ${question}`);
        return message.say(answer[response.toString()]);
    }
};