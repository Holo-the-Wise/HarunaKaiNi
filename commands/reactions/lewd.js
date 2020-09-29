const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const logger = require('../../util/logging');

module.exports = class LewdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lewd',
            memberName: 'lewd',
            group: 'reactions',
            description: 'When things are too lewd to handle',
            examples: ['lewd']
        });
    }

    async run (message, args) {

        logger(message.client, `Lewd activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);

        let size = assets["lewd"].length;
        let randNumber = Math.floor((Math.random() * size));
      
        const embed = new Discord.MessageEmbed()
            .setImage(assets["lewd"][randNumber])
            .setColor(0xFFFFFF)
        if(message.channel.type == 'dm'){
            return message.channel.send(embed);
        } else {
            return message.channel.send(embed).then(message.delete());
        }    
    }
};