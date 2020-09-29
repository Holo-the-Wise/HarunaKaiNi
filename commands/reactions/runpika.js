const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const logger = require('../../util/logging');

module.exports = class RunpikaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'runpika',
            memberName: 'runpika',
            group: 'reactions',
            description: 'Whoa Whoa! Whoa Whoa!',
            examples: ['runpika'],
            aliases: ['runepika'],
        });
    }

    async run (message, args) {

        logger(message.client, `Runpika activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);
        
        const embed = new Discord.MessageEmbed()
            .setImage(assets["runpika"])
            .setColor(0x00FFFF)
        if(message.channel.type == 'dm'){
            return message.channel.send(embed);
        } else {
            return message.channel.send(embed).then(message.delete());
        }
    }
};