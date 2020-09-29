const { Command } = require('discord.js-commando');
const Discord = require("discord.js");
const assets = require('../../assets/imageassets.json');
const logger = require('../../util/logging');

module.exports = class ClapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clap',
            memberName: 'clap',
            group: 'reactions',
            description: 'Congratulations!',
            aliases: ['clapping'],
            examples: ['clap']
        });
    }

    async run (message, args) {

        logger(message.client, `Clap activated by ${message.author} (${message.author.tag} - ID: ${message.author.id})`);

        const embed = new Discord.MessageEmbed()
            .setImage(assets["puckclap"])
            .setColor(0xFFFFFF)
        if(message.channel.type == 'dm'){
            return message.channel.send(embed);
        } else {
            return message.channel.send(embed).then(message.delete());
        }
    }
};