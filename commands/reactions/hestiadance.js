const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const logger = require('../../util/logging');

module.exports = class HestiaDanceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hestiadance',
            memberName: 'hestiadance',
            group: 'reactions',
            description: 'You\'ve got 32 of \'em, remember to keep them clean!',
            examples: ['hestiadance'],
            aliases: ['dance', 'shinyteeth'],
        });
    }

    async run (message, args) {

        logger(message.client, `Hestiadance activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);
        
        const embed = new Discord.MessageEmbed()
            .setImage(assets["hestiadance"])
            .setColor(0x00FFFF)
        if(message.channel.type == 'dm'){
            return message.channel.send(embed);
        } else {
            return message.channel.send(embed).then(message.delete());
        }
    }
};