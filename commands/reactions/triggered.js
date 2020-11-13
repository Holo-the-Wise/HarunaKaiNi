const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const logger = require('../../util/logging');

module.exports = class TriggeredlCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'triggered',
            memberName: 'triggered',
            group: 'reactions',
            description: 'REEEEEEEEEEEEEE',
            examples: ['triggered']
        });
    }

    async run (message) {

        logger(message.client, `Triggered activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);

        let size = assets["triggered"].length;
        let randNumber = Math.floor((Math.random() * size));
      
        const embed = new Discord.MessageEmbed()
            .setImage(assets["triggered"][randNumber])
            .setColor(0xFFFFFF)
        if(message.channel.type == 'dm'){
            return message.channel.send(embed);
        } else {
            return message.channel.send(embed).then(message.delete());
        }
    }
};