const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const logger = require('../../util/logging');

module.exports = class ThumbsupCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'thumbsup',
            memberName: 'thumbsup',
            group: 'reactions',
            description: 'Megumin approves',
            examples: ['thumbsup']
        });
    }

    async run (message) {

        logger(message.client, `Thumbsup activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);

        const embed = new Discord.MessageEmbed()
            .setImage(assets["thumbsup"])
            .setColor(0x00FFFF)
        if(message.channel.type == 'dm'){
            return message.channel.send(embed);
        } else {
            return message.channel.send(embed).then(message.delete());
        }    
    }
};