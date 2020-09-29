const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const logger = require('../../util/logging');

module.exports = class CarnivalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'carnival',
            memberName: 'carnival',
            group: 'reactions',
            description: 'Carnival Dayo!!!',
            aliases: ['maya'],
            examples: ['carnival']
        });
    }

    async run (message) {
        
        logger(message.client, `Carnival activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);

        const embed = new Discord.MessageEmbed()
            .setImage(assets["carnival"])
            .setColor(15750656)         
        if(message.channel.type == 'dm'){
            return message.channel.send(embed);
        } else {
            return message.channel.send(embed).then(message.delete());
        }
    }
};